/** Local callsign rules. Names are display labels, not globally unique account IDs. */
export const GUEST_NAME_MAX_CODE_POINTS = 32;
export type GuestNameValidation =
  | { valid: true; value: string; message: null }
  | { valid: false; value: string; message: string };

export function clampGuestName(input: string): string {
  return Array.from(input).slice(0, GUEST_NAME_MAX_CODE_POINTS).join("");
}
export function validateGuestName(input: string): GuestNameValidation {
  const value = input.trim();
  const length = Array.from(value).length;
  if (length < 2) return { valid: false, value, message: "Use at least two characters for your callsign." };
  if (length > GUEST_NAME_MAX_CODE_POINTS) return { valid: false, value, message: `Use ${GUEST_NAME_MAX_CODE_POINTS} characters or fewer.` };
  return { valid: true, value, message: null };
}
export function normalizeGuestName(input: string): string {
  const result = validateGuestName(input);
  if (!result.valid) throw new Error(result.message);
  return result.value;
}
