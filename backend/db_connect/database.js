import { connect } from 'mongoose';

const dbConnect = async () => {
    try {
        await connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        })
        .then((data)=>{
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default dbConnect;