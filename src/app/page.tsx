"use client";
import { formattPrice } from "@/utils/formatt-price";
import { useOrder } from "@/contexts/useOrder";

import { Orders } from "../components/orders";

import { Order } from "@/components/order";

export default function Home() {
  const { orderResume } = useOrder();

  return (
    <>
      <div className="max-w-4xl mx-auto px-4">
        <header className="flex items-center gap-2 mt-4">
          <h2 className="text-xl bold">Resumo de pedidos</h2>
        </header>

        <div className="mt-4 overflow-scroll flex gap-4 lg:overflow-auto scrollbar-hide">
          <div className="bg-white px-4 py-4 rounded-md flex-1 max-w-xs">
            <header>
              <span>Entradas</span>
            </header>
            <strong className="text-xl mt-2 block">
              {formattPrice(orderResume.income)}
            </strong>
          </div>
          <div className="bg-white px-4 py-4 rounded-md flex-1 max-w-xs">
            <header>
              <span>Saídas</span>
            </header>
            <strong className="text-xl mt-2 block">
              {formattPrice(orderResume.outcome)}
            </strong>
          </div>
        </div>

        <main className="mt-8 bg-white py-8 px-6">
          <Orders />
        </main>
      </div>
      <Order />
    </>
  );
}
