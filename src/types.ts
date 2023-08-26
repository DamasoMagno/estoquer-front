export interface IOrder {
  id: string;
  amount: string;
  status: boolean;
  clientName: string;
  onSetModalContentId?: (id: string) => void;
  orderName: string;
};