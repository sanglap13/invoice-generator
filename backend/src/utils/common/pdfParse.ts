import pdf from "pdf-parse";
import { extractInvoiceDetails } from "../services/llmService";

export const parseInvoicePDF = async (buffer: Buffer) => {
  try {
    console.log(`Buffer size: ${buffer.length}`);
    const data = await pdf(buffer);
    console.log(`PDF Text: ${data.text.substring(0, 500)}...`); // Log a snippet of text

    // Use the service to extract invoice details
    const extractedData = await extractInvoiceDetails(data.text);

    // Ensure the response has the required fields
    if (
      !extractedData ||
      !extractedData.customerName ||
      !extractedData.customerAddress ||
      !extractedData.customerEmail ||
      !Array.isArray(extractedData.products) ||
      typeof extractedData.totalAmount !== "number"
    ) {
      throw new Error("Extracted data is missing required fields");
    }

    // Transform and return the data
    return {
      customerName: extractedData.customerName,
      customerAddress: extractedData.customerAddress,
      customerEmail: extractedData.customerEmail,
      products: extractedData.products.map((product: any) => ({
        name: product.name,
        quantity: product.quantity,
        price: product.price,
      })),
      totalAmount: extractedData.totalAmount,
    };
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Error parsing PDF");
  }
};
