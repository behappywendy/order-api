import { Request, Response } from 'express'
import { knex } from '../model/mysql'
import moment from 'moment-timezone'
import { Product } from 'knex/types/tables'

export const createProduct = (req: Request, res: Response) => {
  // const { productName, productPrice, productSales, productStock, note } =
  //   req.body
  // const productName = req.body.productName
  // const note = req.body.note
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  // knex('product')
  //   .insert({
  //     create_time: nowTime,
  //     update_time: nowTime,
  //     product_name: productName,
  //     // product_price: productPrice,
  //     // product_sales: productSales,
  //     // product_stock: productStock,
  //     note,
  //   })
  //   .then((result: any) => {
  //     res.send(result)
  //   })
  const a = req.body
  res.send(a)
}

export const readProduct = (req: Request, res: Response) => {
  knex('product')
    .select('*')
    .then((result: Product) => {
      res.send(result)
    })
}

export const updateProduct = (req: Request, res: Response) => {
  res.send('update')
}

export const deleteProduct = (req: Request, res: Response) => {
  const { id } = req.params
  knex('product').where('product_id', id).del(['product_id', 'product_name'])
}
