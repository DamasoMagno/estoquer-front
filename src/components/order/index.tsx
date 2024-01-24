"use client";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useModal } from "@/contexts/useModal";
import { useOrder } from "@/contexts/useOrder";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

const orderSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  client: z.string().min(1),
  type: z.enum(["income", "outcome"]),
  finished: z.boolean().default(false),
});

type Order = z.infer<typeof orderSchema>;

export function Order() {
  const { modalIsOpen, onSetModalIsOpen } = useModal();
  const { handleCreateNewOrder, updateOrder, currentOrder, setCurrentOrder } =
    useOrder();
  const [orderFinished, setOrderFinished] = useState(false);

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    values: {
      client: currentOrder?.client ?? "",
      name: currentOrder?.name ?? "",
      price: currentOrder?.price ?? 0,
      type: currentOrder?.type ?? "income",
      finished: currentOrder?.finished ?? false,
    },
  });

  useEffect(() => {
    setOrderFinished(false);

    if (!currentOrder) return;

    setOrderFinished(form.getValues("finished"));
  }, [modalIsOpen, currentOrder, form]);

  function handleCloseModal() {
    form.reset();

    setCurrentOrder(null);
    onSetModalIsOpen(false);
  }

  async function handleCreateOrder(data: Order) {
    try {
      if (currentOrder) {
        updateOrder(currentOrder.id, data);
      } else {
        handleCreateNewOrder(data);
      }

      handleCloseModal();
    } catch (error) { }
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
              name="price"
              render={({ field: { onChange, ...rest } }) => (
                <FormItem>
                  <FormLabel>Valor do pedido</FormLabel>
                  <FormControl>
                    <Input
                      onChange={(e) => onChange(Number(e.target.value))}
                      type="number"
                      {...rest}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            field.value === "income" ? "Entrada" : "Saída"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Entradas</SelectItem>
                      <SelectItem value="outcome">Saidas</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch("type") === "income" ? "Empresa" : "Cliente"}
                  </FormLabel>
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
                      disabled={orderFinished}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="ml-2">Finalizar entrega</FormLabel>
                </FormItem>
              )}
            />

            <Button className="mt-4" disabled={orderFinished}>
              Salvar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
