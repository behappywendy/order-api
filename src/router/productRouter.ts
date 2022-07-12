import express, { Router } from 'express'
import {
  createProduct,
  deleteProduct,
  readProduct,
  updateProduct,
} from '../controller/productController'
const router: Router = express.Router()

router.post('/', createProduct)

router.get('/', readProduct)

router.put('/:id', updateProduct)

router.delete('/:id', deleteProduct)

export default router
