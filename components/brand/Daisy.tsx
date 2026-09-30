/** Shared white-petal, yellow-center flower used by the landing navigation. */
export function Daisy({className}:{className?:string}) {
 return <svg className={className} viewBox="0 0 32 32" focusable="false" aria-hidden="true">{Array.from({length:12},(_,i)=><ellipse key={i} cx="16" cy="7.5" rx="2.6" ry="6.3" fill="#fffdf5" transform={`rotate(${i*30} 16 16)`}/>)}<circle cx="16" cy="16" r="5.5" fill="#f3c74d"/><circle cx="14.5" cy="14.5" r="1" fill="#ffe599"/></svg>;
}
