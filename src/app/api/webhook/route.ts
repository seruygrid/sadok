import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/sheets";

// Monobank invoice statuses
// https://api.monobank.ua/docs/acquiring.html#tag/Oplata/paths/~1api~1merchant~1invoice~1status/get
type MonoStatus = "created" | "processing" | "hold" | "success" | "failure" | "reversed" | "expired";

interface MonoWebhookBody {
  invoiceId: string;
  status: MonoStatus;
  amount?: number;
  ccy?: number;
  reference?: string;
}

export async function POST(req: NextRequest) {
  let body: MonoWebhookBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { invoiceId, status } = body;

  if (!invoiceId || !status) {
    return NextResponse.json({ error: "Missing invoiceId or status" }, { status: 400 });
  }

  // Only update for terminal statuses
  if (status === "success" || status === "failure" || status === "reversed") {
    try {
      await updateOrderStatus(invoiceId, status);
    } catch (err) {
      console.error("Webhook: failed to update Google Sheets:", err);
      // Return 200 anyway so Monobank doesn't retry endlessly
    }
  }

  // Monobank expects 200 OK
  return NextResponse.json({ ok: true });
}
