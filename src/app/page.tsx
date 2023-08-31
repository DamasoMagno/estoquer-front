import { Orders } from "../components/orders";
import { Order } from "@/components/order";
import { Toaster } from "react-hot-toast";
import { Resume } from "@/components/resume";

export default async function Home() {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4">
        <header className="flex items-center gap-2 mt-4">
          <h2 className="text-xl bold">Resumo de pedidos</h2>
        </header>

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
