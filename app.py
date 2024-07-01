from flask import Flask, render_template, request, jsonify, redirect, url_for
from google.oauth2 import id_token
from google.auth.transport import requests

app = Flask(__name__)

GOOGLE_CLIENT_ID = "1078026969554-77vn7s1tv4avm8lk3ugobeofbqg0dtk8.apps.googleusercontent.com"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    token = request.json.get('id_token')
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        userid = idinfo['sub']
        # Aqui você pode verificar se o usuário está no seu banco de dados e criar uma sessão
        return jsonify(success=True)
    except ValueError:
        # Token inválido
        return jsonify(success=False), 401

@app.route('/dashboard')
def dashboard():
    return "Bem-vindo ao Dashboard!"

if __name__ == '__main__':
    app.run(debug=True)
