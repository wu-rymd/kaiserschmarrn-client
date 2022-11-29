import { AccountModel, AccountModelProps } from '../models';

export class AccountProvider {
  constructor() {}

  public static async list(props: { offset: number; limit: number }): Promise<{
    accounts: Array<AccountModel>;
    count: number;
  }> {
    // TODO handle failures
    const res = await fetch(`http://localhost:8080/accounts`, {
      method: 'GET',
    });
    const jsonRes = await res.json();
    const accounts = jsonRes.map((b: AccountModelProps) => new AccountModel(b));
    const count = jsonRes.count;
    return Promise.resolve({ accounts, count });
  }
}
