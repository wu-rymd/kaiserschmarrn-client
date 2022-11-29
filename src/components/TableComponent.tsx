import { useState } from "react";
import { useCollection } from "@cloudscape-design/collection-hooks";
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
} from "@cloudscape-design/components";

const TableEmptyState = (props: any) => (
  <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
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
  <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
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
  nextPageLabel: "Next page",
  previousPageLabel: "Previous page",
  pageLabel: (pageNumber: any) => `Page ${pageNumber} of all pages`,
};

const selectionLabels = {
  itemSelectionLabel: (data: any, row: any) => `select ${row.id}`,
  allItemsSelectionLabel: () => "select all",
  selectionGroupLabel: "Selection",
};

const InfoLink = (props: any) => (
  <Link variant="info" id={props.id} onFollow={props.onFollow}>
    Info
  </Link>
);

const TableHeader = (props: any) => {
  return (
    <Header
      variant={props.variant}
      counter={props.totalItems ? `(${props.totalItems.length})` : "(0)"}
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
  createModal: any;
  editModal: any;
  getResource: any;
  deleteResource: any;
  selectedItems: any;
  updateTools: any;
  totalItems: any;
  serverSide: any;
  viewModal: any;
}) {
  const isOnlyOneSelected = props.selectedItems.length === 1;

  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [createVisible, setCreateVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [resource, setResource] = useState(Object);

  async function viewOnClick() {
    setViewModalVisible(true);
  }

  async function createOnClick() {
    setCreateVisible(true);
  }

  async function editOnClick(selectedItem: any) {
    const result = await props.getResource(selectedItem);
    setResource(result);
    setEditVisible(true);
  }

  async function deleteOnClick(selectedItem: any) {
    const result = await props.deleteResource(selectedItem);
    if (result.status === 200) {
      setSuccessMessage(`${props.resourceName} deleted successfully`);
      setShowSuccess(true);
    } else {
      console.log("Some error occured");
    }
  }

  return (
    <Box>
      <Alert
        onDismiss={() => setShowSuccess(false)}
        visible={showSuccess}
        dismissAriaLabel="Close alert"
        dismissible
        type="success"
      >
        {successMessage}
      </Alert>
      <TableHeader
        {...props}
        variant="awsui-h1-sticky"
        title={`${props.resourceName}s`}
        selectedItem={props.selectedItems}
        totalItems={props.totalItems}
        actionButtons={
          <SpaceBetween size="xs" direction="horizontal">
            <Button disabled={!isOnlyOneSelected} onClick={() => viewOnClick()}>
              View details
            </Button>
            <Button
              disabled={!isOnlyOneSelected}
              onClick={() => editOnClick(props.selectedItems[0])}
            >
              Edit
            </Button>
            <Button
              disabled={props.selectedItems.length === 0}
              onClick={() => deleteOnClick(props.selectedItems[0])}
            >
              Delete
            </Button>
            <Button variant="primary" onClick={() => createOnClick()}>
              Create
            </Button>
            {props.selectedItems.length !== 0 && (
              <props.viewModal
                visible={viewModalVisible}
                setVisible={setViewModalVisible}
                selectedItem={props.selectedItems[0]}
                loadingText={`Loading ${props.resourceName.toLowerCase()}s`}
                empty={
                  <Box textAlign="center" color="inherit">
                    <b>No {props.resourceName.toLowerCase()}s</b>
                    <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                      No {props.resourceName.toLowerCase()} to display.
                    </Box>
                    <Button>Create {props.resourceName.toLowerCase()}</Button>
                  </Box>
                }
                closeAriaLabel={"Close modal"}
              />
            )}
            <props.createModal
              visible={createVisible}
              setVisible={setCreateVisible}
              setSuccessMessage={setSuccessMessage}
              setShowSuccess={setShowSuccess}
              header={`New ${props.resourceName}`}
              closeAriaLabel={"Close modal"}
            />
            {props.selectedItems.length !== 0 && (
              <props.editModal
                visible={editVisible}
                setVisible={setEditVisible}
                selectedItem={props.selectedItems[0]}
                setSuccessMessage={setSuccessMessage}
                setShowSuccess={setShowSuccess}
                header={`Update ${props.resourceName}`}
                closeAriaLabel={"Close modal"}
              />
            )}
          </SpaceBetween>
        }
      />
    </Box>
  );
}

export function TableComponent(props: {
  resourceName: any;
  viewModal: any;
  createModal: any;
  editModal: any;
  getResource: any;
  deleteResource: any;
  data: any;
  updateTools: any;
  columnDefinitions: any;
  preferences: any;
  filteringProperties: any;
  selectedItems: any;
  setSelectedItems: any;
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
            actions.setPropertyFiltering({ tokens: [], operation: "and" });
          }}
        />
      ),
    },
    pagination: { pageSize: props.preferences.pageSize },
    sorting: { defaultState: { sortingColumn: props.columnDefinitions[0] } },
    selection: {},
  });

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
          viewModal={props.viewModal}
          createModal={props.createModal}
          editModal={props.editModal}
          getResource={props.getResource}
          deleteResource={props.deleteResource}
          resourceName={props.resourceName}
          selectedItems={props.selectedItems}
          totalItems={props.data}
          updateTools={props.updateTools}
          serverSide={true}
        />
      }
      loadingText={`Loading ${props.resourceName.toLowerCase()}s`}
      filter={
        <PropertyFilter
          i18nStrings={PROPERTY_FILTERING_I18N_CONSTANTS}
          {...propertyFilterProps}
          countText={getFilterCounterText(filteredItemsCount)}
          expandToViewport={true}
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
        title: "Page size",
        options: props.pageSizeOptions,
      }}
      wrapLinesPreference={{
        label: "Wrap lines",
        description: "Check to see all the text and wrap the lines",
      }}
      visibleContentPreference={{
        title: "Select visible columns",
        options: props.visibleContentOptions,
      }}
    />
  );
}

const getFilterCounterText = (count: any) =>
  `${count} ${count === 1 ? "match" : "matches"}`;

const PROPERTY_FILTERING_I18N_CONSTANTS = {
  filteringAriaLabel: "your choice",
  dismissAriaLabel: "Dismiss",

  filteringPlaceholder: "Search",
  groupValuesText: "Values",
  groupPropertiesText: "Properties",
  operatorsText: "Operators",

  operationAndText: "and",
  operationOrText: "or",

  operatorLessText: "Less than",
  operatorLessOrEqualText: "Less than or equal",
  operatorGreaterText: "Greater than",
  operatorGreaterOrEqualText: "Greater than or equal",
  operatorContainsText: "Contains",
  operatorDoesNotContainText: "Does not contain",
  operatorEqualsText: "Equals",
  operatorDoesNotEqualText: "Does not equal",

  editTokenHeader: "Edit filter",
  propertyText: "Property",
  operatorText: "Operator",
  valueText: "Value",
  cancelActionText: "Cancel",
  applyActionText: "Apply",
  allPropertiesLabel: "All properties",

  tokenLimitShowMore: "Show more",
  tokenLimitShowFewer: "Show fewer",
  clearFiltersText: "Clear filters",
  removeTokenButtonAriaLabel: () => "Remove token",
  enteredTextLabel: (text: any) => `Use: "${text}"`,
};
