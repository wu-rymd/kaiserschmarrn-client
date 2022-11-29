import { addColumnSortLabels } from "./TableConfigUtils";

export const CRYPTO_PREFERENCES = {
  pageSize: 10,
  visibleContent: ["cryptocurrencyId", "price"],
  wrapLines: false,
};

export const CRYPTO_COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: "cryptocurrencyId",
    header: "Crypto ID",
    cell: (item: any) => item.cryptocurrencyId,
    minWidth: 180,
    sortingField: "cryptocurrencyId",
  },
  {
    id: "price",
    header: "Price",
    cell: (item: any) => item.price,
    minWidth: 180,
    sortingField: "price",
  },
]);

export const CRYPTO_PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 Cryptos" },
  { value: 25, label: "25 Cryptos" },
  { value: 50, label: "50 Cryptos" },
];

export const CRYPTO_FILTERING_PROPERTIES = [
  {
    propertyLabel: "Crypto ID",
    key: "cryptocurrencyId",
    groupValuesLabel: "Crypto ID values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "Price",
    key: "price",
    groupValuesLabel: "Price values",
    operators: [":", "!:", "=", "!="],
  },
];

export const CRYPTO_VISIBLE_CONTENT_OPTIONS = [
  {
    label: "Main Crypto properties",
    options: [
      { id: "cryptocurrencyId", label: "Crypto ID", editable: false },
      { id: "price", label: "Price" },
    ],
  },
];
