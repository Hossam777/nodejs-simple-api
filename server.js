const http = require('http');

const app = require('./app.js');

const port = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(port);