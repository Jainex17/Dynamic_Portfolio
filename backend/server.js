import app from './app.js';
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