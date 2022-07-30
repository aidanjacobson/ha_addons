var express = require("express");
var app = express();
var querydb = require("./db");
var uuid = require("uuid").v4;

app.use(express.static(__dirname + "/webroot"));

var server = app.listen(8099, function() {
    console.log("server started");
});

app.get("/create_edible", async function(req, res) {
    var id = uuid();
    await querydb(`INSERT INTO edibles VALUES (
        "${id}",
        ${req.query.amount},
        "${req.query.time}",
        ${req.query.duration},
        "${req.query.source}"
    )`);
    await decreaseSource(req.query.source, +req.query.amount);
    res.send(id);
});

app.get("/run_query", async function(req, res) {
    res.json(await querydb(req.query.query));
});

async function decreaseSource(source, amount) {
    var result = (await querydb(`SELECT * FROM sources WHERE id="${source}"`))[0];
    var currentAmount = result.amount_remaining;
    var newAmount = currentAmount - amount;
    console.log(currentAmount, amount, newAmount);
    await querydb(`UPDATE sources SET amount_remaining=${newAmount} WHERE id="${source}"`)
}

app.get("/create_source", async function(req, res) {
    var id = uuid();
    var {edible, drinkable, infusable, initial_amount, units, added, friendly_name} = req.query;
    var result = await querydb(`INSERT INTO sources VALUES (
        "${id}",
        ${edible},
        ${drinkable},
        ${infusable},
        ${initial_amount},
        ${units},
        ${initial_amount},
        "${added}",
        "${friendly_name}"
    )`);
    console.log(result)
    res.send(id);
})