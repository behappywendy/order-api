"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.readProducts = exports.readProduct = exports.createProduct = void 0;
const mysql_1 = require("../model/mysql");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const createProduct = (req, res) => {
    const { productName, productPrice, productSales, productStock, note } = req.body;
    const nowTime = moment_timezone_1.default.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
    (0, mysql_1.knex)('product')
        .insert({
        create_time: nowTime,
        update_time: nowTime,
        product_name: productName,
        product_price: productPrice,
        product_sales: productSales,
        product_stock: productStock,
        note,
    })
        .then((result) => {
        res.send(result);
    });
};
exports.createProduct = createProduct;
const readProduct = (req, res) => {
    const { id } = req.params;
    (0, mysql_1.knex)('product')
        .select('*')
        .where('product_id', id)
        .then((result) => {
        res.send(result);
    });
};
exports.readProduct = readProduct;
const readProducts = (req, res) => {
    (0, mysql_1.knex)('product')
        .select('*')
        .then((result) => {
        res.send(result);
    });
};
exports.readProducts = readProducts;
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { productName, productPrice, productSales, productStock, note } = req.body;
    const nowTime = moment_timezone_1.default.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
    (0, mysql_1.knex)('product').where('product_id', id).update({
        update_time: nowTime,
        product_name: productName,
        product_price: productPrice,
        product_sales: productSales,
        product_stock: productStock,
        note,
    });
    res.send('update success');
};
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, mysql_1.knex)('product').where('product_id', id).del();
    res.send('delete success');
});
exports.deleteProduct = deleteProduct;
