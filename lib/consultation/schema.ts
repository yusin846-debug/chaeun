import { z } from 'zod';
import { savedSpaceSchema } from './space';

export const birthSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string(),
  calendar: z.enum(['solar', 'lunar', 'lunar-leap']),
  unknown: z.boolean(),
  gender: z.enum(['female', 'male']),
}).strict().superRefine((value, ctx) => {
  if (!value.unknown && !/^([01]\d|2[0-3]):[0-5]\d$/.test(value.time)) {
    ctx.addIssue({ code: 'custom', message: '태어난 시와 분을 확인해주세요.', path: ['time'] });
  }
});
export type Birth = z.infer<typeof birthSchema>;
export const topicSchema = z.enum(['', 'lonely', 'love', 'career', 'money', 'rest', 'taste', 'neighborhood', 'moving', 'firsthome', 'interior', 'free']);
export const blockageSchema=z.object({title:z.string().min(1).max(35),experience:z.string().min(1).max(180),flow:z.string().min(1).max(200),element:z.enum(['목','화','토','금','수']).nullable()});
export const summarySchema = z.object({
  title: z.string().min(1).max(70),
  desire: z.string().min(1).max(240),
  strength: z.string().min(1).max(240),
  direction: z.string().min(1).max(240),
  elements: z.array(z.enum(['목', '화', '토', '금', '수'])).max(3),
  blockages:z.array(blockageSchema).max(2).optional(),
});
export const replySchema = z.object({
  bubbles: z.array(z.string().min(1).max(500)).min(1).max(3),
  question: z.string().min(1).max(200),
  mood: z.enum(['hello', 'listening', 'warm', 'curious']),
  summary: summarySchema.nullable(),
});
export const generatedReplySchema=replySchema.extend({summary:summarySchema.extend({blockages:z.array(blockageSchema).min(1).max(2)}).nullable()});
export type Reply = z.infer<typeof replySchema>;
export const messageSchema = z.discriminatedUnion('role', [
  z.object({ id: z.string().max(80), role: z.literal('user'), text: z.string().trim().min(1).max(2000) }),
  z.object({ id: z.string().max(80), role: z.literal('assistant'), reply: replySchema }),
]);
export type Message = z.infer<typeof messageSchema>;
export const chatSchema = z.object({ birth: birthSchema, preferredName: z.string().trim().min(1).max(30).optional(), topic: topicSchema, messages: z.array(messageSchema).max(120) }).strict();
export type ChatRequest = z.infer<typeof chatSchema>;
export const sessionSchema = chatSchema.extend({ version: z.literal(1), space: savedSpaceSchema.optional() });
export function summaryDue(messages: Message[]) {
  let lastSummary = -1;
  messages.forEach((m, i) => { if (m.role === 'assistant' && m.reply.summary !== null) lastSummary = i; });
  return lastSummary < 0 && messages.filter(m => m.role === 'user').length >= 5;
}
