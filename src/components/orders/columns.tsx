"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { IOrder } from "@/interfaces";

import { formattPrice } from "@/utils/formatt-price";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

import { Button } from "../ui/button";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "name",
    header: "Pedido",
    cell: ({ row }) => (
      <p className="text-left font-medium">{row?.getValue("name")}</p>
    ),
  },
  {
    accessorKey: "client",
    header: "Cliente",
    cell: ({ row }) => (
      <div className="text-left font-medium">{row?.getValue("client")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: "Valor",
    cell: ({ row }) => {
      const amount = Number(row?.getValue("price"));
      return (
        <div className="text-left font-medium">{formattPrice(amount)}</div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const orderCategory =
        row?.getValue("type") === "income" ? "Entrada" : "Saída";

      return <div>{orderCategory}</div>;
    },
  },
  {
    accessorKey: "finished",
    header: "Status",
    cell: ({ row }) => {
      const orderPendent = !row?.getValue("finished");

      return (
        <Badge className={cn({ "bg-red-500": orderPendent })}>
          {row?.getValue("finished") ? "finalizado" : "pendente"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <p className="text-center">Ações</p>,
    cell: ({ row, table }) => {
      const actions = table.options.meta;

      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => actions?.onSetModalCurrentOrder(row?.original.id)}
          >
            <Edit size={18} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => actions?.onDeleteOrder(row?.original.id)}
          >
            <Trash size={18} />
          </Button>
        </div>
      );
    },
  },
];
