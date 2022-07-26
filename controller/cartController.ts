import { knex } from './../model/mysql'
import { Request, Response } from 'express'
import { getUserFromJwt } from '../model/jwt'
import moment from 'moment-timezone'

export const createCart = async (req: Request, res: Response) => {
  const { productId, amount, totalPrice } = req.body
  const token = req.headers.authorization?.split(' ')[1]
  const id = getUserFromJwt(token!)
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')

  const cartExist = await knex('cart')
    .select()
    .where('userId', id)
    .andWhere('productId', productId)

  if (cartExist.length) {
    knex('cart')
      .where('userId', id)
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
        userId: id,
        productId,
        amount,
        totalPrice,
      })
      .then((result: any) => {
        res.send(result)
      })
  }
}
