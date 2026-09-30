import { birthSchema } from '@/lib/consultation/schema';
import { calculateChart } from '@/lib/consultation/saju';
import { guard, readBody, failure, HttpError } from '@/lib/consultation/http';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    guard(request);
    const parsed = birthSchema.safeParse(await readBody(request));
    if (!parsed.success) throw new HttpError(400, '생년월일, 시간, 성별을 다시 확인해주세요.');
    let chart;
    try { chart = calculateChart(parsed.data); }
    catch (error) { throw new HttpError(400, error instanceof Error ? error.message : '생년월일을 확인해주세요.'); }
    return Response.json({ chart }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return failure(error); }
}
