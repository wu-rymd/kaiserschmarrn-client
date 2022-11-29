import "@cloudscape-design/global-styles/index.css";
import { useEffect, useState } from "react";
import {
  CryptosBreadcrumbs,
  Navigation,
  TableLayout,
  TableComponent,
  CryptoViewModal,
  CRYPTO_PREFERENCES,
  CRYPTO_COLUMN_DEFINITIONS,
  CRYPTO_PAGE_SIZE_OPTIONS,
  CRYPTO_VISIBLE_CONTENT_OPTIONS,
  CRYPTO_FILTERING_PROPERTIES,
  useLocalStorage,
} from "../components";
import { CryptoModel } from "../models";
import { CryptoProvider } from "../providers";

export function CryptosPage(props: any) {
  const [cryptos, setCryptos] = useState([] as CryptoModel[]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [preferences, setPreferences] = useLocalStorage(
    "React-CryptosTable-Preferences",
    CRYPTO_PREFERENCES
  );

  const [count, setCount] = useState(0);

  const cryptoProvider = new CryptoProvider(props.accessToken);

  useEffect(() => {
    cryptoProvider.list().then((res) => {
      setCryptos(res.cryptos);
      setCount(res.count);
    });
  }, []);

  async function getCrypto(selectedCrypto: CryptoModel) {
    return await cryptoProvider.get(selectedCrypto.cryptocurrencyId);
  }

  return (
    <TableLayout
      navigation={
        <Navigation
          accessToken={props.accessToken}
          setAccessToken={props.setAccessToken}
          client={props.client}
          activeHref="/cryptos"
        />
      }
      breadcrumbs={<CryptosBreadcrumbs />}
      content={
        <TableComponent
          resourceName={"Crypto"}
          viewModal={CryptoViewModal}
          createModal={undefined} // don't allow
          editModal={undefined} // don't allow
          createResource={undefined} // don't allow
          getResource={getCrypto}
          deleteResource={undefined} // don't allow
          data={cryptos}
          updateTools={() => setToolsOpen(true)}
          columnDefinitions={CRYPTO_COLUMN_DEFINITIONS}
          preferences={preferences}
          setPreferences={setPreferences}
          filteringProperties={CRYPTO_FILTERING_PROPERTIES}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          count={count}
          pageSizeOptions={CRYPTO_PAGE_SIZE_OPTIONS}
          visibleContentOptions={CRYPTO_VISIBLE_CONTENT_OPTIONS}
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
