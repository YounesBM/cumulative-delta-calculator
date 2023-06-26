import { Trade } from '../models/trade';
import { TradeSymbol } from '../models/tradeSymbol';
import { Fill } from '../models/fill';

export abstract class ExchangeAPI {
  // Fetch trade history for a symbol
  abstract fetchTradeHistory(symbol: string): Promise<Trade[]>;

  // Fetch symbols list for a market
  abstract fetchSymbolsList(market?: string): Promise<TradeSymbol[]>;

  // Fetch fills list for a trade type
  abstract fetchFillsList(tradeType: string): Promise<Fill[]>;
}
