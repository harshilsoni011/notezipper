const mongoose = require('mongoose')

module.exports = {
    connectDb: async () => {
        try {
            await mongoose.connect("mongodb://127.0.0.1:27017/notezipper", {})
            console.log("MongoDb connected successfully");

        } catch (error) {
            console.log('error ==> ', error);
        }
    }
}   