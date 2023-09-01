"use client";
import { Skeleton } from "@/components/ui/skeleton";

import { useOrder } from "@/contexts/useOrder";
import { formattPrice } from "@/utils/formatt-price";

export function Resume() {
  const { orderResume, ordersLoading } = useOrder();

  return (
    <div className="mt-4 overflow-scroll flex gap-4 lg:overflow-auto scrollbar-hide">
      <div className="bg-white px-4 py-4 rounded-md flex-1 max-w-xs">
        <header>
          <span>Entradas</span>
        </header>
        <strong className="text-xl mt-2 block">
          {ordersLoading ? (
            <Skeleton className="w-full h-[30px]" />
          ) : (
            formattPrice(orderResume.income)
          )}
        </strong>
      </div>
      <div className="bg-white px-4 py-4 rounded-md flex-1 max-w-xs">
        <header>
          <span>Saídas</span>
        </header>
        <strong className="text-xl mt-2 block">
          {ordersLoading ? (
            <Skeleton className="w-full h-[30px]" />
          ) : (
            formattPrice(orderResume.outcome)
          )}
        </strong>
      </div>
    </div>
  );
}
