import 'dotenv/config';
import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    // 1. get token from the header
    const token = req.header('x-auth-token');

    // 2. if no token, return 401
    if (!token) return res.status(401).send('Unauthorized. please provide a token');

   try {
      // verify the token
      const decoded = jwt.verify(token, process.env.jwtSecret);
      req.user = decoded;
      next(); 
      
   } catch ({ message }) {
     console.error(message);
     res.status(400).send('Invalid token');
   }
};

export default auth;