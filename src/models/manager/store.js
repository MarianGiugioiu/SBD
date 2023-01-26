import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../../config/db.js";

export class StoreManager extends Model {
    storeId;
    location;
    name;
    businessHours;
    avaerageMonthlyIncome;
  }
  
  StoreManager.init(
    {
      storeId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        field: "store_id",
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: "location",
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "name",
      },
      businessHours: {
        type: DataTypes.STRING(50),
        allowNull: true,
        field: "business_hours",
      },
      avaerageMonthlyIncome: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
        field: "average_monthly_income",
      }
    },
    {
      sequelize: SequelizeService.getManagerInstance(),
      modelName: "Stores",
      tableName: "stores",
      createdAt: false,
      updatedAt: false
    }
  );