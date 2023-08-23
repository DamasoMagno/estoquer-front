import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estoquer.",
  icons: ["logo.png"],
};

import { Order } from "@/components/order";

import "./globals.css";
import { ModalProvider } from "@/contexts/useModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-slate-50`}>
        <ModalProvider>
          {children}
          <Order />
        </ModalProvider>
      </body>
    </html>
  );
}
