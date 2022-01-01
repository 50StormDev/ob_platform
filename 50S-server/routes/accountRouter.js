const express = require('express');
const router = express.Router();
const { createAccount, getAll, remove, deposit, withdraw, history } = require('../handlers/accounts');

// pass "createStrategy" to create a new strategy or strategy_id to add a existed one

router.post("/:profile_id/:brooker_id/add", createAccount);
router.post("/:profile_id/:account_id/deposit", deposit);
router.post("/:profile_id/:account_id/withdraw", withdraw);
router.get("/:profile_id/history", history);
router.get("/", getAll);
router.post("/:profile_id/:account_id/remove", remove);

module.exports = router;