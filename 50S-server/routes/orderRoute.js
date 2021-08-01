const router = require('express').Router();
let Order = require('../models/order');

router.route('/:id').get((req, res) => {
    const id = req.params.id;
    User.findOne({_id:id})
        .then(result => res.json(result))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const pair = req.body.pair;
    const payout = req.body.payout;
    const strategy = req.body.strategy;
    const result = req.body.result;
    const strategyWorked = req.body.strategyWorked;
    const entryDate = new Date();

    const newOrder = new Order({
        pair,
        payout,
        estrategy,
        result,
        strategyWorked,
        entryDate
    });

    newOrder.save()
    .then(()=>res.json("success added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;