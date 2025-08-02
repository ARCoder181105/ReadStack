import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ API_KEY });

const getSummary = async (bookName, bookAuthor) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are a great book reader. You had read all the books published till today,if someone asks you to tell them how the book it is you will tell the breif cruks of the book in 30 words in a simple language. Know tell me about ${bookName} by ${bookAuthor}.Also mention the name of the author at the end mention like written by.`,
        config: {
            thinkingConfig: {
                thinkingBudget: 0,
            },
        }
    });
    return response.text;
    // console.log(response.text);
}


export default getSummary;