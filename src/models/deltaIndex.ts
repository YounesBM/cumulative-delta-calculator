import { Trade } from "./trade";
import { Decimal } from "decimal.js";

class DeltaIndex {
  currentDelta: Decimal; // The current delta index
  tradeHistory: Trade[]; // Array to store trade history

  constructor() {
    this.currentDelta = new Decimal(0); // Initialize the current delta index to 0
    this.tradeHistory = []; // Initialize the trade history array
  }

  updateDeltaIndex(trade: Trade) {
    if (trade.side === "buy") {
      this.currentDelta = this.currentDelta.plus(new Decimal(trade.size)); // Add the trade size to the current delta for buy trades
    } else if (trade.side === "sell") {
      this.currentDelta = this.currentDelta.minus(new Decimal(trade.size)); // Subtract the trade size from the current delta for sell trades
    }
    this.tradeHistory.push(trade); // Add the trade to the trade history array
  }

  getCurrentDeltaIndex() {
    return this.currentDelta.toString(); // Get the current delta index as a string
  }
}

export default DeltaIndex;
