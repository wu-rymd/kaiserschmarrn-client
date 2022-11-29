export interface AccountModelProps {
  accountId: string;
  balance: string;
  startingBalance: string;
}

export class AccountModel {
  readonly accountId: string;
  readonly balance: string;
  readonly startingBalance: string;

  constructor(props: AccountModelProps) {
    this.accountId = props.accountId;
    this.balance = props.balance;
    this.startingBalance = props.startingBalance;
  }
}
