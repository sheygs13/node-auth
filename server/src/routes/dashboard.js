import express from 'express';
import pool from '../../db/db';
import verifyToken from '../middleware/auth';
const router = express.Router();


router.get('/dashboard', verifyToken, async (req, res) => {
   try {
      // req.user has the payload
      // req.user refers to the _id of the user
      // res.json(req.user); 

     // only send the name to the user
     const user = await pool.query("SELECT name FROM users WHERE _id = $1", [req.user]);
     res.status(200).json(user.rows[0]);

   } catch ({ message }) {
     console.error(message);
     res.status(500).send('server error')
   }
});

export default router;