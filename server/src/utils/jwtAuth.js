import 'dotenv/config';
import jwt from 'jsonwebtoken';

function generateJwt(_id){
  const payload = {
     user: _id
  }

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: 60 * 60 })
}

export default generateJwt;