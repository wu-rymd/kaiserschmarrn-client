import { AccountModel } from "../models";

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
    const res = await fetch(`http://localhost:8080/accounts`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const accounts = jsonRes.map((a: AccountModel) => new AccountModel(a));
    const count = jsonRes.count;
    return Promise.resolve({ accounts, count });
  }

  async get(accountId: string): Promise<AccountModel> {
    const res = await fetch(`http://localhost:8080/accounts/${accountId}`, {
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
    let res = await fetch(`http://localhost:8080/accounts`, {
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
    let res = await fetch(`http://localhost:8080/accounts/${accountId}`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      }),
      // body: JSON.stringify({ accountId: accountId }),
    });
    return Promise.resolve(res);
  }

  // TODO: update account balance
}
