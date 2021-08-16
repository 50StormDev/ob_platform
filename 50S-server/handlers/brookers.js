const db = require('../models');

// get all account
exports.get = async function(req, res, next){

}

exports.add = async function(req, res, next){
    try {
        if(req.params.password === "access"){
            let foundBrooker = await db.Brooker.findOne({name: req.body.name})
            if(!foundBrooker){
                let brooker = await db.Brooker.create({
                    name: req.body.name
                });
                let {name} = brooker;

                return res.status(200).json({
                    result: "success"
                });
            } else {
                return next({
                    status: 503,
                    message: "Brooker already added"
                })
            }
        } else {
            next({
                status: 501,
                message: "access denied"
            })
        }
    } catch (e) {
        return next({
            status: 500,
            message: "access denied!"
        })
    }
}

exports.update = async function(req, res, next){
    
}

exports.remove = async function(req, res, next){
    
}