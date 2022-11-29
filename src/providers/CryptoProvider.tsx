import { CryptoModel } from "../models";

export class CryptoProvider {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async list(): Promise<{
    cryptos: Array<CryptoModel>;
    count: number;
  }> {
    // TODO handle failures
    const res = await fetch(`http://localhost:8080/cryptocurrencies`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const cryptos = jsonRes.map((s: CryptoModel) => new CryptoModel(s));
    const count = jsonRes.count;
    return Promise.resolve({ cryptos, count });
  }

  async get(cryptocurrencyId: string): Promise<CryptoModel> {
    const res = await fetch(
      `http://localhost:8080/cryptocurrencies/${cryptocurrencyId}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${this.accessToken}`,
        }),
      }
    );
    const jsonRes = await res.json();
    const crypto = new CryptoModel(jsonRes);
    return crypto;
  }

  // TODO: update crypto price
}
