import http from 'http';
import fs from "fs/promises";
import * as views from "./views.js";

const server = http.createServer(async (req, resp) => {
    if (req.method === "GET"){        
        let view = "";
        if (req.url === "/"){
            view = await views.HomeView();
        }
        else if (req.url === "/styles/site.css"){
            view = await views.Css();
        }
        else if (req.url === "/cats/add-cat"){
            view = await views.AddCatView();
        }
        resp.write(view);
        resp.end();
    }
});

server.listen(5000, () => {
    console.log("Server is listening on port 5000 - http://localhost:5000");
});