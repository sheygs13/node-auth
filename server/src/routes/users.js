import express from 'express';
import bcrypt from 'bcrypt';
import generateJwt from '../utils/jwtAuth';
import pool from '../../db/db';
import auth from '../middleware/auth';
const router = express.Router();

router.post('/auth/signup', async (req, res) => {
   try {
      // 1. destructure req.body
      const { name, email, password } = req.body;

      // 2. validate the fields
      if (!name || !email || !password) {
        return res.status(400).send('All fields required');
      }
      // 3. throw error if user exist 
      const user  = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length > 0) return res.status(400).json({ message: 'User already exist' });

      // 4. bcrypt/hash the user password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);

      // 5. enter the new user inside our database
      const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hash]);

      // 6. generate our jwt token
      const { rows } = newUser;
      const token = generateJwt(rows[0]._id);
      res.status(201).json({ token })
      

   } catch ({ message }) {
      console.error(message);
      res.status(500).send('Server error');
   }
});


router.post('/auth/signin', async (req, res) => {
   try {
      // 1. destructure req.body
      const { email, password } = req.body;

      // 2. validate email & password
      if (!email || !password ) return res.status(400).json({ message: 'All fields required' })

      // 3. throw error if user doesn't exists
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
      if (user.rows.length === 0) return res.status(400).json({ message: 'Invalid Email' })

      // 4. check if incoming password is same as db password
      const valid = await bcrypt.compare(password, user.rows[0].password);
      if (!valid) return res.status(400).json({ message: 'Invalid Password' });

      // 5. send jwt token back to user.
      const token = generateJwt(user.rows[0]._id);
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