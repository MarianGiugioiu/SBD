import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../../config/db.js";

export class ProductUser extends Model {
  productId;
  name;
  weight;
  producer;
}

ProductUser.init(
  {
    productId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: "product_id",
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "name",
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "weight",
    },
    producer: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "producer",
    }
  },
  {
    sequelize: SequelizeService.getUserInstance(),
    modelName: "Product",
    tableName: "products",
    createdAt: false,
    updatedAt: false
  }
);