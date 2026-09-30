import type { roomVisual } from '@/lib/consultation/room-visual';
import s from './RoomDetail.module.css';
// Normalized crops from the SAME room photograph; no sprite-sheet boundaries.
const crops={
 vintage:{art:[.265,.065,.185],light:[.735,.19,.22],plant:[.24,.245,.13],fabric:[.03,.31,.24],tray:[.375,.318,.075]},
 pastel:{art:[.065,.03,.39],light:[.115,.53,.125],plant:[.178,.575,.075],fabric:[.27,.52,.13],tray:[.39,.705,.13]},
 gaming:{art:[.14,.025,.265],light:[.13,.363,.085],plant:[.19,.31,.12],fabric:[.427,.08,.145],tray:[.278,.343,.125]},
 coastal:{art:[.57,0,.43],light:[.705,.39,.29],plant:[.52,.21,.19],fabric:[.05,.425,.23],tray:[.695,.55,.15]},
 collector:{art:[.54,0,.46],light:[.265,.34,.14],plant:[.185,.33,.14],fabric:[.465,.375,.22],tray:[.785,.525,.20]},
 separate:{art:[.62,0,.34],light:[.355,.425,.24],plant:[.76,.49,.24],fabric:[.69,.38,.28],tray:[.38,.50,.23]},
 studio:{art:[.735,.105,.17],light:[.27,.27,.18],plant:[.155,.20,.30],fabric:[.055,.42,.24],tray:[.34,.59,.24]},
} as const;
export function RoomDetail({visual,kind,name}:{visual:ReturnType<typeof roomVisual>;kind:'art'|'light'|'plant'|'fabric'|'tray';name:string}){
 const [x,y,w]=crops[visual.key][kind];
 return <div className={s.crop} role="img" aria-label={`추천 방 사진 속 ${name}`}><div style={{backgroundImage:`url(/images/consultation/jewels/${visual.file}.png)`,width:`${100/w}%`,left:`${-x/w*100}%`,top:`${-y/(w*1.125)*100}%`}}/></div>;
}
