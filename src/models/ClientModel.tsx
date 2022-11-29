export interface ClientModelProps {
  clientId: string;
  stockAccess?: boolean;
  nftAccess?: boolean;
  cryptoAccess?: boolean;
}

export class ClientModel {
  readonly clientId: string;
  readonly stockAccess: boolean;
  readonly nftAccess: boolean;
  readonly cryptoAccess: boolean;

  constructor(props: ClientModelProps) {
    this.clientId = props.clientId;
    this.stockAccess = false;
    this.nftAccess = false;
    this.cryptoAccess = false;

    if (this.clientId === "binance") {
      this.cryptoAccess = true;
    } else if (this.clientId === "opensea") {
      this.nftAccess = true;
    } else {
      this.stockAccess = true;
    }
  }
}
