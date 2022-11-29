import { AccountModel, AccountModelProps } from "../models";

export class AccountProvider {
  public static async list(): Promise<{
    accounts: Array<AccountModel>;
    count: number;
  }> {
    // TODO handle failures
    const res = await fetch(`http://localhost:8080/accounts`, {
      method: "GET",
    });
    const jsonRes = await res.json();
    const accounts = jsonRes.map((a: AccountModel) => new AccountModel(a));
    const count = jsonRes.count;
    return Promise.resolve({ accounts, count });
  }

  public static async get(accountId: string): Promise<AccountModel> {
    const res = await fetch(`http://localhost:8080/accounts/${accountId}`, {
      method: "GET",
    });
    const jsonRes = await res.json();
    const account = new AccountModel(jsonRes);
    return account;
  }

  public static async create(account: AccountModel): Promise<Response> {
    let res = await fetch(
      `http://localhost:8080/accounts/${account.accountId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(account),
      }
    );
    return res;
  }

  // TODO: update account balance
}
