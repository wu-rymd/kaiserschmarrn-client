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
} from "../components";
import { AccountModel } from "../models";
import { AccountProvider } from "../providers";

export function AccountsPage() {
  const [accounts, setAccounts] = useState([] as AccountModel[]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);

  const [count, setCount] = useState(0);

  useEffect(() => {
    AccountProvider.list().then((res) => {
      setAccounts(res.accounts);
      setCount(res.count);
    });
  });

  async function getAccount(selectedAccount: AccountModel) {
    return await AccountProvider.get(selectedAccount.accountId);
  }

  /*async function deleteAccount(selectedAccount: AccountModel) {
    return await AccountProvider.delete(selectedAccount.accountId);
  }*/

  return (
    <TableLayout
      navigation={<Navigation activeHref="/buildings" />}
      breadcrumbs={<AccountsBreadcrumbs />}
      content={
        <TableComponent
          resourceName={"Account"}
          viewModal={AccountViewModal}
          createModal={AccountCreateModal}
          editModal={undefined} // TODO
          getResource={getAccount}
          deleteResource={undefined} // TODO
          data={accounts}
          updateTools={() => setToolsOpen(true)}
          columnDefinitions={ACCOUNT_COLUMN_DEFINITIONS}
          preferences={ACCOUNT_PREFERENCES}
          filteringProperties={ACCOUNT_FILTERING_PROPERTIES}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          count={count}
          pageSizeOptions={ACCOUNT_PAGE_SIZE_OPTIONS}
          visibleContentOptions={ACCOUNT_VISIBLE_CONTENT_OPTIONS}
          setPreferences={undefined}
        />
      }
      contentType="table"
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }: { detail: any }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}
