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

  if (orderList.length) {
    if (userId) {
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
      res.send({ orderId })
    } else
      res.status(401).json({
        message: '尚未登入',
      })
  } else
    res.status(404).json({
      message: '輸入的資料不是陣列',
    })
}

type GetOrder = {
  orderId: string
  productId: number
  productName: string
  productPrice: number
  amount: number
  createTime: string
}

export const readOrder = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1]
  const userId = getUserFromJwt(token!)

  if (userId) {
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

        const map = new Map()
        for (let i = 0; i < result.length; i++) {
          const element = result[i]
          const isSame = map.has(element.orderId)
          if (isSame) {
            map.set(result[i].orderId, [
              ...map.get(result[i].orderId),
              {
                createTime: result[i].createTime,
                productId: result[i].productId,
                productName: result[i].productName,
                productPrice: result[i].productPrice,
                amount: result[i].amount,
              },
            ])
          } else {
            map.set(result[i].orderId, [
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
        res.send(Object.fromEntries(map))
      })
  } else
    res.status(401).json({
      message: '尚未登入',
    })
}
