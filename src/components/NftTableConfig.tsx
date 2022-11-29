import { addColumnSortLabels } from "./TableConfigUtils";

export const NFT_PREFERENCES = {
  pageSize: 10,
  visibleContent: ["nftId", "price"],
  wrapLines: false,
};

export const NFT_COLUMN_DEFINITIONS = addColumnSortLabels([
  {
    id: "nftId",
    header: "NFT ID",
    cell: (item: any) => item.nftId,
    minWidth: 180,
    sortingField: "nftId",
  },
  {
    id: "price",
    header: "Price",
    cell: (item: any) => item.price,
    minWidth: 180,
    sortingField: "price",
  },
]);

export const NFT_PAGE_SIZE_OPTIONS = [
  { value: 10, label: "10 NFTs" },
  { value: 25, label: "25 NFTs" },
  { value: 50, label: "50 NFTs" },
];

export const NFT_FILTERING_PROPERTIES = [
  {
    propertyLabel: "NFT ID",
    key: "nftId",
    groupValuesLabel: "NFT ID values",
    operators: [":", "!:", "=", "!="],
  },
  {
    propertyLabel: "Price",
    key: "price",
    groupValuesLabel: "Price values",
    operators: [":", "!:", "=", "!="],
  },
];

export const NFT_VISIBLE_CONTENT_OPTIONS = [
  {
    label: "Main NFT properties",
    options: [
      { id: "nftId", label: "NFT ID", editable: false },
      { id: "price", label: "Price" },
    ],
  },
];
