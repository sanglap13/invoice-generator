import { Router } from "express";
import { uploadMiddleware } from "../middleware/multer";
import { getInvoices, uploadInvoice } from "../controllers/invoice.controller";

const router = Router();

// Route for uploading and processing invoices
router.post("/upload", uploadMiddleware, uploadInvoice);

// Route for fetching stored invoices
router.get("/invoices", getInvoices);

export default router;
