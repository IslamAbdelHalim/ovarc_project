import { QueryTypes } from "sequelize";
import pdf from "pdfkit";
import Book from "../models/book.model";
import Store_Book from "../models/store_book.model";
import sequelize from "../../config/db";
import Store from "../models/store.model";
import AppError from "../utils/appError";
import { Response } from "express";

export const exportReport = async (storeId: number, res: Response) => {
    const doc = new pdf();

    const store = await Store.findByPk(storeId);
    if (!store) throw new AppError("Store not found", 404);

    // get most 5 books prices
    const books = await Book.findAll({
        include: [
            {
                model: Store_Book,
                where: { store_id: storeId }
            }
        ],
        order: [
            [
                Store_Book, "price", "DESC"
            ]
        ],
        limit: 5
    })

    // get most 5 auther with the greatest number of available books in the inventory.\
    const query = `
            SELECT  
                a.id, 
                a.name, 
                COUNT(b.id) AS bookCount
            FROM Authers AS a
            INNER JOIN Books AS b ON a.id = b.author_id
            INNER JOIN Store_Books AS sb ON b.id = sb.book_id
            WHERE sb.store_id = :storeId
            GROUP BY a.id, a.name
            ORDER BY bookCount DESC
            LIMIT 5;
    `;

    const authers = await sequelize.query(query, {
        replacements: { storeId },
        type: QueryTypes.SELECT
    });

    const date = new Date().toISOString().split('T')[0];
    const fileName = `${store.name}-Report-${date}.pdf`;

    // Set Headers for Download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    doc.pipe(res);

    // PDF Content
    doc.fontSize(20).text(`Inventory Report: ${store.name}`, { align: 'center' });
    doc.fontSize(12).text(`Date: ${date}`, { align: 'center' }).moveDown();

    // Section: Top 5 Priciest Books
    doc.fontSize(16).text('Top 5 Priciest Books', { underline: true }).moveDown(0.5);
    books.forEach((book: any, index) => {
        const price = book.Stores[0].StoreBook.price;
        doc.fontSize(12).text(`${index + 1}. ${book.name} - $${price}`);
    });

    doc.moveDown();

    // Section: Top 5 Prolific Authors
    doc.fontSize(16).text('Top 5 Prolific Authors', { underline: true }).moveDown(0.5);
    authers.forEach((author: any, index) => {
        const count = author.bookCount;
        doc.fontSize(12).text(`${index + 1}. ${author.name} (${count} books)`);
    });

    doc.end();

}
