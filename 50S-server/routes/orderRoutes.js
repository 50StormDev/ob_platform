const express = require('express');
const router = express.Router();
const { trade } = require('../handlers/orders.js');

router.post("/:account_id", trade);

module.exports = router;