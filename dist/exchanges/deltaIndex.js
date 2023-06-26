class DeltaIndex {
    constructor() {
        this.currentDelta = 0;
        this.tradeHistory = [];
    }
    updateDeltaIndex(trade) {
        if (trade.side === "buy") {
            this.currentDelta += +trade.size;
        }
        else if (trade.side === "sell") {
            this.currentDelta -= +trade.size;
        }
        this.tradeHistory.push(trade);
    }
    getCurrentDeltaIndex() {
        return this.currentDelta;
    }
}
export default DeltaIndex;
//# sourceMappingURL=deltaIndex.js.map