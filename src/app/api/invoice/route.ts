import { NextRequest, NextResponse } from "next/server";
import { appendOrder } from "@/lib/sheets";

const MONO_API = "https://api.monobank.ua/api/merchant/invoice/create";

const PLANS = {
  basic: { name: "Базовий пакет — Садок", amount: 249000 },
  standard: { name: "Стандарт пакет — Садок", amount: 399000 },
  premium: { name: "Преміум пакет — Садок", amount: 599000 },
} as const;

export async function POST(req: NextRequest) {
  const token = process.env.MONO_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "MONO_TOKEN not configured" }, { status: 500 });
  }

  const body = await req.json();
  const { plan, buyerEmail, receiverName, receiverLastName, receiverEmail, receiverPhone, receiverAddress } = body;

  const selectedPlan = PLANS[plan as keyof typeof PLANS];
  if (!selectedPlan) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? "https://sadok.store";

  const payload = {
    amount: selectedPlan.amount,
    ccy: 980,
    merchantPaymInfo: {
      reference: `${plan}-${Date.now()}`,
      destination: selectedPlan.name,
      comment: `Отримувач: ${receiverName} ${receiverLastName}${receiverAddress ? `, ${receiverAddress}` : ""}`,
      customerEmails: [buyerEmail],
      basketOrder: [
        {
          name: selectedPlan.name,
          qty: 1,
          sum: selectedPlan.amount,
          total: selectedPlan.amount,
          unit: "шт",
        },
      ],
    },
    redirectUrl: `${origin}/thank-you`,
    webHookUrl: `${origin}/api/webhook`,
    saveCardData: { saveCard: false },
  };

  const response = await fetch(MONO_API, {
    method: "POST",
    headers: {
      "X-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data.errText ?? "Monobank error" }, { status: response.status });
  }

  // Save order to Google Sheets with status "pending"
  try {
    await appendOrder({
      invoiceId: data.invoiceId,
      createdAt: new Date().toISOString(),
      status: "pending",
      plan,
      amount: selectedPlan.amount,
      buyerEmail,
      receiverName,
      receiverLastName,
      receiverEmail,
      receiverPhone,
      receiverAddress,
    });
  } catch (err) {
    // Non-critical — log but don't fail the payment flow
    console.error("Failed to write to Google Sheets:", err);
  }

  return NextResponse.json({ pageUrl: data.pageUrl, invoiceId: data.invoiceId });
}
