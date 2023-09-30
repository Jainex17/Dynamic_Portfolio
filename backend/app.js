import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// config for env variables
import dotenv from 'dotenv';
dotenv.config({path:".env"});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionSuccessStatus:200,
}));

// import routes
import usersRoute from './routes/usersRoute.js';

app.use('/api/v1', usersRoute);

export default app;