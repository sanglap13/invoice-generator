import { model } from "mongoose";
import { IInvoiceDocument } from "../@types/invoice.interface";
import invoiceSchema from "./schemas/invoice.schema";

export const Invoice = model<IInvoiceDocument>("Invoice", invoiceSchema);
