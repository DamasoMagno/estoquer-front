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
import { IOrder } from "@/types";
import { useOrder } from "@/contexts/useOrder";
import { supabase } from "@/lib/supabase";

const orderSchema = z.object({
  name: z.string().min(1),
  value: z.number().min(1),
  client: z.string().min(1),
  finished: z.boolean().default(false),
});

type Order = z.infer<typeof orderSchema>;

export function Order() {
  const { modalIsOpen, onCloseModal, modalOrderId } = useModal();
  const { handleCreateNewOrder, updateOrder } = useOrder();

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      client: "",
      name: "",
      value: 0,
      finished: false,
    },
  });

  function setInputFieldsValue(data: IOrder) {
    form.setValue("name", data.name);
    form.setValue("value", data.value);
    form.setValue("client", data.client);
    form.setValue("finished", data.finished);
  }

  useEffect(() => {
    if (!modalOrderId) return;

    supabase
      .from("orders")
      .select()
      .eq("id", modalOrderId)
      .single()
      .then(({ data }) => setInputFieldsValue(data));
  }, [modalIsOpen, form, modalOrderId]);

  function handleCloseModal() {
    form.reset();
    onCloseModal();
  }

  async function handleCreateOrder(data: Order) {
    try {
      if (modalOrderId > 0) {
        updateOrder(modalOrderId, data);
      } else {
        handleCreateNewOrder(data);
      }

      handleCloseModal();
    } catch (error) {}
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
              name="name"
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
              name="value"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel>Valor do pedido</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => onChange(Number(e.target.value))}
                      {...rest}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client"
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
              name="finished"
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
