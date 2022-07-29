const { table } = require('console')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  const result = await knex.schema.createTable('product', (table) => {
    table.increments('productId').notNullable().primary().comment('Primary Key')
    table.datetime('createTime').notNullable().comment('建立時間')
    table.datetime('updatetime').notNullable().comment('更新時間')
    table.string('productName', 20).notNullable().comment('商品名稱')
    table.integer('productPrice').comment('商品價格')
    table.integer('productSales').comment('已銷售數量')
    table.integer('productStock').comment('庫存')
    table.string('note').comment('備註')
  })
  console.log(result)
  return result
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('product')
}
