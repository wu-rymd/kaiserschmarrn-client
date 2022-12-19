import { SpaceBetween } from "@cloudscape-design/components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Navigation,
  StocksHistoricalBreadcrumbs,
  TableLayout,
  useLocalStorage,
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
        console.log(JSON.stringify(t));
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
          <br></br>
          {data.length > 10 && (
            <LineChartComponent
              name={stockId}
              data={JSON.parse(data).map((d: any) => {
                return {
                  x: new Date(d.date.split("T")[0]),
                  y: d.close,
                };
              })}
            ></LineChartComponent>
          )}
        </SpaceBetween>
      }
      contentType="default"
      toolsOpen={toolsOpen}
      onToolsChange={({ detail }: { detail: any }) => setToolsOpen(detail.open)}
      stickyNotifications={true}
    />
  );
}
