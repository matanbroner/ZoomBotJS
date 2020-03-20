const express = require("express");
const router = express.Router({
    mergeParams: true
});

const store = require('../database').schedules;

router.get('/', async (req, res) => {
    try {
        const docs = await store.find({});
        res.returnStatus(res, 200, docs);
    } catch (e) {
        res.returnStatus(res, 400, e);
    }
});

router.post('/', async (req, res) => {
    try {
        const docs = await store.insert(req.body);
        res.returnStatus(res, 200, docs);
    } catch (e) {
        res.returnStatus(res, 400, e);
    }
});

module.exports = router;