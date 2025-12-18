import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db";
import Store from "./store.model";
import Book from "./book.model";
import { Store_BookAttributes } from "../types/models.types";

interface Store_BookInstance extends Model<Store_BookAttributes, Store_BookAttributes>, Store_BookAttributes { }

const Store_Book = sequelize.define<Store_BookInstance>("Store_Book", {
    store_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Store,
            key: 'id'
        }
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    copies: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sold_out: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

export default Store_Book;