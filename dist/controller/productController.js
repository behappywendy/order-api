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
        createTime: nowTime,
        updateTime: nowTime,
        productName,
        productPrice,
        productSales,
        productStock,
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
        .where('productId', id)
        .then((result) => {
        result[0].createTime = (0, moment_timezone_1.default)(result[0].createTime).format('YYYY-MM-DD HH:mm:ss');
        result[0].updateTime = (0, moment_timezone_1.default)(result[0].updateTime).format('YYYY-MM-DD HH:mm:ss');
        res.send(result);
    });
};
exports.readProduct = readProduct;
const readProducts = (req, res) => {
    (0, mysql_1.knex)('product')
        .select('*')
        .then((result) => {
        result.forEach((element) => {
            element.createTime = (0, moment_timezone_1.default)(element.createTime).format('YYYY-MM-DD HH:mm:ss');
            element.updateTime = (0, moment_timezone_1.default)(element.updateTime).format('YYYY-MM-DD HH:mm:ss');
        });
        res.send(result);
    });
};
exports.readProducts = readProducts;
const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { productName, productPrice, productSales, productStock, note } = req.body;
    const nowTime = moment_timezone_1.default.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
    (0, mysql_1.knex)('product')
        .where('productId', id)
        .update({
        updateTime: nowTime,
        productName,
        productPrice,
        productSales,
        productStock,
        note,
    })
        .then((result) => res.status(!!result ? 200 : 404).json({ success: !!result }))
        .catch((error) => res.status(500).json(error));
};
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, mysql_1.knex)('product')
        .where('productId', id)
        .del()
        .then((result) => res.status(!!result ? 200 : 404).json({ success: !!result }))
        .catch((error) => res.status(500).json(error));
});
exports.deleteProduct = deleteProduct;
