const functions = require('firebase-functions');
const { spawn } = require('child-process-promise');

exports.app = functions.https.onRequest((request, response) => {
  const python = spawn('python', ['app.py']);
  
  python.stdout.on('data', (data) => {
    console.log('stdout: ' + data.toString());
    response.send(data.toString());
  });
  
  python.stderr.on('data', (data) => {
    console.error('stderr: ' + data.toString());
    response.status(500).send(data.toString());
  });
  
  python.on('close', (code) => {
    console.log('child process exited with code ' + code.toString());
  });
});
