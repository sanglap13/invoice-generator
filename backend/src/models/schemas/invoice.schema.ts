import { Schema } from "mongoose";
import { IInvoiceDocument } from "../../@types/invoice.interface";
import productSchema from "./product.schema";

const invoiceSchema = new Schema<IInvoiceDocument>({
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerEmail: { type: String, required: true },
  products: { type: [productSchema], required: true },
  totalAmount: { type: Number, required: true },
});

export default invoiceSchema;
