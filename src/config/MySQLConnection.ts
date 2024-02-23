import * as dotenv from 'dotenv'
dotenv.config()

import { DataSource } from "typeorm";
import { User } from "../entity/User.js";

export const MySQLDataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: false,
    entities: [User]
})