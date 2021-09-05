const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function(req, res, next){
    //finding a user
    try {   
        let user = await db.User.findOne({
        email: req.body.email
        });
        let { id, username} = user;
        let foundTradingProfile = await db.TradingProfile.findOne({user: id})
        await foundTradingProfile.populate('accounts','account_name balance').execPopulate()
        let isMatch = await user.comparePassword((req.body.password));
        if(isMatch) {
            let token = jwt.sign({
                id, 
                username
            }, 
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                token,
                foundTradingProfile
                });
            
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
            // checking if their password matches what was sent to the server 
            // if it all matches 
            // log them in 
    } catch (e) {
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
        console.log({...req.body})
        let user = await db.User.create({...req.body});
        
        let { id, fName, lName, email, username, password, profileImageUrl} = user 
        
        let tradingProfile = await db.TradingProfile.create({
            user: id,
            accounts: [],
            withdraw_list: [],
            totalBalance: 0,
            totalProfit: 0,
            total_loss: 0,
            total_win: 0
            
        })

        let token = jwt.sign(
            {
                id,
                username, 
                profileImageUrl
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            tradingProfile,
            username,
            token
        });

    } catch (err) {
        // if a validation fails!
        if (err.code ===11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
};