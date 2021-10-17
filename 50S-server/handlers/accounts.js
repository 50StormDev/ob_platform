const db = require('../models');

// get all account
exports.get = async function (req, res, next){

}
exports.getAll = async function (req, res, next){

}
exports.createAccount = async function (req, res, next){
    let strategy_id = ""
    try {
        // Create strategy in case has no strategy set
        if(req.body.strategy === "createStrategy"){
            // check if this name already been used
            let foundStrategy = await db.Strategy.findOne({strategy_name: req.body.strategy_name})
            if(!foundStrategy){
                let createStrategy = await db.Strategy.create({
                    strategy_name: req.body.strategy_name,
                    max_loss: req.body.max_loss,
                    max_win: req.body.max_win,
                    consecutive_loss: req.body.consecutive_loss,
                    risk: req.body.risk,
                    strategy_users:[]
                })
                strategy_id = createStrategy.id
            } else {
                strategy_id = foundStrategy.id
            }
        } else {
            // Found the strategy and push user to strategy_users 
            let foundStrategy = await db.Strategy.find({strategy_name:req.body.strategy})
            strategy_id = foundStrategy[0].id
        }
        let account = await db.Account.create({
            account_name: req.body.account_name,
            balance: 0,
            lifes: 0,
            wins: 0,
            losses: 0,
            assertivity: 0,
            withdrawable: {
                status: false,
                withdrawable_amount: 0
            },
            strategy: strategy_id,
            target: req.body.target,
            otc: {
                otc_status: false,
                otc_amount: 0
            },
            trading_profile: req.params.profile_id,
            brooker: req.params.brooker_id,
            orders: []
        });

        // Find Trading Profile 
        let foundProfile = await db.TradingProfile.findById(req.params.profile_id)
        // Add Account id to the Array of accounts
        foundProfile.accounts.push(account.id)
        // Save Traiding Profile
        await foundProfile.save()

        //Find Brooker
        let foundBrooker = await db.Brooker.findById(req.params.brooker_id);
        // Add Account id to the Array of client list
        foundBrooker.account_list.push(account.id);
        // Save Brooker
        await foundBrooker.save();

        let foundAccount = await db.Account.findById(account._id);
        await foundAccount.populate(
            {path: 'strategy',
            select: 'consecutive_loss max_loss max_win risk'
        }
            ).execPopulate()
        
        await foundAccount.save()

        // Find Strategy and add this user to the strategy user list 
        let foundStrategy = await db.Strategy.findById(strategy_id)
        foundStrategy.strategy_users.push(account.id)
        await foundStrategy.save()
        await foundProfile.populate(
            {path: 'accounts'
        }).execPopulate()

        return res.status(201).json({ profile: foundProfile.accounts, strategy: foundStrategy})
    } catch (err){
        return next({
            status: 500,
            message: err
        })
    }
}

exports.deposit = async function(req, res, next){
    try {
        let foundAccount = await db.Account.findById(req.params.account_id);
        let balance = Number(foundAccount.balance) + Number(req.body.ammount)
        console.log(typeof(balance))
        foundAccount.balance = balance
        await foundAccount.save();
        let foundProfile = await db.TradingProfile.findById(req.params.profile_id)
        await foundProfile.populate('accounts').execPopulate()

        return res.status(200).json({ total_balance:foundAccount.balance, refresh:foundProfile, res: `Your balance is now ${foundAccount.balance}$`})
    } catch (e){
        return next({
            status: 500,
            message: "Failed to Deposit Account"
        })
    }
}

exports.withdraw = async function(req, res, next){
    try {
        let foundAccount = await db.Account.findById(req.params.account_id);
        let balance = Number(foundAccount.balance) - Number(req.body.ammount)
        console.log(typeof(balance))
        foundAccount.balance = balance
        await foundAccount.save();
        let foundProfile = await db.TradingProfile.findById(req.params.profile_id)
        await foundProfile.populate('accounts').execPopulate()

        return res.status(200).json({ total_balance:foundAccount.balance, refresh:foundProfile, res: `Your balance is now ${foundAccount.balance}$`})
    } catch (e){
        return next({
            status: 500,
            message: "Failed to Withdraw Account"
        })
    }
}

exports.remove = async function(req, res, next){
    try {
        let foundAccount = await db.Account.findById(req.params.account_id);
        
        await foundAccount.remove();
        let foundTradingProfile = await db.TradingProfile.findById(req.params.profile_id)
        await foundTradingProfile.populate('accounts').execPopulate()
        return res.status(200).json({list:foundTradingProfile.accounts, res: `${foundAccount.account_name} deleted!`})
    } catch (e){
        return next({
            status: 500,
            message: "Failed to delete Account"
        })
    }
}