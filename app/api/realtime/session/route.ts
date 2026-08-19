import { createRealtimeSession } from "@/lib/openai-waiter";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      language?: string;
      cart?: { name: string; qty: number }[];
    };
    const session = await createRealtimeSession(
      body.language || "en-IN",
      Array.isArray(body.cart) ? body.cart : [],
    );
    return Response.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Voice call failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
