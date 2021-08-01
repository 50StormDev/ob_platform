require('dotenv');
const jwt = require("jsonwebtoken");
const errorLogin = {status: 401, message: "Please log in first"};
const errorUnauthorized = {status: 401, message: "Unauthorized!"};

// make sure the user is logged - Authentication
exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
            if(decoded) {
                return next();
            } else {
                return next(errorMsg);
            }
        })
    } catch (err) {
        return next(errorMsg);
    }
};

exports.ensureCorrectUser = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.SECRET_KEY, function(err, decoded){
            if(decoded && decoded.id === req.params.id){
                return next(errorUnauthorized);
            } else {
                return next(errorUnauthorized);
            }
        })
    } catch (e){
        return next(errorMsg)
    }
}