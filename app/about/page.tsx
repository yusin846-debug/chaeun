import { BrandShell, ReadingLink } from '@/components/brand/BrandShell';
import { Glossary } from '@/components/brand/Glossary';
import s from '@/components/brand/Brand.module.css';
import a from './page.module.css';

const readings = [
  { category: 'Architecture', source: 'HSBC · Norman Foster', title: '미래적인 건축 안에, 풍수의 시선을.', original: 'Back to the future: Architect Lord Norman Foster revisits our Hong Kong HQ', text: '영국 건축가 노먼 포스터는 홍콩 HSBC 본점의 에스컬레이터 축에 풍수 전문가의 조언을 반영했다고 회고합니다. 현대 건축과 지역의 문화가 만나는 실제 설계 이야기입니다.', note: '풍수를 활용한 건축 사례이며, 효과를 검증한 연구는 아닙니다.', url: 'https://www.hsbc.com/news-and-views/news/hsbc-news-archive/back-to-the-future', symbol: '↗' },
  { category: 'Interview', source: '디자인플러스 · 유현준 · 2025', title: '공간을 설계한다는 건, 관계를 디자인하는 일.', original: '홍익대학교 유현준 교수 — 어쩌면 공간 그 이상의 이야기', text: '건축가 유현준은 건축을 사람과 사회의 관계로 바라봅니다. 자연을 접하는 학교, 함께 머무는 공간에 대한 이야기를 통해 좋은 공간이 일상에 어떤 가능성을 만드는지 읽어보세요.', note: '건축가의 공간 철학을 다룬 인터뷰로, 사주·풍수에 대한 추천이나 검증은 아닙니다.', url: 'https://design.co.kr/article/104073/', symbol: '“' },
  { category: 'Research', source: 'Journal of Clinical Sleep Medicine · 2014', title: '낮에 만나는 빛과, 밤에 누리는 쉼.', original: 'Impact of Windows and Daylight Exposure on Overall Health and Sleep Quality of Office Workers', text: '직장인 49명을 살펴본 소규모 연구에서 창이 있는 업무 환경은 더 나은 수면·삶의 질 지표와 관련이 있었습니다. 채운이 창과 채광을 함께 묻는 이유를 생각해볼 수 있는 자료입니다.', note: '관찰 연구로, 빛이 결과의 원인이라고 확정하거나 개인에게 같은 효과를 보장할 수는 없습니다.', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4031400/', symbol: '☼' },
  { category: 'Research', source: 'Science · Roger S. Ulrich · 1984', title: '창밖의 풍경도, 공간의 일부니까.', original: 'View through a window may influence recovery from surgery', text: '수술 환자 46명의 기록을 비교한 연구에서는 자연이 보이는 병실의 환자들이 벽이 보이는 병실의 환자들보다 입원 기간이 짧고 강한 진통제를 덜 사용했습니다.', note: '특정 병원의 후향적 비교입니다. 일반 주거의 효과나 풍수 이론 전체를 입증하는 결과는 아닙니다.', url: 'https://pubmed.ncbi.nlm.nih.gov/6143402/', symbol: '⌁' },
];

export default function AboutPage() {
  return <BrandShell>
    <section className={a.intro} aria-labelledby="about-title">
      <span className={s.sectionLabel}>ABOUT CHAEUN / OUR POINT OF VIEW</span>
      <h1 id="about-title" className={a.title}>Old wisdom.<br /><strong>For a fuller life.</strong></h1>
      <div className={a.introGrid}>
        <p className={a.question}>어떤 공간에서는,<br />조금 더 나다워지니까.</p>
        <div className={a.copy}><p>햇살이 들어오는 자리, 마음이 놓이는 풍경, 오래 곁에 두고 싶은 색과 소재. 우리가 머무는 환경은 매일의 경험을 이루고 있어요.</p><p><strong>채운은 사주와 풍수를 연결해 나에게 어울리는 삶과 공간을 큐레이션하는 모던 사주 컨설턴트 에이전트예요.</strong> 대화로 지금의 나와 고민을 읽고, 더 채우고 싶은 기운을 나만의 인테리어와 그림, 동네와 물건으로 풀어내요.</p></div>
      </div>
      <a className={a.readMore} href="#reading-room">Explore our reading room <span aria-hidden="true">↓</span></a>
    </section>
    <section className={a.perspective} aria-labelledby="space-title">
      <div className={a.sectionHeading}><span className={s.sectionLabel}>01 / WHY SPACE MATTERS</span><h2 id="space-title">Better spaces.<br /><em>Everyday possibilities.</em></h2></div>
      <div className={a.columns}>
        <article><span className={a.pill}>Culture × Architecture</span><h3>오래된 관점이<br />현대 건축을 만날 때.</h3><p>풍수를 오늘의 건축에 가져오는 이유 중 하나는 장소의 문화와 그곳에 머무는 사람의 경험을 함께 읽기 위해서예요. 홍콩 HSBC 본점에서도 영국 건축가 노먼 포스터와 풍수 전문가의 조언이 만났죠.</p><a href={readings[0].url} target="_blank" rel="noopener noreferrer">건축가의 인터뷰 읽기 ↗</a></article>
        <article><span className={a.pill}>Light × Wellbeing</span><h3>공간은 일상의 질에<br />영향을 줄 수 있어요.</h3><p>현대 연구는 채광과 수면, 자연이 보이는 창과 회복의 관계를 살펴봐요. 편안히 쉬고, 좋아하는 풍경을 만나고, 내 생활에 맞게 머무는 것. 채운이 생각하는 풍요로움은 그런 일상에서 시작해요.</p><a href="#reading-room">공간을 다룬 연구 살펴보기 ↓</a></article>
      </div>
      <p className={a.evidenceNote}>채운은 빛·자연·환경에 관한 연구를 공간을 이해하는 근거로, 사주와 오행은 나를 돌아보는 전통적 해석의 언어로 활용해요. 공간 연구가 사주나 풍수의 운세 효과를 과학적으로 입증하는 것은 아니에요.</p>
    </section>
    <section className={a.service} aria-labelledby="service-title">
      <span className={s.sectionLabel}>02 / YOUR MODERN SAJU CONSULTANT</span>
      <h2 id="service-title">Read you.<br />Find your place.<br /><strong>Make it yours.</strong></h2>
      <div className={a.steps}>
        {[
          ['01', '나를 읽는 대화', '태어난 시간과 지금의 마음에서 시작해요. 연애, 돈, 커리어, 외로움, 취향과 새로운 시작까지. 상담 에이전트와 이야기하며 나의 흐름을 살펴봐요.'],
          ['02', '나와 공간의 연결', '사주에서 읽은 기운에 동네의 환경, 창밖 풍경, 방의 빛과 생활 방식을 더해요. 나와 동네의 궁합을 해석하고 어울리는 공간의 방향을 찾아요.'],
          ['03', '내 삶에 채우는 방법', '나를 위한 방 인테리어 이미지와 오행 보완 아트, 어울리는 색과 소재. 마음에 든 장면을 저장하고, 그다음 곁에 둘 소품까지 만나보세요.'],
        ].map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
      <ReadingLink>내 사주와 어울리는 공간 찾기</ReadingLink>
    </section>
    <section id="reading-room" className={a.library} aria-labelledby="reading-title">
      <div className={a.libraryHeader}><div><span className={s.sectionLabel}>03 / MEDIA & RESEARCH</span><h2 id="reading-title">The reading room<span>.</span></h2></div><p>좋은 공간을 생각하게 하는 이야기들.<br />건축가의 관점부터 연구 원문까지 직접 읽어보세요.</p></div>
      <ol className={a.mediaList}>{readings.map((item, i) => <li key={item.url}>
        <a className={a.mediaRow} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={`${item.title} — 원문 새 탭에서 읽기`}>
          <span className={a.mediaVisual} data-kind={item.category} aria-hidden="true"><small>0{i + 1}</small><span>{item.symbol}</span></span>
          <div className={a.mediaBody}><div className={a.metadata}><span>{item.category}</span>{item.source}</div><h3>{item.title}</h3><p>{item.text}</p><span className={a.original}>{item.original}</span><small className={a.limit}>{item.note}</small></div>
          <span className={a.mediaArrow} aria-hidden="true">↗</span>
        </a>
      </li>)}</ol>
      <p className={a.libraryNote}>소개된 자료는 외부의 독립적인 콘텐츠이며, 저자·기관과 채운의 제휴나 추천을 의미하지 않아요.</p>
    </section>
    <Glossary />
  </BrandShell>;
}
