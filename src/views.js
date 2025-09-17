import fs from "fs/promises"
import * as db from "./db.js"

async function ReadFile(file){
    return await fs.readFile(`./src/${file}`, { encoding: "utf-8" });
}

// home
export async function HomeView(){
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
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="/cats/edit-cat/${cat.id}">Change Info</a></li>
                <li class="btn delete"><a href="">New Home</a></li>
            </ul>
        </li>
    `.trim();
}

// css
export async function Css(){
    return await ReadFile("styles/site.css");
}

// add cat
export async function AddCatView(){
    let html = await ReadFile("views/addCat.html");
    const breeds = await db.GetBreeds();

    let htmlBreeds = "";
    breeds.forEach((breed) => {
        htmlBreeds += `<option value="${breed}">${breed}</option>`;
    });

    html = html.replace("{{breeds}}", htmlBreeds);

    return html;
}
export async function AddCatSubmit(data){
    await db.SaveCat(data);
}

// edit cat
export async function EditCatView(cat_ID){
    let html = await ReadFile("views/editCat.html");
    const cat = await db.GetCat(cat_ID);
    const breeds = await db.GetBreeds();    

    let htmlBreeds = "";
    breeds.forEach((breed) => {
        htmlBreeds += `<option value="${breed}">${breed}</option>`;
    });

    html = html.replace("{{catName}}", cat.name);
    html = html.replace("{{catDescription}}", cat.description);
    html = html.replace("{{catUrl}}", cat.imgUrl);
    html = html.replace("{{breeds}}", htmlBreeds);

    return html;
}
export async function EditCatSubmit(id, data){
    await db.EditCat(id, data);
}

// add breed
export async function AddBreedView(){
    return await ReadFile("views/addBreed.html");
}
export async function AddBreedSubmit(data){
     await db.SaveBreed(data);
}