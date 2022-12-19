import { Alert, Button, SpaceBetween } from "@cloudscape-design/components";
import "@cloudscape-design/global-styles/index.css";
import { useEffect, useState } from "react";
import {
  StocksBreadcrumbs,
  Navigation,
  TableLayout,
  TableComponent,
  StockViewModal,
  STOCK_PREFERENCES,
  STOCK_COLUMN_DEFINITIONS,
  STOCK_PAGE_SIZE_OPTIONS,
  STOCK_VISIBLE_CONTENT_OPTIONS,
  STOCK_FILTERING_PROPERTIES,
  useLocalStorage,
} from "../components";
import { StockModel } from "../models";
import { StockProvider } from "../providers";

export function StocksPage(props: any) {
  const [stocks, setStocks] = useState([] as StockModel[]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    "React-StocksTable-Preferences",
    STOCK_PREFERENCES
  );

  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const stockProvider = new StockProvider(props.accessToken);
  useEffect(() => {
    const stockProvider = new StockProvider(props.accessToken);
    stockProvider.list().then((res) => {
      setStocks(res.stocks);
      setCount(res.count);
    });
  }, [refresh, props.accessToken]);

  async function getStock(selectedStock: StockModel) {
    return await stockProvider.get(selectedStock.stockId);
  }

  async function refreshPrices() {
    const res = await stockProvider.updateAllStockPrices();
    if (res.status === 200) {
      console.log("Successfully fetched real-time prices");
      setSuccessMessage(`Stock prices refreshed`);
      setShowSuccess(true);
      setRefresh(refresh + 1);
    } else {
      console.log("Failed to refresh stock prices");
    }
  }

  return (
    <TableLayout
      navigation={
        <Navigation
          accessToken={props.accessToken}
          setAccessToken={props.setAccessToken}
          client={props.client}
          activeHref="/stocks"
        />
      }
      breadcrumbs={<StocksBreadcrumbs />}
      content={
        <SpaceBetween size="l">
          <TableComponent
            resourceName={"Stock"}
            viewModal={StockViewModal}
            createModal={undefined} // don't allow
            editModal={undefined} // don't allow
            createResource={undefined} // don't allow
            getResource={getStock}
            deleteResource={undefined} // don't allow
            data={stocks}
            updateTools={() => setToolsOpen(true)}
            columnDefinitions={STOCK_COLUMN_DEFINITIONS}
            refresh={refresh}
            setRefresh={setRefresh}
            preferences={preferences}
            setPreferences={setPreferences}
            filteringProperties={STOCK_FILTERING_PROPERTIES}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            count={count}
            pageSizeOptions={STOCK_PAGE_SIZE_OPTIONS}
            visibleContentOptions={STOCK_VISIBLE_CONTENT_OPTIONS}
            client={props.client}
          />
          <Alert
            onDismiss={() => setShowSuccess(false)}
            visible={showSuccess}
            dismissAriaLabel="Close alert"
            dismissible
            type="success"
          >
            {successMessage}
          </Alert>
          <Button onClick={refreshPrices} iconName="refresh">
            Refresh real-time stock prices
          </Button>
        </SpaceBetween>
      }
      contentType="table"
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }: { detail: any }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}
