const http = require('http');
const https = require('https');

process.stdout.write("initializing HTTP/HTTPS server...\n");

const http_ports = [80, 443];
const https_ports = [8080,8443];
const url = '192.168.0.102'

http_ports.forEach(port => {
    http.createServer((req, res) => {
        console.log("req recieved -> http at " + port);
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        res.end('"Your requested URL has been blocked!!!"-LDNS');
    }).listen(port, url);
});

https_ports.forEach(port => {
    https.createServer((req, res) => {
        console.log("req recieved -> https at " + port);
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        res.end('"Your requested URL has been blocked!!!"-LDNS');
    }).listen(port, url);
});