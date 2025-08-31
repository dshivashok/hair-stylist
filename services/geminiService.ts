
import { GoogleGenAI, Modality, Type, GenerateContentResponse } from "@google/genai";
import { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToGenerativePart = (file: File) => {
  return new Promise<{ mimeType: string, data: string }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64Data = dataUrl.split(',')[1];
      resolve({
        mimeType: file.type,
        data: base64Data,
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const editImageWithHairstyle = async (imageFile: File, prompt: string): Promise<string> => {
  const imagePart = await fileToGenerativePart(imageFile);
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [
        { inlineData: imagePart },
        { text: prompt },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
    }
  }

  throw new Error("AI did not return an image. Please try a different photo or style.");
};

export const analyzeHairstyle = async (base64ImageData: string): Promise<AnalysisResult> => {
  const mimeType = base64ImageData.substring(base64ImageData.indexOf(":") + 1, base64ImageData.indexOf(";"));
  const data = base64ImageData.substring(base64ImageData.indexOf(",") + 1);

  const imagePart = {
    inlineData: {
      mimeType,
      data,
    },
  };

  const textPart = {
    text: `You are an expert celebrity hair stylist. Analyze the new hairstyle on the person in this image.
    Provide a rating, advice, and product recommendations in a JSON object.
    - rating: A number from 1 to 10 on how well the hairstyle suits the person.
    - advice: A paragraph of constructive feedback on what could be improved or tips for styling.
    - products: An array of 3 specific types of hair products suitable for this style (e.g., 'Volumizing Mousse', 'Texturizing Spray', 'High-Hold Hairspray').`
  };

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          rating: { type: Type.NUMBER, description: "Rating from 1 to 10" },
          advice: { type: Type.STRING, description: "Styling advice" },
          products: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of 3 hair products"
          },
        },
        required: ["rating", "advice", "products"],
      },
    },
  });
  
  try {
    const jsonStr = response.text.trim();
    const result = JSON.parse(jsonStr);
    if (
      typeof result.rating === 'number' &&
      typeof result.advice === 'string' &&
      Array.isArray(result.products) &&
      result.products.every((p: unknown) => typeof p === 'string')
    ) {
      return result as AnalysisResult;
    } else {
        throw new Error("Invalid JSON structure from API.");
    }
  } catch (error) {
    console.error("Failed to parse analysis from Gemini:", error);
    throw new Error("Could not analyze the hairstyle. The AI's response was not in the expected format.");
  }
};
