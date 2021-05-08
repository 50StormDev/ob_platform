const router = require('express').Router();
let User = require('../models/user');

router.route('/:id').get((req, res) => {
    const id = req.params.id;
    User.findOne({_id:id})
        .then(result => res.json(result))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const balance = req.body.balance;
    console.log(name);
    const newUser = new User({
        name,
        email, 
        username, 
        password,
        balance,
        totalWins: 0
    });

    newUser.save()
    .then(()=>res.json("success added!"))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

// router.route('/update/:id').put((req, res) => {
//     User.find()
//         .then(result => res.json(result))
//         .catch(err => res.status(400).json(`Error: ${err}`));
// });

// router.route('/').get((req, res) => {
//     User.updateOne(

//         .then(result => res.json(result))
//         .catch(err => res.status(400).json(`Error: ${err}`));
// });


module.exports = router;

// app.route("/user")
//   .get(function(req, res){
//     Article.find(function(err, articles){
//       if (err){
//         res.send(err);
//       } else {
//         res.send(articles);
//       }
//     });
//   })

//   .post(function(req, res){
//     const article = new User({
//       username,
//       password
//     });
//     user.save(()=>res.send("successfully added "+req.body.username));
//   })

//   .delete(function(req, res){
//     User.deleteMany({username:"dkajfkd"}, function(err){
//       if(err){
//         res.send(err);
//       } else {
//         res.send("Successfully Deleted all articles")
//       }
//     })
//   });

// app.route("/user/:username")
//   .get(function(req, res){
//     const titleName = req.params.articleTitle;
//     Article.findOne({title: titleName}, function(err, article){
//       if(err){
//         console.log(err);
//       } else {
//         res.send(article);
//       }
//     })
//   })

//   .put(function(req, res){
//     const username = req.params.username;

//     c
//         }
//       }
//     )
//   })
//   .patch(function(req, res){
//     Article.updateOne(
//       {title: req.params.articleTitle},
//       {$set: req.body},
//       function(err){
//         if(err){
//           res.send(err);
//         } else {
//           res.send("Successfully Updated article!");
//         }
//       }
//     )
//   })

//   .delete(function(req, res){
//     Article.deleteOne({title: req.params.articleTitle}, function(err){
//       if(err){
//         res.send(err);
//       } else {
//         res.send("Deleted successfully!")
//       }
//     })
//   })