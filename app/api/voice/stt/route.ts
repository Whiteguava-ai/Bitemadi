import { openaiSpeechToText } from "@/lib/openai-waiter";
import { azureSpeechToText } from "@/lib/azure-voice";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("audio");
    const language = String(form.get("language") || "en-IN");
    if (!(file instanceof Blob) || file.size < 1000) {
      return Response.json({ error: "No speech recorded." }, { status: 400 });
    }
    const audio = await file.arrayBuffer();
    let text = "";
    try {
      text = await openaiSpeechToText(audio, language);
    } catch {
      text = await azureSpeechToText(audio, language);
    }
    return Response.json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Speech to text failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
