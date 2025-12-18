import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";
import Auther from "./auther.model";
import { BookAttributes } from "../types/models.types";

interface BookInstance extends Model<BookAttributes, BookAttributes>, BookAttributes { }

const Book = sequelize.define<BookInstance>("Book", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Auther,
            key: 'id'
        }
    },
    pages: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Book;
