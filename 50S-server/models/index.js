const mongoose = require("mongoose");
require('dotenv').config();
mongoose.set("debug", true);
mongoose.Promise = Promise;

//mongodb deprecated
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect to mongo Atlasc
const uri = process.env.ATLAS_URI;


//connect to Database online
//mongoose.connect(uri);

//connect to Database locally
mongoose.connect('mongodb://localhost:27017/OB_Platform');

//callback to check Database connection
// let mongo = "";
// const connection = mongoose.connection;
// connection.once('open', () =>
//    mongo='MongoDb database conncetion established successfully!'
// );

// export all modules
module.exports.User = require("./user");
module.exports.TradingProfile = require("./trading_profile");
module.exports.Brooker = require("./brooker");
module.exports.Account = require("./account");
mocule.exports.Order = require("./order.");