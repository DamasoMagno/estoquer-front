export interface IOrder {
  id: string;
  price: number;
  finished: boolean;
  client: string;
  name: string;
  type: "income" | "outcome";
};