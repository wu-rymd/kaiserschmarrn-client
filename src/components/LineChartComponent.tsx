import LineChart from "@cloudscape-design/components/line-chart";
import { Box, Button } from "@cloudscape-design/components";

export function LineChartComponent(props: { name: any; data: any }) {
  let yLowest = 99999;
  let yHighest = 0;
  for (var d of props.data) {
    if (d.y < yLowest) {
      yLowest = d.y;
    }

    if (d.y > yHighest) {
      yHighest = d.y;
    }
  }
  return (
    <LineChart
      series={[
        {
          title: props.name,
          type: "line",
          data: props.data,
        },
      ]}
      xDomain={[
        new Date(props.data[0].x),
        new Date(props.data[props.data.length - 1].x),
      ]}
      yDomain={[yLowest - yLowest * 0.05, yHighest + yHighest * 0.05]}
      i18nStrings={{
        filterLabel: "Filter displayed data",
        filterPlaceholder: "Filter data",
        filterSelectedAriaLabel: "selected",
        detailPopoverDismissAriaLabel: "Dismiss",
        legendAriaLabel: "Legend",
        chartAriaRoleDescription: "line chart",
        xTickFormatter: (e) =>
          e
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
            .split(",")
            .join("\n"),
        /*yTickFormatter: function o(e) {
          return Math.abs(e) >= 1e9
            ? (e / 1e9).toFixed(1).replace(/\.0$/, "") + "G"
            : Math.abs(e) >= 1e6
            ? (e / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
            : Math.abs(e) >= 1e3
            ? (e / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
            : e.toFixed(2);
        },*/
      }}
      ariaLabel="Single data series line chart"
      errorText="Error loading data."
      height={300}
      hideFilter
      hideLegend
      loadingText="Loading chart"
      recoveryText="Retry"
      xScaleType="time"
      xTitle="Date"
      yTitle="Price"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />
  );
}
