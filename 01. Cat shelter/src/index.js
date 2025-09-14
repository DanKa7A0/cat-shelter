import http from 'http';
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

    if (req.method === "POST"){
        let data = "";

        req.on("data", (chunk) => {
            data += chunk.toString();
        });

        req.on("end", async () => {
            const searchParams = new URLSearchParams(data);
            const result = Object.fromEntries(searchParams.entries());

            if (req.url === "/cats/add-cat"){
                await views.AddCatSubmit(result);
            }

            resp.writeHead(302, {
                'location': '/'
            });
            resp.end();
        });
    }
});

server.listen(5000, () => {
    console.log("Server is listening on port 5000 - http://localhost:5000");
});