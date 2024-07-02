const jwt = require('jsonwebtoken');
const User = require('../models/users')
const tokenKey = process.env.jwtToken;

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ").at(1);

        if (!token) {
            return res.sendLogin();
        }

        jwt.verify(token, tokenKey, async (err, data) => {

            const user = await User.findById(data.id).lean();
            if (!user) {
                return res.sendLogin();
            }
            if (err) {
                return res.sendLogin();
            }
            req.user = user
            return next();
        });
    } catch (error) {
        console.log('error ==> ', error);
    }
};

module.exports = verifyToken;