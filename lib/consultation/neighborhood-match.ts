import type { NeighborhoodResearch, SpaceDashboard } from './space';
/** Editorial symbolism index, never a probability or a measured feng-shui score. */
export function neighborhoodMatch(research:NeighborhoodResearch|null|undefined,energy:SpaceDashboard['energy']){
 if(!research?.verified||!research.sources.length)return null;
 const rules=[{element:'목',label:'공원·녹지',pattern:/공원|녹지|숲|산책/},{element:'수',label:'강·물길',pattern:/하천|강변|호수|습지|바다|수변/},{element:'토',label:'주거 기반',pattern:/주거|주택|아파트/},{element:'화',label:'문화·교류',pattern:/문화|공연|상권|상가/},{element:'금',label:'정돈된 도시 시설',pattern:/계획도시|격자|공공시설/}];
 const features=rules.filter(rule=>rule.pattern.test(research.text.split('[비교 후보]')[0])).map(({element,label})=>({element,label,matched:energy.some(e=>e.element===element)}));
 if(!features.length||!energy.length)return null;
 const matched=energy.filter(e=>features.some(f=>f.element===e.element)).length;
 return {score:Math.round(50+40*matched/energy.length),features,matched,total:energy.length};
}
