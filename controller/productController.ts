import { Request, Response } from 'express'
import { knex } from '../model/mysql'
import moment from 'moment-timezone'
import { Product } from 'knex/types/tables'

export const createProduct = (req: Request, res: Response) => {
  const { productName, productPrice, productSales, productStock, note } =
    req.body
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  knex('product')
    .insert({
      createTime: nowTime,
      updateTime: nowTime,
      productName,
      productPrice,
      productSales,
      productStock,
      note,
    })
    .then((result: any) => {
      res.send(result)
    })
}

export const readProduct = (req: Request, res: Response) => {
  const { id } = req.params
  knex('product')
    .select('*')
    .where('productId', id)
    .then((result: Product[]) => {
      result[0].createTime = moment(result[0].createTime).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      result[0].updateTime = moment(result[0].updateTime).format(
        'YYYY-MM-DD HH:mm:ss'
      )
      res.send(result)
    })
}

export const readProducts = (req: Request, res: Response) => {
  knex('product')
    .select('*')
    .then((result: Product[]) => {
      result.forEach((element) => {
        element.createTime = moment(element.createTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        element.updateTime = moment(element.updateTime).format(
          'YYYY-MM-DD HH:mm:ss'
        )
      })
      res.send(result)
    })
}

export const updateProduct = (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { productName, productPrice, productSales, productStock, note } =
    req.body
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  knex('product')
    .where('productId', id)
    .update({
      updateTime: nowTime,
      productName,
      productPrice,
      productSales,
      productStock,
      note,
    })
    .then((result: any) =>
      res.status(!!result ? 200 : 404).json({ success: !!result })
    )
    .catch((error: any) => res.status(500).json(error))
  // res.send('update success')
  // res.send({ id, ...req.body })
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  await knex('product').where('productId', id).del()
  res.send('delete success')
}
