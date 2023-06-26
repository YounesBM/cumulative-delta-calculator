export class TradeSymbol {
  symbol: string; // Symbol identifier of the trade
  name: string; // Name of the trade symbol
  baseCurrency: string; // Base currency of the trade symbol
  quoteCurrency: string; // Quote currency of the trade symbol

  constructor(
    symbol: string,
    name: string,
    baseCurrency: string,
    quoteCurrency: string
  ) {
    // Initialize the properties with the provided values
    this.symbol = symbol;
    this.name = name;
    this.baseCurrency = baseCurrency;
    this.quoteCurrency = quoteCurrency;
  }
}
