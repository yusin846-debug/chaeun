import { OHAENG_ORDER, OhaengId } from "./content";

export interface BirthInfo {
  year: number;
  month: number;
  day: number;
  hour: number;
}

/**
 * TODO(phase3): 실제 만세력/사주 오행 계산 로직으로 교체.
 * 지금은 생년월일시 숫자합으로 오행 하나를 결정론적으로 골라주는 목업.
 */
export function getMissingOhaeng(birth: BirthInfo): OhaengId {
  const sum = birth.year + birth.month * 31 + birth.day * 12 + birth.hour * 7;
  return OHAENG_ORDER[sum % OHAENG_ORDER.length];
}
