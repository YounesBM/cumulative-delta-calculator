var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { APIFactory } from "../api/apiFactory";
import DeltaIndex from "../models/deltaIndex";
class ExchangeController {
    constructor() {
        this.path = "/exchange";
        this.router = Router();
        // Handler for getting the cumulative delta index for a symbol on an exchange
        this.getCumulativeDeltaIndex = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exchange = req.params.exchange;
                const symbol = req.params.symbol;
                // Get the exchange API instance based on the exchange name
                const api = APIFactory.getAPI(exchange);
                // Fetch the trade history for the symbol on the exchange
                const tradeHistory = yield api.fetchTradeHistory(symbol);
                // Create a DeltaIndex instance and update it with the trade history
                const deltaIndex = new DeltaIndex();
                tradeHistory.forEach((trade) => deltaIndex.updateDeltaIndex(trade));
                // Return the cumulative delta index and trade history as the response
                res.status(200).json({
                    cumulativeDeltaIndex: deltaIndex.currentDelta,
                    trades: deltaIndex.tradeHistory,
                });
            }
            catch (error) {
                // Handle any errors and return an error response
                res.status(500).json({ error: error.message });
            }
        });
        // Handler for getting the symbols list for an exchange
        this.getSymbols = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exchange = req.params.exchange;
                const market = req.params.market;
                // Get the exchange API instance based on the exchange name
                const api = APIFactory.getAPI(exchange);
                // Fetch the symbols list for the market on the exchange
                const symbolsList = yield api.fetchSymbolsList(market);
                // Return the symbols list as the response
                res.status(200).json({ symbols: symbolsList });
            }
            catch (error) {
                // Handle any errors and return an error response
                res.status(500).json({ error: error.message });
            }
        });
        // Handler for getting the fills list for a trade type on an exchange
        this.getFills = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exchange = req.params.exchange;
                const tradeType = req.params.tradeType;
                // Get the exchange API instance based on the exchange name
                const api = APIFactory.getAPI(exchange);
                // Fetch the fills list for the trade type on the exchange
                const fillsList = yield api.fetchFillsList(tradeType);
                // Return the fills list as the response
                res.status(200).json({ fills: fillsList });
            }
            catch (error) {
                // Handle any errors and return an error response
                res.status(500).json({ error: error.message });
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        // Route for getting the cumulative delta index for a symbol on an exchange
        this.router.get(`${this.path}/:exchange/delta/:symbol`, this.getCumulativeDeltaIndex);
        // Route for getting the symbols list for an exchange
        this.router.get(`${this.path}/:exchange/symbols/:market?`, this.getSymbols);
        // Route for getting the fills list for a trade type on an exchange
        this.router.get(`${this.path}/:exchange/fills/:tradeType`, this.getFills);
    }
}
export default ExchangeController;
//# sourceMappingURL=exchange.controller.js.map