export const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'hello_root',
    database: 'order_form',
  },
  pool: { min: 0, max: 7 },
})

declare module 'knex/types/tables' {
  interface Product {
    productId: number
    createTime: string
    updateTime: string
    productName: string
    productPrice: number
    productSales: number
    productStock: number
    note: string
  }

  interface Users {
    userId: number
    createTime: string
    updateTime: string
    userName: string
    userPassword: string
    adminPermission: number
  }

  interface Cart {
    userId: number
    productId: number
    createTime: string
    updateTime: string
    amount: number
    totalPrice: number
  }

  interface Tables {
    product: Product
    users: Users
    cart: Cart
  }
}
