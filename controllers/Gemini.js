import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();


const geminiApiKey = process.env.API_KEY;
const googleAI = new GoogleGenerativeAI(geminiApiKey);

const geminiConfig = {
  temperature: 0.9,
  topP: 1,
  topK: 1,
  maxOutputTokens: 4096,
};


const geminiModel = googleAI.getGenerativeModel({
  model: "gemini-pro",
  geminiConfig,
});


router.post("/api/fitness", async (req, res) => {
  const { weight, height, activityLevel, language } = req.body;

  // Modify the prompt based on the selected language
  let prompt = `Provide a fitness recommendation for a person with weight ${weight} kg, height ${height} cm, and activity level ${activityLevel}.`;

  if (language === "hi") {
    prompt = `वजन ${weight} किग्रा, ऊंचाई ${height} सेमी और सक्रियता स्तर ${activityLevel} वाले व्यक्ति के लिए एक फिटनेस अनुशंसा प्रदान करें।`;
  }

  try {
    const result = await geminiModel.generateContent(prompt);
    const responseText = result.response.text(); // Ensure correct response handling

    res.json({
      calorieIntake: "Example calorie intake",
      suggestedActivities: "Example suggested activities",
      tips: responseText.trim(),
    });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate AI recommendation." });
  }
});

export default router;
