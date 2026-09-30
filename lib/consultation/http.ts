// Local-process protection for the first, single-server release. Use a shared limiter before scaling out.
const windows = new Map<string, { until: number; count: number }>();
let active = 0;
export class HttpError extends Error { constructor(public status: number, message: string) { super(message); } }
export function guard(request: Request) {
  const origin = request.headers.get('origin');
  let sameOrigin = false;
  try { const url = new URL(origin ?? ''); sameOrigin = ['http:', 'https:'].includes(url.protocol) && url.host === request.headers.get('host'); } catch {}
  if (!sameOrigin) throw new HttpError(403, '이 사이트에서 다시 요청해주세요.');
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) throw new HttpError(415, '입력 형식을 확인해주세요.');
  const now = Date.now();
  for (const [key, value] of windows) if (value.until <= now) windows.delete(key);
  // Intentionally global: untrusted forwarding headers must not bypass this local preview's budget cap.
  const key = new URL(request.url).pathname;
  const bucket = windows.get(key) ?? { until: now + 60000, count: 0 };
  if (++bucket.count > 30 || active >= 4) throw new HttpError(429, '잠깐 숨을 고르고 다시 보내줘. 지금 요청이 많아.');
  windows.set(key, bucket);
}
export async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, '입력한 정보를 확인해주세요.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 150000) { await reader.cancel(); throw new HttpError(413, '한 번에 보내는 이야기가 너무 길어요.'); }
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, '입력한 정보를 확인해주세요.');
  }
}
export function startWork() { active++; return () => { active--; }; }
export function failure(error: unknown) {
  const status = error instanceof HttpError ? error.status : 500;
  return Response.json({ error: error instanceof HttpError ? error.message : '잠깐 연결이 끊겼어. 이야기는 그대로 두었으니 다시 시도해줘.' }, { status, headers: { 'Cache-Control': 'no-store' } });
}
