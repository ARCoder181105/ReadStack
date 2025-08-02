import express from 'express';
import { getLogin, getSignup, getAddBook, getHome, login, signup, add_book, del, logout, } from '../controllers/user.controllers.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Public Routes
router.get('/login', getLogin);
router.get('/signup', getSignup);
router.post('/login', login);
router.post('/signup', signup);

// Protected Routes (require JWT)
router.get('/add-book', authenticateJWT, getAddBook);
router.get('/home', authenticateJWT, getHome);
router.post('/add-book', authenticateJWT, add_book);
router.post('/delete', authenticateJWT, del);
router.post('/logout', authenticateJWT, logout);

export default router;
