import db from "./db.js";

function init() {
    // Initialize the table if it doesn't exist
    db.exec(`
        CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT 0
        )
    `);
}

export function insetToDb(title, description) {
    init()
    try {
        db.exec(`
            INSERT INTO tasks (title, description) VALUES ('${title}', '${description}');
        `)

        console.log("Writing success")
    } catch (error) {

        console.log("Writing error")
    }
}


export async function getFromTasks() {
    init()
    try {
        const data = await db.prepare('SELECT * FROM tasks').all();

        console.log("Reading success success : ", data)
    } catch (error) {

        console.log("Reading error")
    }
}


export function deleteSomething() {
    init()
    try {
        db.exec(`
            DELETE FROM tasks WHERE id = 1
        `)

        console.log("Delete success")
    } catch (error) {

        console.log("Delete error")
    }
}

export function updateSomething() {
    init()
    try {
        db.exec(`
            UPDATE tasks SET completed = 1 WHERE id = 2
        `)

        console.log("Update success")
    } catch (error) {

        console.log("Update error")
    }
}



getFromTasks()



























