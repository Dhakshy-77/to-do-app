'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todos = sequelize.define('Todos', {
    name: DataTypes.STRING,
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateCompleted: DataTypes.DATE,
    orderId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },

  }, {});
  Todos.associate = function (models) {
    models.Todos.belongsTo(models.Users, {
      foreignKey: 'userId',
      sourceKey: 'id',
    });

  };
  return Todos;
};