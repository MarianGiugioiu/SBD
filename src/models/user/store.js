import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../../config/db.js";

export class StoreUser extends Model {
    storeId;
    location;
    name;
    businessHours;
  }
  
  StoreUser.init(
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
      }
    },
    {
      sequelize: SequelizeService.getUserInstance(),
      modelName: "Stores",
      tableName: "masked_stores",
      createdAt: false,
      updatedAt: false
    }
  );