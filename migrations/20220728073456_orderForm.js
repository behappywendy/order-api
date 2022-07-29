/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.primary('userId')
      table.increments('userId').notNullable().comment('Primary Key')
      table.datetime('createTime').notNullable().comment('建立時間')
      table.datetime('updatetime').notNullable().comment('更新時間')
      table.string('userName', 20).comment('使用者名稱')
      table.string('userPassword', 64).comment('使用者密碼')
      table.tinyint('adminPermission').comment('管理者權限')
    })
    .createTable('product', (table) => {
      table.primary('productId')
      table.increments('productId').notNullable().comment('Primary Key')
      table.datetime('createTime').notNullable().comment('建立時間')
      table.datetime('updatetime').notNullable().comment('更新時間')
      table.string('productName', 20).notNullable().comment('商品名稱')
      table.integer('productPrice').comment('商品價格')
      table.integer('productSales').comment('已銷售數量')
      table.integer('productStock').comment('庫存')
      table.string('note').comment('備註')
    })
    .createTable('cart', (table) => {
      table.primary(['userId', 'productId'])
      table
        .foreign('userId')
        .references('users.userId')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .foreign('productId')
        .references('product.productId')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.datetime('createTime').notNullable().comment('建立時間')
      table.datetime('updatetime').notNullable().comment('更新時間')
      table.integer('amount').notNullable().comment('數量')
      table.integer('totalPrice').notNullable().comment('總價')
    })
    .createTable('order', (table) => {
      table.primary('id')
      table
        .foreign('userId')
        .references('users.userId')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('orderId', 36).notNullable().comment('訂單編號')
      table
        .foreign('productId')
        .references('product.productId')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('amount').notNullable().comment('數量')
      table.datetime('createTime').notNullable().comment('建立時間')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('users')
    .dropTable('product')
    .dropTable('cart')
    .dropTable('order')
}
