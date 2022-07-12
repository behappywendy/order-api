"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.readProduct = exports.createProduct = void 0;
const mysql_1 = require("../model/mysql");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const createProduct = (req, res) => {
    // const { productName, productPrice, productSales, productStock, note } =
    //   req.body
    // const productName = req.body.productName
    // const note = req.body.note
    const nowTime = moment_timezone_1.default.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
    // knex('product')
    //   .insert({
    //     create_time: nowTime,
    //     update_time: nowTime,
    //     product_name: productName,
    //     // product_price: productPrice,
    //     // product_sales: productSales,
    //     // product_stock: productStock,
    //     note,
    //   })
    //   .then((result: any) => {
    //     res.send(result)
    //   })
    const a = req.body;
    res.send(a);
};
exports.createProduct = createProduct;
const readProduct = (req, res) => {
    (0, mysql_1.knex)('product')
        .select('*')
        .then((result) => {
        res.send(result);
    });
};
exports.readProduct = readProduct;
const updateProduct = (req, res) => {
    res.send('update');
};
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => {
    const { id } = req.params;
    (0, mysql_1.knex)('product').where('product_id', id).del(['product_id', 'product_name']);
};
exports.deleteProduct = deleteProduct;
