import { clampGuestName, GUEST_NAME_MAX_CODE_POINTS, normalizeGuestName, validateGuestName } from "@/services/guestIdentity";

describe("local guest callsigns", () => {
  it("trims whitespace and respects the SQLite minimum name length", () => {
    expect(normalizeGuestName("  星星  ")).toBe("星星");
    expect(validateGuestName("  ")).toEqual({ valid: false, value: "", message: "Use at least two characters for your callsign." });
  });
  it("does not reserve display names globally", () => {
    expect(normalizeGuestName("ShadowNova")).toBe("ShadowNova");
    expect(normalizeGuestName("ShadowNova")).toBe("ShadowNova");
  });
  it("limits Unicode code points without splitting surrogate pairs", () => {
    expect(Array.from(clampGuestName("⚔️".repeat(40))).length).toBe(GUEST_NAME_MAX_CODE_POINTS);
    expect(() => normalizeGuestName("⚔️".repeat(40))).toThrow("Use 32 characters or fewer.");
  });
  it("preserves casing and internal spaces", () => expect(normalizeGuestName("  Void Reaper  ")).toBe("Void Reaper"));
});
