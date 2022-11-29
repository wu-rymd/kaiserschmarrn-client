export interface NftModelProps {
  nftId: string;
  price: string;
}

export class NftModel {
  readonly nftId: string;
  readonly price: string;

  constructor(props: NftModelProps) {
    this.nftId = props.nftId;
    this.price = props.price;
  }
}
