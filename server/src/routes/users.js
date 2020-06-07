import express from 'express';
import bcrypt from 'bcrypt';
import HelperUtils from '../utils/HelperUtils';
import pool from '../../db/db';
import auth from '../middleware/auth';
const router = express.Router();

router.post('/auth/signup', async (req, res) => {
   try {

      if (!req.body.name && !req.body.email && !req.body.password) return res.status(400).json({ "message": "name, email, and password fields required." })

      const { name, email, password } = req.body;  
      const validate =  HelperUtils.validate();

      let error;
      if (!name || !validate.name.test(name)){
         error = 'Name must be ONLY alphabets and at least 3 characters.';
      }
      else if (!email || !validate.email.test(email)){
         error = 'Provide an email or check if the email is valid';
      }
      else if (!password || !validate.password.test(password)){
         error = 'Provide a password or password must be at least 3 characters.';
      } 

      if (error) {
         return res.status(400).json({"message": error})
      }
 
      const user  = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length > 0) return res.status(400).json({ message: 'User already exist' });

      const salt = await bcrypt.genSalt(10);
      const hash = await HelperUtils.hashPassword(password, salt);

      const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hash]);
      const { rows } = newUser;

      const token = HelperUtils.generateToken(rows[0]._id);
      res.status(201).json({ token })
      
   } catch ({ message }) {
      console.error(message);
      res.status(500).send('Server error');
   }
});


router.post('/auth/signin', async (req, res) => {
   try {

      if (!req.body.email && !req.body.password) return res.status(400).json({ "message": "email and password fields required." })

      const { email, password } = req.body;
      const validate = HelperUtils.validate();

      let error;
      if (!email || !validate.email.test(email)){
         error = 'Provide an email or check if the email is valid'
      }
      else if (!password || !validate.password.test(password)){
         error = 'Provide a password or password must be at least 3 characters.'
      }
    
      if (error){
         return res.status(400).json({ "message": error })
      }

      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length === 0) return res.status(400).json({ message: 'Invalid Email - User does not exist.' })

      const valid = await HelperUtils.comparePassword(password, user.rows[0].password);
      if (!valid) return res.status(400).json({ message: 'Invalid Password' });

      const token = HelperUtils.generateToken(user.rows[0]._id);
      res.status(200).json({ token });

   } catch ({ message }) {
      console.error(message);
      res.status(500).send('Server error');
   }
});


// route to do a  quick check of the validity of the token
// if false, the 'auth' route catches the error
router.get('/verify', auth, (req, res) => {
   try {
      res.json(true);
   } catch ({ message}) {
      console.error(message);
      res.status(500).send('server error')
   } 
});


export default router;