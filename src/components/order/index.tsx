"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { useModal } from "@/contexts/useModal";
import { useOrder } from "@/contexts/useOrder";
import { supabase } from "@/lib/supabase";

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
  const { modalIsOpen, onCloseModal, modalOrderId } = useModal();
  const { handleCreateNewOrder, updateOrder } = useOrder();

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      client: "",
      name: "",
      price: 0,
      finished: false,
    },
  });

  function setInputFieldsValue(data: Order) {
    form.setValue("name", data.name);
    form.setValue("price", data.price);
    form.setValue("client", data.client);
    form.setValue("finished", data.finished);
    form.setValue("type", data.type);
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
      if (modalOrderId) {
        updateOrder(modalOrderId, data);
      } else {
        handleCreateNewOrder(data);
      }

      handleCloseModal();
    } catch (error) {}
  }

  const selectTypes = {
    income: "Entrada",
    outcome: "Saída",
  };

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
                        <SelectValue placeholder={selectTypes[field.value]} />
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
