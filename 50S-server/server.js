const express = require('express');
const cors = require('cors');
const errorHandler = require("./handlers/error")
const app = express();

const authRoutes = require("./routes/auth");
const tradingProfileRoutes = require("./routes/tradingProfileRoute");
const brookerRoutes = require("./routes/brookerRoute");
const accountRoutes = require("./routes/accountRouter");
const dayRouter = require("./routes/dayRouter")
const orderRouter = require("./routes/orderRoutes")

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

// Login/Logout
app.use("/api/auth", authRoutes);
app.use("/admin", brookerRoutes);
app.use("/profile", tradingProfileRoutes );
app.use("/account", accountRoutes);
app.use("/salary", dayRouter)
app.use("/trade", orderRouter)
// Profile (CRUD User info)
// Dashboard (Get all infos)
   // user/:id/
// Trading (Account/Orders)
   // /user/:id/:account_id/ get/update
// Finance  (Accounts) Deposit/Withdraw
   // /user/:id/:account_id/ => get/update
// Account (CRUD) 
   // /user/:id/ => get/add/update/delete


// example of setup a middleware
//app.use("/api/users/:id/trading", loginRequired, ensureCorrectUser, "userRourtes")
//if any of the routes were achive 
app.use(function(req, res, next){
   let err = new Error("Not Found");
   err.status = 404;
   next(err);
});

app.use(errorHandler);

app.listen(PORT, ()=> console.log(`Server running at port ${PORT}`))
