"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Todos",
      [
        {
          todo: "Belajar Sequelize",
          isdone: false,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          todo: "Belajar Mongodb",
          isdone: false,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          todo: "Belajar Node",
          isdone: false,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Todos", null, {});
  },
};
