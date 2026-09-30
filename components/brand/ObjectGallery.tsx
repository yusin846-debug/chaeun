import Image from 'next/image';
import Link from 'next/link';
import { objects } from './content';
import styles from './Brand.module.css';
export function ObjectGallery({ filter = 'All', linked = true }: { filter?: string; linked?: boolean }) {
 return <div className={styles.objects}>{objects.filter(o=>filter==='All'||o.category===filter).map((o,i)=><article id={o.id} key={o.id}><div className={`${styles.objectImage} ${styles[o.shape]}`}><Image src={o.src} alt={o.korean} fill sizes="(max-width:600px) 90vw, (max-width:1000px) 42vw, 23vw" /></div><div className={styles.objectMeta}><span>0{i+1} / {o.category}</span><span>{o.material}</span></div><h3>{linked ? <Link href={`/shop#${o.id}`}>{o.title}</Link> : o.title}</h3><p>{o.korean}</p></article>)}</div>;
}
