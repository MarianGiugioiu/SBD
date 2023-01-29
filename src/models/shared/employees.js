import { DataTypes, Model } from "sequelize";
import { SequelizeService } from "../../config/db.js";

export class Employee extends Model {
  employeeId;
  managerId;
  storeId;
  fisrtName;
  lastName;
  pin;
  salary;
}

Employee.init(
  {
    employeeId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      field: "employee_id",
    },
    managerId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "manager_id",
    },
    storeId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "store_id",
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: "first_name",
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "last_name",
    },
    pin: {
        type: DataTypes.STRING(15),
        allowNull: false,
        field: "pin",
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: "salary",
    },
  },
  {
    sequelize: SequelizeService.getUserInstance(),
    modelName: "Employee",
    tableName: "masked_employees",
    createdAt: false,
    updatedAt: false
  }
);