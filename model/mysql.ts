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
    product_id: number
    create_time: string
    update_time: string
    product_name: string
    product_price: number
    product_sales: number
    product_stock: number
    note: string
  }

  interface Tables {
    product: Product
  }
}
