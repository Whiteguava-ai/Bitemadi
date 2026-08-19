import { openaiTextToSpeech } from "@/lib/openai-waiter";
import { azureTextToSpeech } from "@/lib/azure-voice";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { text?: string; language?: string };
    const text = body.text?.trim();
    if (!text) {
      return Response.json({ error: "Nothing to say." }, { status: 400 });
    }
    const language = body.language || "en-IN";
    let audio: Buffer;
    try {
      audio = await openaiTextToSpeech(text, language);
    } catch {
      audio = await azureTextToSpeech(text, language);
    }
    return new Response(new Uint8Array(audio), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Text to speech failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
