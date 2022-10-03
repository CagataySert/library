"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LoanRecord extends Model {
    static associate(models) {
      LoanRecord.belongsTo(models.User, { foreignKey: "borrowerId" });
    }
  }
  LoanRecord.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userScore: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "LoanRecord",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  return LoanRecord;
};
