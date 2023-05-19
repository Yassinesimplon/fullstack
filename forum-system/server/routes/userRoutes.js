// Routeur - userRouter.js
import express from 'express';
import { register, login } from '../controllers/UserControler.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
