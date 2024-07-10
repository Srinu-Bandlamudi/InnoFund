const mongoose=require('mongoose');

const {mongoURI}=require('./serverConfig');

const connect=async()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.log('MOngoDB connection error',error);
    }
}

module.exports={connect};