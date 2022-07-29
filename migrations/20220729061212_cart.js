/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  const result = await knex.schema.createTable('cart', (table) => {
    table.increments('userId').notNullable().primary().comment('使用者ID')
    table.foreign('userId').references('users.userId')
    table.increments('productId').notNullable().primary().comment('商品ID')
    table.foreign('productId').references('product.productId')
    table.datetime('createTime').notNullable().comment('建立時間')
    table.datetime('updatetime').notNullable().comment('更新時間')
    table.integer('amount').notNullable().comment('數量')
    table.integer('totalPrice').notNullable().comment('總價')
  })
  // .toSQL()
  console.log(result)
  return result
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  const result = await knex.schema.dropTable('cart')
  return result
}
