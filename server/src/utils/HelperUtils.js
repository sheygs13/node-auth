import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

class HelperUtils {
   static validate() {
      return {
        name: /^[a-zA-Z]{3,50}$/,
        email: /\S+@\S+\.\S+/,
        password: /\w{3,50}/
      }
   }

   static generateToken(_id) {
      const payload = {
        user: _id
      }
     return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 60 * 60 })
   }

   static verifyToken(token) {}

   static hashPassword(password, salt) {
       return bcrypt.hash(password, salt);
   }

   static comparePassword(password, hash) {
      return bcrypt.compare(password, hash);  
   }
}


export default HelperUtils;


