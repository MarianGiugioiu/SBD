import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../../config/db.js";

export class Stock extends Model {
  stockId;
  storeId;
  productId;
  quantity;
  unitPrice;
}

Stock.init(
  {
    stockId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: "stock_id",
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "store_id",
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "product_id",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "quantity",
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      field: "unit_price",
    }
  },
  {
    sequelize: SequelizeService.getManagerInstance(),
    modelName: "Stock",
    tableName: "stocks",
    createdAt: false,
    updatedAt: false
  }
);