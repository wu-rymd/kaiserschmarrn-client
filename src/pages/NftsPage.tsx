import "@cloudscape-design/global-styles/index.css";
import { useEffect, useState } from "react";
import {
  NftsBreadcrumbs,
  Navigation,
  TableLayout,
  TableComponent,
  NftViewModal,
  NFT_PREFERENCES,
  NFT_COLUMN_DEFINITIONS,
  NFT_PAGE_SIZE_OPTIONS,
  NFT_VISIBLE_CONTENT_OPTIONS,
  NFT_FILTERING_PROPERTIES,
  useLocalStorage,
} from "../components";
import { NftModel } from "../models";
import { NftProvider } from "../providers";

export function NftsPage(props: any) {
  const [nfts, setNfts] = useState([] as NftModel[]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    "React-NftsTable-Preferences",
    NFT_PREFERENCES
  );

  const [count, setCount] = useState(0);
  const [refresh, setRefresh] = useState(0);

  const nftProvider = new NftProvider(props.accessToken);

  useEffect(() => {
    nftProvider.list().then((res) => {
      setNfts(res.nfts);
      setCount(res.count);
    });
  }, [refresh]);

  async function getNFT(selectedNft: NftModel) {
    return await nftProvider.get(selectedNft.nftId);
  }

  return (
    <TableLayout
      navigation={
        <Navigation
          accessToken={props.accessToken}
          setAccessToken={props.setAccessToken}
          client={props.client}
          activeHref="/nfts"
        />
      }
      breadcrumbs={<NftsBreadcrumbs />}
      content={
        <TableComponent
          resourceName={"NFT"}
          viewModal={NftViewModal}
          createModal={undefined} // don't allow
          editModal={undefined} // don't allow
          createResource={undefined} // don't allow
          getResource={getNFT}
          deleteResource={undefined} // don't allow
          data={nfts}
          updateTools={() => setToolsOpen(true)}
          columnDefinitions={NFT_COLUMN_DEFINITIONS}
          refresh={refresh}
          setRefresh={setRefresh}
          preferences={preferences}
          setPreferences={setPreferences}
          filteringProperties={NFT_FILTERING_PROPERTIES}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          count={count}
          pageSizeOptions={NFT_PAGE_SIZE_OPTIONS}
          visibleContentOptions={NFT_VISIBLE_CONTENT_OPTIONS}
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
