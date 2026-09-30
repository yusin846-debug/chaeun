import { sessionSchema, type ChatRequest } from './schema';
export const STORAGE_KEY = 'chaeun.consultation.v1';
export type Session = ChatRequest & { version: 1; space?: import('zod').infer<typeof import('./space').savedSpaceSchema> };
let cached: Session | null = null;
let loaded = false;
let storageWarning = '';
const listeners = new Set<() => void>();
export const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };
export const serverSnapshot = () => null;
export function getSession() {
  if (typeof window === 'undefined') return null;
  if (!loaded) {
    loaded = true;
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (value) {
        const parsed = sessionSchema.safeParse(JSON.parse(value));
        if (parsed.success) cached = parsed.data;
        else { localStorage.removeItem(STORAGE_KEY); storageWarning = '이전 상담 형식이 바뀌어 새로 시작해요.'; }
      }
    } catch { storageWarning = '이 브라우저에서는 상담을 저장할 수 없어요. 창을 닫으면 사라질 수 있어요.'; }
  }
  return cached;
}
export function setSession(session: Session | null) {
  cached = session;
  loaded = true;
  try {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  } catch { storageWarning = '기기 저장에 실패했어요. 현재 창에서는 계속 대화할 수 있어요.'; }
  for (const listener of listeners) listener();
}
export function getStorageWarning() { return storageWarning; }
