// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB3uW1r5hULsraekWThMOqPsnKeMKzqMrM",
    authDomain: "testedelogin-3898d.firebaseapp.com",
    databaseURL: "https://testedelogin-3898d-default-rtdb.firebaseio.com",
    projectId: "testedelogin-3898d",
    storageBucket: "testedelogin-3898d.appspot.com",
    messagingSenderId: "992858651157",
    appId: "1:992858651157:web:56108bafdde87a1bbaac1c"
  };

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Configuração de autenticação
const auth = firebase.auth();

// Código existente para alternar entre sign-in e sign-up
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});

// Registro de usuário
document.querySelector('#register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Usuário registrado com sucesso
            console.log('Usuário registrado:', userCredential.user);
            alert('Registro bem-sucedido!');
        })
        .catch((error) => {
            console.error('Erro no registro:', error);
            alert('Erro no registro: ' + error.message);
        });
});

// Login de usuário
document.querySelector('#login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Usuário logado com sucesso
            console.log('Usuário logado:', userCredential.user);
            alert('Login bem-sucedido!');
        })
        .catch((error) => {
            console.error('Erro no login:', error);
            alert('Erro no login: ' + error.message);
        });
});
