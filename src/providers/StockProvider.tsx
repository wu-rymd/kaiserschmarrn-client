import { StockModel } from "../models";

export class StockProvider {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async list(): Promise<{
    stocks: Array<StockModel>;
    count: number;
  }> {
    // TODO handle failures
    const res = await fetch(`http://localhost:8080/stocks`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const stocks = jsonRes.map((s: StockModel) => new StockModel(s));
    const count = jsonRes.count;
    return Promise.resolve({ stocks, count });
  }

  async get(stockId: string): Promise<StockModel> {
    const res = await fetch(`http://localhost:8080/stocks/${stockId}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const stock = new StockModel(jsonRes);
    return Promise.resolve(stock);
  }

  async updateAllStockPrices(): Promise<Response> {
    const res = await fetch(
      `http://localhost:8080/finance/updateAllStockPrices`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${this.accessToken}`,
        }),
      }
    );
    return Promise.resolve(res);
  }

  async getHistoricalData(stockId: string): Promise<Response> {
    const res = await fetch(
      `http://localhost:8080/finance/${stockId}/historical`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${this.accessToken}`,
        }),
      }
    );
    return Promise.resolve(res);
  }

  // TODO: update stock price
}
