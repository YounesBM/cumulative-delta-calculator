import { ExchangeAPI } from '../exchanges/exchangeAPI';
import { KucoinAPI } from '../exchanges/kucoin/kucoinAPI';

/**
 * Factory class for creating exchange API instances.
 * Currently supports the Kucoin exchange API.
 */
export class APIFactory {
  /**
   * Get the exchange API instance based on the exchange name.
   * @param exchange The name of the exchange.
   * @returns An instance of the ExchangeAPI for the specified exchange.
   * @throws Error if the exchange name is invalid or unsupported.
   */
  static getAPI(exchange: string): ExchangeAPI {
    switch (exchange) {
      case 'kucoin':
        return new KucoinAPI();
      // add more cases for other exchanges
      default:
        throw new Error('Invalid exchange name');
    }
  }
}
