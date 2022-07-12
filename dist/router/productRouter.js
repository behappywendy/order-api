"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const router = express_1.default.Router();
router.post('/', express_1.default.json(), productController_1.createProduct);
router.get('/:id', productController_1.readProduct);
router.get('/', productController_1.readProducts);
router.put('/:id', express_1.default.json(), productController_1.updateProduct);
router.delete('/:id', productController_1.deleteProduct);
exports.default = router;
