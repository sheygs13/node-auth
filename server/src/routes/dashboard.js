import express from 'express';
import pool from '../../db/db';
import auth from '../middleware/auth';
const router = express.Router();


router.get('/dashboard', auth, async (req, res) => {
   try {
      // req.user has the payload
      // res.json(req.user); 

     // req.user refers to the _id of the user
     // only send the name to the user
     const user = await pool.query("SELECT name FROM users WHERE _id = $1", [req.user]);
      res.status(200).json(user.rows[0]);

   } catch ({ message }) {
     console.error(message);
     res.status(500).send('server error')
   }
});

export default router;