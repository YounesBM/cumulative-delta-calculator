export class Fill {
  symbol: string; // Symbol of the fill
  tradeId: string; // Trade ID
  orderId: string; // Order ID
  counterOrderId: string; // Counter order ID
  side: string; // Side of the fill (buy/sell)
  liquidity: string; // Liquidity type
  forceTaker: string; // Force taker flag
  price: string; // Price of the fill
  size: string; // Size of the fill
  funds: string; // Funds used in the fill
  fee: string; // Fee charged for the fill
  feeRate: string; // Fee rate
  feeCurrency: string; // Fee currency
  stop: string; // Stop type
  type: string; // Fill type
  createdAt: string; // Creation timestamp of the fill
  tradeType: string; // Trade type

  constructor(
    symbol: string,
    tradeId: string,
    orderId: string,
    counterOrderId: string,
    side: string,
    liquidity: string,
    forceTaker: string,
    price: string,
    size: string,
    funds: string,
    fee: string,
    feeRate: string,
    feeCurrency: string,
    stop: string,
    type: string,
    createdAt: string,
    tradeType: string
  ) {
    // Initialize the properties with the provided values
    this.symbol = symbol;
    this.tradeId = tradeId;
    this.orderId = orderId;
    this.counterOrderId = counterOrderId;
    this.side = side;
    this.liquidity = liquidity;
    this.forceTaker = forceTaker;
    this.price = price;
    this.size = size;
    this.funds = funds;
    this.fee = fee;
    this.feeRate = feeRate;
    this.feeCurrency = feeCurrency;
    this.stop = stop;
    this.type = type;
    this.createdAt = createdAt;
    this.tradeType = tradeType;
  }
}
