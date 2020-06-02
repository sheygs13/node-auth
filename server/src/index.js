import cors from 'cors';
import express from 'express';
import users from './routes/users';
import dashboard from './routes/dashboard';
const app = express();

app.use(cors());

// req.body
app.use(express.json());

// signin and signup routes
app.use('/api/v1', users);

// dashboard
app.use('/api/v1', dashboard)

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Listening on port ${port}`));

