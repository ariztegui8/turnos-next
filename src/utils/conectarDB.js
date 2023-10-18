import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const url = `${connection.connection.host}:${connection.connection.port}`;
        console.log(`MomgoDB Conectado en: ${url}`);
        console.log('nombre base de datos: ',connection.connection.db.databaseName);
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1)
    }
}

export default conectarDB;

// import {connect, connection} from "mongoose";

// const conn = {
//     isConnected: false
// }


// export async function connectDB() {
//     if(conn.isConnected) return;

//     const db = await connect(
//         process.env.MONGO_URI,
//     )
//     console.log(db.connection.db.databaseName);
//     conn.isConnected = db.connections[0].readyState
// }

// connection.on('connected', ()=>{
//     console.log('Mongoose is connected');
// })

// connection.on('error', (err) =>{
//     console.log('Mongoose connection error', err);
// })