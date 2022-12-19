import "@cloudscape-design/global-styles/index.css";
import { useEffect, useState } from "react";
import {
  TransactionsBreadcrumbs,
  Navigation,
  TableLayout,
  TableComponent,
  // TransactionViewModal,
  TRANSACTION_PREFERENCES,
  TRANSACTION_COLUMN_DEFINITIONS,
  TRANSACTION_PAGE_SIZE_OPTIONS,
  TRANSACTION_VISIBLE_CONTENT_OPTIONS,
  TRANSACTION_FILTERING_PROPERTIES,
  useLocalStorage,
} from "../components";
import { TransactionModel } from "../models";
import { TransactionProvider } from "../providers";

export function TransactionsPage(props: any) {
  const [transactions, setTransactions] = useState([] as TransactionModel[]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    "React-TransactionsTable-Preferences",
    TRANSACTION_PREFERENCES
  );

  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const transactionProvider = new TransactionProvider(props.accessToken);

  useEffect(() => {
    transactionProvider.list().then((res) => {
      setTransactions(res.transactions);
      setCount(res.count);
    });
  }, [refresh]);

  async function getTransaction(selectedTransaction: TransactionModel) {
    return await transactionProvider.get(selectedTransaction.uuid!);
  }

  return (
    <TableLayout
      navigation={
        <Navigation
          accessToken={props.accessToken}
          setAccessToken={props.setAccessToken}
          client={props.client}
          activeHref="/transactions"
        />
      }
      breadcrumbs={<TransactionsBreadcrumbs />}
      content={
        <TableComponent
          resourceName={"Transaction"}
          viewModal={undefined}
          createModal={undefined} // don't allow
          editModal={undefined} // don't allow
          createResource={undefined} // don't allow
          getResource={getTransaction}
          deleteResource={undefined} // don't allow
          data={transactions}
          updateTools={() => setToolsOpen(true)}
          columnDefinitions={TRANSACTION_COLUMN_DEFINITIONS}
          refresh={refresh}
          setRefresh={setRefresh}
          preferences={preferences}
          setPreferences={setPreferences}
          filteringProperties={TRANSACTION_FILTERING_PROPERTIES}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          count={count}
          pageSizeOptions={TRANSACTION_PAGE_SIZE_OPTIONS}
          visibleContentOptions={TRANSACTION_VISIBLE_CONTENT_OPTIONS}
          client={props.client}
        />
      }
      contentType="table"
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }: { detail: any }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}
