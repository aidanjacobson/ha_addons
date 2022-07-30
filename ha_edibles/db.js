var sqlite3 = require("sqlite3");

var db = new sqlite3.Database('./edibles.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        createDatabase();
        return;
        } else if (err) {
            console.log("Getting error " + err);
            exit(1);
    }
    runQueries(db);
});

function createDatabase() {
    var newdb = new sqlite3.Database('edibles.db', (err) => {
        if (err) {
            console.log("Getting error " + err);
            exit(1);
        }
        createTables(newdb);
    });
}

function createTables(newdb) {
    var test = newdb.exec(`
        CREATE TABLE edibles (
            id TEXT NOT NULL PRIMARY KEY,
            amount INTEGER,
            time TEXT,
            duration INTEGER,
            source TEXT
        );
        CREATE TABLE sources (
            id TEXT NOT NULL PRIMARY KEY,
            edible INTEGER,
            drinkable INTEGER,
            infusable INTEGER,
            initial_amount INTEGER,
            units INTEGER,
            amount_remaining INTEGER,
            added TEXT,
            friendly_name TEXT
        );
    `, ()  => {
            runQueries(newdb);
    });
}

async function runQueries(db) {
    console.log(await query("SELECT * FROM edibles"));
}

function query(query) {
    return new Promise(function(resolve, reject) {
        db.all(query, function(error, rows) {
            resolve(rows);
        })
    })
}

module.exports = query;