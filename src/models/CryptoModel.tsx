export interface CryptoModelProps {
  cryptocurrencyId: string;
  price: string;
}

export class CryptoModel {
  readonly cryptocurrencyId: string;
  readonly price: string;

  constructor(props: CryptoModelProps) {
    this.cryptocurrencyId = props.cryptocurrencyId;
    this.price = props.price;
  }
}
