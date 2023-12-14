const http = require('http');

const url = require('url');
const port = 3000;

let users = [];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/users' && req.method === 'POST') {
        let newData = '';
        req.on('data', (data) => {
            newData = data;
        
        })
        req.on('end', () => {
            users.push(JSON.parse(newData));
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User created successfully' }));
        })
    } else if (parsedUrl.pathname === '/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type' : 'application/json' });
        res.end(JSON.stringify(users));
    } else if (parsedUrl.pathname === '/users' && req.method === 'PUT') {
        const index = parsedUrl.query.index;
        if (users[index]) {
            let userUpdated = '';
            req.on('data', (data) => {
                userUpdated = data;
            }) 
            req.on('end', () => {
                users[index] = JSON.parse(userUpdated);
                res.writeHead(200, { 'Content-Type' : 'application/json' });
                res.end(JSON.stringify({ message: 'User updated successfully' }));
            })
        } else {
            res.writeHead(404, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
        const index = parsedUrl.query.index;
        if (users[index]) {
            users.splice(index, 1);
            res.writeHead(200, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({ message: 'User deleted successfully' }));
        } else {
            res.writeHead(404, { 'Content-Type' : 'application/json' });
            res.end(JSON.stringify({ 'message': 'User not found' }));
        }
    } 

});

server.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`)})









// netstat -ano | find "3000"
// taskkill /F /PID 1234