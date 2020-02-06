const express = require('express');
const router = express.Router();
const calcCrow = require('../lib/DistanceCalculator');


function setDb(newDb) {
    db = newDb;
}

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
    let sortByCol, sortType, filtDist;
    if (queryParams) {
        let splitString = queryParams.split("&");
        if (splitString.length > 1) {
            let part1 = splitString[1].split("=");
            if (part1[0] = "sort") {
                sortByCol = part1[1].split(",")[0];
                if (sortByCol == "Price") {
                    sortByCol = "avg_Covered_Charges";
                }
                sortType = part1[1].split(",")[1];
            } else if (part1[0] = "dist") {
                filtDist = part1;
            }
            if (splitString.length > 2) {
                let part2 = splitString[2].split("=");
                if (part1[0] = "sort") {
                    sortByCol = part1[1].split(",")[0];
                    sortType = part1[1].split(",")[1];
                } else if (part1[0] = "dist") {
                    filtDist = part1;
                }
            }   
        }
        console.log(`Sort by column: ${sortByCol}, sort type: ${sortType}`)
        if (sortByCol != null && sortType != null) {
            let sql = `CALL sortRefineOptions("${splitString[0]}","${splitString[0]}","","","${sortByCol}","${sortType}");`
        } else {
            let sql = `CALL sortRefineOptions("${queryParams}","${queryParams}","","","avg_Medicare_Payments","ASC");`
        }
        
        db.conn.query(sql, (err, procResult) => {
            if (err) {
                res.status(500).send(err);
                return console.log(`[GET] /procedures error: ${err}`);
            }

            if (req.query.rad && req.query.lat && req.query.long) {
                let sql = `SELECT * FROM healthcare.zip_coords;`;
                db.conn.query(sql, (err, zip2CoordsRes) => {
                    if (err) {
                        res.status(500).send(err);
                        return console.log(`[GET] / error: ${req.query.rad}`);
                    }
                    let locArr = [];
                    procResult[0].forEach(p => {
                        let coords = zip2CoordsRes.find(z => z.zip_Code == p.provider_Zip);

                        if (!coords) return// console.log(`Nothing found for ${p.provider_Zip}`)

                        let dis = calcCrow(req.query.lat,
                            req.query.long,
                            coords.zip_Lat,
                            coords.zip_Long);

                        if (dis <= req.query.rad) {
                            let newProc = p;
                            newProc.provider_Latitude = coords.zip_Lat;
                            newProc.provider_Longitude = coords.zip_Long;
                            newProc.distance = dis;
                            locArr.push(newProc);
                        }
                    });
                    if (req.query.distance_sort == 'true') {
                        locArr.sort((a, b) => {
                            if (a.distance > b.distance) return 1;
                            if (a.distance < b.distance) return -1;
                            return 0;
                        })
                    }
                    res.status(200).send(locArr);
                });

            } else if (req.query.price_min && req.query.price_max) {
                let procArr = [];
                let price_min = req.query.price_min;
                let price_max = req.query.price_max;
                procResult[0].forEach((p) => {
                    if (price_min <= p.avg_Medicare_Payments && p.avg_Medicare_Payments <= price_max) {
                        procArr.push(p);
                    }
                });
                res.status(200).send(procArr);
            } else {
                res.status(200).send(procResult[0]);
            }

        });
    } else {
        res.status(405).send('Need to provide a seach query');
    }
});

module.exports = { router, setDb };