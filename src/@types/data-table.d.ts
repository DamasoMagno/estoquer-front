import "@tanstack/table-core";

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    onSetModalOrderId(id: number): void;
    onDeleteOrder(id: number): void;
  }
}