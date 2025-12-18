import express from "express";
import { parseCSVFileMiddleware } from "./middlewares/parseCSVFile.middleware";
import { insertDateController } from "./controllers/insertDate.controller";
import multer from "multer";
import { exportReportController } from "./controllers/exportReport.controller";
import { getStoresController } from "./controllers/getStores.controller";

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/api/inventory/upload', upload.single('file'), parseCSVFileMiddleware, insertDateController);
router.get('/api/store/:id/download-report', exportReportController);
router.get('/api/stores', getStoresController);

export default router;  