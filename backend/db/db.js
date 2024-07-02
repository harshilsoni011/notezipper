const mongoose = require('mongoose')

module.exports = {
    connectDb: async () => {
        try {
            await mongoose.connect(process.env.connection, {})
            console.log("MongoDb connected successfully");

        } catch (error) {
            console.log('error ==> ', error);
        }
    }
} 