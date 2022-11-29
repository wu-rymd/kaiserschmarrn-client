import { Link } from "@cloudscape-design/components";
import { addColumnSortLabels } from "./TableConfigUtils";

export const ACCOUNT_PREFERENCES = {
  pageSize: 10,
  visibleContent: ["accountId", "balance", "startingBalance"],
  wrapLines: false,
};

export const ACCOUNT_COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: "accountId",
    header: "Account ID",
    cell: (item: any) => item.accountId,
    minWidth: 180,
    sortingField: "accountId",
  },
  {
    id: "balance",
    header: "Balance",
    cell: (item: any) => item.balance,
    minWidth: 180,
    sortingField: "balance",
  },
  {
    id: "startingBalance",
    header: "Starting Balance",
    cell: (item: any) => item.startingBalance,
    minWidth: 180,
    sortingField: "startingBalance",
  },
  {
    id: "clientId",
    header: "Client ID",
    cell: (item: any) => item.clientId,
    minWidth: 180,
    sortingField: "clientId",
  },
]);

export const ACCOUNT_PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 Accounts" },
  { value: 25, label: "25 Accounts" },
  { value: 50, label: "50 Accounts" },
];

export const ACCOUNT_FILTERING_PROPERTIES = [
  {
    propertyLabel: "Account ID",
    key: "accountId",
    groupValuesLabel: "Account ID values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "Balance",
    key: "balance",
    groupValuesLabel: "Balance values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "Starting Balance",
    key: "startingBalance",
    groupValuesLabel: "Starting Balance values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "Client ID",
    key: "clientId",
    groupValuesLabel: "Client ID values",
    operators: [":", "!:", "=", "!="],
  },
];

export const ACCOUNT_VISIBLE_CONTENT_OPTIONS = [
  {
    label: "Main Account properties",
    options: [
      { id: "accountId", label: "Account ID", editable: false },
      { id: "balance", label: "Balance" },
      { id: "startingBalance", label: "Starting Balance" },
      { id: "clientId", label: "Client ID" },
    ],
  },
];
