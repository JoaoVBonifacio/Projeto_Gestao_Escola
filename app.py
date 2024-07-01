from flask import Flask, render_template, request, jsonify, redirect, url_for
from google.oauth2 import id_token
from google.auth.transport import requests

app = Flask(__name__)

GOOGLE_CLIENT_ID = "1078026969554-77vn7s1tv4avm8lk3ugobeofbqg0dtk8.apps.googleusercontent.com"

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
