"use client";
import { AxiosError } from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Order as IOrder } from "@/types";
import { api } from "@/services/api";

interface OrderContextProps {
  orders: IOrder[];
  handleCreateNewOrder(data: IOrder): void;
  updateOrder(orderId: string, data: IOrder): void;
  handleDeleteOrder(orderId: string): void;
  orderResume: number;
}

interface OrderProviderProps {
  children: ReactNode;
}

const OrderContext = createContext({} as OrderContextProps);

export function OrderProvider({ children }: OrderProviderProps) {
  const [orders, setOrders] = useState<IOrder[]>([]);

  let orderResume = orders.reduce((initialValue, currentValue) => {
    const totalValue = initialValue += Number(currentValue.amount);
    return totalValue;
  }, 0);

  useEffect(() => {
    api.get<IOrder[]>("/").then(({ data }) => setOrders(data));
  }, []);

  async function handleCreateNewOrder(data: IOrder) {
    try {
      const response = await api.post("/", data);
      const order: IOrder = response.data;

      setOrders((state: IOrder[]) => [...state, order]);
    } catch (error) {
      if(error instanceof AxiosError){
        console.log(error.message)
      }
    }
  }

  async function updateOrder(orderId: string, data: IOrder) {
    try {
      const response = await api.put(`/${orderId}`, data);
      const orderUpdatted: IOrder = response.data;

      const newOrders = orders.map((order: IOrder) => {
        return order.id === orderUpdatted.id ? orderUpdatted : order;
      });

      setOrders(newOrders);
    } catch (error) {}
  }

  async function handleDeleteOrder(orderId: string) {
    try {
      await api.delete(`/${orderId}`);

      const ordersFilteredById = orders.filter(
        (order: IOrder) => order.id !== orderId
      );
      setOrders(ordersFilteredById);
    } catch (error) {}
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        handleCreateNewOrder,
        updateOrder,
        handleDeleteOrder,
        orderResume
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
