import { Router } from 'express';
const router = Router();

import { signupUser, signinUser } from '../controllers/UserControllers.js';


router.route('/').get((req, res) => {
    res.send('Hello World!');
});

router.route('/signup').post(signupUser);

router.route('/signin').post(signinUser);

export default router;