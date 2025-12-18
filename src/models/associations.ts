import Book from "./book.model";
import Store_Book from "./store_book.model";
import Store from "./store.model";

Book.hasMany(Store_Book, { foreignKey: 'book_id' });
Store_Book.belongsTo(Book, { foreignKey: 'book_id' });

Store.hasMany(Store_Book, { foreignKey: 'store_id' });
Store_Book.belongsTo(Store, { foreignKey: 'store_id' });
