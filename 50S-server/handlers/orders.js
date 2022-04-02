const db = require('../models');

// exports.create =  async function(req, res, next){
//     try {

//         // find the user by param passed in request
//         let foundAccount = await Account.findById(req.params.account_id);

//         // if user exist then continue, otherwise trow an Error
//         if(foundAccount){
//             // Create an Order
//             let order = await Order.create({
//                 account_id: req.params.account_id,
//                 asset: req.body.asset,
//                 trade_amount: req.body.amount,
//                 payout: req.body.payout,
//                 result: req.body.result,
//                 profit: req.body.profit
//             })
            
//             // update account balance 
//             // foundAccount.orders_day = {
//             //     day = 1,
//             //     orders: [order.id]
//             // }
//             for(let i in foundAccount.orders_day){
//                 if(foundAccount.orders_day[i] === Date.get)
//             }
//             // update total of wins or loss depending on the result 
            
//             req.body.result === "loss" ? foundAccount.balance -= req.body.trade_amount : foundAccount.balance += req.body.profit
//             // calculate assertivity
//             // 
//             // recursive function that calculate how many lifes until bank corrupt
//             function calculateLifes(totalAmount, count= 0) {
//                 let nextNumber = calculateEntry(totalAmount)
//                 if (nextNumber > 1) {
//                     count++
//                     calculateLifes(nextNumber, count);
//                 }
//             }
//         } else {
//             throw Error("Account not found!")
//         }
              
//     } catch(err) {
//         return next({
//             status: 500, 
//             message: "Failed to place order"
//         })
//     }


// }

exports.trade = async function(req, res, next){
     try {
        
        // find the user by param passed in request
        let foundAccount = await db.Account.findById(req.params.account_id);

        // if user exist then continue, otherwise trow an Error
        if(foundAccount){
            let balance = Number(foundAccount.balance) + Number(req.body.amount)
            foundAccount.balance = balance
            await foundAccount.save();
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