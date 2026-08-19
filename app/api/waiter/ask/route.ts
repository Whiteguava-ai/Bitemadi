import { askMenuWaiter } from "@/lib/openai-waiter";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      text?: string;
      language?: string;
      cart?: { name: string; qty: number }[];
    };
    const text = body.text?.trim();
    if (!text) {
      return Response.json({ error: "Say what you’d like to eat." }, { status: 400 });
    }
    const result = await askMenuWaiter(
      text,
      body.language || "en-IN",
      Array.isArray(body.cart) ? body.cart : [],
    );
    return Response.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Waiter failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
