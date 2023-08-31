import { IOrder } from "@/interfaces";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  client: z.string().min(1),
  type: z.enum(["income", "outcome"]),
  finished: z.boolean().default(false),
});


export async function PUT(req: Request, { params }: { params: any }) {
  const data = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { name, client, price, finished, type } = orderSchema.parse(data);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const orderUpdatted = {
    name,
    client,
    finished,
    price,
    type,
    customerId: user?.id
  }

  const response = await supabase
    .from("orders")
    .update(orderUpdatted)
    .eq("id", params.orderId)
    .select()
    .single();

  const order: IOrder = response.data;
  return NextResponse.json(order);
}

export async function DELETE(req: Request, { params }: { params: any }) {
  const supabase = createRouteHandlerClient({ cookies });

  await supabase
    .from("orders")
    .delete()
    .eq("id", params.orderId);

  return NextResponse.json({});
}