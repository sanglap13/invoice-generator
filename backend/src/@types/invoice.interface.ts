import { IProduct } from "./product.interface";

export interface IInvoiceDocument extends Document {
  customerName: string;
  customerAddress: string;
  customerEmail: string;
  products: IProduct[];
  totalAmount: number;
}
