const express = require('express');
const router = express.Router();

function setDb(newDb) {
    db = newDb;
}

router.get('/', (req, res) => {
    res.status(200).send('OK');
});

router.get('/zip2coords', (req, res) => {
    let zip = req.query.zip;
    if (zip) {
        let sql = `SELECT * FROM healthcare.zip_coords WHERE zip_Code=${zip}`;
        db.conn.query(sql, (err, result) => {
            if (err) {
                res.status(500).send(err);
                return console.log(`[GET] /zip2coords error: ${err}`);
            }
            res.status(200).send(result);
        });
    } else {
        res.status(400).send('Please provide a zip code');
    }
});

router.get('/providers', (req, res) => {
    let queryParams = req.query.search_query;
    if (queryParams) {
        let sql = `SELECT * FROM healthcare.provider WHERE provider_Name LIKE "%${queryParams}%" OR provider_ID="${queryParams}";`
        db.conn.query(sql, (err, result) => {
            if (err) {
                res.status(500).send(err);
                return console.log(`[GET] /providers error: ${err}`);
            }
            res.status(200).send(result);
        });
    } else {
        res.status(405).send('Need to provide a seach query');
    }
});

router.get('/procedures', (req, res) => {
    let queryParams = req.query.search_query;
    if (queryParams) {
        let sql = `CALL sortRefineOptions("${queryParams}","${queryParams}","","","avg_Covered_Charges","ASC");`
        db.conn.query(sql, (err, result) => {
            if (err) {
                res.status(500).send(err);
                return console.log(`[GET] /procedures error: ${err}`);
            }
            res.status(200).send(result);
        });
    } else {
        res.status(405).send('Need to provide a seach query');
    }
});

module.exports = { router, setDb };