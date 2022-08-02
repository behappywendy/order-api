"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
exports.knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DATABASE,
        port: 3306,
        user: 'root',
        password: 'hello_root',
        database: 'order_form',
    },
    pool: { min: 0, max: 7 },
});
