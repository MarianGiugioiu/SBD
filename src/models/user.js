import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../config/db.js";

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
        values: ['user','manager'],
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