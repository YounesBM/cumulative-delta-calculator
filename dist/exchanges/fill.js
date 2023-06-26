export class Fill {
    constructor(symbol, tradeId, orderId, counterOrderId, side, liquidity, forceTaker, price, size, funds, fee, feeRate, feeCurrency, stop, type, createdAt, tradeType) {
        this.symbol = symbol;
        this.tradeId = tradeId;
        this.orderId = orderId;
        this.counterOrderId = counterOrderId;
        this.side = side;
        this.liquidity = liquidity;
        this.forceTaker = forceTaker;
        this.price = price;
        this.size = size;
        this.funds = funds;
        this.fee = fee;
        this.feeRate = feeRate;
        this.feeCurrency = feeCurrency;
        this.stop = stop;
        this.type = type;
        this.createdAt = createdAt;
        this.tradeType = tradeType;
    }
}
//# sourceMappingURL=fill.js.map