import { KucoinAPI } from "../exchanges/kucoin/kucoinAPI";
import * as Kucoin from "kucoin-node-sdk";
import { Trade } from "../models/trade";
import { TradeSymbol } from "../models/tradeSymbol";
import { Fill } from "../models/fill";

jest.mock("kucoin-node-sdk", () => {
  return {
    rest: {
      Market: {
        Histories: {
          getMarketHistories: jest.fn(),
        },
        Symbols: {
          getSymbolsList: jest.fn(),
        },
      },
      Trade: {
        Fills: {
          getFillsList: jest.fn(),
        },
      },
    },
    init: jest.fn(),
  };
});

describe("KucoinAPI", () => {
  let api: KucoinAPI;

  const mockTradeData = [
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
  ];

  const mockSymbolData = {
    symbol: "BTC-USDT",
    name: "BTC-USDT",
    baseCurrency: "BTC",
    quoteCurrency: "USDT",
    baseMinSize: "0.00000001",
    quoteMinSize: "0.01",
    baseMaxSize: "10000",
    quoteMaxSize: "100000",
    baseIncrement: "0.00000001",
    quoteIncrement: "0.01",
    priceIncrement: "0.00000001",
    feeCurrency: "USDT",
    enableTrading: true,
    isMarginEnabled: true,
    priceLimitRate: "0.1",
  };

  const mockFillData = {
    symbol: "BTC-USDT",
    tradeId: "60561c77-ba05-4a0f-8d15-6e3f5d32ece2",
    orderId: "60561c77-ba05-4a0f-8d15-6e3f5d32ece1",
    counterOrderId: "60561c77-ba05-4a0f-8d15-6e3f5d32ece0",
    side: "buy",
    liquidity: "maker",
    forceTaker: true,
    price: "100.0",
    size: "1.0",
    funds: "100.0",
    fee: "0.001",
    feeRate: "0.0001",
    feeCurrency: "USDT",
    stop: "",
    type: "limit",
    createdAt: 1627299184668,
    tradeType: "TRADE",
  };

  beforeEach(() => {
    (Kucoin.rest.Market.Histories.getMarketHistories as jest.Mock).mockResolvedValue({
      code: "200000",
      data: mockTradeData,
    });
    (Kucoin.rest.Market.Symbols.getSymbolsList as jest.Mock).mockResolvedValue({
      code: "200000",
      data: [mockSymbolData],
    });
    (Kucoin.rest.Trade.Fills.getFillsList as jest.Mock).mockResolvedValue({
      code: "200000",
      data: { items: [mockFillData] },
    });
    api = new KucoinAPI();
  });

  it("fetches trade history", async () => {
    const symbol = "BTC-USDT";
    const result = await api.fetchTradeHistory(symbol);

    expect(Kucoin.rest.Market.Histories.getMarketHistories).toBeCalledWith(
      symbol.toUpperCase()
    );
    expect(result).toEqual(expect.arrayContaining([expect.any(Trade)]));
  });

  it("fetches trade history - failure", async () => {
    (Kucoin.rest.Market.Histories.getMarketHistories as jest.Mock).mockResolvedValue({
      code: "400000",
    });

    const symbol = "BTC-USDT";

    await expect(api.fetchTradeHistory(symbol)).rejects.toThrow(
      "Failed to get trade history, code: 400000"
    );
    expect(Kucoin.rest.Market.Histories.getMarketHistories).toBeCalledWith(
      symbol.toUpperCase()
    );
  });

  it("fetches symbols list", async () => {
    const market = "BTC";
    const result = await api.fetchSymbolsList(market);

    expect(Kucoin.rest.Market.Symbols.getSymbolsList).toBeCalledWith(market);
    expect(result).toEqual(expect.arrayContaining([expect.any(TradeSymbol)]));
  });

  it("fetches fills list", async () => {
    const tradeType = "TRADE";
    const result = await api.fetchFillsList(tradeType);

    expect(Kucoin.rest.Trade.Fills.getFillsList).toBeCalledWith(tradeType);
    expect(result).toEqual(expect.arrayContaining([expect.any(Fill)]));
  });
});
