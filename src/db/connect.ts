import { Connection, ConnectionOptions, createConnection } from "typeorm";
import { ShortCode } from "./shortcode.entity";

export const connection = async(): Promise<Connection> =>{
    const options : ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'dev',
    password: 'dev',
    database: 'test',
    entities: [ShortCode],
    synchronize : true
    }
    return await createConnection(options)
}
