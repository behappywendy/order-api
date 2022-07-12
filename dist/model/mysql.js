"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = void 0;
exports.knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'hello_root',
        database: 'order_form',
    },
    pool: { min: 0, max: 7 },
});
