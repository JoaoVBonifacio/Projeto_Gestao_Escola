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
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Atualiza o perfil do usuário com o nome
            return userCredential.user.updateProfile({
                displayName: name
            });
        })
        .then(() => {
            // Usuário registrado e perfil atualizado com sucesso
            const user = auth.currentUser;
            console.log('Usuário registrado:', user);
            alert('Registro bem-sucedido! Bem-vindo, ' + user.displayName);

            // Armazena as informações do usuário no localStorage
            localStorage.setItem('userName', user.displayName);
            localStorage.setItem('userEmail', user.email);

            // Redireciona para a segunda página
            window.location.href = '/gestion_folder/gestion.html';
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
            const user = userCredential.user;
            console.log('Usuário logado:', user);
            alert('Login bem-sucedido! Bem-vindo, ' + user.displayName);

            // Armazena as informações do usuário no localStorage
            localStorage.setItem('userName', user.displayName);
            localStorage.setItem('userEmail', user.email);

            // Redireciona para a segunda página
            window.location.href = '/gestion_folder/gestion.html';
        })
        .catch((error) => {
            console.error('Erro no login:', error);
            alert('Erro no login: ' + error.message);
        });
});

  // Função para login com Google
  function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function(result) {
            const user = result.user;
            console.log('Usuário logado:', user);
            alert('Login bem-sucedido! Bem-vindo, ' + (user.displayName || 'Usuário'));

            // Armazena as informações do usuário no localStorage
            localStorage.setItem('userName', user.displayName || 'Usuário');
            localStorage.setItem('userEmail', user.email);

            const token = result.credential.accessToken;
            localStorage.setItem('accessToken', token);

            // Redireciona para a segunda página
            window.location.href = '/gestion_folder/gestion.html';
        })
        .catch(function(error) {
            console.error('Erro no login:', error);
            alert('Erro no login: ' + error.message);
        });
}


  // Adiciona o manipulador de eventos ao ícone do Google
  document.getElementById('google-login').addEventListener('click', function(event) {
    event.preventDefault();
    googleLogin();
  });

  document.getElementById('google-register').addEventListener('click', function(event) {
    event.preventDefault();
    googleLogin();
  });



