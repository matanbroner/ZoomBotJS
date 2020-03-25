const express = require("express");
const router = express.Router();
const handler = require('../activator/handler');

router.use('/schedule', require('./schedule'));


module.exports = router;