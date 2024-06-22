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

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }