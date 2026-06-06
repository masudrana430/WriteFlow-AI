import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { topic, audience, guidelines, templateTitle } = await req.json();

    const systemPrompt = `You are an expert AI content generator. 
    You are writing a: ${templateTitle}
    Target Audience: ${audience || "General Audience"}
    Additional Guidelines: ${guidelines || "None"}
    
    Structure your response cleanly using Markdown. Be concise, highly engaging, and deliver exactly what is requested without filler introductions.`;

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      prompt: `Topic to write about: ${topic}`,
    });

    // The official Vercel AI SDK method for the newest package versions
    return result.toUIMessageStreamResponse();
    
  } catch (error) {
    console.error("AI Generation Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate content" }), {
      status: 500,
    });
  }
}