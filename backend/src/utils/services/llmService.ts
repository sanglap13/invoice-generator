import axios from "axios";

export const extractInvoiceDetails = async (text: string): Promise<any> => {
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  try {
    const apiResponse = await axios.post(
      "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Log and inspect the raw response
    console.log(`Hugging Face Response: ${JSON.stringify(apiResponse.data)}`);

    // Ensure response has the expected structure
    const responseText =
      apiResponse.data[0]?.generated_text || apiResponse.data;
    const parsedData = JSON.parse(responseText);

    if (
      !parsedData ||
      !parsedData.customerName ||
      !parsedData.customerAddress ||
      !parsedData.customerEmail ||
      !Array.isArray(parsedData.products) ||
      typeof parsedData.totalAmount !== "number"
    ) {
      throw new Error("Response data is missing required fields");
    }

    return parsedData;
  } catch (error) {
    console.error("Error extracting details from Hugging Face:", error);
    throw new Error("Error extracting details from Hugging Face");
  }
};
