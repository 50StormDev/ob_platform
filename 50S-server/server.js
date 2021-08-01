const express = require('express');
const cors = require('cors');
const errorHandler = require("./handlers/error")
const app = express();
const authRoutes = require("./routes/auth");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");
require('dotenv').config();


//instance of server online
// const PORT = process.env.PORT || 5000;

//changing PORT to run locally
const PORT = 5000;

//handling data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //instead of using body-parser

// const dailyRoute = require('./routes/dayRoute');
// const orderRoute = require('./routes/orderRoute');
// const userRoute = require('./routes/userRoute');

// app.use("/day", dailyRoute);
// app.use("/order", orderRoute);
// app.use("/user", userRoute);

app.use("/api/auth", authRoutes);
// example of setup a middleware
app.use("/api/users/:id/trading", loginRequired, ensureCorrectUser, "userRourtes")
//if any of the routes were achive 
app.use(function(req, res, next){
   let err = new Error("Not Found");
   err.status = 404;
   next(err);
});

app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`))
