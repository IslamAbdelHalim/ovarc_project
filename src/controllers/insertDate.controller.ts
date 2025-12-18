import catchAsyncError from "../middlewares/catchAsyncError.middleware"
import { insertData } from "../services/insertData.service"
import { CSVFormat } from "../types/csvFormat.type";

export const insertDateController = catchAsyncError(async (req, res, next) => {
    const data = req.body as CSVFormat[];

    await insertData(data);

    res.status(200).json({ message: "Data inserted successfully" });
})