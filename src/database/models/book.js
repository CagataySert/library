"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsTo(models.User, { foreignKey: "borrowerId" });
    }
  }
  Book.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: -1,
      },
    },
    {
      sequelize,
      modelName: "Book",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return Book;
};
