'use strict';

module.exports = function (sequelize, DataTypes) {
  var tasks = sequelize.define("tasks", {
         id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true

            },
            taskName: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            taskStatus: {
                type: DataTypes.ENUM("New", "In Progress", "Done"),
                allowNull: false,
                defaultValue: "New"
            },
            taskDetails:{
                type:DataTypes.STRING,
                allowNull:true,

            },
            createdAt: {
                type: DataTypes.DATE(),
                allowNull: false,
                defaultValue: new Date()
            },
            updatedAt:{
                type:DataTypes.DATE(),
                allowNull:true,


            }



  });
  return tasks;
}
