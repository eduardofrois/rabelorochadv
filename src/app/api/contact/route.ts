import { NextResponse } from "next/server";
import { createLead } from "@/features/leads/leads.repository";
import { contactSchema } from "@/features/leads/leads.schemas";
import { contactRateLimiter } from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "unknown";
  const clientIp = forwardedFor.split(",")[0]?.trim() || "unknown";
  const rateLimit = contactRateLimiter.check(`contact:${clientIp}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente novamente em instantes." },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  await createLead(parsed.data);

  return NextResponse.json({ ok: true });
}
