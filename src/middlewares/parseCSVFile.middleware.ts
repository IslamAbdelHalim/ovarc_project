import assert from "node:assert";
import { parse } from "csv-parse";
import fs from "fs";
import { FunctionMiddleWare } from "../types/asyncMiddleWare.type";


export const parseCSVFileMiddleware: FunctionMiddleWare = (req, res, next) => {
    const file = req.file;
    // console.log('file', file)

    if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const data = fs.readFileSync(file.path, 'utf-8');

    parse(data, {
        columns: true,
    }, (err, records) => {
        if (err) {
            return res.status(400).json({ message: "Error parsing file" });
        }
        // console.log(records);
        req.body = records;
        next();
    })

}