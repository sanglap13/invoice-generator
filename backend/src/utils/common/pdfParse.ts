import pdf from "pdf-parse";
import { extractInvoiceDetails } from "../services/llmService";

export const parseInvoicePDF = async (buffer: Buffer) => {
  try {
    console.log(`Buffer size: ${buffer.length}`);
    const data = await pdf(buffer);
    console.log(`PDF Text: ${data.text.substring(0, 500)}...`); // Log a snippet of text

    // Use the service to extract invoice details
    const extractedData = await extractInvoiceDetails(data.text);

    // Validate and handle missing fields with defaults
    const customerName = extractedData.customerName || "N/A";
    const customerAddress = extractedData.customerAddress || "N/A";
    const customerEmail = extractedData.customerEmail || "N/A";
    const products = Array.isArray(extractedData.products)
      ? extractedData.products
      : [];
    const totalAmount =
      typeof extractedData.totalAmount === "number"
        ? extractedData.totalAmount
        : 0;

    if (products.length === 0) {
      throw new Error("No valid products found");
    }

    return {
      customerName,
      customerAddress,
      customerEmail,
      products: products.map((product: any) => ({
        name: product.name || "N/A",
        quantity: product.quantity || 0,
        price: product.price || 0,
      })),
      totalAmount,
    };
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Error parsing PDF");
  }
};
