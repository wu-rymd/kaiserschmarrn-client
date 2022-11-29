import { Link } from "@cloudscape-design/components";
import { addColumnSortLabels } from "./TableConfigUtils";

export const STOCK_PREFERENCES = {
  pageSize: 10,
  visibleContent: ["stockId", "price"],
  wrapLines: false,
};

export const STOCK_COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: "stockId",
    header: "Stock ID",
    cell: (item: any) => (
      <Link href={`/stocks/${item.stockId}/historical`}>{item.stockId}</Link>
    ),
    sortingField: "stockId",
  },
  {
    id: "price",
    header: "Price",
    cell: (item: any) => item.price,
    sortingField: "price",
  },
]);

export const STOCK_PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 Stocks" },
  { value: 25, label: "25 Stocks" },
  { value: 50, label: "50 Stocks" },
];

export const STOCK_FILTERING_PROPERTIES = [
  {
    propertyLabel: "Stock ID",
    key: "stockId",
    groupValuesLabel: "Stock ID values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "Price",
    key: "price",
    groupValuesLabel: "Price values",
    operators: [":", "!:", "=", "!="],
  },
];

export const STOCK_VISIBLE_CONTENT_OPTIONS = [
  {
    label: "Main Stock properties",
    options: [
      { id: "stockId", label: "Stock ID", editable: false },
      { id: "price", label: "Price" },
    ],
  },
];
