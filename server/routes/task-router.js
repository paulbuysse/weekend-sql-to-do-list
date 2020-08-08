const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `
    SELECT * FROM "task_list"
    ORDER BY "id";`;
    pool.query(queryText).then(result => {
        res.send(result.rows);
    }).catch(error => {
        console.log('error in pool.query GET', error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    let thisTask = req.body;
    console.log(thisTask);

    let queryText = `
    INSERT INTO "task_list"("task")
    VALUES ($1);
    `;

    pool.query(queryText, [thisTask.toDo]).then(result => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error in pool.query POST', error);
        res.sendStatus(500);
    });
});

module.exports = router;