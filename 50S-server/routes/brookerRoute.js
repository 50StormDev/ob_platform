const express = require('express');
const router = express.Router();
const { add } = require('../handlers/brookers.js');

router.post("/:password/add", add);

module.exports = router;