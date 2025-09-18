import fs from "fs/promises"

const dbBinary = await fs.readFile("./src/db.json");
const db = JSON.parse(dbBinary);

async function SaveDb(){
    const dbSerialized = JSON.stringify(db, null, 2);
    await fs.writeFile('./src/db.json', dbSerialized, { encoding: 'utf-8' });
}

export function GetCats(){
    return db.cats;
}

export function GetCat(cat_ID){
    return db.cats.find((cat) => cat.id === cat_ID);
}

export async function SaveCat(catData){
    db.cats.push({
        id: db.cats[db.cats.length - 1].id + 1
        , ...catData
    });

    return await SaveDb();
}

export async function EditCat(cat_ID, catData){
    db.cats = db.cats.map(cat => cat.id === cat_ID ? { id: cat_ID, ...catData } : cat);
    return await SaveDb();
}

export async function DeleteCat(cat_ID) {
    db.cats = db.cats.filter(cat => cat.id !== cat_ID);
    return await SaveDb();
}

export async function SaveBreed(breedData){
    db.breeds.push(breedData.breedName);
    return await SaveDb();
}

export async function GetBreeds(){
    return await db.breeds;
}
