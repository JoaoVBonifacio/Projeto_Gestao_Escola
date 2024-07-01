from flask import Flask, render_template, request, jsonify, redirect, url_for
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

app = Flask(__name__)

GOOGLE_CLIENT_ID = os.environ.get('1078026969554-77vn7s1tv4avm8lk3ugobeofbqg0dtk8.apps.googleusercontent.com', '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')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
