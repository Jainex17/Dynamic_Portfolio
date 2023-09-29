import express from 'express';

const app = express();

// config for env variables
import dotenv from 'dotenv';
dotenv.config({path:".env"});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/hello', (req, res) => {
    res.send('Hello hello World!');
});


export default app;
