const https = require("https");

async function apiPostCall(path, jsonData) {
    return new Promise(function(res, rej) {
        var data = JSON.stringify(jsonData);
        var options = {
            hostname: "aidanjacobson.duckdns.org",
            port: 443,
            path: `/api${path}`,
            method: "POST",
            headers: {
                "Content-Type:": "application/json",
                "Content-Length": data.length
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