require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database')
// const { resume, selfDescription, jobDescription } = require("./src/services/temp")
// const generateInterviewReport = require("./src/services/ai.service");  

connectDB()

// generateInterviewReport({ resume, selfDescription, jobDescription })

app.listen(3000, () => {
    console.log('server is running on port 3000');
});

