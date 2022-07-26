import express, { Router } from 'express'
import { createCart } from '../controller/cartController'
const router: Router = express.Router()

router.post('/', express.json(), createCart)

export default router
