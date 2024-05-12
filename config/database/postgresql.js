import knex from "knex";
import dotenv from 'dotenv';
const environment = process.env.NODE_ENV || 'dev'

dotenv.config({
    path: `config/environment/.env.${environment}`
});
const config = {
    prod: {
        client: 'postgresql',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'nux_migrations',
            extension: 'cjs'
        }
    },
    test: {
        client: 'postgresql',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'nux_migrations',
            extension: 'cjs'
        }
    },
    dev: {
        client: 'postgresql',
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'nux_migrations',
            extension: 'cjs'
        }
    }
}

export default config[`${environment}`];
export const db = knex(config[`${environment}`]);