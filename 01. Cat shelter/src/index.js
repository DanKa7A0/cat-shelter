import http from 'http';

const server = http.createServer((req, resp) => {
    resp.write("test");

    resp.end();
});

server.listen(5000);
console.log("Server is listening on port 5000 - http://localhost:5000");