<<<<<<< HEAD
#User Model class for our apnahood project

class User:

  def __init__(self, username, password, email, number):
    self.username = username
    self.password = password
    self.email = email
    self.number = number
    self.islandlord = False
    self.properties = []  #Optional

  def to_dict(self):
    return {
        'username': self.username,
        'password': self.password,
        'email': self.email,
        'properties': self.properties,
        'islandlord': self.islandlord,
        'number': self.number,
    }


#Property Model class for our apnahood project
class Property:

  def __init__(self, fac1, fac2, fac3, fac4, fac5, extra_fac1, extra_fac2,
               extra_fac3, name, owner, address, lat, long, cost, thumbnail,
               rating, expiryAt):
    self.name = name
    self.owner = owner
    self.expiryAt = expiryAt
    self.lat = lat
    self.long = long
    self.cost = cost
    self.address = address
    self.thumbnail = thumbnail
    self.fac1 = fac1
    self.fac2 = fac2
    self.fac3 = fac3
    self.fac4 = fac4
    self.fac5 = fac5
    self.extra_facilities1 = extra_fac1
    self.extra_facilities2 = extra_fac2
    self.extra_facilities3 = extra_fac3
    self.rating = rating

  ## Expiry and Hashing

  def to_dict(self):
    return {
        'name': self.name,
        'owner': self.owner,
        'facilities1': self.fac1,
        'facilities2': self.fac2,
        'facilities3': self.fac3,
        'facilities4': self.fac4,
        'facilities5': self.fac5,
        'extra_facilities1': self.extra_facilities1,
        'extra_facilities2': self.extra_facilities2,
        'extra_facilities3': self.extra_facilities3,
        'latitude': self.lat,
        'longitude': self.long,
        'cost': self.cost,
        'thumbnail': self.thumbnail,
        'address': self.address,
        'rating': self.rating,
        'expireAt': self.expiryAt
    }
=======
#User Model class for our apnahood project

class User:

  def __init__(self, username, password, email, number):
    self.username = username
    self.password = password
    self.email = email
    self.number = number
    self.islandlord = False
    self.properties = []  #Optional

  def to_dict(self):
    return {
        'username': self.username,
        'password': self.password,
        'email': self.email,
        'properties': self.properties,
        'islandlord': self.islandlord,
        'number': self.number,
    }


#Property Model class for our apnahood project
class Property:

  def __init__(self, fac1, fac2, fac3, fac4, fac5, extra_fac1, extra_fac2,
               extra_fac3, name, owner, address, lat, long, cost, thumbnail,
               rating, expiryAt):
    self.name = name
    self.owner = owner
    self.expiryAt = expiryAt
    self.lat = lat
    self.long = long
    self.cost = cost
    self.address = address
    self.thumbnail = thumbnail
    self.fac1 = fac1
    self.fac2 = fac2
    self.fac3 = fac3
    self.fac4 = fac4
    self.fac5 = fac5
    self.extra_facilities1 = extra_fac1
    self.extra_facilities2 = extra_fac2
    self.extra_facilities3 = extra_fac3
    self.rating = rating

  ## Expiry and Hashing

  def to_dict(self):
    return {
        'name': self.name,
        'owner': self.owner,
        'facilities1': self.fac1,
        'facilities2': self.fac2,
        'facilities3': self.fac3,
        'facilities4': self.fac4,
        'facilities5': self.fac5,
        'extra_facilities1': self.extra_facilities1,
        'extra_facilities2': self.extra_facilities2,
        'extra_facilities3': self.extra_facilities3,
        'latitude': self.lat,
        'longitude': self.long,
        'cost': self.cost,
        'thumbnail': self.thumbnail,
        'address': self.address,
        'rating': self.rating,
        'expireAt': self.expiryAt
    }
>>>>>>> c991bf1c97d727ee44a98f945bf02b9fe1859647
