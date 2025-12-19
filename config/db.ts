import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const uri = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`;


const sequelize = new Sequelize(uri);

export async function connectToDB(): Promise<void> {
    try {
        import("../src/models/associations");

        await sequelize.authenticate();

        await sequelize.sync({ alter: true });

        console.log("CONNECT TO DB");
    } catch (error) {
        console.log("faild to connect", error);
        process.exit(1);
    }
}

export default sequelize;
