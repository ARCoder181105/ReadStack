// import express from 'express';
// import morgan from 'morgan';
// // import pg from 'pg';
// // import axios from 'axios';
// // import { GoogleGenAI } from "@google/genai";
// import path from 'path';
// import { fileURLToPath } from 'url';
// // import bcrypt from 'bcrypt'
// import session from 'express-session';
// import { db } from './database/db.database';
// import dotenv from 'dotenv';
// dotenv.config();
// // import user.

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const port = 3000;
// const app = express();
// // const API_KEY = process.env.GEMINI_API_KEY;
// // const ai = new GoogleGenAI({ API_KEY });

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false,
//     maxAge: 1000 * 60 * 60 * 24
//   }
// }));

// // const db = new pg.Client({
// //   connectionString: process.env.DATABASE_URL,
// //   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
// // });

// db.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch((err) => console.error('Connection error:', err.stack));


// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// app.use('/api',)
// // let bookName = "";
// // let bookAuthor = "";
// // let currentUserId = null;

// // async function getSummary(bookName, bookAuthor) {
// //   const response = await ai.models.generateContent({
// //     model: "gemini-2.5-flash",
// //     contents: `You are a great book reader. You had read all the books published till today,if someone asks you to tell them how the book it is you will tell the breif cruks of the book in 30 words in a simple language. Know tell me about ${bookName} by ${bookAuthor}.Also mention the name of the author at the end mention like written by.`,
// //     config: {
// //       thinkingConfig: {
// //         thinkingBudget: 0,
// //       },
// //     }
// //   });
// //   return response.text;
// //   // console.log(response.text);
// // }




// // async function fetchBookCover(title) {
// //   try {
// //     const response = await axios.get('https://openlibrary.org/search.json', {
// //       params: { title }
// //     });

// //     const data = response.data;

// //     if (data.docs && data.docs[0]?.cover_i) {
// //       const coverId = data.docs[0].cover_i;
// //       return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
// //     } else {
// //       return 'https://via.placeholder.com/150?text=No+Cover';
// //     }

// //   } catch (error) {
// //     console.error("Error fetching book cover:", error);
// //     return 'https://via.placeholder.com/150?text=No+Found';
// //   }
// // }

// app.get('/', (req, res) => {
//   res.render('auth-choice.ejs');
// });

// // app.get('/api/login', (req, res) => {
// //   res.render('login.ejs')
// // })

// // app.get('/api/add-book', (req, res) => {
// //   res.render('add-book.ejs');
// // })

// // app.get('/api/signup', (req, res) => {
// //   res.render('signup.ejs')
// // })

// // app.get('/api/home', async (req, res) => {
// //   if (!req.session.userId) {
// //     return res.redirect('/');
// //   }

// //   try {
// //     const response = await db.query('SELECT * FROM userBooks WHERE user_id = $1', [req.session.userId]);
// //     const books = response.rows;
// //     res.render('index.ejs', { name: req.session.username, books: books });
// //     // console.table(books);
// //     // console.status(200);

// //   } catch (error) {
// //     console.log(`Internal server error ${error.stack}`);
// //   }
// // });

// // app.post('/api/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

// //     if (result.rows.length === 0) {
// //       return res.status(401).json({ error: 'Invalid credentials' }).redirect('/login');
// //     }

// //     const user = result.rows[0];

// //     const isMatch = await bcrypt.compare(password, user.password);

// //     if (!isMatch) {
// //       return res.status(401).json({ error: 'Invalid credentials' });
// //     }


// //     req.session.userId = user.id;
// //     req.session.username = user.username;

// //     res.redirect('/home')

// //   } catch (err) {
// //     console.error('Login error:', err);
// //     res.status(500).json({ error: 'Internal server error' }).redirect('/');
// //   }
// // })



// // app.post('/api/signup', async (req, res) => {
// //   const data = req.body;
// //   const username = req.body.username;
// //   const email = req.body.email.toLowerCase();
// //   const password = req.body.password;
// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

// //   if (existingUser.rows.length > 0) {
// //     return res.status(400).json({ error: "Email already exists" });
// //   }
// //   try {
// //     await db.query('INSERT INTO users (username,email,password) VALUES ($1,$2,$3)', [username, email, hashedPassword]);
// //     console.log("Credential saved sucessfull");
// //     res.redirect('/login');
// //   } catch (error) {
// //     console.log(`Internal server error ${error.stack}`);
// //   }
// // });




// // app.post('/api/logout', (req, res) => {
// //   req.session.destroy((err) => {
// //     if (err) {
// //       console.error("Logout error:", err);
// //       return res.status(500).send("Could not log out");
// //     }
// //     res.redirect('/');
// //   });
// // })

// // app.post('/api/delete', async (req, res) => {
// //   console.log(req.body);
// //   const id = parseInt(req.body.bookId);
// //   try {
// //     await db.query('DELETE FROM userbooks WHERE book_id = $1', [id]);
// //     res.redirect('/index.ejs');
// //     console.log("Book deleted sucessfully");
// //   } catch (error) {
// //     console.log("Internal Server Error", error.stack);
// //   }
// // })


// // app.post('/api/add-book', async (req, res) => {
// //   if (!req.session.userId) return res.redirect('/login');
// //   bookName = req.body.title;
// //   bookAuthor = req.body.author;

// //   const image = await fetchBookCover(bookName);
// //   const summary = await getSummary(bookName, bookAuthor)

// //   try {
// //     await db.query('INSERT INTO userbooks (bookname,user_id,bookreview,cover_link) VALUES ($1,$2,$3,$4)', [bookName, req.session.userId, summary, image]);
// //     console.log("Inertion completed");
// //     res.redirect('/index.ejs');
// //   } catch (error) {
// //     console.log("Internal Server Error", error.stack);
// //     res.status(500).send("Failed to add book");
// //   }
// // });



// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


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
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Connection error:', err.stack));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // in case you also accept JSON
app.use(cookieParser()); // for reading JWT from cookies
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
