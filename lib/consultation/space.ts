import { z } from 'zod';
export const spaceInputSchema=z.object({
 neighborhood:z.string().trim().max(80),
 recommendNeighborhoods:z.boolean().optional(),
 roomStyle:z.enum(['auto','coastal','vintage','pastel','gaming','collector']).optional(),
 roomNotes:z.string().trim().max(600).optional(),
 layout:z.enum(['studio','separate','shared','unknown']),
 views:z.array(z.enum(['buildings','green','water','road','blocked'])).max(5),
 daylight:z.enum(['bright','soft','dark','unknown']),
}).strict();
const advice=z.object({title:z.string().min(1).max(80),body:z.string().min(1).max(650)});
const journeySchema=z.object({headline:z.string().min(1).max(110),before:z.string().min(1).max(100),after:z.string().min(1).max(120),bridge:z.string().min(1).max(220),traits:z.array(z.string().min(1).max(25)).min(2).max(3)});
const placeSchema=z.object({scope:z.enum(['서울','전국']),name:z.string().min(1).max(60),reason:z.string().min(1).max(220),traits:z.array(z.string().max(25)).min(1).max(3),sourceUrl:z.string().url().refine(url=>/^https:\/\//.test(url))});
export const spaceDashboardSchema=z.object({
 neighborhoodBalance:z.object({good:advice,caution:advice}).optional(),
 journey:journeySchema.optional(),alternatives:z.array(placeSchema).max(2).optional(),
 title:z.string().min(1).max(80),intro:z.string().min(1).max(500),
 energy:z.array(z.object({element:z.enum(['목','화','토','금','수']),meaning:z.string().min(1).max(180)})).min(1).max(3),
 neighborhood:advice,desk:advice,view:advice,
 materials:z.array(z.object({name:z.string().min(1).max(40),color:z.enum(['cream','sage','rose','blue','ochre']),reason:z.string().min(1).max(220)})).min(2).max(3),
 objects:z.array(z.object({name:z.string().min(1).max(60),kind:z.enum(['light','plant','fabric','art','tray']),placement:z.string().min(1).max(140),reason:z.string().min(1).max(250)})).min(3).max(3),
});
export const generatedSpaceDashboardSchema=spaceDashboardSchema.extend({neighborhoodBalance:z.object({good:advice,caution:advice}),journey:journeySchema,alternatives:z.array(placeSchema.extend({sourceUrl:z.string()})).max(2)});
export const neighborhoodResearchSchema=z.object({text:z.string().max(12000),sources:z.array(z.object({title:z.string(),url:z.string().url().refine(url=>/^https?:\/\//.test(url))})).max(15),verified:z.boolean()});
export const savedSpaceSchema=z.object({input:spaceInputSchema,dashboard:spaceDashboardSchema.nullable(),research:neighborhoodResearchSchema.nullable()});
export type SpaceInput=z.infer<typeof spaceInputSchema>;
export type SpaceDashboard=z.infer<typeof spaceDashboardSchema>;
export type NeighborhoodResearch=z.infer<typeof neighborhoodResearchSchema>;
export const layoutLabels={studio:'원룸',separate:'거실과 침실이 따로 있어',shared:'가족·룸메이트와 살고 내 방이 있어',unknown:'구조는 나중에 알려줄게'};
export const viewLabels={buildings:'도시·건물',green:'나무·공원·산',water:'강·바다',road:'큰 도로',blocked:'맞은편 벽·가려진 창'};
