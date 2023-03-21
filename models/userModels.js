const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email adress"],
        unique: [true, "email adress is already taken"],
    },
    password: {
        type: String,
        required: [true, "Please add the user password"],
    }
},
    {
        timestamps: true,
    })
module.exports = mongoose.model("User", usersSchema);