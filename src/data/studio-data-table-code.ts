import source from "@/data/component-sources.json";

export const STUDIO_DATA_TABLE_SOURCE = source["studio-data-table.tsx"];

export const STUDIO_DATA_TABLE_USAGE = `"use client";

import { useState } from "react";
import {
  StudioDataTable,
  type StudioTableColumn,
} from "@/components/ui/studio-data-table";

// Copy studio-data-table.module.css beside studio-data-table.tsx.
type Invoice = {
  id: string;
  client: string;
  status: "Paid" | "Pending";
  amount: number;
};

const invoices: Invoice[] = [
  { id: "INV-001", client: "Atlas", status: "Paid", amount: 8400 },
  { id: "INV-002", client: "Forma", status: "Pending", amount: 3200 },
  { id: "INV-003", client: "Index", status: "Paid", amount: 1800 },
];

const columns: StudioTableColumn<Invoice>[] = [
  { id: "client", header: "Client", accessor: (row) => row.client },
  { id: "status", header: "Status", accessor: (row) => row.status },
  {
    id: "amount",
    header: "Amount",
    accessor: (row) => row.amount, // Numeric sorting uses the raw value.
    cell: (row) => "$" + row.amount.toLocaleString("en-US"),
    align: "end",
  },
];

export function InvoiceLedger() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <StudioDataTable
      title="Invoice ledger"
      description="A clear view of your client payments."
      data={invoices} // Replace with your complete, client-side dataset.
      columns={columns}
      getRowId={(row) => row.id}
      getRowLabel={(row) => row.client}
      initialSort={{ columnId: "amount", direction: "desc" }}
      initialPageSize={5}
      pageSizeOptions={[5, 10, 20]}
      selectedIds={selectedIds}
      onSelectionChange={setSelectedIds}
      renderRowDetails={(row) => (
        <div>
          <p>Invoice {row.id}</p>
          <p>{row.client} — {row.status}</p>
          <p>Amount: {"$" + row.amount.toLocaleString("en-US")}</p>
        </div>
      )}
    />
  );
}

// Optional bulk actions:
// renderSelectionActions={(rows) => (
//   <button type="button" onClick={() => exportInvoices(rows)}>
//     Export selected
//   </button>
// )}
// Implement exportInvoices in your application.
// isLoading={requestPending} shows the loading state and disables table controls.
// searchable={false}, selectable={false}, and density="compact" create a reading view.
`;
