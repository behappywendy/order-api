/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  const result = await knex.schema.createTable('order', (table) => {
    table.increments('id').notNullable().primary().comment('Primary Key')
    table.integer('userId').notNullable()
    table
      .foreign('userId')
      .references('users.userId')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION')
    table.string('orderId', 36).notNullable().comment('訂單編號')
    // table.integer('productId')
    // table
    //   .foreign('productId')
    //   .references('product.productId')
    //   .onUpdate('NO ACTION')
    //   .onDelete('NO ACTION')
    table.integer('amount').notNullable().comment('數量')
    table.datetime('createTime').notNullable().comment('建立時間')
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
  const result = await knex.schema.dropTable('order')
  return result
}
