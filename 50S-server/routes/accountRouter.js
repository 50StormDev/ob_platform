const express = require('express');
const router = express.Router();
const { createAccount, getAll, remove } = require('../handlers/accounts');

// pass "createStrategy" to create a new strategy or strategy_id to add a existed one
router.post("/:profile_id/:brooker_id/add", createAccount);
router.get("/", getAll);
router.post("/:account_id/remove", remove);

module.exports = router;