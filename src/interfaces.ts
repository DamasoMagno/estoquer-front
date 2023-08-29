export interface IOrder {
  id: number;
  value: number;
  finished: boolean;
  client: string;
  name: string;
  type: "income" | "outcome";
};