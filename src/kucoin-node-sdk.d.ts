import { Trade } from "./models/trade";
import { TradeSymbol } from "./models/tradeSymbol";
import { Fill } from "./models/fill";

declare module "kucoin-node-sdk" {
  // Define the structure of the rest object
  const rest: {
    Market: {
      Histories: {
        // Define the getMarketHistories method and its return type
        getMarketHistories(symbol: string): Promise<KucoinResponse<Trade[]>>;
      };
      Symbols: {
        // Define the getSymbolsList method and its return type
        getSymbolsList(market: string): Promise<KucoinResponse<TradeSymbol[]>>;
      };
    };
    Trade: {
      Fills: {
        // Define the getFillsList method and its return type
        getFillsList(
          tradeType: string
        ): Promise<KucoinResponse<FillsListResponse>>;
      };
    };
    // Add other endpoints as needed...
  };

  // Define the structure of the KucoinResponse object
  export interface KucoinResponse<T> {
    code: string;
    data: T;
  }

  // Define the structure of the FillsListResponse object
  export interface FillsListResponse {
    currentPage: number;
    pageSize: number;
    totalNum: number;
    totalPage: number;
    items: Fill[];
  }

  // Define the structure of the KucoinAuth object
  interface KucoinAuth {
    key: string; // KC-API-KEY
    secret: string; // API-Secret
    passphrase: string; // KC-API-PASSPHRASE
  }

  // Define the structure of the KucoinConfig object
  export interface KucoinConfig {
    baseUrl: string;
    apiAuth: KucoinAuth;
    authVersion: number; // KC-API-KEY-VERSION. Notice: for v2 API-KEY, not required for v1 version.
  }

  // This function initializes and returns a KucoinClient
  export function init(config: KucoinConfig): void;
}
