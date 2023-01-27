import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../../config/db.js";
import jwt from 'jsonwebtoken';

export class User extends Model {
  userId;
  username;
  password;
  role;
  name;
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: "user_id",
    },
    username: {
      type: DataTypes.STRING(320),
      allowNull: false,
      unique: true,
      field: "username",
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: "password",
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'manager'],
      defaultValue: 'user',
      allowNull: false,
      field: "role",
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      field: "name",
    }
  },
  {
    sequelize: SequelizeService.getUserInstance(),
    modelName: "User",
    tableName: "users",
    createdAt: false,
    updatedAt: false
  }
);

User.prototype.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
      id: this.userId,
      email: this.email,
      role: this.role,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
}