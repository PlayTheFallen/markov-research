import r from "rethinkdb";
import { cache, markovChain, MarkovFeedback, MarkovNode } from "./markov/index.js";
import { once, EventEmitter } from "events";

const randomFloat = (min, max) => (Math.random() * (max - min) + min);
const randomInt = (min, max) => {
    min = Math.ceil(min), max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate() {
    let wordCount = randomInt(3, 10);
    return markovChain(wordCount, null);
}

(async () => {
    const conn = await r.connect();
    const emitter = new EventEmitter();
    r.db('markov').table('words').run(conn).then(cursor => {
        cursor.toArray((err, arr) => {
            if(err) throw err;
            arr.forEach((row, i) => {
                cache.set(row.id, new MarkovNode(row.id, row.words));
            });
            emitter.emit("ready");
        });
    });
    await once(emitter, 'ready');
    for (let index = 0; index < 100000; index++) {
        let sentence = generate();
        if(sentence === null) continue;
        await r.db('markov').table('feedback').insert(sentence.export(), { conflict: "replace" }).run(conn);
        if (index % 1000 == 0) {
            console.info(index);
        }
    }
    process.exit(0);
})();