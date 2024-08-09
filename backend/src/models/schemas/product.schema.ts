import { Schema } from "mongoose";
import { IProduct } from "../../@types/product.interface";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

export default productSchema;
