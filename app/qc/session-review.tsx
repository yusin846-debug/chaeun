'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sessionSchema } from '@/lib/consultation/schema';
import { setSession } from '@/lib/consultation/storage';
export function SessionReview(){
 const [error,setError]=useState('');const router=useRouter();
 return <main style={{padding:40,maxWidth:760,margin:'auto'}}><h1>로컬 상담 QC</h1><p>승인된 실제 API 응답 기록을 이 테스트 브라우저에 불러와 화면과 복원을 확인합니다. 기존 상담을 보존하려면 별도 포트에서 사용하세요. 파일은 외부로 전송되지 않습니다.</p><label>QC 상담 기록<input type="file" accept="application/json,.json" onChange={async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>300000)throw new Error('파일이 너무 커요.');const source=JSON.parse(await file.text());const session=sessionSchema.parse({version:source.version,birth:source.birth,preferredName:source.preferredName,topic:source.topic,messages:source.messages,space:source.space});setSession(session);router.push('/create');}catch{setError('유효한 상담 기록 파일을 선택해주세요.');}}}/></label>{error&&<p role="alert">{error}</p>}</main>;
}
