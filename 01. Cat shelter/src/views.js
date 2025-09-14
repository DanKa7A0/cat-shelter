import fs from "fs/promises"
import * as db from "./db.js"

async function ReadFile(file){
    return await fs.readFile(`./src/${file}`, { encoding: "utf-8" });
}

// home
export async function HomePage(){
    let content = await ReadFile("views/index.html");

    const cats = db.GetCats();
    let catsHtml = "";
    cats.forEach(cat => {
        catsHtml += TemplateCat(cat);
    });
    content = content.replace("{{cats}}", catsHtml);

    return content;
}
function TemplateCat(cat){
    return `
        <li>
            <img src="${cat.imgUrl}" alt="${cat.name}">
            <h3>${cat.name}</h3>
            <p><span>Price: </span>${cat.price}$</p>
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="">Change Info</a></li>
                <li class="btn delete"><a href="">New Home</a></li>
            </ul>
        </li>
    `.trim();
}

// css
export async function Css(){
    return await ReadFile("styles/site.css");
}
