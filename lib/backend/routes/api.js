const express = require("express");
const router = express.Router();
const handler = require('../activator/handler');

router.use('/schedule', require('./schedule'));

router.post('/activate', async (req, res) => {
    try {
        await handler.setActiveSchedule(req.body.id);
        res.returnStatus(res, 200);
    } catch (e) {
        res.returnStatus(res, 400, e);
    }
});

router.post('/deactivate', (req, res) => {
    try {
        handler.deactivateActiveSchedule();
        res.returnStatus(res, 200);
    } catch (e) {
        res.returnStatus(res, 400, e);
    }
});

module.exports = router;