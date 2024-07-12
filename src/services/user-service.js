const { UserRepository } = require('../repository/index');
const { sendVerificationEmail } = require('../utils/sendmail');
const jwt=require('jsonwebtoken');
const{JWT_KEY}=require('../config/serverConfig');
const ValidationError = require('../utils/errors/validation-error');
const AppErrors = require('../utils/errors/error-handler');
const ClientError = require('../utils/errors/client-error');
const {StatusCodes}=require('http-status-codes');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

 

    async signup(data) {
        try {
                const newUser = await this.userRepository.create(data);
                const verificationToken = newUser.genJWT();
                
        } catch (error) {
           
            throw error;
           
        }
    }
  

  async verifyUser(token) {
    try {
      const decoded = jwt.verify(token, JWT_KEY);
      const user = await this.userRepository.get(decoded._id);
      if (!user) throw new Error("User not found");

      if (user.isVerified) {
        throw new Error("User already verified");
      }
      user.isVerified = true;
      await user.save();
      return user;
    } catch (error) {
      if (error.message == "User already verified") {
        throw new Error("User already verified");
      }
      if (error.name === "TokenExpiredError") {
        throw new Error("Token has expired");
      } else {
        throw new Error("Invalid token");
      }
    }
  }

  async signin(data) {
    try {
      const user = await this.getUserByEmail(data.email);
      if (!user) {
        throw { message: "No user found" };
      }
      if (!user.comparePassword(data.password)) {
        throw { message: "Wrong password" };
      }
      const token = user.genJWT();
      return token;
    } catch (error) {
      throw error;
    }
  }
  async sendResetLink(email) {
    try {
      const isExists = await this.getUserByEmail(email);
      
        const flag = "link";
        const token = isExists.genJWT();
        await sendVerificationEmail(email, token, flag);
        return { message: "Password Reset link sent to your email" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getUserByEmail(email){
    try {
      const user=await this.userRepository.findBy({email});
      return user;
      
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(token, new_password) {
    try {
      const decoded = jwt.verify(token, JWT_KEY);
      const user = await this.userRepository.get(decoded._id);
      if (!user) throw new Error("User not found");
      user.password = new_password;
      await user.save();
      return user;
    } catch (error) {
      // if(error.message=='User already verified'){
      //     throw new Error('User already verified');
      // }
      // if (error.name === 'TokenExpiredError') {
      //     throw new Error('Token has expired');
      // } else {
      //     throw new Error('Invalid token');
      // }
      throw error;
    }
  }
}

module.exports = UserService;
