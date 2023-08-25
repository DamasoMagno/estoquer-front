import "@tanstack/table-core";

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    onSetModalContentId(id: string): void;
    onDeleteOrder(id: string): void;
  }
}