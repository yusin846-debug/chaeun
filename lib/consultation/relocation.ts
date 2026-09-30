import type { SpaceInput } from './space';
/** An explicit current choice overrides even a moving topic or legacy result. */
export function wantsNeighborhoods(input:SpaceInput,topic:string){
 return input.recommendNeighborhoods??['moving','firsthome'].includes(topic);
}
