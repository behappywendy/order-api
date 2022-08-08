import express, { Router } from 'express';
import { createOrder, readOrder } from './../controller/orderController';
const router: Router = express.Router();

router.post('/', express.json(), createOrder);

router.get('/', readOrder);

export default router;
