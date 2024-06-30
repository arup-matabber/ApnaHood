import os

import requests  # use 'pip install requests' if not included
from flask import (
    Flask,
    flash,
    make_response,
    redirect,
    render_template,
    request,
    url_for,
)

from route.routes1 import server_bp

# from markupsafe import Markup  # Import Markup from markupsafe

app = Flask(__name__)
app.register_blueprint(server_bp)
app.secret_key =  os.getenv('FLASH_KEY')  # Needed for flashing messages
RECAPTCHA_SECRET_KEY = os.getenv('RECAPTCHA_SECRET_KEY')

# Homepage
@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/home2")
def home2():
    return render_template("home2.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/privacy")
def privacy():
    return render_template("privacy.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/faq")
def faq():
    return render_template("faq.html")


@app.route("/test")
def test():
    return render_template("test.html")


@app.route("/test2")
def test2():
    return render_template("test2.html")


@app.route("/entry")
def entry():
    return render_template("entry.html")

@app.route("/checkout")
def checkout():
    return render_template("checkout.html")

@app.route("/profile")
def profile():
    return render_template("profile.html")


@app.route('/submit_form', methods=['POST'])
def submit_form():
    app.logger.info("Form Submission started")
    flash('Testing', 'danger')
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    recaptcha_response = request.form.get('g-recaptcha-response')
    print("Form received by ", name, " with email ", email, " and message ",
          message)

    if not recaptcha_response:
        flash('Please complete the reCAPTCHA', 'danger')
        print('Incomplete reCAPTCHA; Form Submission Failed!')
        return redirect(url_for('contact'))

    verification_url = 'https://www.google.com/recaptcha/api/siteverify'
    payload = {'secret': RECAPTCHA_SECRET_KEY, 'response': recaptcha_response}

    response = requests.post(verification_url, data=payload)
    result = response.json()

    if not result.get('success'):
        flash('reCAPTCHA verification failed', 'danger')
        print('reCAPTCHA Verification failed; Form Submission Failed!')
        return redirect(url_for('contact'))

    # Process form data (e.g., save to database, send email, etc.)
    flash('Form submitted successfully', 'success')
    app.logger.info(
        "Form submitted by {name} with email {email} and message {message}")
    print("Form submitted by ", name, " with email ", email, " and message ",
          message)
    return redirect(url_for('contact'))
    # print(name)


@app.route("/search")
def search():   
    return render_template("search.html")

@app.route("/addProperty")
def addProperty():   
    return render_template("property.html")
    
@app.route("/myhouses")
def myhouses():   
    return render_template("myhouses.html")

@app.route("/housemodal")
def housemodal():   
    return render_template("housemodal.html")
    
# @app.route("/new_cookie")
# def new_cookie():
#     response=make_response("HelloWorld!")
#     response.set_cookie("myCookie","myValue")
#     return response

# @app.route("/show_cookie")
# def show_cookie():
#     cookie_value=request.cookies.get('mycookie')
#     return cookie_value

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
