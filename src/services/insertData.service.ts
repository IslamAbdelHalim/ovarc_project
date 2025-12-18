import Store from "../models/store.model";
import Book from "../models/book.model";
import Auther from "../models/auther.model";
import Store_Book from "../models/store_book.model";
import sequelize from "../../config/db";
import { CSVFormat } from "../types/csvFormat.type";

export const insertData = async (data: CSVFormat[]) => {
    const transaction = await sequelize.transaction();
    try {
        for (const row of data) {

            // check if store is exist if not create one 
            const [store] = await Store.findOrCreate({
                where: { name: row.store_name, address: row.store_address },
                transaction
            });

            // console.log(store)

            // check if authar is exist if not create it
            const [auther] = await Auther.findOrCreate({
                where: { name: row.author_name },
                transaction
            });

            // console.log(auther)

            // check if book is exist if not create it
            const [book] = await Book.findOrCreate({
                where: { name: row.book_name, author_id: auther.id, pages: row.pages },
                transaction
            });

            // console.log(book)

            // check if store_book is exist if not create it
            const store_book = await Store_Book.findOne({
                where: { store_id: store.id, book_id: book.id },
                transaction
            });

            // console.log(store_book)

            if (!store_book) {
                await Store_Book.create({
                    store_id: store.id,
                    book_id: book.id,
                    copies: 1,
                    price: row.price,
                }, { transaction });
            } else {
                await store_book.update({
                    copies: store_book.copies + 1
                }, { transaction });
            }
        }

        await transaction.commit();

    } catch (error) {
        await transaction.rollback();
        throw error;
    }

}