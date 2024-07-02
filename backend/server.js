require('custom-env').env()
const express = require('express');
const { connectDb } = require('./db/db')
const expressCustomFunctions = require('.././backend/common/express-custom-function');
const cors = require('cors')
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const session = require('express-session');
expressCustomFunctions(express);

const cookie = {
    secret: process.env.COOKIE_NAME,
    key: process.env.COOKIE_SECRET_KEY,
}

const sessionObject = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    maxAge: 2592000000,
}

connectDb()
const app = express();

app.use(cookieSession(cookie));
// express session
app.use(session(sessionObject));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use('/users', require('./routes/users'))
app.use('/', require('./routes/notes'))

const port = process.env.PORT || 3002;
app.listen(port, console.log(`server started on port ${port}`))