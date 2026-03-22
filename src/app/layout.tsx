import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sadok.store"),
  title: {
    default: "Sadok — подаруй справжнє дерево біля Львова",
    template: "%s | Sadok",
  },
  description:
    "Sadok — сервіс, де ти можеш подарувати справжнє фруктове дерево в саду біля Львова. Живий подарунок з врожаєм фруктів, фото дерева та можливістю відвідати його.",
  openGraph: {
    title: "Sadok — подаруй дерево, яке буде плодоносити роками",
    description:
      "Подарунок, який не зникає через тиждень. Справжнє фруктове дерево в саду біля Львова з урожаєм фруктів для отримувача.",
    url: "https://sadok.store",
    siteName: "Sadok",
    type: "website",
    locale: "uk_UA",
    images: [
      {
        url: "/og-sadok.jpg",
        width: 1200,
        height: 630,
        alt: "Sadok — фруктовий сад біля Львова",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sadok — подаруй живе дерево",
    description:
      "Унікальний подарунок: фруктове дерево в саду біля Львова з урожаєм фруктів для отримувача.",
    site: "@sadok",
  },
  alternates: {
    canonical: "https://sadok.store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body
        className={`${manrope.variable} antialiased bg-[#f8faf7] text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
