"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { DataTable } from "../components/orders";
import { columns } from "../components/orders/columns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/contexts/useModal";
import { Order } from "@/components/order";
import { Payment } from "@/types";
import { api } from "@/services/api";

export default function Home() {
  const { setModalState } = useModal();
  const router = useRouter();

  const [filter, setFilter] = useState("");
  const [payments, setPayments] = useState<Payment[]>([]);

  function logoutUser() {
    router.push("/sign");
  }

  useEffect(() => {
    api.get("/").then(({ data }) => setPayments(data));
  }, []);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <header className="flex items-center gap-2 mt-4">
          <Button variant="outline" onClick={logoutUser}>
            <LogOut size={16} />
          </Button>
          <h2 className="text-xl bold">Resumo de pedidos</h2>
        </header>

        <div className="mt-4 overflow-scroll flex gap-4 lg:overflow-auto scrollbar-hide">
          <div className="bg-white px-4 py-4 rounded-md flex-1 min-w-[200px]">
            <header>
              <span>Entradas</span>
            </header>
            <strong className="text-xl mt-2 block">12.000000,00</strong>
          </div>
          <div className="bg-white px-4 py-4 rounded-md flex-1 min-w-[200px]">
            <header>
              <span>Saídas</span>
            </header>
            <strong className="text-xl mt-2 block">12.0000000,00</strong>
          </div>
          <div className="bg-white px-4 py-4 rounded-md flex-1 min-w-[200px]">
            <header>
              <span>Total</span>
            </header>
            <strong className="text-xl mt-2 block">12.000,00</strong>
          </div>
        </div>

        <main className="mt-8 bg-white py-8 px-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Input
              placeholder="Buscar pedido"
              onChange={(e) => setFilter(e.target.value)}
            />

            <Button className="sm:w-48" onClick={() => setModalState("open")}>
              Novo pedido
            </Button>
          </div>

          <DataTable columns={columns} filter={filter} data={payments} />
        </main>
      </div>

      <Order setPayments={setPayments} />
    </>
  );
}
