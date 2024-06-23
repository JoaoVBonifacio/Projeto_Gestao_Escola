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

  document.addEventListener('DOMContentLoaded', function() {
    gapi.load('client:auth2', initClient);
});

function initClient() {
    gapi.client.init({
        apiKey: 'AIzaSyA_mIWyn5hyAs3R1BlKWVjlGnNgcojBPf8', // Substitua pela sua chave de API
        clientId: '1078026969554-2snnqosr4kkfu8e5hbdmp7f4keqacmj4.apps.googleusercontent.com', // Substitua pelo seu ID do Cliente OAuth
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: "https://www.googleapis.com/auth/spreadsheets",
    }).then(function () {
        gapi.auth2.getAuthInstance().signIn().then(fetchSpreadsheetData);
    });
}

function fetchSpreadsheetData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1CcX9EXoBTa3dBP4m0bGFommQ3UmNxCw48wbW0lJbEvo', // Substitua pelo ID da sua planilha
        range: 'EA!B7:K46', // Substitua pelo intervalo de dados que deseja obter
    }).then(function(response) {
        var range = response.result;
        if (range.values.length > 0) {
            appendDataToHtml(range.values);
        } else {
            console.log('No data found.');
        }
    }, function(response) {
        console.error('Error: ' + response.result.error.message);
    });
}

function appendDataToHtml(data) {
    var container = document.querySelector('.containers');
    var table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    data.forEach(function(row) {
        var tr = document.createElement('tr');
        row.forEach(function(cell) {
            var td = document.createElement('td');
            td.appendChild(document.createTextNode(cell));
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    container.appendChild(table);
}