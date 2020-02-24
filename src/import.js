import { promises as fs } from "fs";
import r from "rethinkdb";

import { cache, MarkovNode, MarkovFeedback } from "./markov/index.js";
async function parse() {
    console.log('Start parse');
    /** @type {string[]} */
    let data = JSON.parse(await fs.readFile(`./src/import.json`));
    for (let sentence of data) {
        let words = sentence.split(" ").map(s => s.replace(/[^a-zA-Z0-9:\-]+/g, '').toLowerCase());
        /** @type {import('./markov').MarkovNode} */
        let node = MarkovNode.from(words[words[0] === '' ? 1 : 0]);
        for (let word of words) {
            if (word === node.key || word === '') continue;
            node = node.addWord(word);
        }
    }
    console.log('Done parse');
}

async function store() {
    console.log('Start store');
    for (const [word, node] of cache.entries()) {
        await r.table('words').insert(node.export()).run(conn);
        console.log(`'${word}' done`);
    }
    let data = JSON.parse(await fs.readFile(`./src/import.json`));
    for (const sentence of data) {
        let node = new MarkovFeedback(sentence.split(' '));
        await r.table('feedback').insert(node.export()).run(conn);
    }
    console.log('Done store');
}

let conn;
async function main() {
    conn = await r.connect({ db: "markov" });
    await r.table('words').delete().run(conn);
    await r.table('feedback').delete().run(conn);

    await parse();
    await store();
    return process.exit(0);
}

main();