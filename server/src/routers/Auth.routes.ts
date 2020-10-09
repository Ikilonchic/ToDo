import { Router } from 'express';

import authController from '../controllers/Auth.controller'

const router = Router();


// Auth routes ...


// POST   **/auth/signup
router.post('/signup', authController.signUp);

// POST   **/auth/signin
router.post('/signin', authController.signIn);

// GET    **/auth/logout
router.get('/logout', authController.logout);

// GET    **/auth/hassigned
router.get('/hassigned', authController.hassigned);

export default router;