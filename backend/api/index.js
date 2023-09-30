import express from 'express';

const app = express();

// config for env variables
import dotenv from 'dotenv';
dotenv.config({path:".env"});

// routes
import UserRoute from '../routes/UserRoute.js';

app.use('/api/v1', UserRoute);

// app.get('/', (req, res) => res.send('Hello World!'));

export default app;