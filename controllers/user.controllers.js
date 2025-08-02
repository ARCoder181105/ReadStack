import bcrypt from 'bcrypt'
import { db } from '../database/db.database.js';
import fetchBookCover from '../utils/fetchCover.utils.js'
import getSummary from '../utils/ai.utils.js'
import { generateToken } from '../utils/jwt.utlis.js'


export const getLogin = (req, res) => {
    res.render('login.ejs')
};

export const getAddBook = (req, res) => {
    res.render('add-book.ejs');
}

export const getSignup = (req, res) => {
    res.render('signup.ejs')
}


export const getHome = async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/');
    }

    try {
        const response = await db.query('SELECT * FROM userBooks WHERE user_id = $1', [req.session.userId]);
        const books = response.rows;
        res.render('index.ejs', { name: req.session.username, books: books });
        // console.table(books);
        // console.status(200);

    } catch (error) {
        console.log(`Internal server error ${error.stack}`);
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken({ id: user.id, username: user.username });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });

        res.redirect('/api/home'); // or wherever your index/home page is
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const signup = async (req, res) => {
    const data = req.body;
    const username = req.body.username;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
    }
    try {
        await db.query('INSERT INTO users (username,email,password) VALUES ($1,$2,$3)', [username, email, hashedPassword]);
        console.log("Credential saved sucessfull");
        res.redirect('/api/login');
    } catch (error) {
        console.log(`Internal server error ${error.stack}`);
    }
};

export const add_book = async (req, res) => {
    // JWT user is available here from middleware
    const bookName = req.body.title;
    const bookAuthor = req.body.author;

    const image = await fetchBookCover(bookName);
    const summary = await getSummary(bookName, bookAuthor);

    try {
        await db.query(
            'INSERT INTO userbooks (bookname, user_id, bookreview, cover_link) VALUES ($1, $2, $3, $4)',
            [bookName, req.user.id, summary, image]
        );
        console.log("Insertion completed");
        res.redirect('/api/home');
    } catch (error) {
        console.error("Internal Server Error", error.stack);
        res.status(500).send("Failed to add book");
    }
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};


export const del = async (req, res) => {
    console.log(req.body);
    const id = parseInt(req.body.bookId);
    try {
        await db.query('DELETE FROM userbooks WHERE book_id = $1', [id]);
        res.redirect('/api/home');
        console.log("Book deleted sucessfully");
    } catch (error) {
        console.log("Internal Server Error", error.stack);
    }
};
