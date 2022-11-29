import { useState } from 'react';
import { useCollection } from '@cloudscape-design/collection-hooks';
import {
  Box,
  Button,
  Header,
  Link,
  Pagination,
  PropertyFilter,
  SpaceBetween,
  Table,
  Alert,
  CollectionPreferences,
} from '@cloudscape-design/components';

const TableEmptyState = (props: any) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No {props.resourceName.toLowerCase()}s</b>
        <Box variant="p" color="inherit">
          No {props.resourceName.toLowerCase()}s associated with this resource.
        </Box>
      </div>
      <Button>Try again</Button>
    </SpaceBetween>
  </Box>
);

const TableNoMatchState = (props: any) => (
  <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
    <SpaceBetween size="xxs">
      <div>
        <b>No matches</b>
        <Box variant="p" color="inherit">
          We can't find a match.
        </Box>
      </div>
      <Button onClick={props.onClearFilter}>Clear filter</Button>
    </SpaceBetween>
  </Box>
);

const paginationLabels = {
  nextPageLabel: 'Next page',
  previousPageLabel: 'Previous page',
  pageLabel: (pageNumber: any) => `Page ${pageNumber} of all pages`,
};

const selectionLabels = {
  itemSelectionLabel: (data: any, row: any) => `select ${row.id}`,
  allItemsSelectionLabel: () => 'select all',
  selectionGroupLabel: 'Selection',
};

const InfoLink = (props: any) => (
  <Link variant="info" id={props.id} onFollow={props.onFollow}>
    Info
  </Link>
);

const getHeaderCounterText = (items = [], selectedItems = []) => {
  return selectedItems && selectedItems.length > 0
    ? `(${selectedItems.length}/${items.length})`
    : `(${items.length})`;
};

const TableHeader = (props: any) => {
  return (
    <Header
      variant={props.variant}
      counter={getHeaderCounterText(props.totalItems, props.selectedItems)}
      info={
        props.updateTools && (
          <InfoLink
            onFollow={props.updateTools}
            ariaLabel={`Information about ${props.title}.`}
          />
        )
      }
      description={props.description}
      actions={props.actionButtons}
    >
      {props.title}
    </Header>
  );
};

function FullPageHeader(props: {
  resourceName: any;
  selectedItems: any;
  updateTools: any;
  totalItems: any;
  serverSide: any;
}) {
  const isOnlyOneSelected = props.selectedItems.length === 1;

  return (
    <Box>
      <TableHeader
        variant="awsui-h1-sticky"
        title={`${props.resourceName}s`}
        selectedItem={props.selectedItems}
        actionButtons={
          <SpaceBetween size="xs" direction="horizontal">
            <Button
              disabled={!isOnlyOneSelected}
              // onClick={() => setCardVisible(true)}
            >
              View details
            </Button>
            <Button
              disabled={!isOnlyOneSelected}
              // onClick={() => getAccount(props.selectedItems[0])}
            >
              Edit
            </Button>
            <Button
              disabled={props.selectedItems.length === 0}
              //  onClick={() => deleteAccount(props.selectedItems[0])}
            >
              Delete
            </Button>
            <Button
              variant="primary"
              // onClick={() => setCreateVisible(true)}
            >
              Create
            </Button>
          </SpaceBetween>
        }
      />
    </Box>
  );
}

