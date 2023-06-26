import { Request, Response, NextFunction } from "express";
import ExchangeController from "../controllers/exchange.controller";
import { APIFactory } from "../api/apiFactory";
import { Trade } from "../models/trade";
import { Decimal } from "decimal.js";

jest.mock("../api/apiFactory");

describe("ExchangeController", () => {
  let exchangeController: ExchangeController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    exchangeController = new ExchangeController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCumulativeDeltaIndex", () => {
    it("returns cumulative delta index and trades", async () => {
      const mockAPI = {
        fetchTradeHistory: jest.fn().mockResolvedValue([] as Trade[]),
      };
      (APIFactory.getAPI as jest.Mock).mockReturnValue(mockAPI);

      mockRequest.params = {
        exchange: "kucoin",
        symbol: "BTC-USDT",
      };

      await exchangeController.getCumulativeDeltaIndex(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(APIFactory.getAPI).toHaveBeenCalledWith("kucoin");
      expect(mockAPI.fetchTradeHistory).toHaveBeenCalledWith("BTC-USDT");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        cumulativeDeltaIndex: expect.objectContaining(new Decimal("0")),
        trades: [],
      });
    });

    it("handles errors and returns 500 status", async () => {
      const mockAPI = {
        fetchTradeHistory: jest.fn().mockRejectedValue(new Error("API error")),
      };
      (APIFactory.getAPI as jest.Mock).mockReturnValue(mockAPI);

      mockRequest.params = {
        exchange: "kucoin",
        symbol: "BTC-USDT",
      };

      await exchangeController.getCumulativeDeltaIndex(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "API error",
      });
    });
  });

  describe("getSymbols", () => {
    it("returns symbols list", async () => {
      const mockAPI = {
        fetchSymbolsList: jest.fn().mockResolvedValue([]),
      };
      (APIFactory.getAPI as jest.Mock).mockReturnValue(mockAPI);

      mockRequest.params = {
        exchange: "kucoin",
        market: "BTC",
      };

      await exchangeController.getSymbols(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(APIFactory.getAPI).toHaveBeenCalledWith("kucoin");
      expect(mockAPI.fetchSymbolsList).toHaveBeenCalledWith("BTC");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        symbols: [],
      });
    });

    it("handles errors and returns 500 status", async () => {
      const mockAPI = {
        fetchSymbolsList: jest.fn().mockRejectedValue(new Error("API error")),
      };
      (APIFactory.getAPI as jest.Mock).mockReturnValue(mockAPI);

      mockRequest.params = {
        exchange: "kucoin",
        market: "BTC",
      };

      await exchangeController.getSymbols(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "API error",
      });
    });
  });

  describe("getFills", () => {
    it("returns fills list", async () => {
      const mockAPI = {
        fetchFillsList: jest.fn().mockResolvedValue([]),
      };
      (APIFactory.getAPI as jest.Mock).mockReturnValue(mockAPI);

      mockRequest.params = {
        exchange: "kucoin",
        tradeType: "TRADE",
      };

      await exchangeController.getFills(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(APIFactory.getAPI).toHaveBeenCalledWith("kucoin");
      expect(mockAPI.fetchFillsList).toHaveBeenCalledWith("TRADE");
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        fills: [],
      });
    });

    it("handles errors and returns 500 status", async () => {
      const mockAPI = {
        fetchFillsList: jest.fn().mockRejectedValue(new Error("API error")),
      };
      (APIFactory.getAPI as jest.Mock).mockReturnValue(mockAPI);

      mockRequest.params = {
        exchange: "kucoin",
        tradeType: "TRADE",
      };

      await exchangeController.getFills(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "API error",
      });
    });
  });
});
