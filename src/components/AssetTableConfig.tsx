import { addColumnSortLabels } from "./TableConfigUtils";

export const ASSET_PREFERENCES = {
  pageSize: 10,
  visibleContent: ["accountId", "quantity", "tradableType", "tradableId"],
  wrapLines: false,
};

export const ASSET_COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: "accountId",
    header: "Account ID",
    cell: (item: any) => item.accountId,
    sortingField: "accountId",
  },
  {
    id: "quantity",
    header: "Quantity",
    cell: (item: any) => item.quantity,
    sortingField: "quantity",
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
]);

export const ASSET_PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 Assets" },
  { value: 25, label: "25 Assets" },
  { value: 50, label: "50 Assets" },
];

export const ASSET_FILTERING_PROPERTIES = [
  {
    propertyLabel: "accountId",
    key: "accountId",
    groupValuesLabel: "Account ID values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "quantity",
    key: "quantity",
    groupValuesLabel: "Quantity values",
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
];

export const ASSET_VISIBLE_CONTENT_OPTIONS = [
  {
    label: "Main Asset properties",
    options: [
      { id: "accountId", label: "accountId" },
      { id: "quantity", label: "quantity" },
      { id: "tradableType", label: "tradableType" },
      { id: "tradableId", label: "tradableId" },
    ],
  },
];
