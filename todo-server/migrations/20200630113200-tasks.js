'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('tasks', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true

            },
            taskName: {
                type: Sequelize.STRING(30),
                allowNull: false,

            },
            taskStatus: {
                type: Sequelize.ENUM("new", "inProgress", "done"),
                allowNull: false,
                defaultValue: "New"
            },
            taskDetails:{
                type:Sequelize.STRING(500),
                allowNull:true,

            },
            createdAt: {
                type: Sequelize.DATE(),
                allowNull: false,
                defaultValue: new Date()
            },
            updatedAt:{
                type:Sequelize.DATE(),
                allowNull:true,


            }



        });
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
    },

    down: (queryInterface, Sequelize) => {

        return queryInterface.dropTable('tasks');

        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
