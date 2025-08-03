import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { db } from './database/db.database.js';
import userRouter from './routes/user.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();

// Connect to DB
db.connect()
  .then(() => (console.log('Connected to PostgreSQL')))
  .catch((err) => console.error('Connection error:', err.stack));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('auth-choice.ejs');
});


app.use('/api', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
