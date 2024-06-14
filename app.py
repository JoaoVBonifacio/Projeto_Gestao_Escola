from flask import Flask, render_template, request, redirect, url_for
import pyrebase

app = Flask(__name__)

# Configuração do Firebase
config = {
    "apiKey": "AIzaSyB3uW1r5hULsraekWThMOqPsnKeMKzqMrM",
    "authDomain": "testedelogin-3898d.firebaseapp.com",
    "databaseURL": "https://testedelogin-3898d-default-rtdb.firebaseio.com",
    "projectId": "testedelogin-3898d",
    "storageBucket": "testedelogin-3898d.appspot.com",
    "messagingSenderId":"992858651157",
    "appId": "1:992858651157:web:56108bafdde87a1bbaac1c"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        user = auth.create_user_with_email_and_password(email, password)
        return redirect(url_for('home'))
    except:
        return 'Erro ao criar conta'

@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    try:
        user = auth.sign_in_with_email_and_password(email, password)
        return redirect(url_for('home'))
    except:
        return 'Erro ao fazer login'

if __name__ == '__main__':
    app.run(debug=True)
