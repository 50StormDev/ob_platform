const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    tradingProfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TradingProfile'
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    profileImageUrl:{
        type: String
    },
    last_login: {
        type: Date
    }
}); 

userSchema.pre("save", async function(next){
    try {
        if(!this.isModified("password")) {
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try {
        console.log("run method")
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        return next(err);
    }
};

module.exports = mongoose.model("User", userSchema, "users");