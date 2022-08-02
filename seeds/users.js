/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      userId: 1,
      createTime: '2022-08-01 12:00:00',
      updateTime: '2022-08-01 12:00:00',
      userName: 'dino',
      userPassword:
        'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
      adminPermission: 1,
    },
  ])
}
