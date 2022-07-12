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
      create_time: nowTime,
      update_time: nowTime,
      product_name: productName,
      product_price: productPrice,
      product_sales: productSales,
      product_stock: productStock,
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
    .where('product_id', id)
    .then((result: Product) => {
      res.send(result)
    })
}

export const readProducts = (req: Request, res: Response) => {
  knex('product')
    .select('*')
    .then((result: Product) => {
      res.send(result)
    })
}

export const updateProduct = (req: Request, res: Response) => {
  const { id } = req.params
  const { productName, productPrice, productSales, productStock, note } =
    req.body
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss')
  knex('product').where('product_id', id).update({
    update_time: nowTime,
    product_name: productName,
    product_price: productPrice,
    product_sales: productSales,
    product_stock: productStock,
    note,
  })
  res.send('update success')
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params
  await knex('product').where('product_id', id).del()
  res.send('delete success')
}
