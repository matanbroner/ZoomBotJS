const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        status: `Your ip is ${req.ip}`
    })
})

module.exports = router;