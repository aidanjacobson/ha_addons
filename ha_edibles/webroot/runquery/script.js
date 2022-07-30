async function run_query(query) {
    var response = await fetch(`/run_query?query=${query}`);
    console.log(await response.json());
}

async function run() {
    await run_query(text.value)
}

function clear() {
    text.value = "";
}

window.onload = function() {
    text.onchange = async function() {
        console.log("run");
        await run();
        clear();
    }
}

window.onclick = function() {
    text.focus();
}