import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../../config/db.js";

export class ProductManager extends Model {
  productId;
  name;
  weight;
  producer;
}

ProductManager.init(
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
      type: DataTypes.DECIMAL(10, 2),
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
    sequelize: SequelizeService.getManagerInstance(),
    modelName: "Product",
    tableName: "products",
    createdAt: false,
    updatedAt: false
  }
);