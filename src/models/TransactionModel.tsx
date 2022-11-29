export interface TransactionModelProps {
  uuid?: string;
  accountId: string;
  tradableType: string;
  tradableId: string;
  quantity: number;
  transactionType: string;
  transactionStatus: string;
}

export class TransactionModel {
  readonly uuid?: string;
  readonly accountId: string;
  readonly tradableType: string;
  readonly tradableId: string;
  readonly quantity: number;
  readonly transactionType: string;
  readonly transactionStatus: string;

  constructor(props: TransactionModelProps) {
    this.uuid = props.uuid ?? undefined;
    this.accountId = props.accountId;
    this.tradableType = props.tradableType;
    this.tradableId = props.tradableId;
    this.quantity = props.quantity;
    this.transactionType = props.transactionType;
    this.transactionStatus = props.transactionStatus;
  }
}
