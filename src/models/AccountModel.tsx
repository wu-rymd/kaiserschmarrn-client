export interface AccountModelProps {
  accountId: string;
  balance: string;
  startingBalance: string;
  clientId: string;
}

export class AccountModel {
  readonly accountId: string;
  readonly balance: string;
  readonly startingBalance: string;
  readonly clientId: string;

  constructor(props: AccountModelProps) {
    this.accountId = props.accountId;
    this.balance = props.balance;
    this.startingBalance = props.startingBalance;
    this.clientId = props.clientId;
  }
}
