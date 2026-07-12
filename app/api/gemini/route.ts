import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, mood, dietaryPreferences, currentCart } = body;

    let prompt = "";
    let systemInstruction = "";
    let responseSchema: any = null;

    if (action === "fortune") {
      prompt = `Create a custom Fortune Cookie based on my current mood: "${mood || 'adventurous'}". 
      My dietary preferences are: ${dietaryPreferences?.length ? dietaryPreferences.join(", ") : "none"}.
      My current order has these items: ${currentCart?.length ? currentCart.join(", ") : "none"}.`;

      systemInstruction = `You are the Virtual Head Chef of "Wok & Flame" (an authentic modern oriental fast-casual restaurant).
      Your job is to crack open a digital fortune cookie for the user.
      Provide a witty, warm, inspiring, and slightly humorous fortune relevant to their specified mood.
      Include 4 lucky numbers from 1 to 99.
      Also, recommend exactly one signature item from the Wok & Flame menu that matches their mood and dietary preferences.
      
      The Wok & Flame menu consists of:
      1. Kung Pao Chicken ($14.95, DA 850) - Spicy stir-fry with peanuts, tender chicken, and vegetables.
      2. Shrimp Dumplings ($9.50, DA 450) - Translucent steamed wrappers with plump seasoned shrimp.
      3. Crispy Spring Rolls ($6.00, DA 300) - Golden shells filled with fresh shredded vegetables. Vegetarian.
      4. Beef & Broccoli ($13.95, DA 950) - Tender marinated beef with fresh broccoli in garlic soy ginger sauce.
      5. Wok Fried Rice ($10.50, DA 550) - Smoky fried rice with egg, peas, carrots, and scallions.
      6. Crispy Wontons ($8.00, DA 350) - Golden-fried wontons filled with seasoned chicken, served with sweet & sour sauce.

      Ensure the recommended item fits the user's dietary restrictions (e.g. recommend Spring Rolls if they are vegetarian/vegan).
      Make the pairing explanation delightful and fun.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          fortune: {
            type: Type.STRING,
            description: "An inspiring, fun, and witty fortune cookie wisdom statement.",
          },
          luckyNumbers: {
            type: Type.ARRAY,
            items: { type: Type.INTEGER },
            description: "Four lucky numbers for today.",
          },
          recommendedDish: {
            type: Type.STRING,
            description: "One of the exact menu names: 'Kung Pao Chicken', 'Shrimp Dumplings', 'Crispy Spring Rolls', 'Beef & Broccoli', 'Wok Fried Rice', or 'Crispy Wontons'.",
          },
          pairingExplanation: {
            type: Type.STRING,
            description: "A fun, short culinary explanation of why this dish fits their current vibe/mood.",
          }
        },
        required: ["fortune", "luckyNumbers", "recommendedDish", "pairingExplanation"]
      };

    } else if (action === "chef_recommend") {
      prompt = `I am looking for a meal recommendation.
      Dietary restrictions: ${dietaryPreferences?.length ? dietaryPreferences.join(", ") : "none"}.
      I have these in my cart: ${currentCart?.length ? currentCart.join(", ") : "empty"}.
      Please suggest a complete combination (e.g. an appetizer and a main dish) from Wok & Flame.`;

      systemInstruction = `You are the Expert Culinary Concierge of "Wok & Flame".
      Give the user a personalized dish combo or addition based on what they already have or their dietary goals.
      Recommend items from the official menu:
      - Kung Pao Chicken ($14.95 / 850 DA) [Spicy]
      - Shrimp Dumplings ($9.50 / 450 DA) [Dim Sum]
      - Crispy Spring Rolls ($6.00 / 300 DA) [Vegetarian / Vegan]
      - Beef & Broccoli ($13.95 / 950 DA)
      - Wok Fried Rice ($10.50 / 550 DA)
      - Crispy Wontons ($8.00 / 350 DA)
      
      Give a clear, mouth-watering suggestion.`;

      responseSchema = {
        type: Type.OBJECT,
        properties: {
          recommendationTitle: { type: Type.STRING, description: "A catchy title for the recommendation (e.g. 'The Fiery Feast' or 'The Green Delights')." },
          items: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Array of recommended menu items."
          },
          description: { type: Type.STRING, description: "Mouth-watering justification of why they will love this meal." }
        },
        required: ["recommendationTitle", "items", "description"]
      };
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Call Gemini Model
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.8,
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini API");
    }

    const data = JSON.parse(resultText.trim());
    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI recommendation" },
      { status: 500 }
    );
  }
}
