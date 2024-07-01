from flask import Flask, render_template, request, jsonify, redirect, url_for
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
