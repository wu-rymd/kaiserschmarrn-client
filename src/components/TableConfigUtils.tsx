export const headerLabel = (title: any, sorted: any, descending: any) => {
  return `${title}, ${
    sorted ? `sorted ${descending ? 'descending' : 'ascending'}` : 'not sorted'
  }.`;
};

export const addColumnSortLabels = (columns: any) =>
  columns.map((col: any) => ({
    ariaLabel:
      col.sortingField || col.sortingComparator
        ? (sortState: any) =>
            headerLabel(col.header, sortState.sorted, sortState.descending)
        : undefined,
    ...col,
  }));
