const dotenv=require('dotenv').config();

module.exports={
    PORT: process.env.PORT,
    mongoURI: process.env.mongoURI,
    EMAIL_PASS: process.env.EMAIL_PASS,
    EMAIL_ID: process.env.EMAIL_ID,
    JWT_KEY: process.env.JWT_KEY,
}