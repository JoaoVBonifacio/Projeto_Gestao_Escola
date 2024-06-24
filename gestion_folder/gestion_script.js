// Recupera as informações do usuário do localStorage
const userName = localStorage.getItem('userName');

// Exibe o nome do usuário no cabeçalho
if (userName) {
    document.getElementById('user-info').innerHTML = `
        <p class="mb-0">Bem-vindo, ${userName}</p>
    `;
} else {
    document.getElementById('user-info').innerHTML = `
        <p class="mb-0">Usuário não logado</p>
    `;
}

// Adiciona funcionalidade de logout
document.getElementById('logout-btn').addEventListener('click', function() {
    // Limpa o localStorage
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    // Redireciona para a página de login
    window.location.href = '/index.html';
});
