export interface AssetModelProps {
  accountId: string;
  quantity: number;
  tradableType: string;
  tradableId: string;
}

export class AssetModel {
  readonly accountId: string;
  readonly quantity: number;
  readonly tradableType: string;
  readonly tradableId: string;

  constructor(props: AssetModelProps) {
    // TODO assetId trio
    this.accountId = props.accountId;
    this.quantity = props.quantity;
    this.tradableType = props.tradableType;
    this.tradableId = props.tradableId;
  }
}
