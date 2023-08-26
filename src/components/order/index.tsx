"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useModal } from "@/contexts/useModal";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { api } from "@/services/api";
import { AxiosError } from "axios";
import { IOrder } from "@/types";
import { useOrder } from "@/contexts/useOrder";

const orderSchema = z.object({
  orderName: z.string().min(1),
  amount: z.string().min(1),
  clientName: z.string().min(1),
  status: z.boolean().default(false),
});

type Order = z.infer<typeof orderSchema>;

export function Order() {
  const { modalIsOpen, onCloseModal, modalOrderId } = useModal();
  const { handleCreateNewOrder, updateOrder } = useOrder();

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      clientName: "",
      orderName: "",
      amount: "",
      status: false,
    },
  });

  function setInputFieldsValue(data: IOrder) {
    form.setValue("orderName", data.orderName);
    form.setValue("amount", String(data.amount));
    form.setValue("clientName", data.clientName);
    form.setValue("status", data.status);
  }

  useEffect(() => {
    if (!modalOrderId) return;

    api.get(`/${modalOrderId}`).then(({ data }) => setInputFieldsValue(data));
  }, [modalIsOpen, form, modalOrderId]);

  function handleCloseModal() {
    form.reset();
    onCloseModal();
  }

  async function handleCreateOrder(data: Order) {
    try {
      if (modalOrderId) {
        const response = await api.put(`/${modalOrderId}`, data);
        const orderUpdatted: IOrder = response.data;
  
        updateOrder(orderUpdatted.id, orderUpdatted);
      } else {
        handleCreateNewOrder(data);
      }

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }

    handleCloseModal();
  }

  return (
    <Dialog open={modalIsOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Pedido</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateOrder)}
          >
            <FormField
              control={form.control}
              name="orderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pedido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do pedido</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="ml-2">Finalizar entrega</FormLabel>
                </FormItem>
              )}
            />

            <Button className="mt-4" type="submit">
              Salvar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
