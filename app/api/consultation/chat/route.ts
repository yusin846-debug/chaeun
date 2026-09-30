import OpenAI from 'openai';
import { guidedQuestion } from '@/lib/consultation/dialogue-plan';
import { readingIssues } from '@/lib/consultation/reading-quality';
import { zodTextFormat } from 'openai/helpers/zod';
import { chatSchema, generatedReplySchema, summaryDue } from '@/lib/consultation/schema';
import { canRequestReply } from '@/lib/consultation/opening';
import { calculateChart } from '@/lib/consultation/saju';
import { consultationInstructions } from '@/lib/consultation/prompt';
import { guard, readBody, startWork, failure, HttpError } from '@/lib/consultation/http';
export const runtime = 'nodejs';
export const maxDuration = 120;
export async function POST(request: Request) {
  let finish: (() => void) | undefined;
  try {
    guard(request);
    const parsed = chatSchema.safeParse(await readBody(request));
    if (!parsed.success) throw new HttpError(400, '상담 정보를 확인해주세요. 이야기는 한 번에 2,000자까지 보낼 수 있어요.');
    const { birth, preferredName, topic, messages } = parsed.data;
    if (!canRequestReply(topic,messages)) throw new HttpError(400, '주제를 확인하고 슈슈의 질문에 답해줘.');
    if (!process.env.OPENAI_API_KEY?.trim()) throw new HttpError(503, '아직 상담 연결을 준비 중이에요. 입력한 정보는 보관했어요. 잠시 후 다시 시도해주세요.');
    let chart;
    try { chart = calculateChart(birth); } catch (error) { throw new HttpError(400, error instanceof Error ? error.message : '출생 정보를 확인해주세요.'); }
    finish = startWork();
    const due = summaryDue(messages);
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 45000, maxRetries: 0 });
    const question=guidedQuestion(topic,messages,due);
    const generate = (correction = '') => client.responses.parse({
      model: process.env.OPENAI_MODEL || 'gpt-5.4-mini',
      store: false,
      max_output_tokens: 2500,
      instructions: consultationInstructions(chart, topic, due, messages.filter(m=>m.role==='user').length === 1, messages, preferredName) + (question ? '\n이번 question 필드는 다음 문장을 그대로 사용한다: '+question : '') + correction,
      input: messages.map(m => ({ role: m.role, content: m.role === 'user' ? m.text : JSON.stringify(due?{question:m.reply.question}:m.reply) })),
      text: { format: zodTextFormat(generatedReplySchema, 'chaeun_reply') },
    }, { signal: request.signal });
    let result = await generate();
    if(result.output_parsed){
      const issues=readingIssues(result.output_parsed,chart,topic);
      if(issues.length)result=await generate('\n[출력 전 필수 수정]\n'+issues.join('\n'));
    }
    const reply = result.output_parsed;
    if (!reply || result.status !== 'completed' || (due && !reply.summary) || readingIssues(reply,chart,topic).length) throw new HttpError(502, '답변이 끝까지 도착하지 않았어. 다시 한 번 보내줄래?');
    if(reply.summary){
      reply.summary.elements=[...new Set([...(reply.summary.blockages??[]).flatMap(b=>b.element?[b.element]:[]),...reply.summary.elements])].slice(0,3);
    }
    if (question) reply.question=question;
    if (!due) reply.summary = null;
    return Response.json({ reply }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof OpenAI.APIError) return failure(new HttpError(error.status === 429 ? 429 : 502, error.status === 429 ? '지금 상담 연결이 붐비고 있어. 잠시 후 다시 시도해줘.' : '상담 연결을 확인 중이야. 잠시 후 다시 시도해줘.'));
    return failure(error);
  } finally { finish?.(); }
}
