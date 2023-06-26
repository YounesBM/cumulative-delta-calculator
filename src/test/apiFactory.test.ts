import { APIFactory } from "../api/apiFactory";
import { KucoinAPI } from "../exchanges/kucoin/kucoinAPI";

jest.mock("../exchanges/kucoin/kucoinAPI");

describe("APIFactory", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (KucoinAPI as jest.Mock).mockClear();
  });

  it("returns KucoinAPI for 'kucoin' exchange", () => {
    const api = APIFactory.getAPI("kucoin");

    expect(KucoinAPI).toHaveBeenCalled();
    expect(api).toBeInstanceOf(KucoinAPI);
  });

  it("throws error for invalid exchange", () => {
    expect(() => APIFactory.getAPI("invalid")).toThrow("Invalid exchange name");
  });
});
