/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  const result = await knex.schema.createTable('users', (table) => {
    table.increments('userId').notNullable().primary().comment('Primary Key')
    table.datetime('createTime').notNullable().comment('建立時間')
    table.datetime('updatetime').notNullable().comment('更新時間')
    table.string('userName', 20).notNullable().comment('使用者名稱')
    table.string('userPassword', 64).comment('使用者密碼')
    table.tinyint('adminPermission').comment('管理者權限')
  })
  console.log(result)
  return result
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
