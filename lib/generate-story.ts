import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateStory(topic: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Create a short, engaging children's story about ${topic}. 
    The story should:
    - Be appropriate for children aged 5-10
    - Include positive messages and moral lessons
    - Be approximately 3-4 paragraphs long
    - Use simple, clear language
    - Include some dialogue
    - Have a clear beginning, middle, and end
    Please write the story in a way that's easy to read and understand.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Failed to generate story');
  }
}