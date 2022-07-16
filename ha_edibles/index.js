const request = require("request");

console.log("script stagsertrt");

function apiPostCall(path, jsonData) {
    return new Promise(function(resolve, rej) {
        console.log("POST", path)
        /*
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

        var req = http.request(options, function(res) {
            res.on("data", function(data) {
                resolve(data);
            });
        });
        req.on("error", function(e) {
            console.error(e);
            rej(e);
        })
        req.write(data);
        req.end();
        */

        request(`http://supervisor/core/api${path}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.SUPERVISOR_TOKEN}`
            },
            json: jsonData
        }, function(err, res, body) {
            resolve(body);
        });
    });

}

(async function() {
    console.log("Hi");
    console.log(await apiPostCall("/states/edibles", {
        state: {
            edibleTimes: []
        }
    }))
})();