import { knex } from './../model/mysql'
import { Request, Response } from 'express'
import { getUserFromJwt } from '../model/jwt'
import moment from 'moment-timezone'

export const createCart = async (req: Request, res: Response) => {
  const { productId, amount, totalPrice } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  const userId = getUserFromJwt(token!)
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')

  const cartExist = await knex('cart')
    .select()
    .where('userId', userId)
    .andWhere('productId', productId)

  if (cartExist.length) {
    knex('cart')
      .where('userId', userId)
      .andWhere('productId', productId)
      .update({
        updateTime: nowTime,
        amount,
        totalPrice,
      })
      .then((result: any) => {
        res.status(!!result ? 200 : 404).json({ success: !!result })
      })
  } else {
    knex('cart')
      .insert({
        createTime: nowTime,
        updateTime: nowTime,
        userId,
        productId,
        amount,
        totalPrice,
      })
      .then((result: any) => {
        res.send(result)
      })
  }
}

export const readCart = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  const userId = getUserFromJwt(token!)

  knex('cart')
    .join('product', 'cart.productId', '=', 'product.productId')
    .select(
      'product.productId',
      'product.productName',
      'product.productPrice',
      'cart.amount',
      'cart.totalPrice'
    )
    .where('userId', userId)
    .then((result: any) => {
      res.send(result)
    })
}

export const updateCart = (req: Request, res: Response) => {
  const { id } = req.params
  const token = req.headers.authorization?.split(' ')[1]
  const userId = getUserFromJwt(token!)
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  const { amount, totalPrice } = req.body

  knex('cart')
    .where('userId', userId)
    .andWhere('productId', id)
    .update({
      updateTime: nowTime,
      amount,
      totalPrice,
    })
    .then((result: any) => {
      res.status(!!result ? 200 : 404).json({ success: !!result })
    })
    .catch((error: any) => res.status(500).json(error))
}

export const deleteCart = (req: Request, res: Response) => {
  const { id } = req.params
  const token = req.headers.authorization?.split(' ')[1]
  const userId = getUserFromJwt(token!)

  if (parseInt(id) === 0) {
    knex('cart')
      .where('userId', userId)
      .del()
      .then((result: any) => {
        res.status(!!result ? 200 : 404).json({ success: !!result })
      })
      .catch((error: any) => res.status(500).json(error))
  } else {
    knex('cart')
      .where('userId', userId)
      .andWhere('productId', id)
      .del()
      .then((result: any) => {
        res.status(!!result ? 200 : 404).json({ success: !!result })
      })
      .catch((error: any) => res.status(500).json(error))
  }
}
