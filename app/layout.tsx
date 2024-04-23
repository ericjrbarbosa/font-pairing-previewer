import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import "./globalicons.css";
import AppContextProvider from "@/app/_contexts/AppContext";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "typr",
  description: "Eric Barbosa Jr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={roboto.className}>{children}</body>
      </AppContextProvider>
    </html>
  );
}
