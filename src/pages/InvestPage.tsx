import Cards from "@cloudscape-design/components/cards";
import {
  Box,
  Button,
  FormField,
  Header,
  Input,
  Link,
  SpaceBetween,
} from "@cloudscape-design/components";
import { InvestBreadcrumbs, Navigation, TableLayout } from "../components";
import { useEffect, useState } from "react";
import {
  AccountProvider,
  AssetProvider,
  StockProvider,
  TransactionProvider,
} from "../providers";
import { StockModel, TransactionModel } from "../models";

export function InvestPage(props: any) {
  const [toolsOpen, setToolsOpen] = useState(false);

  const [accountId, setAccountId] = useState("yigit");

  const accountProvider = new AccountProvider(props.accessToken);
  const stockProvider = new StockProvider(props.accessToken);
  const assetProvider = new AssetProvider(props.accessToken);
  const transactionProvider = new TransactionProvider(props.accessToken);

  async function createTransaction(item: any, transactionType: string) {
    let transaction = new TransactionModel({
      accountId: accountId,
      tradableType: "stock",
      tradableId: item.stockId,
      quantity: 1,
      transactionType: transactionType,
      transactionStatus: "COMPLETED",
    });
    const res = await transactionProvider.create(transaction);
    if (res.status === 200) {
      console.log("Transaction successful");
    } else {
      console.log("Error in transaction");
    }
  }

  const [stocks, setStocks] = useState([] as StockModel[]);

  useEffect(() => {
    stockProvider.list().then((res) => {
      setStocks(res.stocks);
    });
  }, []);

  return (
    <TableLayout
      navigation={
        <Navigation
          accessToken={props.accessToken}
          setAccessToken={props.setAccessToken}
          client={props.client}
          activeHref="/invest"
        />
      }
      breadcrumbs={<InvestBreadcrumbs />}
      content={
        <SpaceBetween size={"l"}>
          <FormField label="Account ID">
            <Input
              value={accountId}
              onChange={(event) => setAccountId(event.detail.value)}
            />
          </FormField>
          <Cards
            ariaLabels={{
              itemSelectionLabel: (e, t) => `select ${t.stockId}`,
              selectionGroupLabel: "Item selection",
            }}
            cardDefinition={{
              header: (item) => (
                <Link fontSize="heading-m">{item.stockId}</Link>
              ),
              sections: [
                {
                  id: "price",
                  header: "Price",
                  content: (item) => item.price,
                },
                {
                  id: "quantity",
                  header: "Quantity",
                  content: () => 1,
                },
                {
                  id: "buy",
                  content: (item) => (
                    <Button
                      onClick={() => createTransaction(item, "BUY")}
                      variant="primary"
                    >
                      BUY
                    </Button>
                  ),
                },
                {
                  id: "sell",
                  content: (item) => (
                    <Button onClick={() => createTransaction(item, "SELL")}>
                      SELL
                    </Button>
                  ),
                },
              ],
            }}
            cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
            items={stocks}
            loadingText="Loading resources"
            empty={
              <Box textAlign="center" color="inherit">
                <b>No resources</b>
                <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                  No resources to display.
                </Box>
                <Button>Create resource</Button>
              </Box>
            }
            header={<Header>Invest in stocks</Header>}
          />
        </SpaceBetween>
      }
      contentType="default"
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }: { detail: any }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}
