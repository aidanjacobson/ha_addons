const http = require("http");

console.log("script start");

async function apiPostCall(path, jsonData) {
    return new Promise(function(res, rej) {
        var data = JSON.stringify(jsonData);
        var options = {
            hostname: "supervisor",
            port: 80,
            path: `/core/api${path}`,
            method: "POST",
            headers: {
                "Content-Type:": "application/json",
                "Content-Length": data.length,
                "Authorization": `Bearer ${process.env.SUPERVISOR_TOKEN}`
            }
        }

        var req = https.request(options, function(res) {
            res.on("data", function(data) {
                res(data);
            });
        });
        req.on("error", function(e) {
            console.error(e);
            rej(e);
        })
        req.write(data);
        req.end();
    });
}

(async function() {
    console.log(await apiPostCall("/states/edibles", {
        state: {
            edibleTimes: []
        }
    }))
})();