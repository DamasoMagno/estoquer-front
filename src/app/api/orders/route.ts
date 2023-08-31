import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { z } from "zod";

import { IOrder } from "@/interfaces";

const orderBodySchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1),
  client: z.string().min(1),
  type: z.enum(["income", "outcome"]),
  finished: z.boolean().default(false),
});

interface OrderInputs {
  name: string;
  client: string;
  price: number;
  type: "income" | "outcome";
  finished: boolean;
  customerId: string;
}

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const response = await supabase
    .from("orders")
    .select()
    .eq("customerId", user?.id);

  const orders = response.data as IOrder[];

  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const data = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  const { name, client, price, finished, type } = orderBodySchema.parse(data);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const newOrder: OrderInputs = {
    name,
    client,
    finished,
    price,
    type,
    customerId: String(user?.id)
  }

  const response = await supabase
    .from("orders")
    .insert(newOrder)
    .select()
    .single();

  const order: IOrder = response.data;
  return NextResponse.json(order);
}