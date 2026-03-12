require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')

/*require all routes*/ 
const authRouter = require('./routes/auth.routes')

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api/auth', authRouter);



module.exports = app;