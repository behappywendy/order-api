import express, { Router } from 'express'
import {
  createUser,
  userLogin,
  readUser,
  readUsers,
  updateUser,
  deleteUser,
  verifyUser,
} from '../controller/userController'
const router: Router = express.Router()

router.post('/', express.json(), createUser)

router.post('/login', express.json(), userLogin)

router.get('/:id', readUser)
router.get('/', readUsers)

router.put('/:id', express.json(), updateUser)

router.delete('/:id', deleteUser)

router.post('/verify', express.json(), verifyUser)

export default router
