// create web server
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer(function(req, res) {
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query, '&', '=');

    if (parsedUrl.pathname == '/comments' && req.method == 'POST') {
        let body = '';
        req.on('data', function(chunk) {
            body += chunk;
        });
        req.on('end', function() {
            const decoded = decodeURIComponent(body);
            const parsedBody = querystring.parse(decoded);
            console.log(parsedBody);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Name: ' + parsedBody.name + '<br>Comment: ' + parsedBody.comment);
        });
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404 Not Found');
    }
});

server.listen(3000, function() {
    console.log('Server is running!');
});