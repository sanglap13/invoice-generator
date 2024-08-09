import axios from "axios";

const apiKey = process.env.HUGGINGFACE_API_KEY;
const apiUrl =
  "https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B";

const splitTextIntoChunks = (text: string, chunkSize: number): string[] => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
};

const combineResults = (results: any[]): any => {
  return results.reduce((acc, result) => ({ ...acc, ...result }), {});
};

export const extractInvoiceDetails = async (text: string): Promise<any> => {
  const chunkSize = 2000;
  const chunks = splitTextIntoChunks(text, chunkSize);

  const results = [];
  for (const chunk of chunks) {
    try {
      const response = await axios.post(
        apiUrl,
        {
          inputs: `Extract the following details in JSON format: {"customerName": "", "customerAddress": "", "customerEmail": "", "products": [{"name": "", "quantity": 0, "price": 0}], "totalAmount": 0} from the following invoice text:\n\n${chunk}\n\nOnly return valid JSON.`,
        },
        { headers: { Authorization: `Bearer ${apiKey}` } }
      );

      const responseText = response.data[0]?.generated_text || "";
      const jsonMatch = responseText.match(/{[\s\S]*}/);

      if (jsonMatch) {
        const jsonString = jsonMatch[0];
        try {
          const extractedData = JSON.parse(jsonString);
          results.push(extractedData);
        } catch (parseError) {
          console.error("Failed to parse JSON:", jsonString);
        }
      }
    } catch (error) {
      console.error("Error extracting details from model:", error);
    }
  }

  return combineResults(results);
};
