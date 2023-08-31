import { Toaster } from "react-hot-toast";

import { Orders } from "../components/orders";

import { Order } from "@/components/order";
import { Resume } from "@/components/resume";
import { Header } from "@/components/header";

export default async function Home() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4">
        <Header />
        <Resume />
        <main className="mt-8 bg-white py-8 px-6">
          <Orders />
        </main>
      </div>
      <Toaster position="top-right" />
      <Order />
    </>
  );
}
