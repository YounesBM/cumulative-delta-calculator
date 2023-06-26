var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Trade } from "../../models/trade";
import { TradeSymbol } from "../../models/tradeSymbol";
import { Fill } from "../../models/fill";
import * as Kucoin from "kucoin-node-sdk";
export class KucoinAPI {
    constructor() {
        // Load the configuration for Kucoin API
        const config = require("./config");
        Kucoin.init(config);
    }
    fetchTradeHistory(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch trade history using Kucoin API
            const response = yield Kucoin.rest.Market.Histories.getMarketHistories(symbol.toUpperCase());
            // Handle error response
            if (response.code !== "200000") {
                throw new Error(`Failed to get trade history, code: ${response.code}`);
            }
            // Transform response data into Trade objects
            const trades = response.data;
            return trades.map((trade) => {
                return new Trade(trade.sequence, trade.price, trade.size, trade.side, trade.time);
            });
        });
    }
    fetchSymbolsList(market) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch symbols list using Kucoin API
            const response = yield Kucoin.rest.Market.Symbols.getSymbolsList(market);
            // Handle error response
            if (response.code !== "200000") {
                throw new Error(`Failed to get market symbols, code: ${response.code}`);
            }
            // Transform response data into TradeSymbol objects
            const symbols = response.data;
            return symbols.map((symbol) => {
                return new TradeSymbol(symbol.symbol, symbol.name, symbol.baseCurrency, symbol.quoteCurrency);
            });
        });
    }
    fetchFillsList(tradeType) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch fills list using Kucoin API
            const response = yield Kucoin.rest.Trade.Fills.getFillsList(tradeType);
            // Handle error response
            if (response.code !== "200000") {
                throw new Error(`Failed to get fills list, code: ${response.code}`);
            }
            // Transform response data into Fill objects
            const fills = response.data.items;
            return fills.map((fill) => {
                return new Fill(fill.symbol, fill.tradeId, fill.orderId, fill.counterOrderId, fill.side, fill.liquidity, fill.forceTaker, fill.price, fill.size, fill.funds, fill.fee, fill.feeRate, fill.feeCurrency, fill.stop, fill.type, fill.createdAt, fill.tradeType);
            });
        });
    }
}
//# sourceMappingURL=kucoinAPI.js.map