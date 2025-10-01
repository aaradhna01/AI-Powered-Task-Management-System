const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Task = require("./Task");

const TaskAttachment = sequelize.define("TaskAttachment", {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  file_name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  file_path: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  file_size: { 
    type: DataTypes.INTEGER 
  },
  uploaded_at: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
}, { 
  timestamps: false 
});

// Relation: Attachment belongs to a Task
TaskAttachment.belongsTo(Task, { foreignKey: "task_id", onDelete: "CASCADE" });
Task.hasMany(TaskAttachment, { foreignKey: "task_id", onDelete: "CASCADE" });

module.exports = TaskAttachment;
