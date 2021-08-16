const express = require('express');
const router = express.Router();
const { get } = require('../handlers/tradingProfiles');

router.get("/:id", get);

module.exports = router;