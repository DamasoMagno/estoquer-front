"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { IOrder } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "name",
    header: "Pedido",
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "client",
    header: "Cliente",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("client")}
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ row }) => {
      const amount = Number(row.getValue("value"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "finished",
    header: "Status",
    cell: ({ row }) => {
      const orderPendent = !row.getValue("finished");

      return (
        <Badge className={cn({ "bg-red-500": orderPendent })}>
          {row.getValue("finished") ? "finalizado" : "pendente"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <p className="text-center">Ações</p>,
    cell: ({ row, table: { options } }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => options.meta?.onSetModalOrderId(row.original.id)}
          >
            <Edit size={18} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => options.meta?.onDeleteOrder(row.original.id)}
          >
            <Trash size={18} />
          </Button>
        </div>
      );
    },
  },
];
