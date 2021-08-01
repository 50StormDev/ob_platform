const db = require("../models");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

exports.signin = async function(req, res, next){
    //finding a user
    try {   
        let user = await db.User.findOne({
        email: req.body.email
        });
        let { id, username} = user;
        let isMatch = await user.comparePassword((req.body.password));
        if(isMatch) {
            let token = jwt.sign({
                id, 
                username
            }, 
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id, 
                username,
                token
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
        let u_id = uuidv4();
        console.log({...req.body, u_id})
        let user = await db.User.create({...req.body, u_id});
        
        let { id, fName, lName, email, username, password, profileImageUrl} = user 
        
        let token = jwt.sign(
            {
                u_id,
                username, 
                profileImageUrl
            },
            process.env.SECRET_KEY
        );
        return res.status(200).json({
            u_id,
            id,
            username, 
            profileImageUrl,
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