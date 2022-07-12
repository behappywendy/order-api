import express, { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  readProduct,
  readProducts,
  updateProduct,
} from '../controller/productController'
const router: Router = express.Router()

router.post('/', express.json(), createProduct)

router.get('/:id', readProduct)
router.get('/', readProducts)

router.put('/:id', express.json(), updateProduct)

router.delete('/:id', deleteProduct)

export default router
