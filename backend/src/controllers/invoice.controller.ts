import { Request, Response } from "express";
import { Invoice } from "../models/invoice.model";
import { parseInvoicePDF } from "../utils/common/pdfParse";

// Upload and process invoice PDF
export const uploadInvoice = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Parse PDF to extract invoice data
    const invoiceData = await parseInvoicePDF(req.file.buffer);

    // Save invoice data to database
    const invoice = new Invoice(invoiceData);
    await invoice.save();

    res.status(201).json({
      message: "Invoice uploaded and processed successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Error processing invoice:", error);
    res.status(500).json({ message: "Error processing invoice" });
  }
};

// Fetch stored invoices
export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json({
      message: "Invoices fetched successfully",
      data: invoices,
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Error fetching invoices" });
  }
};
