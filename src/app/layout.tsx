import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { ModalProvider } from "@/contexts/useModal";
import { OrderProvider } from "@/contexts/useOrder";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estoquer.",
  description: "Gerencie seu controle de gastos de maneira simples, prática e fácil aqui.",
  icons: ["logo.png"],
};

import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-slate-50`}>
        <OrderProvider>
          <ModalProvider>{children}</ModalProvider>
        </OrderProvider>
      </body>
    </html>
  );
}
