var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ExchangeController from "../controllers/exchange.controller";
import { APIFactory } from "../api/apiFactory";
import { Decimal } from "decimal.js";
jest.mock("../api/apiFactory");
describe("ExchangeController", () => {
    let exchangeController;
    let mockRequest;
    let mockResponse;
    let mockNext;
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
        it("returns cumulative delta index and trades", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAPI = {
                fetchTradeHistory: jest.fn().mockResolvedValue([]),
            };
            APIFactory.getAPI.mockReturnValue(mockAPI);
            mockRequest.params = {
                exchange: "kucoin",
                symbol: "BTC-USDT",
            };
            yield exchangeController.getCumulativeDeltaIndex(mockRequest, mockResponse, mockNext);
            expect(APIFactory.getAPI).toHaveBeenCalledWith("kucoin");
            expect(mockAPI.fetchTradeHistory).toHaveBeenCalledWith("BTC-USDT");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                cumulativeDeltaIndex: expect.objectContaining(new Decimal("0")),
                trades: [],
            });
        }));
        it("handles errors and returns 500 status", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAPI = {
                fetchTradeHistory: jest.fn().mockRejectedValue(new Error("API error")),
            };
            APIFactory.getAPI.mockReturnValue(mockAPI);
            mockRequest.params = {
                exchange: "kucoin",
                symbol: "BTC-USDT",
            };
            yield exchangeController.getCumulativeDeltaIndex(mockRequest, mockResponse, mockNext);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: "API error",
            });
        }));
    });
    describe("getSymbols", () => {
        it("returns symbols list", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAPI = {
                fetchSymbolsList: jest.fn().mockResolvedValue([]),
            };
            APIFactory.getAPI.mockReturnValue(mockAPI);
            mockRequest.params = {
                exchange: "kucoin",
                market: "BTC",
            };
            yield exchangeController.getSymbols(mockRequest, mockResponse, mockNext);
            expect(APIFactory.getAPI).toHaveBeenCalledWith("kucoin");
            expect(mockAPI.fetchSymbolsList).toHaveBeenCalledWith("BTC");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                symbols: [],
            });
        }));
        it("handles errors and returns 500 status", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAPI = {
                fetchSymbolsList: jest.fn().mockRejectedValue(new Error("API error")),
            };
            APIFactory.getAPI.mockReturnValue(mockAPI);
            mockRequest.params = {
                exchange: "kucoin",
                market: "BTC",
            };
            yield exchangeController.getSymbols(mockRequest, mockResponse, mockNext);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: "API error",
            });
        }));
    });
    describe("getFills", () => {
        it("returns fills list", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAPI = {
                fetchFillsList: jest.fn().mockResolvedValue([]),
            };
            APIFactory.getAPI.mockReturnValue(mockAPI);
            mockRequest.params = {
                exchange: "kucoin",
                tradeType: "TRADE",
            };
            yield exchangeController.getFills(mockRequest, mockResponse, mockNext);
            expect(APIFactory.getAPI).toHaveBeenCalledWith("kucoin");
            expect(mockAPI.fetchFillsList).toHaveBeenCalledWith("TRADE");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({
                fills: [],
            });
        }));
        it("handles errors and returns 500 status", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAPI = {
                fetchFillsList: jest.fn().mockRejectedValue(new Error("API error")),
            };
            APIFactory.getAPI.mockReturnValue(mockAPI);
            mockRequest.params = {
                exchange: "kucoin",
                tradeType: "TRADE",
            };
            yield exchangeController.getFills(mockRequest, mockResponse, mockNext);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                error: "API error",
            });
        }));
    });
});
//# sourceMappingURL=exchangeController.test.js.map