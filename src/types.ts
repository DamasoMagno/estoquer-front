export interface IOrder {
  id: number;
  value: number;
  finished: boolean;
  client: string;
  onSetModalContentId?: (id: string) => void;
  name: string;
};