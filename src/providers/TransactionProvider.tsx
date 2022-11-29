import { TransactionModel } from "../models";

export class TransactionProvider {
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async list(): Promise<{
    transactions: Array<TransactionModel>;
    count: number;
  }> {
    // TODO handle failures
    const res = await fetch(`http://localhost:8080/transactions`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
      }),
    });
    const jsonRes = await res.json();
    const transactions = jsonRes.map(
      (s: TransactionModel) => new TransactionModel(s)
    );
    const count = jsonRes.count;
    return Promise.resolve({ transactions, count });
  }

  async get(transactionId: string): Promise<TransactionModel> {
    const res = await fetch(
      `http://localhost:8080/transactions/${transactionId}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${this.accessToken}`,
        }),
      }
    );
    const jsonRes = await res.json();
    const transaction = new TransactionModel(jsonRes);
    return transaction;
  }

  async create(transaction: TransactionModel): Promise<Response> {
    const res = await fetch(`http://localhost:8080/transactions`, {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(transaction),
    });
    return res;
  }

  // TODO: update transaction price
}
