import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

export class SequelizeService {
    static #userInstance;
    static #managerInstance;
    
    static getUserInstance() {
        if (!SequelizeService.#userInstance) {
            SequelizeService.#userInstance = new Sequelize(
                process.env.PG_DB,
                process.env.PG_USER,
                process.env.PG_USER_PASSWORD,
                {
                    host: process.env.PG_HOST,
                    port: process.env.PG_PORT,
                    dialect: 'postgres',
                    schema: process.env.PG_SCHEMA
                }
            )
        }
        return SequelizeService.#userInstance;
    }

    static getManagerInstance() {
        if (!SequelizeService.#managerInstance) {
            SequelizeService.#managerInstance = new Sequelize(
                process.env.PG_DB,
                process.env.PG_MANAGER,
                process.env.PG_MANAGER_PASSWORD,
                {
                    host: process.env.PG_HOST,
                    port: process.env.PG_PORT,
                    dialect: 'postgres',
                    schema: process.env.PG_SCHEMA
                }
            )
        }
        return SequelizeService.#managerInstance;
    }
}