const { compareSync } = require('bcrypt');
const db = require('../models');

// http://localhost:5000/salary/:user_id/out
// body {workShift, entry}
exports.entry =  async function(req, res, next){
    try {

        // find the user by param passed in request
        let foundUser = await db.User.findById(req.params.user_id);
        // if user exist then continue, otherwise trow an Error
        console.log(foundUser)
        if(foundUser){
            // Create an Order
            let today = new Date()
            let day = today.getDate()
            let add = true
            foundUser.holerite.forEach(item => {
              if(item.month === (today.getMonth() + 1)){
                item.days.forEach(date => {
                  if(date.day === day){
                    add = false
                  }
                })
              } 
            })
            if(add){
            let workDay = await db.Day.create({
                day: day,
                shift: req.body.workShift,
                entry_time: req.body.entry,
                overtime: 0,
                out_time: "15:20"
            })

            foundUser.holerite.forEach(item => {
              if(item.month === 1){
                item.days.push({day: Number(day), day_id: workDay.id})
                console.log("worked")
              }
            })
            await foundUser.save()
            res.status(200).json({day_id:workDay.id})}
        } else {
            throw Error("Account not found!")
        }

        
        
    } catch(err) {
        return next({
            status: 500, 
            message: err
        })
    }
}

// http://localhost:5000/salary/:user_id/out
// body {overtime, out_time}
exports.out =  async function(req, res, next){
  try {
    // Find the user 
    let foundUser = await db.User.findById(req.params.user_id)
    // If user is found it than
    console.log(foundUser)
    if(foundUser){
      let today = new Date()
      let day_id = ""
      // check if the holerite array has the entry day 
      foundUser.holerite.forEach(item => {
        if(item.month === (today.getMonth() + 1)){
          item.days.forEach(date => {
            if(date.day === today.getDate()){
              
              day_id = date.day_id
              console.log(day_id)
            }
          })
        }
        
      })
      // get the day id and update the Day collection
      let outDay = await db.Day.findById(day_id)
      let {day, shift, entry_time}  = outDay
      await db.Day.findByIdAndUpdate(day_id, {
        day: day,
        shift: shift,
        entry_time: entry_time,
        overtime: req.body.overtime,
        out_time: req.body.out_time
      }, function(err, result){
        if(err){
            res.send(err)
        }
        else{
            res.status(200).json(result)
        }
      }) 
    } else {
      throw Error("User not Found")
    }
  } catch(err) {
    return next({
      status: 500, 
      message: "Failed to place order"
    })
  }
}

