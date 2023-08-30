"use client";
import { AxiosError } from "axios";
import { IOrder } from "@/interfaces";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

import { supabase } from "@/lib/supabase";

type OrderInputs = Omit<IOrder, "id">;

type OrderResume = {
  income: number;
  outcome: number;
};

interface OrderContextProps {
  orders: IOrder[];
  currentOrder: IOrder | null;
  orderResume: OrderResume;
  handleCreateNewOrder(data: OrderInputs): void;
  updateOrder(orderId: string, data: OrderInputs): void;
  handleDeleteOrder(orderId: string): void;
  setCurrentOrder(order: any): void;
}

interface OrderProviderProps {
  children: ReactNode;
}

const OrderContext = createContext({} as OrderContextProps);

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);

  let orderResume = orders.reduce(
    (initialValue, currentValue) => {
      if (currentValue.type === "income") {
        initialValue.income += currentValue.price;
      } else {
        initialValue.outcome += currentValue.price;
      }

      return initialValue;
    },
    {
      income: 0,
      outcome: 0,
    }
  );

  useEffect(() => {
    supabase
      .from("orders")
      .select()
      .then(({ data }) => {
        const orders = !!data ? (data as IOrder[]) : [];
        setOrders(orders);
      });
  }, []);

  async function handleCreateNewOrder(data: OrderInputs) {
    try {
      const response = await supabase
        .from("orders")
        .insert({ ...data })
        .select()
        .single();

      const order: IOrder = response.data;

      setOrders((state: IOrder[]) => [...state, order]);

      toast.success("Pedido cadastrado com sucesso");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  }

  async function updateOrder(orderId: string, data: OrderInputs) {
    try {
      const { data: supData } = await supabase
        .from("orders")
        .update({ ...data })
        .eq("id", orderId)
        .select()
        .single();

      const orderUpdatted: IOrder = supData;

      const newOrders = orders.map((order: IOrder) => {
        return order.id === orderUpdatted.id ? orderUpdatted : order;
      });

      setOrders(newOrders);

      toast.success("Pedido atualizado");
    } catch (error) {}
  }

  async function handleDeleteOrder(orderId: string) {
    try {
      await supabase.from("orders").delete().eq("id", orderId);

      const ordersFilteredById = orders.filter(
        (order: IOrder) => order.id !== orderId
      );

      setOrders(ordersFilteredById);

      toast.success("Pedido removido do sistema");
    } catch (error) {}
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        handleCreateNewOrder,
        updateOrder,
        handleDeleteOrder,
        orderResume,
        currentOrder,
        setCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