export function TableComponent(props: {
  loadingText: any;
  resourceName: any;
  data: any;
  updateTools: any;
  columnDefinitions: any;
  preferences: any;
  filteringProperties: any;
  selectedItems: any;
  setSelectedItems: any;
  offset: any;
  setOffset: any;
  limit: any;
  count: any;
  setPreferences: any;
  pageSizeOptions: any;
  visibleContentOptions: any;
}) {
  let filteringProperties = props.filteringProperties;
  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    paginationProps,
    propertyFilterProps,
  } = useCollection(props.data, {
    propertyFiltering: {
      filteringProperties,
      empty: <TableEmptyState resourceName={props.resourceName} />,
      noMatch: (
        <TableNoMatchState
          onClearFilter={() => {
            actions.setPropertyFiltering({ tokens: [], operation: 'and' });
          }}
        />
      ),
    },
    pagination: { pageSize: props.preferences.pageSize },
    sorting: { defaultState: { sortingColumn: props.columnDefinitions[0] } },
    selection: {},
  });

  const [currentPageIndex, setCurrentPageIndex] = useState(
    Math.floor(props.offset / props.limit) + 1
  );

  const onPageChange = (detail: any) => {
    setCurrentPageIndex(detail.currentPageIndex);
    props.setOffset((detail.currentPageIndex - 1) * props.limit);
  };

  return (
    <Table
      {...collectionProps}
      items={items}
      columnDefinitions={props.columnDefinitions}
      visibleColumns={props.preferences.visibleContent}
      ariaLabels={selectionLabels}
      selectionType="single"
      onSelectionChange={({ detail }) => {
        props.setSelectedItems(detail.selectedItems);
      }}
      selectedItems={props.selectedItems}
      variant="full-page"
      stickyHeader={true}
      resizableColumns={true}
      wrapLines={props.preferences.wrapLines}
      // onColumnWidthsChange={props.saveWidths}
      header={
        <FullPageHeader
          resourceName={props.resourceName}
          selectedItems={props.selectedItems}
          totalItems={props.data}
          updateTools={props.updateTools}
          serverSide={true}
        />
      }
      loadingText={props.loadingText}
      filter={
        <PropertyFilter
          i18nStrings={PROPERTY_FILTERING_I18N_CONSTANTS}
          {...propertyFilterProps}
          countText={getFilterCounterText(filteredItemsCount)}
          expandToViewport={true}
        />
      }
      pagination={
        <Pagination
          {...paginationProps}
          ariaLabels={paginationLabels}
          currentPageIndex={currentPageIndex}
          onChange={({ detail }) =>
            /*props.setOffset(detail.currentPageIndex - 1 + props.limit - 1)*/
            /*props.setOffset(props.offset + props.limit)*/
            /*setCurrentPageIndex(detail.currentPageIndex)*/
            onPageChange(detail)
          }
          pagesCount={Math.ceil(props.count / props.limit)}
        />
      }
      preferences={
        <Preferences
          preferences={props.preferences}
          setPreferences={props.setPreferences}
          pageSizeOptions={props.pageSizeOptions}
          visibleContentOptions={props.visibleContentOptions}
        />
      }
    />
  );
}

function Preferences(props: {
  // disabled: any;
  preferences: any;
  setPreferences: any;
  pageSizeOptions: any;
  visibleContentOptions: any;
}) {
  return (
    <CollectionPreferences
      title="Preferences"
      confirmLabel="Confirm"
      cancelLabel="Cancel"
      // disabled={props.disabled}
      preferences={props.preferences}
      onConfirm={({ detail }: { detail: any }) => props.setPreferences(detail)}
      pageSizePreference={{
        title: 'Page size',
        options: props.pageSizeOptions,
      }}
      wrapLinesPreference={{
        label: 'Wrap lines',
        description: 'Check to see all the text and wrap the lines',
      }}
      visibleContentPreference={{
        title: 'Select visible columns',
        options: props.visibleContentOptions,
      }}
    />
  );
}

const getFilterCounterText = (count: any) =>
  `${count} ${count === 1 ? 'match' : 'matches'}`;

const PROPERTY_FILTERING_I18N_CONSTANTS = {
  filteringAriaLabel: 'your choice',
  dismissAriaLabel: 'Dismiss',

  filteringPlaceholder: 'Search',
  groupValuesText: 'Values',
  groupPropertiesText: 'Properties',
  operatorsText: 'Operators',

  operationAndText: 'and',
  operationOrText: 'or',

  operatorLessText: 'Less than',
  operatorLessOrEqualText: 'Less than or equal',
  operatorGreaterText: 'Greater than',
  operatorGreaterOrEqualText: 'Greater than or equal',
  operatorContainsText: 'Contains',
  operatorDoesNotContainText: 'Does not contain',
  operatorEqualsText: 'Equals',
  operatorDoesNotEqualText: 'Does not equal',

  editTokenHeader: 'Edit filter',
  propertyText: 'Property',
  operatorText: 'Operator',
  valueText: 'Value',
  cancelActionText: 'Cancel',
  applyActionText: 'Apply',
  allPropertiesLabel: 'All properties',

  tokenLimitShowMore: 'Show more',
  tokenLimitShowFewer: 'Show fewer',
  clearFiltersText: 'Clear filters',
  removeTokenButtonAriaLabel: () => 'Remove token',
  enteredTextLabel: (text: any) => `Use: "${text}"`,
};
