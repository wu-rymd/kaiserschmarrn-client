import { addColumnSortLabels } from "./TableConfigUtils";

export const TRANSACTION_PREFERENCES = {
  pageSize: 10,
  visibleContent: [
    "uuid",
    "accountId",
    "tradableType",
    "tradableId",
    "quantity",
    // "transactionType",
    // "transactionStatus",
  ],
  wrapLines: false,
};

export const TRANSACTION_COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: "uuid",
    header: "UUID",
    cell: (item: any) => item.uuid,
    sortingField: "uuid",
  },
  {
    id: "accountId",
    header: "Account ID",
    cell: (item: any) => item.accountId,
    sortingField: "accountId",
  },
  {
    id: "tradableType",
    header: "Tradable Type",
    cell: (item: any) => item.tradableType,
    sortingField: "tradableType",
  },
  {
    id: "tradableId",
    header: "Tradable ID",
    cell: (item: any) => item.tradableId,
    sortingField: "tradableId",
  },
  {
    id: "quantity",
    header: "Quantity",
    cell: (item: any) => item.quantity,
    sortingField: "quantity",
  },
  {
    id: "transactionType",
    header: "Transaction Type",
    cell: (item: any) => item.transactionType,
    sortingField: "transactionType",
  },
  {
    id: "transactionStatus",
    header: "Transaction Status",
    cell: (item: any) => item.transactionStatus,
    sortingField: "transactionStatus",
  },
]);

export const TRANSACTION_PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 Transactions" },
  { value: 25, label: "25 Transactions" },
  { value: 50, label: "50 Transactions" },
];

export const TRANSACTION_FILTERING_PROPERTIES = [
  {
    propertyLabel: "UUID",
    key: "uuid",
    groupValuesLabel: "UUID values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "accountId",
    key: "accountId",
    groupValuesLabel: "Account ID values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "tradableType",
    key: "tradableType",
    groupValuesLabel: "Tradable Type values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "tradableId",
    key: "tradableId",
    groupValuesLabel: "Tradable ID values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "quantity",
    key: "quantity",
    groupValuesLabel: "Quantity values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "transactionType",
    key: "transactionType",
    groupValuesLabel: "Transaction Type values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "transactionStatus",
    key: "transactionStatus",
    groupValuesLabel: "Transaction Status values",
    operators: [":", "!:", "=", "!="],
  },
];

export const TRANSACTION_VISIBLE_CONTENT_OPTIONS = [
  {
    label: "Main Transaction properties",
    options: [
      { id: "uuid", label: "UUID", editable: false },
      { id: "accountId", label: "accountId" },
      { id: "tradableType", label: "tradableType" },
      { id: "tradableId", label: "tradableId" },
      { id: "quantity", label: "quantity" },
      { id: "transactionType", label: "transactionType" },
      { id: "transactionStatus", label: "transactionStatus" },
    ],
  },
];
