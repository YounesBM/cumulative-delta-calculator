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
import { APIFactory } from "./apiFactory";
import DeltaIndex from "./deltaIndex";
class ExchangeController {
    constructor() {
        this.path = "/exchange";
        this.router = Router();
        this.getCumulativeDeltaIndex = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exchange = req.params.exchange;
                const symbol = req.params.symbol;
                const api = APIFactory.getAPI(exchange);
                const tradeHistory = yield api.fetchTradeHistory(symbol);
                const deltaIndex = new DeltaIndex();
                console.log(tradeHistory);
                tradeHistory.forEach((trade) => deltaIndex.updateDeltaIndex(trade));
                res
                    .status(200)
                    .json({
                    cumulativeDeltaIndex: deltaIndex.currentDelta,
                    trades: deltaIndex.tradeHistory,
                });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.getSymbols = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exchange = req.params.exchange;
                const market = req.params.market;
                const api = APIFactory.getAPI(exchange);
                const symbolsList = yield api.fetchSymbolsList(market);
                res.status(200).json({ symbols: symbolsList });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.getFills = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const exchange = req.params.exchange;
                const tradeType = req.params.tradeType;
                const api = APIFactory.getAPI(exchange);
                const fillsList = yield api.fetchFillsList(tradeType);
                res.status(200).json({ fills: fillsList });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:exchange/delta/:symbol`, this.getCumulativeDeltaIndex);
        this.router.get(`${this.path}/:exchange/symbols/:market?`, this.getSymbols);
        this.router.get(`${this.path}/:exchange/fills/:tradeType`, this.getFills);
    }
}
export default ExchangeController;
//# sourceMappingURL=exchange.controller.js.map