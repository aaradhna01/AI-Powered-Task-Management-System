const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
  },
  priority: {
    type: DataTypes.STRING,
    defaultValue: "medium",
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
  due_date: {
    type: DataTypes.DATE,
  },
  completed_at: {
    type: DataTypes.DATE,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Task;

