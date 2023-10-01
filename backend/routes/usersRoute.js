import { Router } from 'express';
const router = Router();

import { signupUser, signinUser, verifyUser, logoutUser } from '../controllers/UserControllers.js';
import {isAuthenticatedUser} from '../middleware/Auth.js';

router.route('/').get((req, res) => {
    res.send('Hello World!');
});

router.route('/signup').post(signupUser);

router.route('/signin').post(signinUser);

router.route('/verifyuser').get(isAuthenticatedUser,verifyUser);
router.route('/logout').get(isAuthenticatedUser,logoutUser);

export default router;