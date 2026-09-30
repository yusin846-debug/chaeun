import { notFound } from 'next/navigation';
import { SessionReview } from './session-review';
export default function QCPage(){
 if(process.env.NODE_ENV!=='development')notFound();
 return <SessionReview/>;
}
