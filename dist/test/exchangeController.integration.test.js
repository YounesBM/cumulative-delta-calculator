var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from "supertest";
import App from "../app";
import ExchangeController from "../controllers/exchange.controller";
import { APIFactory } from "../api/apiFactory";
import { KucoinAPI } from "../exchanges/kucoin/kucoinAPI";
import DeltaIndex from "../models/deltaIndex";
jest.mock("../api/apiFactory");
describe("ExchangeController", () => {
    let app;
    beforeAll(() => {
        app = new App([new ExchangeController()]);
    });
    describe("GET /exchange/:exchange/delta/:symbol", () => {
        it("should return the cumulative delta index and trades", () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock the APIFactory to return a mock KucoinAPI instance
            const mockKucoinAPI = new KucoinAPI();
            APIFactory.getAPI.mockReturnValue(mockKucoinAPI);
            // Mock the fetchTradeHistory method of KucoinAPI to return trade history data
            const mockTradeHistory = [
                {
                    sequence: "1545896668571",
                    price: "0.07",
                    size: "0.004",
                    side: "buy",
                    time: 1545904567062140823,
                },
                {
                    sequence: "1545896668578",
                    price: "0.054",
                    size: "0.066",
                    side: "buy",
                    time: 1545904581619888405,
                },
                {
                    sequence: "1545896668579",
                    price: "0.054",
                    size: "0.010",
                    side: "sell",
                    time: 1545904581619888405,
                },
            ];
            mockKucoinAPI.fetchTradeHistory = jest
                .fn()
                .mockResolvedValue(mockTradeHistory);
            // Send a request to the endpoint
            const response = yield request(app.app).get("/exchange/kucoin/delta/BTC-USDT");
            // Assert the response
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("cumulativeDeltaIndex");
            expect(response.body).toHaveProperty("trades");
            // Verify that the fetchTradeHistory method of KucoinAPI was called with the correct arguments
            expect(mockKucoinAPI.fetchTradeHistory).toHaveBeenCalledWith("BTC-USDT");
            // Create a DeltaIndex instance and update it with the mock trade history data
            const deltaIndex = new DeltaIndex();
            mockTradeHistory.forEach((trade) => deltaIndex.updateDeltaIndex(trade));
            // Verify that the cumulativeDeltaIndex and trades in the response match the DeltaIndex instance
            expect(response.body.cumulativeDeltaIndex).toEqual("0.06");
            expect(response.body.cumulativeDeltaIndex).toEqual(deltaIndex.getCurrentDeltaIndex());
            expect(response.body.trades).toEqual(deltaIndex.tradeHistory);
        }));
    });
});
//# sourceMappingURL=exchangeController.integration.test.js.map