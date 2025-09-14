import http from 'http';
import fs from "fs/promises";
import * as views from "./views.js";

const server = http.createServer(async (req, resp) => {
    if (req.method === "GET"){        
        let page = "";
        if (req.url === "/"){
            page = await views.HomePage();
        }
        else if (req.url === "/styles/site.css"){
            page = await views.Css()
        }

        resp.write(page);
        resp.end();
    }
});

server.listen(5000, () => {
    console.log("Server is listening on port 5000 - http://localhost:5000");
});