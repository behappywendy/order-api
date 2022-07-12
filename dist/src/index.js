"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (0, cors_1.default)(), (req, res) => {
    res.send('123');
});
app.get('/product', (0, cors_1.default)(), (req, res) => {
    res.send('456');
});
// app.use('/product', productRouter)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
