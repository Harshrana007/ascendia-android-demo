import { clampProgress, formatProgress } from "../../src/utils/progress";
describe("progress utilities", () => {
  it("clamps progress to zero and one while preserving valid ratios", () => {
    expect(clampProgress(-2, 10)).toBe(0);
    expect(clampProgress(5, 10)).toBe(0.5);
    expect(clampProgress(15, 10)).toBe(1);
  });
  it("returns zero when the maximum or input is invalid", () => {
    expect(clampProgress(2, 0)).toBe(0);
    expect(clampProgress(Number.NaN, 5)).toBe(0);
    expect(clampProgress(3, Number.POSITIVE_INFINITY)).toBe(0);
  });
  it("formats non-negative numeric values without decimals", () => {
    expect(formatProgress(12450)).toBe("12,450");
    expect(formatProgress(-6)).toBe("0");
  });
});