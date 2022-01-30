const db = require('../models');

exports.create =  async function(req, res, next){
    try {

        // find the user by param passed in request
        let foundAccount = await Account.findById(req.params.account_id);

        // if user exist then continue, otherwise trow an Error
        if(foundAccount){
            // Create an Order
            let order = await Order.create({
                account_id: req.params.account_id,
                asset: req.body.asset,
                trade_amount: req.body.amount,
                payout: req.body.payout,
                result: req.body.result,
                profit: req.body.profit,
                completed: req.body.completed
            })
            
            // update account balance 
            
            // update total of wins or loss depending on the result 
            // calculate assertivity
            // 
            // recursive function that calculate how many lifes until bank corrupt
            function calculateLifes(totalAmount, count= 0) {
                let nextNumber = calculateEntry(totalAmount)
                if (nextNumber > 1) {
                    count++
                    calculateLifes(nextNumber, count);
                }
            }
        } else {
            throw Error("Account not found!")
        }
              
    } catch(err) {
        return next({
            status: 500, 
            message: "Failed to place order"
        })
    }


}