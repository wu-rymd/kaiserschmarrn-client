export interface StockModelProps {
  stockId: string;
  price: string;
}

export class StockModel {
  readonly stockId: string;
  readonly price: string;

  constructor(props: StockModelProps) {
    this.stockId = props.stockId;
    this.price = props.price;
  }
}
