import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";
import { AutherAttributes } from "../types/models.types";



interface AutherInstance extends Model<AutherAttributes, AutherAttributes>, AutherAttributes { }

const Auther = sequelize.define<AutherInstance>("Auther", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Auther;