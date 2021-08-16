import { Order, Account } from "../models";

export async function create(req, res, next){
    try {

        // Create Order
        let order = await Order.create({
            pair: req.body.pair,
            timeframe: req.body.timeframe,
            amount: req.body.amount,
            payout: req.body.payout,
            profit: req.body.profit,
            result: req.body.result
        })

        // Get Account that will be updated
        let foundAccount = await Account.findById(req.params.account_id);
        
        // Setup all data that will be updated base on the result of the trade
        let {amount} = order 
        let {balance, lifes, wins, losses, assertivity, withdrawable, target, otc, strategy} = foundAccount;
        let day = req.params.day // which day is of the week (0: sunday... 6: saturday)
        let count = 0 // count how many lifes
        let dailyTarget = 0
        let totalBalance = balance + otc_amount
        // setup all the funcitons 

        // Calculate the Assertivity
        function calculateAssertivity(win, loss){
            return win / (win + loss)
        }

        // calculate the entry
        function calculateEntry(number){
            if (number > 10) {
                let risk = strategy.risk
                return (number - (number / risk)).toFixed(2)
            } else {
                if(number > 0){
                    return (number - 1).toFixed(2)
                } 
            }	
        }
        
        // recursive function that calculate how many lifes until bank corrupt
        function calculateLifes(totalAmount) {
            let nextNumber = calculateEntry(totalAmount)
            if (nextNumber > 1) {
                count++
                calculateLifes(nextNumber);
            }
        }
        
        // Set the day target
        function setDailyTarget(){
            dailyTarget = (((balance / risk) * 1.8) * 1.8) - (balance / risk)  // set base payout to be 80%
            dailyTarget = dailyTarget.toFixed(2) 
        }
        
        // set the dailyTarget
        setDailyTarget()

        // set logic to be a switch for the result (win, parcial, loss)
        switch(result) {
            case 'win':    {
                // Check if the weekend was profitable
                if (day == 1 && otc_amount > 0) {
                    balance =+ otc_amount
                }
                // if is on weekdays 
                if( day > 0 && day < 6){
                    balance += dailyTarget;
                    // set the overProfit to the otc
                    if(amount > dailyTarget){
                        otc_status = true
                        otc_amount += (amount - dailyTarget)
                    }
                } else { // Weekends
                    otc_amount += amount
                }
                wins += 2 // add 1 to the win counter
                assertivity = calculateAssertivity(wins, losses) // set the assertivity
                calculateLifes(balance)
                lifes = count
                if(totalBalance > target){
                    withdrawable.status = true
                    withdrawable.withdrawable_amount = totalBalance - target
                } else {
                    withdrawable.status = false
                    withdrawable.withdrawable_amount = 0
                }
                await foundAccount.update({
                    balance,
                    lifes,
                    wins, 
                    assertivity,
                    otc,
                    withdrawable
                })
                await foundAccount.save()
                return res.status(200).json({
                    message: `You have earned ${balance}`
                })     
            }
            case 'loss': {
                losses += 1
                assertivity = calculateAssertivity(wins, losses)
                balance -= amount;
                lifes = count
                await foundAccount.update({
                    losses, 
                    lifes,
                    assertivity, 
                    balance, 
                })
                await foundAccount.save()
                return res.status(200).json({
                    message: `You have loss ${balance}`
                })
            }
            case 'partial': {
                wins += 1
                balance += amount
                calculateLife(balance)
                lifes = count
                assertivity = calculateAssertivity(wins, losses)
                await found.Account.update({
                    wins, 
                    balance,
                    lifes,
                    assertivity
                })
                return res.status(200).json({
                    message: `You have earned ${balance}`
                })
            }
            default: {
                return next({
                    status: 500,
                    message: "Failed"
                })
            }
        }
        
    } catch(err) {
        return next({
            status: 500, 
            message: "Failed to place order"
        })
    }


}