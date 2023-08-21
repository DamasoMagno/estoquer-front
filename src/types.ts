export type Payment = {
  id: string;
  amount: number;
  status: "pendente" | "finalizado";
  clientName: string;
  pedid: string;
};