import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// config for env variables
import dotenv from 'dotenv';
dotenv.config({path:".env"});

app.use(cors({
    origin: 'https://jainex17.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// import routes
import usersRoute from './routes/usersRoute.js';

app.use('/api/v1', usersRoute);

app.get('/', (req, res) => {
    res.send('working....');
});

import dbConnect from './db_connect/database.js';

const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});   

// unhandle err
process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
});
