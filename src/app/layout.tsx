import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { ModalProvider } from "@/contexts/useModal";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estoquer.",
  icons: ["logo.png"],
};

import "./globals.css";
import { OrderProvider } from "@/contexts/useOrder";

export default function RootLayout({
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
