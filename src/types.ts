export type Payment = {
  id: string;
  amount: number;
  status: "pendente" | "finalizado";
  clientName: string;
  onSetModalContentId?: (id: string) => void;
  orderName: string;
};