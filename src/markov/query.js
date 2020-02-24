import { once } from "events";
import r from "rethinkdb";

r.connect().then(async conn => {
    conn.use("markov");
    let data = await r.table("feedback").run(conn);
    data.each((err, row) => {
        if (err) throw err;
        console.log(`(${row.wordCount}) ${row.id} | ${row.rating}`);
    });
    return;
})