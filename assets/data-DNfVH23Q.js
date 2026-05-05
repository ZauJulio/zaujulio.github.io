import{c as s,u as n}from"./useTranslation-DeY4xK7r.js";import{r as a}from"./chunk-EPOLDU6W-gU6CAgNk.js";import{b as o,a as c}from"./articles.pt-BR-Do4tPJwu.js";/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i=[["path",{d:"M15 18h-5",key:"95g1m2"}],["path",{d:"M18 14h-8",key:"sponae"}],["path",{d:"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2",key:"39pd36"}],["rect",{width:"8",height:"4",x:"10",y:"6",rx:"1",key:"aywv1n"}]],g=s("newspaper",i),r=o.articles,l=c.articles;function p(){const{i18n:e}=n(),t=e.language||"en";return a.useMemo(()=>t==="pt-BR"?l:r,[t])}function y(){const e=p();return a.useMemo(()=>Array.from(new Set(e.flatMap(t=>t.tags||[]).filter(Boolean))),[e])}const u=r;Array.from(new Set(u.flatMap(e=>e.tags||[]).filter(Boolean)));export{g as N,y as a,p as u};
