"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

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
import { useModal } from "@/contexts/useModal";
import { payments } from "../../../database";

const orderSchema = z.object({
  orderName: z.string(),
  orderValue: z.string(),
  clientName: z.string(),
  status: z.boolean().default(false),
});

type Order = z.infer<typeof orderSchema>;

interface OrderProps {}

export function Order(props: OrderProps) {
  const { modalState, setModalState, modalContentId, onSetModalContentId } = useModal();

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      clientName: "",
      orderName: "",
      orderValue: "",
      status: false,
    },
  });

  const modalIsOpen = modalState === "open";

  useEffect(() => {
    if (!modalState) return;

    const order = payments.find((payment) => payment.id === modalContentId);

    if (!order) return;

    form.setValue("orderName", order.pedido);
    form.setValue("orderValue", String(order.amount));
    form.setValue("clientName", order.clientName);
  }, [modalIsOpen]);

  function handleCloseModal(){
    form.reset();

    onSetModalContentId("");
    setModalState("closed");
  }

  return (
    <Dialog open={modalIsOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Pedido</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col gap-4">
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
              name="orderValue"
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
