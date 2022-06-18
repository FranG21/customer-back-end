/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('state').del()
  await knex('state').insert([
    { id: 1, name: 'La Libertad' },
    { id: 2, name: 'Morazán' },
    { id: 3, name: 'Chalatenango' },
    { id: 4, name: 'Ahuachapán' },
    { id: 5, name: 'Cabañas' },
    { id: 6, name: 'Santa Ana' },
    { id: 7, name: 'Sonsonate' },
    { id: 8, name: 'Usulután' },
    { id: 9, name: 'San Miguel' },
    { id: 10, name: 'La Unión' },
    { id: 11, name: 'Cuscatlán' },
    { id: 12, name: 'San Salvador' },
    { id: 13, name: 'La paz' },
    { id: 14, name: 'San Vicente' },
  ]);
};
