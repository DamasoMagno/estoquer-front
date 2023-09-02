"use client";

import { AxiosError } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

import { IOrder } from "@/interfaces";
import { api } from "@/services/api";

type OrderInputs = Omit<IOrder, "id">;

type OrderResume = {
  income: number;
  outcome: number;
};

interface OrderContextProps {
  orders: IOrder[];
  currentOrder: IOrder | null;
  orderResume: OrderResume;
  ordersLoading: boolean;
  handleCreateNewOrder(data: OrderInputs): Promise<void>;
  updateOrder(orderId: string, data: OrderInputs): Promise<void>;
  handleDeleteOrder(orderId: string): Promise<void>;
  setCurrentOrder(order: any): void;
}

interface OrderProviderProps {
  children: ReactNode;
}

const OrderContext = createContext({} as OrderContextProps);

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
  const [ordersLoading, setOrdersLoading] = useState<boolean>(true);

  const path = usePathname();

  let orderResume: OrderResume = orders.reduce(
    (initialValue, currentValue) => {
      if (currentValue.finished) {
        switch (currentValue.type) {
          case "income":
            initialValue.income += currentValue.price;
            break;
          case "outcome":
            initialValue.outcome += currentValue.price;
            break;
        }
      }

      return initialValue;
    },
    {
      income: 0,
      outcome: 0,
    }
  );

  const paths = ["/auth", "/sign"];

  useEffect(() => {
    if (paths.includes(path)) return;

    api
      .get<IOrder[]>("/orders")
      .then(({ data }) => setOrders(data))
      .finally(() => setOrdersLoading(false));
  }, [path]);

  async function handleCreateNewOrder(data: OrderInputs) {
    try {
      const { data: response } = await api.post("/orders", data);
      const order: IOrder = response;

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
      const { data: response } = await api.put(`/orders/${orderId}`, data);
      const orderUpdatted: IOrder = response;

      const newOrders = orders.map((order: IOrder) =>
        order.id === orderUpdatted.id ? orderUpdatted : order
      );

      setOrders(newOrders);
      toast.success("Pedido atualizado");
    } catch (error) {}
  }

  async function handleDeleteOrder(orderId: string) {
    try {
      await api.delete(`/orders/${orderId}`);

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
        ordersLoading,
        currentOrder,
        handleCreateNewOrder,
        updateOrder,
        handleDeleteOrder,
        orderResume,
        setCurrentOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
