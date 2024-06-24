// Configurações da API
const CLIENT_ID = '1078026969554-2snnqosr4kkfu8e5hbdmp7f4keqacmj4.apps.googleusercontent.com'; // Substitua pelo seu Client ID
const API_KEY = 'AIzaSyA_mIWyn5hyAs3R1BlKWVjlGnNgcojBPf8'; // Substitua pela sua API Key
const SPREADSHEET_ID = '1CcX9EXoBTa3dBP4m0bGFommQ3UmNxCw48wbW0lJbEvo'; // Substitua pelo ID da sua planilha
const RANGE = 'EA!B7:K46'; // Substitua pelo intervalo que você deseja obter da planilha
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

// Elementos HTML
const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');
const saveButton = document.getElementById('save_button');

// Carrega a biblioteca do cliente da API
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

// Inicializa o cliente da API
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
        scope: SCOPES,
    }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(authInstance.isSignedIn.get());
    });
}

// Atualiza a interface do usuário dependendo do estado de autenticação
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        saveButton.style.display = 'block';
        fetchData();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        saveButton.style.display = 'none';
    }
}

// Inicia o processo de login
function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
}

// Faz o logout do usuário
function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
}

// Busca os dados da planilha
function fetchData() {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
    }).then(response => {
        const data = response.result.values;
        populateTable(data);
    }, error => {
        console.error('Error: ' + error.result.error.message);
    });
}

// Preenche a tabela HTML com os dados da planilha
function populateTable(data) {
    const table = document.getElementById('data-table');
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    // Limpa a tabela antes de preenchê-la novamente
    thead.innerHTML = '';
    tbody.innerHTML = '';

    // Preenche o cabeçalho da tabela
    data[0].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        thead.appendChild(th);
    });

    // Preenche as linhas da tabela
    data.slice(1).forEach((row) => {
        const tr = document.createElement('tr');
        row.forEach((cell) => {
            const td = document.createElement('td');
            td.contentEditable = true; // Permite edição
            td.textContent = cell;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}

// Salva as alterações na planilha
function saveChanges() {
    const table = document.getElementById('data-table');
    const data = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach((row) => {
        const cells = row.querySelectorAll('td, th');
        const rowData = [];
        cells.forEach(cell => {
            rowData.push(cell.textContent);
        });
        data.push(rowData);
    });

    gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: 'RAW',
        resource: {
            values: data
        }
    }).then(response => {
        console.log('Planilha atualizada com sucesso', response);
    }, error => {
        console.error('Erro ao atualizar a planilha: ' + error.result.error.message);
    });
}

// Carrega a função handleClientLoad quando a página é carregada
document.addEventListener("DOMContentLoaded", handleClientLoad);