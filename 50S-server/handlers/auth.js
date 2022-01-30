const db = require("../models");
const jwt = require("jsonwebtoken");

// sign in function 
exports.signin = async function(req, res, next){
    //finding a user
    try {   
        // find user by email
        let user = await db.User.findOne({
        email: req.body.email
        });
        // get the id and username from the user found
        let { id, username} = user;
        // get the Trading Profile by user id
        let foundTradingProfile = await db.TradingProfile.findOne({user: id})
        // populate infos that will be needed 
        await foundTradingProfile.populate('accounts','account_name balance').execPopulate()
        // populate infos that will be needed 
        await foundTradingProfile.populate('personal_account','account_name id').execPopulate()
        console.log(foundTradingProfile)
        // check if the password is correct
        let isMatch = await user.comparePassword((req.body.password));
        // get the strategies that will be use to populate the platform 
        let strategies = await db.Strategy.find()
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        // once the password is correct 
        if(isMatch) {
            // setup the jwt token 
            let token = jwt.sign({
                id, 
                username
            }, 
                process.env.SECRET_KEY
            );
            // return the token, Trading Profile and stategies array
            return res.status(200).json({
                token,
                foundTradingProfile,
                strategies,
                today
                });
            
        } else {
            // return a feedback if something goes wrong
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
    } catch (e) {
        // return a feedback if somenthing goes wrong
        return next({
                status: 400,
                message: "Invalid Email/Password."
            });
    }
};

exports.signup = async function(req, res, next){
    try {
        // create a user
        // create a token (sigin a token)
        // process.env.SECRET_KEY
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        
        let user = await db.User.create({...req.body, holerite: {month: (today.getMonth() + 1), days:[]}});
        
        oday = mm + '/' + dd + '/' + yyyy;
        console.log(user)

        
        let { id, fName, lName, email, username, password, profileImageUrl} = user 
        let tradingProfile = await db.TradingProfile.create({
            user: id,
            accounts: [],
            withdraw_list: [],
            totalBalance: 0,
            totalProfit: 0,
            total_loss: 0,
            total_win: 0,
            personal_account: null
        })

        let account = await db.Account.create({
            account_name: "Personal Account",
            balance: 0,
            lifes: 0,
            wins: 0,
            losses: 0,
            assertivity: 0,
            withdrawable: {
                status: false,
                withdrawable_amount: 0
            },
            target: 0,
            otc: {
                otc_status: false,
                otc_amount: 0
            },
            trading_profile: tradingProfile.id,
            orders: []
        });

        tradingProfile.personal_account = account
        tradingProfile.accounts.push(account)
        await tradingProfile.save()


        let token = jwt.sign(
            {
                id,
                username, 
                profileImageUrl
            },
            process.env.SECRET_KEY
        );

        let strategies = await db.Strategy.find()
        return res.status(200).json({
            id,
            tradingProfile,
            username,
            token,
            strategies, 
            today
        });

    } catch (err) {
        // if a validation fails!
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};