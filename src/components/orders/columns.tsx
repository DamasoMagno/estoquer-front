"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash } from "lucide-react";
import { Payment } from "@/types";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "pedido",
    header: "Pedido",
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue("pedido")}</div>
    ),
  },
  {
    accessorKey: "clientName",
    header: "Cliente",
    cell: ({ row }) => {
      return (
        <div className="text-left font-medium">
          {row.getValue("clientName")}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const orderFinished = row.getValue("status") !== "finalizado";

      return (
        <Badge className={cn({ "bg-red-500": orderFinished })}>
          {row.getValue("status")}
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
            onClick={() => options.meta?.onSetModalContentId(row.original.id)}
          >
            <Edit size={18} />
          </Button>
          <Button variant="ghost">
            <Trash size={18} />
          </Button>
        </div>
      );
    },
  },
];
