const CLIENT_ID = '1078026969554-2snnqosr4kkfu8e5hbdmp7f4keqacmj4.apps.googleusercontent.com';
const API_KEY = 'AIzaSyA_mIWyn5hyAs3R1BlKWVjlGnNgcojBPf8';
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
const userEmail = localStorage.getItem('userEmail');

        let gapiInited = false;
        let gisInited = false;

        function gapiLoaded() {
            gapi.load('client', initializeGapiClient);
        }

        async function initializeGapiClient() {
            await gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            });
            gapiInited = true;
            maybeEnableButtons();
        }

        function handleAuthClick() {
            tokenClient.callback = async (resp) => {
                if (resp.error !== undefined) {
                    throw (resp);
                }
                //document.getElementById('authorize_button').style.display = 'none';
                //document.getElementById('signout_button').style.display = 'block';
                loadSheetData();
            };

            if (gapi.client.getToken() === null) {
                // Prompt the user to select a Google Account and ask for consent to share their data
                // when establishing a new session.
                tokenClient.requestAccessToken({prompt: 'consent'});
            } else {
                // Skip display of account chooser and consent dialog for an existing session.
                tokenClient.requestAccessToken({prompt: ''});
            }
        }

        function gisLoaded() {
            tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: CLIENT_ID,
                scope: SCOPES,
                callback: '', // defined later
            });
            gisInited = true;
            maybeEnableButtons();
        }

        function maybeEnableButtons() {
            if (gapiInited && gisInited) {
                localStorage.getItem('userEmail');
            }
        }

        async function loadSheetData() {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                alert('Você precisa estar logado para acessar esta página.');
                window.location.href = "login.html"; // Redireciona para a página de login se não estiver autenticado
                return;
            }
            
            const spreadsheetId = '1CcX9EXoBTa3dBP4m0bGFommQ3UmNxCw48wbW0lJbEvo';
            const range = 'EA!B6:O46';
        
            try {
                const response = await gapi.client.sheets.spreadsheets.values.get({
                    spreadsheetId: spreadsheetId,
                    range: range,
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
        
                const values = response.result.values;
                if (values.length > 0) {
                    let table = '<table>';
                    values.forEach((row, rowIndex) => {
                        table += '<tr>';
                        row.forEach((cell, cellIndex) => {
                            if (rowIndex === 0) {
                                table += `<th>${cell}</th>`;
                            } else {
                                table += `<td contenteditable="true" data-row="${rowIndex}" data-col="${cellIndex}">${cell}</td>`;
                            }
                        });
                        table += '</tr>';
                    });
                    table += '</table>';
                    document.getElementById('table-container').innerHTML = table;
                } else {
                    document.getElementById('table-container').innerHTML = 'No data found.';
                }
            } catch (err) {
                console.error('Error loading data: ', err);
            }
        }

        function getUpdatedData() {
            const table = document.querySelector('table');
            const updatedData = [];
            table.querySelectorAll('tr').forEach((row, rowIndex) => {
                const rowData = [];
                row.querySelectorAll('td').forEach((cell) => {
                    rowData.push(cell.innerText);
                });
                updatedData.push(rowData);
            });
            return updatedData;
        }

        async function updateSheetData() {
            const spreadsheetId = '1CcX9EXoBTa3dBP4m0bGFommQ3UmNxCw48wbW0lJbEvo';
            const range = 'EA!B6:O46';
            const values = getUpdatedData();

            try {
                await gapi.client.sheets.spreadsheets.values.update({
                    spreadsheetId: spreadsheetId,
                    range: range,
                    valueInputOption: 'USER_ENTERED',
                    resource: {
                        values: values,
                    },
                });
                alert('Data updated successfully');
            } catch (err) {
                console.error('Error updating data: ', err);
                alert(`Failed to update data: ${err.message}`);
            }
        }

        window.onload = function () {
            gapiLoaded();
            gisLoaded();
            //loadSheetData();
        };