/** Command-line tool to generate Markov text. */
const fs = require('fs')
const axios = require('axios')
const markov = require('./markov')

function makeTextFromFile(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log("Error: cannot find or open file: ", path);
            process.exit(1);
        }
        let mm = new markov.MarkovMachine(data);
        console.log(mm.makeText());
    })
}

async function makeTextFromURL(path) {
    let res;
    try {
        res = await axios.get(path);
    } catch (err) {
        console.log("Not able to open URL: ", path);
        process.exit(1);
    }
    let mm = new markov.MarkovMachine(res.data);
    console.log(mm.makeText());
}

let method = process.argv[2];
let path = process.argv[3];
if (method === 'file') {
    makeTextFromFile(path);
} else if (method === 'url') {
    makeTextFromURL(path);
} else {
    console.log("Error: unknown method ", method);
}