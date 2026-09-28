import { ConsultationEntry } from '@/components/brand/ConsultationEntry';
export default async function CreatePage({searchParams}:{searchParams:Promise<{topic?:string}>}){const params=await searchParams;return <ConsultationEntry key={params.topic ?? "general"} topic={params.topic}/>}
