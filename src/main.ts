import "reflect-metadata"
import 'dotenv'
import express, { json } from 'express';
import UserRoutes from './routes/UsersRoutes.js';
import { MySQLDataSource } from "./config/MySQLConnection.js";

const app = express();
app.use(json())

MySQLDataSource.initialize()
    .then(() => console.log("Database is connected"))
    .catch(err => console.trace(err))

app.use('/users', UserRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
