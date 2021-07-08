const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//instance of server
const app = express();
const port = process.env.PORT || 5000;

//connect to mongo Atlas
const uri = process.env.ATLAS_URI;

//handling data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongodb deprecated
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


//connect to Database
mongoose.connect(uri);

//callback to check Database connection
let mongo = "";
const connection = mongoose.connection;
connection.once('open', () =>
   mongo='MongoDb database conncetion established successfully!'
);

const dailyRoute = require('./routes/dayRoute');
const orderRoute = require('./routes/orderRoute');
const userRoute = require('./routes/userRoute');

app.use("/day", dailyRoute);
app.use("/order", orderRoute);
app.use("/user", userRoute);

app.listen(port, ()=> console.log(`Server running at port ${port}`))
