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

export async function SaveCat(catData){
    db.cats.push({
        id: db.cats[db.cats.length - 1].id + 1
        , ...catData
    });

    return await SaveDb();
}
