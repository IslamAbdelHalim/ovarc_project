import catchAsyncError from "../middlewares/catchAsyncError.middleware";
import { getStoreService } from "../services/getStore.service";

export const getStoresController = catchAsyncError(async (req, res, next) => {
    const stores = await getStoreService();
    res.status(200).json(stores);
});
