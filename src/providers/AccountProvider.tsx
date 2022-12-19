import { AccountModel } from "../models";
import { SERVER_URL } from "../Config";

export class AccountProvider {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async list(): Promise<{
    accounts: Array<AccountModel>;
    count: number;
  }> {
    // TODO handle failures
    const res = await fetch(`${SERVER_URL}/accounts`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    if (res.status === 200) {
      const jsonRes = await res.json();
      const accounts = jsonRes.map((a: AccountModel) => new AccountModel(a));
      const count = jsonRes.count;
      return Promise.resolve({ accounts, count });
    } else {
      return Promise.reject({ status: res.status });
    }
  }

  async get(accountId: string): Promise<AccountModel> {
    const res = await fetch(`${SERVER_URL}/accounts/${accountId}`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const account = new AccountModel(jsonRes);
    return Promise.resolve(account);
  }

  async create(account: AccountModel): Promise<Response> {
    let res = await fetch(`${SERVER_URL}/accounts`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(account),
    });
    return Promise.resolve(res);
  }

  async delete(accountId: string): Promise<Response> {
    console.log(accountId);
    let res = await fetch(`${SERVER_URL}/accounts/${accountId}`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      }),
      // body: JSON.stringify({ accountId: accountId }),
    });
    return Promise.resolve(res);
  }

  async getInvestingStats(
    accountId: string
  ): Promise<{ portfolioValue: string; profit: string; cashBalance: string }> {
    const res1 = await fetch(
      `${SERVER_URL}/accounts/${accountId}/portfolio_value`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${this.accessToken}`,
        }),
      }
    );
    const portfolioValue = await res1.text();

    const res2 = await fetch(`${SERVER_URL}/accounts/${accountId}/pnl`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const profit = await res2.text();

    const res3 = await fetch(`${SERVER_URL}/accounts/${accountId}/balance`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const cashBalance = await res3.text();

    return Promise.resolve({ portfolioValue, profit, cashBalance });
  }

  // TODO: update account balance
}
