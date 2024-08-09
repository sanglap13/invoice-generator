import express, { Application } from "express";
import connectDB from "./config/db";
import { config } from "dotenv";
// import invoiceRouter from './routes/invoice';

config();
connectDB();

const app: Application = express();

app.use(express.json());
// app.use('/upload', invoiceRouter);
// app.use('/invoices', invoiceRouter);  // For fetching stored invoices

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
