import "@cloudscape-design/global-styles/index.css";
import { useEffect, useState } from "react";
import {
  AssetsBreadcrumbs,
  Navigation,
  TableLayout,
  TableComponent,
  //AssetViewModal,
  ASSET_PREFERENCES,
  ASSET_COLUMN_DEFINITIONS,
  ASSET_PAGE_SIZE_OPTIONS,
  ASSET_VISIBLE_CONTENT_OPTIONS,
  ASSET_FILTERING_PROPERTIES,
  useLocalStorage,
} from "../components";
import { AssetModel } from "../models";
import { AssetProvider } from "../providers";

export function AssetsPage(props: any) {
  const [assets, setAssets] = useState([] as AssetModel[]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    "React-AssetsTable-Preferences",
    ASSET_PREFERENCES
  );

  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const assetProvider = new AssetProvider(props.accessToken);

  useEffect(() => {
    assetProvider.list().then((res) => {
      setAssets(res.assets);
      setCount(res.count);
    });
  }, [refresh]);

  async function getAsset(selectedAsset: AssetModel) {
    return selectedAsset;
    // return await assetProvider.get(selectedAsset.assetId);
  }

  return (
    <TableLayout
      navigation={
        <Navigation
          accessToken={props.accessToken}
          setAccessToken={props.setAccessToken}
          client={props.client}
          activeHref="/assets"
        />
      }
      breadcrumbs={<AssetsBreadcrumbs />}
      content={
        <TableComponent
          resourceName={"Asset"}
          viewModal={undefined}
          createModal={undefined} // don't allow
          editModal={undefined} // don't allow
          createResource={undefined} // don't allow
          getResource={getAsset}
          deleteResource={undefined} // don't allow
          data={assets}
          updateTools={() => setToolsOpen(true)}
          columnDefinitions={ASSET_COLUMN_DEFINITIONS}
          refresh={refresh}
          setRefresh={setRefresh}
          preferences={preferences}
          setPreferences={setPreferences}
          filteringProperties={ASSET_FILTERING_PROPERTIES}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          count={count}
          pageSizeOptions={ASSET_PAGE_SIZE_OPTIONS}
          visibleContentOptions={ASSET_VISIBLE_CONTENT_OPTIONS}
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
