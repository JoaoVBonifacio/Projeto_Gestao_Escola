from flask import Flask, render_template, request, jsonify, redirect, url_for
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

app = Flask(__name__)

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')

@app.route('/')
def index():
    return render_template('index.html')

app.route('/', methods=['POST'])
def login():
    token = request.json.get('id_token')
    try:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)
        userid = idinfo['sub']
        email = idinfo['email']
        name = idinfo['name']
        return jsonify(success=True, email=email, name=name)
    except ValueError:
        return jsonify(success=False), 401

if __name__ == '__main__':
    app.run(debug=True)
