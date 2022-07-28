import { knex } from './../model/mysql'
import { Request, Response } from 'express'
import { getUserFromJwt } from '../model/jwt'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment-timezone'

export const createOrder = async (req: Request, res: Response) => {
  const orderId = uuidv4()
  const token = req.headers.authorization?.split(' ')[1]
  const userId = getUserFromJwt(token!)
  const orderList = req.body
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')

  for await (const { productId, amount } of orderList) {
    knex('order')
      .insert({
        createTime: nowTime,
        userId,
        orderId,
        productId,
        amount,
      })
      .then((result: any) => {
        console.log(result)
      })
  }
  res.send(orderId)
}

type GetOrder = {
  orderId: string
  productId: number
  productName: string
  productPrice: number
  amount: number
  createTime: string
}

type Content = {
  productId: number
  productName: string
  productPrice: number
  amount: number
}

type Data = {
  orderId: string
  createTime: string
  content: Content[]
}

export const readOrder = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  const userId = getUserFromJwt(token!)

  knex('order')
    .join('product', 'order.productId', '=', 'product.productId')
    .select(
      'order.orderId',
      'product.productId',
      'product.productName',
      'product.productPrice',
      'order.amount',
      'order.createTime'
    )
    .where('userId', userId)
    .then((result: GetOrder[]) => {
      result.forEach((element: GetOrder) => {
        element.createTime = moment(element.createTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      })

      const test = new Map()
      for (let i = 0; i < result.length; i++) {
        const element = result[i]
        const isSame = test.has(element.createTime)
        if (isSame) {
          test.set(result[i].createTime, [
            ...test.get(result[i].createTime),
            {
              createTime: result[i].createTime,
              productId: result[i].productId,
              productName: result[i].productName,
              productPrice: result[i].productPrice,
              amount: result[i].amount,
            },
          ])
        } else {
          test.set(result[i].createTime, [
            {
              createTime: result[i].createTime,
              productId: result[i].productId,
              productName: result[i].productName,
              productPrice: result[i].productPrice,
              amount: result[i].amount,
            },
          ])
        }
      }
      res.send(Object.fromEntries(test))
    })
}
