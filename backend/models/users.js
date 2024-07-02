const mongoose = require("mongoose");
let usersModel = function () {
    const options = {
        collection: "users",
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "updatedOn",
        },
    };
    const UsersSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        name: {
            type: String,
            required: true
        },
        profilePhoto: {
            type: String,
            // default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
            default: ""
        },
        password: {
            type: String,
            required: true
        }
    }, options)

    return mongoose.model("users", UsersSchema);
};

module.exports = usersModel();