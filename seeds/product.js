/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('product').del();
  await knex('product').insert([
    {
      productId: 1,
      createTime: '2022-08-01 12:00:00',
      updateTime: '2022-08-01 12:00:00',
      productName: '商品1',
      productPrice: 500,
      productSales: 20,
      productStock: 12,
      note: '備註',
    },
    {
      productId: 2,
      createTime: '2022-08-01 12:00:00',
      updateTime: '2022-08-01 12:00:00',
      productName: '商品2',
      productPrice: 200,
      productSales: 10,
      productStock: 27,
      note: '',
    },
    {
      productId: 3,
      createTime: '2022-08-01 12:00:00',
      updateTime: '2022-08-01 12:00:00',
      productName: '商品3',
      productPrice: 2000,
      productSales: 3,
      productStock: 42,
      note: '貝柱',
    },
  ]);
};
