import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useLocalStorage } from "./components";
import {
  AccountsPage,
  StocksPage,
  NftsPage,
  CryptosPage,
  AuthPage,
  TransactionsPage,
  StocksHistoricalPage,
  AssetsPage,
  InvestPage,
} from "./pages";

export default function App() {
  const [accessToken, setAccessToken] = useLocalStorage(
    "React-Auth-AccessToken",
    ""
  );

  const [client, setClient] = useLocalStorage(
    "React-Auth-ClientName",
    Object()
  );

  function isAccessTokenExists(accessToken: string): boolean {
    if (accessToken.length > 0) {
      return true;
    }
    return false;
  }

  function RequireAuth(props: { page: Function }) {
    if (isAccessTokenExists(accessToken)) {
      return (
        <props.page
          accessToken={accessToken}
          setAccessToken={setAccessToken}
          client={client}
        />
      );
    } else {
      return <Navigate to="/auth" replace />;
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<RequireAuth page={AccountsPage} />} />
        <Route path="/accounts" element={<RequireAuth page={AccountsPage} />} />
        <Route path="/stocks" element={<RequireAuth page={StocksPage} />} />
        <Route
          path="/stocks/:stockId/historical"
          element={<RequireAuth page={StocksHistoricalPage} />}
        />
        <Route path="/nfts" element={<RequireAuth page={NftsPage} />} />
        <Route path="/cryptos" element={<RequireAuth page={CryptosPage} />} />
        <Route path="/assets" element={<RequireAuth page={AssetsPage} />} />
        <Route
          path="/transactions"
          element={<RequireAuth page={TransactionsPage} />}
        />
        <Route path="/invest" element={<RequireAuth page={InvestPage} />} />
        <Route
          path="/auth"
          element={
            <AuthPage
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              client={client}
              setClient={setClient}
            />
          }
        />
      </Routes>
    </div>
  );
}
