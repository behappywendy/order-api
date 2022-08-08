import { knex } from './../model/mysql';
import { Request, Response } from 'express';
import { getUserFromJwt } from '../model/jwt';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment-timezone';
import client from '../model/redis';

const KEY = 'orderList';
const expireTime = 60 * 60 * 24;

type GetOrder = {
  orderId: string;
  productId: number;
  productName: string;
  productPrice: number;
  amount: number;
  createTime: string;
};

const loadOrder = async (update: boolean, userId: number) => {
  const oldData = await client.get(`user_${userId}_${KEY}`);
  if (!!oldData && !update) return JSON.parse(oldData);

  const result = await knex('order')
    .join('product', 'order.productId', '=', 'product.productId')
    .select(
      'order.orderId',
      'product.productId',
      'product.productName',
      'product.productPrice',
      'order.amount',
      'order.createTime',
    )
    .where('userId', userId);

  result.forEach((element: GetOrder) => {
    element.createTime = moment(element.createTime).format(
      'YYYY-MM-DD HH:mm:ss',
    );
  });

  const data = [
    {
      orderId: result[0].orderId,
      content: [
        {
          productId: result[0].productId,
          productName: result[0].productName,
          productPrice: result[0].productPrice,
          amount: result[0].amount,
          createTime: result[0].createTime,
        },
      ],
    },
  ];

  for (let i = 1; i < result.length; i++) {
    let same = -1;
    for (let j = 0; j < data.length; j++) {
      if (result[i].orderId === data[j].orderId) {
        same = j;
      }
    }
    if (same === -1) {
      data.push({
        orderId: result[i].orderId,
        content: [
          {
            productId: result[i].productId,
            productName: result[i].productName,
            productPrice: result[i].productPrice,
            amount: result[i].amount,
            createTime: result[i].createTime,
          },
        ],
      });
    } else {
      data[same].content.push({
        productId: result[i].productId,
        productName: result[i].productName,
        productPrice: result[i].productPrice,
        amount: result[i].amount,
        createTime: result[i].createTime,
      });
    }
  }

  client.set(`user_${userId}_${KEY}`, JSON.stringify(data), { EX: expireTime });
  return data;
};

export const createOrder = async (req: Request, res: Response) => {
  const orderId = uuidv4();
  const token = req.headers.authorization?.split(' ')[1];
  const userId = getUserFromJwt(token!);
  const orderList = req.body;
  const nowTime = moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');

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
        console.log(result);
      });
  }
  loadOrder(true, userId!);
  res.send(orderId);
};

export const readOrder = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  const userId = getUserFromJwt(token!);
  const data = await loadOrder(false, userId!);
  res.send(data);
};
