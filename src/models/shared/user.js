import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../../config/db.js";
import crypto from 'crypto'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const key = process.env.ENCRYPTION_KEY;

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
      allowNull: true,
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

User.beforeCreate(async (user) => {
  const secret = user.get('username');
  const cipher = crypto.createCipher('aes-256-cbc', key);
  let encrypted = cipher.update(secret, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  user.set('username', encrypted);
  user.dataValues.password = await bcrypt.hash(user.dataValues.password, 10);
});

User.beforeFind((user) => {
  if (user && user.where && user.where.username) {
    const secret = user.where.username;
    const cipher = crypto.createCipher('aes-256-cbc', key);
    let encrypted = cipher.update(secret, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    user.where.username = encrypted;
  }
})

User.validPassword = async (password1, password2) => {
  let result = await bcrypt.compare(password1, password2);
  return result;
}

User.afterFind((users) => {
  if (users) {
    if (!Array.isArray(users)) {
      users = [users];
    }
    for (const user of users) {
      const encrypted = user.username;
      if (encrypted) {
        const decipher = crypto.createDecipher('aes-256-cbc', key);
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        user.username = decrypted;
      }
    }
  }
});

User.prototype.generateJWT = function () {
  const encrypted = this.dataValues.username;
  const decipher = crypto.createDecipher('aes-256-cbc', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  const data = {
    userId: this.dataValues.userId,
    name: this.dataValues.name,
    username: decrypted,
    role: this.dataValues.role
  };
  const secret = process.env.TOKEN_SECRET;

  const token = jwt.sign(data, secret, {expiresIn: 60 * 30});
  return token;
}