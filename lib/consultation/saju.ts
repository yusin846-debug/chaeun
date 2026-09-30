import { calculateFourPillars, lunarToSolar, isValidSolarDate, type FourPillarsDetail, type FiveElement } from 'manseryeok';
import { birthSchema, type Birth } from './schema';

export const elements: FiveElement[] = ['목', '화', '토', '금', '수'];
const seoul = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const pairKeys = ['year', 'month', 'day', 'hour'] as const;
// Try historical Korean civil offsets. Round-trip through IANA catches missing/repeated DST hours.
function instantsForWall(wall: number) {
  const target = new Date(wall).toISOString().slice(0, 16).replace('T', ' ');
  return [510, 540, 570, 600].map(offset => wall - offset * 60000)
    .filter(instant => seoul.format(new Date(instant)) === target);
}
function variant(raw: FourPillarsDetail, unknown: boolean) {
  const pillars = pairKeys.map(key => key === 'hour' && unknown ? null : ({
    name: ({ year: '연주', month: '월주', day: '일주', hour: '시주' })[key],
    korean: raw[`${key}String`], hanja: raw[`${key}Hanja`],
    stem: raw[key].heavenlyStem, branch: raw[key].earthlyBranch,
    elements: raw[`${key}Element`], tenGods: raw.tenGods[key],
  }));
  const counts = Object.fromEntries(elements.map(e => [e, 0])) as Record<FiveElement, number>;
  for (const pillar of pillars) if (pillar) { counts[pillar.elements.stem]++; counts[pillar.elements.branch]++; }
  return { pillars, dayMaster: raw.day.heavenlyStem, counts };
}
export function calculateChart(input: Birth, now = new Date()) {
  const birth = birthSchema.parse(input);
  const [year, month, day] = birth.date.split('-').map(Number);
  if (year < 1920 || year > now.getUTCFullYear()) throw new Error('1920년부터 현재까지의 출생 정보를 입력해주세요.');
  let solar = { year, month, day };
  if (birth.calendar !== 'solar') {
    try { solar = lunarToSolar(year, month, day, birth.calendar === 'lunar-leap'); }
    catch { throw new Error('음력 날짜와 윤달 여부를 다시 확인해주세요.'); }
  } else if (!isValidSolarDate(year, month, day)) throw new Error('존재하는 생년월일을 입력해주세요.');
  const solarDate = `${solar.year}-${String(solar.month).padStart(2, '0')}-${String(solar.day).padStart(2, '0')}`;
  if (solarDate > seoul.format(now).slice(0, 10)) throw new Error('미래의 날짜는 생일로 입력할 수 없어요.');
  const base = Date.UTC(solar.year, solar.month - 1, solar.day);
  const minutes = birth.unknown ? Array.from({ length: 1440 }, (_, i) => i) : [Number(birth.time.slice(0, 2)) * 60 + Number(birth.time.slice(3))];
  const variants = new Map<string, ReturnType<typeof variant>>();
  const luck = new Map<string, { forward: boolean; startAge: [number, number]; startMonths: [number, number]; pillars: string[] }>();
  for (const minute of minutes) {
    const instants = instantsForWall(base + minute * 60000);
    if (!birth.unknown && instants.length !== 1) throw new Error('서머타임 전환으로 시간이 겹치거나 존재하지 않는 시각이에요. 출생 기록을 확인하거나 시간을 모름으로 선택해주세요.');
    for (const instant of instants) {
      if (!birth.unknown && instant > now.getTime()) throw new Error('미래의 출생 시각은 입력할 수 없어요.');
      // Normalize civil time to UTC+9; do not apply longitude or equation-of-time corrections.
      const kst = new Date(instant + 9 * 3600000);
      const raw = calculateFourPillars({ year: kst.getUTCFullYear(), month: kst.getUTCMonth() + 1, day: kst.getUTCDate(), hour: kst.getUTCHours(), minute: kst.getUTCMinutes(), dayBoundary: 'midnight', gender: birth.gender });
      const v = variant(raw, birth.unknown);
      const key = v.pillars.map(p => p?.korean ?? '').join('/');
      variants.set(key, v);
      const l = raw.luckPillars!;
      const luckKey = `${l.forward}/${l.pillars.map(p => p.korean).join('/')}`;
      const months = l.startYears * 12 + l.startMonths + l.startDays / 30;
      const existing = luck.get(luckKey);
      if (existing) {
        existing.startAge = [Math.min(existing.startAge[0], l.startAge), Math.max(existing.startAge[1], l.startAge)];
        existing.startMonths = [Math.min(existing.startMonths[0], months), Math.max(existing.startMonths[1], months)];
      } else luck.set(luckKey, { forward: l.forward, startAge: [l.startAge, l.startAge], startMonths: [months, months], pillars: l.pillars.map(p => p.korean) });
    }
  }
  if (!variants.size) throw new Error('출생 날짜의 시각을 확인해주세요.');
  const candidates = [...variants.values()];
  return {
    solarDate, unknownTime: birth.unknown, candidates, luck: [...luck.values()],
    elementRanges: elements.map(element => ({ element, min: Math.min(...candidates.map(v => v.counts[element])), max: Math.max(...candidates.map(v => v.counts[element])) })),
    uncertainties: [
      ...(birth.unknown ? ['시간을 몰라 시주는 제외했어요. 대운 시작 시점은 하루 안에서 가능한 범위예요.'] : []),
      ...(candidates.length > 1 ? ['절입 또는 시각 보정 경계에 걸려 원국 후보가 여럿이에요. 공통으로 확인되는 내용부터 읽어요.'] : []),
    ],
    policy: { engine: 'manseryeok@2.0.0', year: '입춘', month: '절입', day: '자정', time: '한국 법정시를 UTC+9 표준시로 정규화 · 경도/진태양시 보정 없음', luck: '양남음녀 순행 · 음남양녀 역행 / 3일=1년 / 대운수는 연 단위 반올림', counts: '천간·지지 본기 개수. 강약·용신 점수가 아님.' },
  };
}
export type Chart = ReturnType<typeof calculateChart>;
