import { Connection, ConnectionOptions, createConnection } from "typeorm";

import { ShortCode } from "./shortcode.entity";


const connect = async(): Promise<Connection> =>{
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

    // if (process.env.NODE_ENV === 'test') {
    //     options = {
    //       type: 'sqlite',
    //       database: ':memory:',
    //       logging: 'all',
    //       logger: 'advanced-console',
    //       entities: [ShortCode],
    //       synchronize: true,
    //     }
    // }
    
    // if (process.env.NODE_ENV === 'production') {
    //     options = {
    //       type: 'postgres',
    //       url: process.env.DATABASE_URL,
    //       logging: ['error'],
    //       logger: 'simple-console',
    //       entities: [ShortCode],
    //       synchronize: true,
    //     }
    // }

    return await createConnection(options)
}
export {
    connect,
}
