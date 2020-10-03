import { Router } from 'express';

import authController from '../controllers/Auth.controller'

const router = Router();

// Auth routes ...

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);
router.get('/logout', authController.logout);
router.get('/hassigned', authController.hassigned);

export default router;