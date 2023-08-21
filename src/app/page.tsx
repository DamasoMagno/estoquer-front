"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { payments } from "../../database";

import { DataTable } from "../components/orders";
import { columns } from "../components/orders/columns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const router = useRouter();
  const [filter, setFilter] = useState("");

  function logoutUser(){
    router.push("/sign")
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <header className="flex items-center gap-2 mt-4">
        <Button variant="ghost" onClick={logoutUser}>
          <LogOut size={20} />
        </Button>
        <h1 className="text-xl bold">Resumo de pedidos</h1>
      </header>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white px-4 py-4 rounded-md">
          <header>
            <span>Entradas</span>
          </header>
          <strong className="text-xl mt-2 block">12.000,00</strong>
        </div>
        <div className="bg-white px-4 py-4 rounded-md">
          <header>
            <span>Saídas</span>
          </header>
          <strong className="text-xl mt-2 block">12.000,00</strong>
        </div>
        <div className="bg-white px-4 py-4 rounded-md">
          <header>
            <span>Total</span>
          </header>
          <strong className="text-xl mt-2 block">12.000,00</strong>
        </div>
      </div>

      <main className="mt-8 bg-white py-8 px-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <Input
            placeholder="Buscar pedido"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button className="lg:w-48">Novo pedido</Button>
        </div>

        <DataTable columns={columns} filter={filter} data={payments} />
      </main>
    </div>
  );
}
