import http from 'http';
import fs from "fs/promises"

const server = http.createServer(async (req, resp) => {
    if (req.method === "GET"){        
        let content = "";
        if (req.url === "/"){
            content = await fs.readFile("./src/views/index.html", { encoding: "utf-8" });
        }
        else if (req.url === "/styles/site.css"){
            content = await fs.readFile("./src/styles/site.css", { encoding: "utf-8" }); 
        }

        resp.write(content);
        resp.end();
    }
});

server.listen(5000, () => {
    console.log("Server is listening on port 5000 - http://localhost:5000");
});