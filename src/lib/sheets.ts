import { google } from "googleapis";

const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

function getAuth() {
  const raw = process.env.GOOGLE_SHEETS_CREDENTIALS;
  if (!raw) throw new Error("GOOGLE_SHEETS_CREDENTIALS not set");
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export interface OrderRow {
  invoiceId: string;
  createdAt: string;
  status: "pending" | "success" | "failure" | "reversed";
  plan: string;
  amount: number;
  buyerEmail: string;
  receiverName: string;
  receiverLastName: string;
  receiverEmail: string;
  receiverPhone: string;
  receiverAddress: string;
}

const HEADERS = [
  "invoiceId",
  "createdAt",
  "status",
  "plan",
  "amount (₴)",
  "buyerEmail",
  "receiverName",
  "receiverLastName",
  "receiverEmail",
  "receiverPhone",
  "receiverAddress",
];

/** Append a new order row. Adds header row automatically if sheet is empty. */
export async function appendOrder(row: OrderRow): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Check if headers exist
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A1:A1",
  });

  if (!existing.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
  }

  const values = [
    [
      row.invoiceId,
      row.createdAt,
      row.status,
      row.plan,
      row.amount / 100, // convert kopecks to hryvnias
      row.buyerEmail,
      row.receiverName,
      row.receiverLastName,
      row.receiverEmail,
      row.receiverPhone,
      row.receiverAddress,
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A1",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}

/** Update status of an existing row by invoiceId. */
export async function updateOrderStatus(
  invoiceId: string,
  status: OrderRow["status"]
): Promise<void> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A:A",
  });

  const rows = res.data.values ?? [];
  const rowIndex = rows.findIndex((r) => r[0] === invoiceId);
  if (rowIndex === -1) return; // not found — nothing to update

  const range = `Sheet1!C${rowIndex + 1}`; // column C = status
  await sheets.spreadsheets.values.update({
    spreadsheetId: SHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [[status]] },
  });
}
