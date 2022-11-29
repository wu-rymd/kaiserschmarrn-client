import { SpaceBetween } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Navigation,
  StocksHistoricalBreadcrumbs,
  TableLayout,
} from "../components";
import { LineChartComponent } from "../components/LineChartComponent";
import { StockProvider } from "../providers";

export function StocksHistoricalPage(props: any) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const [data, setData] = useState("Loading...");

  let { stockId } = useParams();

  const stockProvider = new StockProvider(props.accessToken);
  useEffect(() => {
    stockProvider.getHistoricalData(stockId!).then((res) => {
      res.json().then((t) => {
        setData(JSON.stringify(t));
      });
    });
  }, []);
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
      breadcrumbs={<StocksHistoricalBreadcrumbs />}
      content={
        <SpaceBetween size={"l"}>
          {data.length > 10 && <LineChartComponent></LineChartComponent>}
          <div>{data}</div>
        </SpaceBetween>
      }
      contentType="default"
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }: { detail: any }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}
