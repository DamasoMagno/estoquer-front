import "@tanstack/table-core";

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    onSetModalOrderId(id: stromg): void;
    onDeleteOrder(id: string): void;
  }
}