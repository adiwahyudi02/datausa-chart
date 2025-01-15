import { formatNumberWithCommas } from "../formatNumber";

describe("formatNumberWithCommas", () => {
  it("should format numbers correctly", () => {
    // Test for regular numbers
    expect(formatNumberWithCommas(1000)).toBe("1,000");
    expect(formatNumberWithCommas(1234567)).toBe("1,234,567");
    expect(formatNumberWithCommas(987654321)).toBe("987,654,321");

    // Test for edge cases
    expect(formatNumberWithCommas(0)).toBe("0");
    expect(formatNumberWithCommas(-1234)).toBe("-1,234");
    expect(formatNumberWithCommas(100)).toBe("100");

    // Test for large numbers
    expect(formatNumberWithCommas(1234567890)).toBe("1,234,567,890");
  });
});
