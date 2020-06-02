import cors from 'cors';
import express from 'express';
import users from './routes/users';
const app = express();

app.use(cors());
// req.body
app.use(express.json());
app.use('/api/v1', users);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));

