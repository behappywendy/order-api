"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const userRouter_1 = __importDefault(require("./router/userRouter"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (0, cors_1.default)(), (req, res) => {
    res.send('123');
});
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
app.use('/product', productRouter_1.default);
app.use('/user', userRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
