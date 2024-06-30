import base64
import io
import os
from datetime import datetime

from dateutil.relativedelta import relativedelta
from flask import Blueprint, jsonify, request
from PIL import Image
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

from model import Property, User

server_bp = Blueprint("server", __name__)
password = os.environ.get("MONGODB_PWD")
uri = f"mongodb+srv://hacker:{password}@cluster0.akxrbxh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client['Apnahood']
users_collection = db['users']
house_collection = db['houses']


@server_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    username = data['username']
    password = data.get('password')
    email = data.get('email')
    number = data.get('number')
    cipher_text = password

    if not username or not password or not email:
        return jsonify({'error': 'Full credentials not given!'}), 400

    if users_collection.find_one({'username': username}):
        return jsonify({'error': 'Username already exists'}), 409

    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 409

    try:
        user = User(username, cipher_text, email, number)
        users_collection.insert_one(user.to_dict())
        return jsonify({'message': 'User registered successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@server_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    cipher_text = password

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = users_collection.find_one({'username': username})
    if not user:
        return jsonify({'error': 'User not found!'}), 404
    elif user['password'] == cipher_text:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


@server_bp.route('/add-property', methods=['POST'])
def setProperties():
    try:
        data = request.form.to_dict()
        if house_collection.find_one({"name": data['name']}):
            return jsonify({'error': 'Property already exists!'}), 409

        image = request.files.get('image')
        if not image:
            return jsonify({'error': 'Image file is required'}), 400

        image_data = image.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        current_time = datetime.now()
        new_expiry_date = current_time + relativedelta(years=1)
        property = Property(name=data.get('name'),
                            owner=data.get('owner'),
                            fac1=data.get('fac1'),
                            fac2=data.get('fac2'),
                            fac3=data.get('fac3'),
                            fac4=data.get('fac4'),
                            fac5=data.get('fac5'),
                            extra_fac1=data.get('extra_fac1'),
                            extra_fac2=data.get('extra_fac2'),
                            extra_fac3=data.get('extra_fac3'),
                            lat=data.get('lat'),
                            long=data.get('long'),
                            cost=float(data['cost']),
                            address=data.get('address'),
                            rating="5",
                            thumbnail=encoded_image,
                            expiryAt=new_expiry_date)

        property_dict = property.to_dict()

        result = house_collection.insert_one(property_dict)
        ref = result.inserted_id

        pipeline = [{
            '$match': {
                'username': data['owner']
            }
        }, {
            '$set': {
                'properties': {
                    '$concatArrays': ['$properties', [ref]]
                },
                'islandlord': True
            }
        }, {
            '$merge': {
                'into': 'users',
                'on': '_id',
                'whenMatched': 'merge',
                'whenNotMatched': 'fail'
            }
        }]

        users_collection.aggregate(pipeline)
        return jsonify({'objectId': str(ref)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@server_bp.route('/get-properties', methods=['POST'])
def getProperties():
    data = request.get_json()
    q = data.get('query')

    if not q:
        return jsonify({'error': 'Location parameter is required'}), 400

    try:
        properties = house_collection.aggregate([{
            '$search': {
                "index": "default",
                "text": {
                    "query": q,
                    "path": {
                        "wildcard": "*"
                    }
                }
            }
        }])
        properties_list = []
        for i, property in enumerate(properties):
            del property["_id"]

            if 'thumbnail' in property:
                image_data = property['thumbnail']
                image_stream = io.BytesIO(base64.b64decode(image_data))
                image = Image.open(image_stream)
                if image.mode != 'RGB':
                    image = image.convert('RGB')
                image.save(f'output{i}.jpg')

            properties_list.append(property)
        return jsonify(properties_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

