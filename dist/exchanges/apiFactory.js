import { KucoinAPI } from './kucoin/kucoinAPI';
export class APIFactory {
    static getAPI(exchange) {
        switch (exchange) {
            case 'kucoin':
                return new KucoinAPI();
            // add more cases for other exchanges
            default:
                throw new Error('Invalid exchange name');
        }
    }
}
//# sourceMappingURL=apiFactory.js.map