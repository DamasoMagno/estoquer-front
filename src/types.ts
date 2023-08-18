export type Payment = {
  id: string;
  amount: number;
  status: "pendent" | "finished";
  clientName: string;
  pedid: string;
};