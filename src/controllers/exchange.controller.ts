import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interfaces/controller.interface";
import { APIFactory } from "../api/apiFactory";
import DeltaIndex from "../models/deltaIndex";
import { Trade } from "../models/trade";

class ExchangeController implements Controller {
  public path = "/exchange";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Route for getting the cumulative delta index for a symbol on an exchange
    this.router.get(
      `${this.path}/:exchange/delta/:symbol`,
      this.getCumulativeDeltaIndex
    );

    // Route for getting the symbols list for an exchange
    this.router.get(`${this.path}/:exchange/symbols/:market?`, this.getSymbols);

    // Route for getting the fills list for a trade type on an exchange
    this.router.get(`${this.path}/:exchange/fills/:tradeType`, this.getFills);
  }

  // Handler for getting the cumulative delta index for a symbol on an exchange
  public getCumulativeDeltaIndex = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const exchange = req.params.exchange;
      const symbol = req.params.symbol;

      // Get the exchange API instance based on the exchange name
      const api = APIFactory.getAPI(exchange);

      // Fetch the trade history for the symbol on the exchange
      const tradeHistory = await api.fetchTradeHistory(symbol);

      // Create a DeltaIndex instance and update it with the trade history
      const deltaIndex = new DeltaIndex();
      tradeHistory.forEach((trade: Trade) => deltaIndex.updateDeltaIndex(trade));

      // Return the cumulative delta index and trade history as the response
      res.status(200).json({
        cumulativeDeltaIndex: deltaIndex.currentDelta,
        trades: deltaIndex.tradeHistory,
      });
    } catch (error) {
      // Handle any errors and return an error response
      res.status(500).json({ error: error.message });
    }
  };

  // Handler for getting the symbols list for an exchange
  public getSymbols = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const exchange = req.params.exchange;
      const market = req.params.market;

      // Get the exchange API instance based on the exchange name
      const api = APIFactory.getAPI(exchange);

      // Fetch the symbols list for the market on the exchange
      const symbolsList = await api.fetchSymbolsList(market);

      // Return the symbols list as the response
      res.status(200).json({ symbols: symbolsList });
    } catch (error) {
      // Handle any errors and return an error response
      res.status(500).json({ error: error.message });
    }
  };

  // Handler for getting the fills list for a trade type on an exchange
  public getFills = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const exchange = req.params.exchange;
      const tradeType = req.params.tradeType;

      // Get the exchange API instance based on the exchange name
      const api = APIFactory.getAPI(exchange);

      // Fetch the fills list for the trade type on the exchange
      const fillsList = await api.fetchFillsList(tradeType);

      // Return the fills list as the response
      res.status(200).json({ fills: fillsList });
    } catch (error) {
      // Handle any errors and return an error response
      res.status(500).json({ error: error.message });
    }
  };
}

export default ExchangeController;
