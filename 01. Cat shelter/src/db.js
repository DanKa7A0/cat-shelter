import fs from "fs/promises"

const dbBinary = await fs.readFile("./src/db.json");
const db = JSON.parse(dbBinary);

export function GetCats(){
    return db.cats;
}
