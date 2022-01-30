const express = require('express');
const router = express.Router();
const { entry, out } = require('../handlers/holerite.js');

router.post("/:user_id/entry", entry);
router.post("/:user_id/:day_id/out", out);

module.exports = router;