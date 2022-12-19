import Cards from "@cloudscape-design/components/cards";
import {
  Alert,
  Box,
  Button,
  Header,
  Input,
  Link,
  Select,
  SpaceBetween,
} from "@cloudscape-design/components";
import { InvestBreadcrumbs, Navigation, TableLayout } from "../components";
import { useEffect, useState } from "react";
import {
  AccountProvider,
  StockProvider,
  TransactionProvider,
} from "../providers";
import { StockModel, TransactionModel } from "../models";

export function InvestPage(props: any) {
  const [toolsOpen, setToolsOpen] = useState(false);

  const [accountOptions, setAccountOptions] = useState(
    [] as { label: string; value: string }[]
  );
  const [selectedOption, setSelectedOption] = useState(
    {} as { label?: any; value?: any }
  );
  const [quantity, setQuantity] = useState("1");

  const [refresh, setRefresh] = useState(0);

  const [portfolioValue, setPortfolioValue] = useState("0");
  const [profit, setProfit] = useState("0");
  const [cashBalance, setCashBalance] = useState("0");

  const transactionProvider = new TransactionProvider(props.accessToken);

  useEffect(() => {
    const accountProvider = new AccountProvider(props.accessToken);
    accountProvider.list().then((res) => {
      let accounts = res.accounts.map((a) => ({
        label: a.accountId,
        value: a.accountId,
      }));
      accounts.sort((a, b) => a.value.localeCompare(b.value));
      setAccountOptions(accounts);
      setSelectedOption(accounts[0]);
    });
  }, [props.accessToken]);

  useEffect(() => {
    if (selectedOption !== undefined && selectedOption.value !== undefined) {
      const accountProvider = new AccountProvider(props.accessToken);
      accountProvider
        .getInvestingStats(selectedOption.value.toString())
        .then((res) => {
          setPortfolioValue(res.portfolioValue);
          setProfit(res.profit);
          setCashBalance(res.cashBalance);
        });
    }
  }, [refresh, selectedOption, props.accessToken]);

  async function createTransaction(item: any, transactionType: string) {
    let transaction = new TransactionModel({
      accountId: selectedOption.value.toString(),
      tradableType: "stock",
      tradableId: item.stockId,
      quantity: Number(quantity),
      transactionType: transactionType,
      transactionStatus: "COMPLETED",
    });
    const res = await transactionProvider.create(transaction);
    const boughtOrSoldString =
      transaction.transactionType === "BUY" ? "bought" : "sold";
    if (res.status === 200) {
      console.log("Transaction successful");
      setSuccessMessage(
        `${transaction.accountId} successfully ${boughtOrSoldString} ${transaction.quantity} shares of ${transaction.tradableId}`
      );
      setShowSuccess(true);
      setRefresh(refresh + 1);
    } else {
      console.log("Error in transaction");
    }
  }

  const [stocks, setStocks] = useState([] as StockModel[]);

  useEffect(() => {
    const stockProvider = new StockProvider(props.accessToken);
    stockProvider.list().then((res) => {
      setStocks(res.stocks);
    });
  }, [props.accessToken]);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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
          <Alert
            onDismiss={() => setShowSuccess(false)}
            visible={showSuccess}
            dismissAriaLabel="Close alert"
            dismissible
            type="success"
          >
            {successMessage}
          </Alert>
          <Select
            selectedOption={selectedOption}
            onChange={({ detail }) => {
              setSelectedOption(
                detail.selectedOption as { label: string; value: string }
              );
              setRefresh(refresh + 1);
            }}
            options={accountOptions}
            selectedAriaLabel="Selected"
          />
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
                  content: () => (
                    <Input
                      value={quantity}
                      onChange={(event) => setQuantity(event.detail.value)}
                      type={"number"}
                      inputMode={"numeric"}
                      step={1}
                    />
                  ),
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
            header={
              <Box>
                <Header variant="h3">{`Profit: ${profit}`}</Header>
                <Header variant="h3">{`Portfolio Value: ${portfolioValue}`}</Header>
                <Header variant="h3">{`Cash Balance: ${cashBalance}`}</Header>
              </Box>
            }
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
