from flask import Flask, render_template, request, jsonify, redirect, url_for
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

app = Flask(__name__)

GOOGLE_CLIENT_ID = os.environ.get('1078026969554-2snnqosr4kkfu8e5hbdmp7f4keqacmj4.apps.googleusercontent.com')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    token = request.json.get('id_token')
    try:
        # Specify the CLIENT_ID of the app that accesses the backend
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        userid = idinfo['sub']
        email = idinfo['email']
        name = idinfo['name']
        # You can store user information in session or database
        # For example, session['user'] = {'userid': userid, 'email': email, 'name': name}
        
        return jsonify(success=True, email=email, name=name)
    except ValueError:
        # Invalid token
        return jsonify(success=False), 401

if __name__ == '__main__':
    app.run(debug=True)