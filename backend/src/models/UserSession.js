const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const UserSession = sequelize.define("UserSession", {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
   user_id: {        // ✅ Add this field
    type: DataTypes.UUID,
    allowNull: false
  },
  token_hash: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  expires_at: { 
    type: DataTypes.DATE, 
    allowNull: false 
  },
  created_at: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
}, { 
  timestamps: false 
});

// Relation: Session belongs to User
UserSession.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
User.hasMany(UserSession, { foreignKey: "user_id", onDelete: "CASCADE" });

module.exports = UserSession;
