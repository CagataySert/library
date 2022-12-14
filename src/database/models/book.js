"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {}
  }
  Book.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      score: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: -1,
      },
      isAccessible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
