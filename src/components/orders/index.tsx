"use client";
import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { columns } from "./columns";
import { useModal } from "@/contexts/useModal";
import { useOrder } from "@/contexts/useOrder";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function Orders() {
  const { onSetModalIsOpen } = useModal();
  const { orders, handleDeleteOrder, setCurrentOrder, ordersLoading } =
    useOrder();

  const [filter, setFilter] = useState("");

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      onSetModalCurrentOrder,
      onDeleteOrder: handleDeleteOrder,
    },
    state: {
      globalFilter: filter,
    },
  });

  function onSetModalCurrentOrder(orderId: string) {
    const order = orders.find((order) => order.id === orderId);
    setCurrentOrder(order);

    onSetModalIsOpen(true);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Input
          placeholder="Buscar pedido"
          onChange={(e) => setFilter(e.target.value)}
        />

        <Button className="sm:w-48" onClick={() => onSetModalIsOpen(true)}>
          Novo pedido
        </Button>
      </div>

      <div className="mt-8">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
