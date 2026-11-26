import { Invoice as TInvoice } from "../api/invoice/Invoice";

export const INVOICE_TITLE_FIELD = "status";

export const InvoiceTitle = (record: TInvoice): string => {
  return record.status?.toString() || String(record.id);
};
