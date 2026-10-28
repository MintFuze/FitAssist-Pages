import {findExercise} from './training-library.js';
const DAY=86400000;
const calendarDay=value=>{const d=new Date(value);return Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/DAY;};
export const exerciseKey=e=>findExercise(e)?.id||'custom:'+String(e.name||'').trim().toLowerCase().replace(/ё/g,'е');
export function programSequence(sessions,workouts){if(!sessions.length)return [];const last=workouts.filter(w=>w.completedAt&&sessions.some(s=>w.sessionId===s.id||!w.sessionId&&w.name===s.name)).sort((a,b)=>Date.parse(b.completedAt)-Date.parse(a.completedAt))[0];const index=last?sessions.findIndex(s=>last.sessionId===s.id||!last.sessionId&&last.name===s.name):-1;const next=(index+1)%sessions.length;return [...sessions.slice(next),...sessions.slice(0,next)];}
export function exerciseHistory(exercise,workouts,{now=Date.now(),before=Infinity}={}){
 const key=exerciseKey(exercise);
 return workouts.filter(w=>w.completedAt&&['gym','home'].includes(w.type)&&Date.parse(w.completedAt)<=now&&Date.parse(w.completedAt)<before).flatMap(w=>(w.exercises||[]).filter(e=>exerciseKey(e)===key).map(e=>({id:w.id,date:w.completedAt,session:w.name,sets:e.sets.filter(s=>s.done).map(s=>({weight:Number(s.weight)||0,reps:Number(s.reps)||0})),target:e.repTarget??null,assessment:e.assessment??null}))).filter(r=>r.sets.length).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
}
export function plateauInsight(exercise,workouts,{now=Date.now()}={}){
 const rows=exerciseHistory(exercise,workouts,{now});
 const result=(status,reason)=>({status,reason});
 if(!rows.length||now-Date.parse(rows[0].date)>14*DAY)return result('insufficient','Нужны свежие записи выполненных подходов.');
 const unique=rows.filter((r,i,a)=>a.findIndex(x=>calendarDay(x.date)===calendarDay(r.date))===i).slice(0,4);
 if(unique.length<4)return result('insufficient','Для сравнения нужны четыре занятия в разные дни.');
 const span=calendarDay(unique[0].date)-calendarDay(unique[3].date);
 if(span<21||span>42||unique.some((r,i)=>i&&calendarDay(unique[i-1].date)-calendarDay(r.date)>14))return result('insufficient','Сравниваем четыре регулярных занятия за 3–6 недель, без долгих перерывов.');
 const latest=unique[0],weight=latest.sets[0].weight,count=latest.sets.length;
 if(weight<=0||unique.some(r=>r.sets.length!==count||r.target!==latest.target||r.sets.some(s=>s.weight!==weight)))return result('changed','Вес, число подходов или цель менялись — прямое сравнение пока не подходит.');
 const reps=unique.map(r=>r.sets.reduce((n,s)=>n+s.reps,0));
 if(reps[0]>Math.min(...reps.slice(1)))return result('progress','Повторов с тем же весом стало больше.');
 return result('possible','В четырёх сопоставимых занятиях за 3–6 недель не выросли вес и суммарные повторы. Проверь технику, отдых и доступный шаг веса; при накопленной усталости можно облегчить неделю. Это сигнал по журналу, а не диагноз.');
}
export function weekSummary(workouts,day){
 const start=new Date(day+'T00:00:00');start.setDate(start.getDate()-((start.getDay()+6)%7));
 const end=new Date(start);end.setDate(end.getDate()+7);
 const previous=new Date(start);previous.setDate(previous.getDate()-7);
 const summarize=(a,b)=>{const rows=workouts.filter(w=>w.completedAt&&new Date(w.completedAt)>=a&&new Date(w.completedAt)<b);return {count:rows.length,minutes:Math.round(rows.reduce((n,w)=>n+(Number(w.elapsed)||0),0)/60),sets:rows.reduce((n,w)=>n+(w.exercises||[]).reduce((m,e)=>m+e.sets.filter(s=>s.done).length,0),0),distance:rows.filter(w=>w.type==='swim').reduce((n,w)=>n+(Number(w.distance)||0),0),days:Array.from({length:7},(_,i)=>{const d=new Date(a);d.setDate(d.getDate()+i);return rows.filter(w=>new Date(w.completedAt).toDateString()===d.toDateString()).length;})};};
 return {start,end,current:summarize(start,end),previous:summarize(previous,start)};
}
