import "@cloudscape-design/global-styles/index.css";
import { useEffect, useState } from "react";
import {
  AccountsBreadcrumbs,
  Navigation,
  TableLayout,
  TableComponent,
  AccountViewModal,
  AccountCreateModal,
  // AccountEditModal,
  ACCOUNT_PREFERENCES,
  ACCOUNT_COLUMN_DEFINITIONS,
  ACCOUNT_PAGE_SIZE_OPTIONS,
  ACCOUNT_VISIBLE_CONTENT_OPTIONS,
  ACCOUNT_FILTERING_PROPERTIES,
  useLocalStorage,
} from "../components";
import { AccountModel } from "../models";
import { AccountProvider } from "../providers";

export function AccountsPage(props: any) {
  const [accounts, setAccounts] = useState([] as AccountModel[]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    "React-AccountsTable-Preferences",
    ACCOUNT_PREFERENCES
  );

  const [count, setCount] = useState(0);

  const accountProvider = new AccountProvider(props.accessToken);

  useEffect(() => {
    accountProvider.list().then((res) => {
      setAccounts(res.accounts);
      setCount(res.count);
    });
  }, [props.accessToken]);

  async function createAccount(account: AccountModel) {
    return await accountProvider.create(account);
  }

  async function getAccount(selectedAccount: AccountModel) {
    return await accountProvider.get(selectedAccount.accountId);
  }

  async function deleteAccount(selectedAccount: AccountModel) {
    return await accountProvider.delete(selectedAccount.accountId);
  }

  return (
    <TableLayout
      navigation={
        <Navigation
          accessToken={props.accessToken}
          setAccessToken={props.setAccessToken}
          client={props.client}
          activeHref="/accounts"
        />
      }
      breadcrumbs={<AccountsBreadcrumbs />}
      content={
        <TableComponent
          resourceName={"Account"}
          viewModal={AccountViewModal}
          createModal={AccountCreateModal}
          editModal={undefined} // TODO
          createResource={createAccount}
          getResource={getAccount}
          deleteResource={deleteAccount}
          data={accounts}
          updateTools={() => setToolsOpen(true)}
          columnDefinitions={ACCOUNT_COLUMN_DEFINITIONS}
          preferences={preferences}
          setPreferences={setPreferences}
          filteringProperties={ACCOUNT_FILTERING_PROPERTIES}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          count={count}
          pageSizeOptions={ACCOUNT_PAGE_SIZE_OPTIONS}
          visibleContentOptions={ACCOUNT_VISIBLE_CONTENT_OPTIONS}
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
