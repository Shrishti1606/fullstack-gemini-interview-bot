require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');

console.log("JWT_SECRET:", process.env.JWT_SECRET);
connectDB()

app.listen(3000, () => {
    console.log('server is running on port 3000');
});

