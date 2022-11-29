import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AccountsPage } from "./pages";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AccountsPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
      </Routes>
    </div>
  );
}
