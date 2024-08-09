import express, { Application } from "express";
import connectDB from "./config/db";
import { config } from "dotenv";
import invoiceRouter from "./routes/invoice.routes";
import morgan from "morgan";

config();
connectDB();

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", invoiceRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
