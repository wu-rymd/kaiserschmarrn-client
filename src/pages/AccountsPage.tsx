import '@cloudscape-design/global-styles/index.css';
import { useEffect, useState } from 'react';
import {
  AccountsBreadcrumbs,
  Navigation,
  TableLayout,
  ToolsContent,
  TableComponent,
  ACCOUNT_COLUMN_DEFINITIONS,
  ACCOUNT_PREFERENCES,
  ACCOUNT_FILTERING_PROPERTIES,
  ACCOUNT_PAGE_SIZE_OPTIONS,
  ACCOUNT_VISIBLE_CONTENT_OPTIONS,
} from '../components';
import { AccountProvider } from '../providers';

export function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);

  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const limit = 25;

  useEffect(() => {
    AccountProvider.list({ offset, limit }).then((res: any) => {
      setAccounts(res.accounts);
      setCount(res.count);
    });
  }, [offset, limit]);

  return (
    <TableLayout
      navigation={<Navigation activeHref="/accounts" />}
      breadcrumbs={<AccountsBreadcrumbs />}
      content={
        <TableComponent
          loadingText="Loading accounts"
          resourceName={'Account'}
          data={accounts}
          updateTools={() => setToolsOpen(true)}
          columnDefinitions={ACCOUNT_COLUMN_DEFINITIONS}
          preferences={ACCOUNT_PREFERENCES}
          filteringProperties={ACCOUNT_FILTERING_PROPERTIES}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          offset={offset}
          setOffset={setOffset}
          limit={limit}
          count={count}
          pageSizeOptions={ACCOUNT_PAGE_SIZE_OPTIONS}
          visibleContentOptions={ACCOUNT_VISIBLE_CONTENT_OPTIONS}
          setPreferences={undefined}
        />
      }
      contentType="table"
      tools={<ToolsContent />}
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }: { detail: any }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}
