import { Request, Response } from 'express';
import { knex } from '../model/mysql';
import moment from 'moment-timezone';
import { Product } from 'knex/types/tables';
import client from '../model/redis';

const KEY = 'productList';
const expireTime = 60 * 60 * 24;

const loadProduct = async (update: boolean) => {
  const rawData = await client.get(KEY);
  if (!!rawData && !update) return JSON.parse(rawData);

  const result = await knex('product').select('*');
  result.forEach((element: Product) => {
    element.createTime = moment(element.createTime).format(
      'YYYY-MM-DD HH:mm:ss'
    );
    element.updateTime = moment(element.updateTime).format(
      'YYYY-MM-DD HH:mm:ss'
    );
  });

  client.set(KEY, JSON.stringify(result), { EX: expireTime });
  return result;
};

export const createProduct = async (req: Request, res: Response) => {
  const { productName, productPrice, productSales, productStock, note } =
    req.body;
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
  const result = await knex('product').insert({
    createTime: nowTime,
    updateTime: nowTime,
    productName,
    productPrice,
    productSales,
    productStock,
    note,
  });
  await loadProduct(true);
  res.send(result);
};

export const readProduct = (req: Request, res: Response) => {
  const { id } = req.params;
  knex('product')
    .select('*')
    .where('productId', id)
    .then((result: Product[]) => {
      result[0].createTime = moment(result[0].createTime).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      result[0].updateTime = moment(result[0].updateTime).format(
        'YYYY-MM-DD HH:mm:ss'
      );
      res.send(result[0]);
    })
    .catch((error: any) =>
      res.status(500).json({
        message: '無此商品',
      })
    );
};

export const readProducts = (req: Request, res: Response) => {
  knex('product')
    .select('*')
    .then((result: Product[]) => {
      result.forEach((element) => {
        element.createTime = moment(element.createTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
        element.updateTime = moment(element.updateTime).format(
          'YYYY-MM-DD HH:mm:ss'
        );
      });
      res.send(result);
    });
};

export const updateProduct = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { productName, productPrice, productSales, productStock, note } =
    req.body;
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
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
    .catch((error: any) => res.status(500).json(error));
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  await knex('product')
    .where('productId', id)
    .del()
    .then((result: any) =>
      res.status(!!result ? 200 : 404).json({ success: !!result })
    )
    .catch((error: any) => res.status(500).json(error));
};
