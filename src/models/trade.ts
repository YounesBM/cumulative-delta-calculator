export class Trade {
  sequence: string; // Sequence identifier of the trade
  price: string; // Price at which the trade occurred
  size: string; // Size or quantity of the trade
  side: string; // Side of the trade (buy/sell)
  time: number; // Timestamp of the trade

  constructor(
    sequence: string,
    price: string,
    size: string,
    side: string,
    time: number
  ) {
    // Initialize the properties with the provided values
    this.sequence = sequence;
    this.price = price;
    this.size = size;
    this.side = side;
    this.time = time;
  }
}
