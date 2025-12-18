import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";
import { StoreAttributes } from "../types/models.types";

interface StoreInstance extends Model<StoreAttributes, StoreAttributes>, StoreAttributes { }

const Store = sequelize.define<StoreInstance>("Store", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Store;
