import catchAsyncError from "../middlewares/catchAsyncError.middleware";
import { exportReport } from "../services/exportRepor.service";

export const exportReportController = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    await exportReport(Number(id), res);

    res.status(200).json({ message: "Export report" });
})
