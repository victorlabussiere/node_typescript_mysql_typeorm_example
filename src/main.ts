import "reflect-metadata"
import 'dotenv'
import cors, { CorsOptions } from 'cors'
import express, { json } from 'express';
import UserRoutes from './routes/UsersRoutes.js';
import { MySQLDataSource } from "./config/MySQLConnection.js";

let usersCorsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}

const app = express();
app.use(json())

MySQLDataSource.initialize()
    .then(() => console.log("Database is connected"))
    .catch(err => console.trace(err))

app.use('/users', cors(usersCorsOptions), UserRoutes)

const PORT = process.env.PORT || 3;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
