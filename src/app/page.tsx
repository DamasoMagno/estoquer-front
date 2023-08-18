"use client";
import { useState } from "react";

import { payments } from "../../database";

import { DataTable } from "../components/orders";
import { columns } from "../components/orders/columns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [filter, setFilter] = useState("");

  return (
    <div className="grid lg:grid-cols-screen">
      <main className="max-w-6xl mx-auto w-full mt-12">
        <div className="flex justify-between gap-4">
          <Input
            placeholder="Buscar pedido"
            className="w-4/5"
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button className="w-48">Novo produto</Button>
        </div>

        <DataTable columns={columns} filter={filter} data={payments} />
      </main>
    </div>
  );
}
