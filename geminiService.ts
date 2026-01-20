
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getPlanetFunFact = async (planetName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a unique, mind-blowing fun fact about the planet ${planetName} in 30 words or less.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });
    return response.text?.trim() || "Space is vast and full of mysteries!";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "The stars are currently unreachable, but their beauty remains.";
  }
};
