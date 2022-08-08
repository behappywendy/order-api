import express, { Router } from 'express';
import {
  createCart,
  readCart,
  updateCart,
  deleteCart,
} from '../controller/cartController';
const router: Router = express.Router();

router.post('/', express.json(), createCart);

router.get('/', readCart);

router.put('/:id', express.json(), updateCart);

router.delete('/:id', deleteCart);

export default router;
