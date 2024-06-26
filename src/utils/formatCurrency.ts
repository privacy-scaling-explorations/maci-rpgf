import { formatNumber } from "./formatNumber";
import { suffixNumber } from "./suffixNumber";

export function formatCurrency(amount: number, currency: string, short = true): string {
  return `${short ? suffixNumber(amount) : formatNumber(amount)} ${currency}`;
}
