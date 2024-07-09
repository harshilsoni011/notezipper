const Users = require('../../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const generateToken = async (id, email) => {
    const token = jwt.sign(
        { id, email },
        process.env.jwtToken,
        {
            expiresIn: "2h",
        }
    );
    return token
};

const controllers = {

    register: async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            console.log("🚀 ~ file: controller.js:21 ~ register: ~ name, email, password:", name, email, password)

            if (!email || !password || !name) {
                return res.sendMessage("Please Enter Details ...");
            }

            const isUserExists = await Users.findOne({ email });

            if (isUserExists) {
                return res.sendError("User already exists.");
            }

            const encryptedPassword = await bcrypt.hash(password, 10);

            const user = await Users.create({
                name,
                email: email.toLowerCase(),
                password: encryptedPassword,
                profilePhoto: req.file?.filename || ''
            });


            const token = await generateToken(user._id);
            const userClone = JSON.parse(JSON.stringify(user))
            userClone.token = token;

            res.cookie('jwt', token, {
                httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000,
            });
            console.log("🚀 ~ file: controller.js:51 ~ register: ~ userClone:", userClone)
            return res.sendSuccess(userClone);

        } catch (error) {
            console.log("🚀 ~ file: controller.js:50 ~ register: ~ error:", error)
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        const user = await Users.findOne({ email }).lean();

        if (!user) {
            return res.sendInvalidRequest('Invalid Email or Password');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.sendInvalidRequest('Invalid Credentials');
        }

        user.token = await generateToken(user._id, user.email);

        res.cookie('jwt', user.token, {
            httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000,
        });
        return res.sendSuccess(user);
    },

    logout: async (req, res) => {
        try {
            const { cookies } = req;
            if (!cookies?.jwt) return res.sendSuccess();

            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.sendSuccess();
        } catch (error) {
            console.log("error ==> ", error)
            res.sendSuccess();
        }
    },

};

module.exports = controllers