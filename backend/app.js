import express from 'express';

const app = express();

// config for env variables
import dotenv from 'dotenv';
dotenv.config({path:".env"});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// import routes
import usersRoute from './routes/usersRoute.js';

app.use('/api/v1', usersRoute);

export default app;

