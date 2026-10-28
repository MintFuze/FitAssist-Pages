import {swimNote} from './workout-plan-ui.js';
import {exercises,findExercise,replacements} from './exercise-catalog.js';
export {exercises,findExercise,replacements} from './exercise-catalog.js';
export const swimVideos=[
{id:'swim-breath',name:'Дыхание в кроле',video:'1I-SgzJNtCQ',seconds:97,author:'Swim England',source:'https://www.swimming.org/justswim/improving-your-breathing-in-front-crawl/',cue:'Выдыхай в воду, вдох делай поворотом головы. Не задерживай дыхание и не пытайся проплыть под водой подольше.'},
{id:'swim-crawl',name:'Основы кроля',video:'1jB762UxeWA',seconds:124,author:'Nuffield Health',source:'https://www.swimming.org/justswim/tips-for-getting-front-crawl-right/',cue:'Спокойный темп и комфортный стиль важнее скорости. Если 25 м даются тяжело, отдыхай дольше и занимайся рядом с бортиком под наблюдением.'}
];
export const variants=[
{id:'machines',name:'Базовое оснащение',label:'Гантели + обычные блоки',description:'Два дня верха тела без зависимости от жимовых машин. Третий день — бассейн.'},
{id:'mixed',name:'Тренажёры + гантели',label:'Больше разнообразия',description:'Жимы и тяги с гантелями, упражнения на блоках. Та же структура недели.'},
{id:'short',name:'Короткое занятие',label:'40–45 минут',description:'Четыре упражнения на верх тела, когда времени меньше. Бассейн остаётся в расписании.'},
{id:'gentle',name:'Спокойное возвращение',label:'Меньше объёма',description:'По пять упражнений, больше времени на технику и отдых. Для первых недель после перерыва.'}
];
export function makeThreeDayPlan(variant='machines',lastDay=5){
 const v=variants.find(v=>v.id===variant);if(!v)throw Error('Неизвестный вариант программы');
 const sets=2, exercise=id=>{const e=exercises.find(e=>e.id===id);return {exerciseId:e.id,name:e.name,sets,reps:e.group==='core'?10:e.group==='lateral-shoulder'?12:10,weight:0,rest:['chest','row','vertical-pull','shoulder-press'].includes(e.group)?120:90,note:e.cue+' Первые 2 недели: 8–12 повторов, оставляй 3–4 повтора в запасе. Ноль в весе означает: рабочий вес ещё не выбран.'};};
 const a=variant==='mixed'?['chest-neutral','pulldown','row-onearm','lateral-db','curl','triceps-cable']:['chest-db','pulldown','row-cable','lateral-db','curl','triceps-cable'];
 const b=variant==='mixed'?['row-supported','chest-db','pulldown-close','shoulder-db','hammer','crunch']:['row-onearm','chest-neutral','pulldown-close','shoulder-db','hammer','crunch'];
 if(variant==='gentle'){a.splice(3,1);b.splice(3,1);}if(variant==='short'){a.splice(3,1);b.splice(3,1);a.pop();b.pop();}
 const note='Возвращение после перерыва. Силовых упражнений на ноги нет. Планируй до 60–65 минут на обычное занятие (короткий вариант — до 45 минут), включая настройку тренажёров и отдых; если закончил раньше, не добавляй нагрузку ради таймера. 7–10 минут мягкой разминки плеч, лопаток и локтей, затем 1 лёгкий разминочный подход перед первыми жимом и тягой. Рабочие подходы: 8–12 повторов, отдых 90–120 секунд, без отказа. Рабочий вес подбирается на месте, без заранее заданных килограммов. Если 12 повторов во всех подходах получаются уверенно два занятия подряд, добавь минимальный шаг веса и вернись к 8–10. Первые 2 недели не добавляй подходы. При боли останови упражнение и выбери комфортную замену. Для парных гантелей записывай вес ОДНОЙ гантели, для блока — показание выбранного стека; они не сравниваются между разными тренажёрами. Не переноси веса из архива 2022 года автоматически. Кардио в конце: 8–12 минут лёгкого велотренажёра или ходьбы на дорожке; ровно либо уклон 1–3%, если комфортно. Темп разговорный, при усталости сократи блок.';
 return {title:v.name+' · 2 зала + бассейн',sessions:[
 {id:'upper-a',name:'Зал А · грудь, спина и руки',type:'gym',day:null,duration:variant==='short'?45:65,note,exercises:a.map(exercise)},
 {id:'pool-25',name:'Бассейн · спокойные 25 метров',type:'swim',day:null,duration:60,note:swimNote,exercises:[]},
 {id:'upper-b',name:'Зал Б · спина, грудь и плечи',type:'gym',day:null,duration:variant==='short'?45:65,note,exercises:b.map(exercise)}
 ]};
}
export const gear={
gym:[['shoes','Чистые закрытые кроссовки'],['clothes','Футболка и спортивные штаны или шорты'],['towel','Небольшое полотенце для скамьи'],['water','Бутылка воды']],
swim:[['swimwear','Плавки или купальник'],['cap','Плавательная шапочка — обязательно'],['slippers','Чистые нескользящие сланцы'],['towel','Полотенце'],['soap','Мыло или гель для душа'],['washcloth','Мочалка'],['goggles','Очки для плавания — по желанию']]
};
export function upcomingSessions(sessions,day){const start=new Date(day+'T12:00:00');return sessions.map(s=>{const d=new Date(start);const offset=s.day==null?0:(s.day-d.getDay()+7)%7;d.setDate(d.getDate()+offset);return {session:s,day:[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')};}).sort((a,b)=>a.day.localeCompare(b.day));}

export function assessPlan(plan){
 const advice=[];const sessions=plan.sessions||[],gym=sessions.filter(s=>s.type==='gym'||s.type==='home');
 if(!sessions.length)return [{tone:'warn',text:'Добавь хотя бы одно занятие.'}];
 const dated=sessions.filter(s=>s.day!=null),daySet=new Set(dated.map(s=>s.day));
 if(daySet.size<dated.length)advice.push({tone:'warn',text:'Есть два занятия в один день. Проверь, что это запланировано.'});
 for(const session of gym){const groups=session.exercises.map(e=>findExercise(e)?.group);const pushes=groups.filter(g=>['chest','shoulder-press'].includes(g)).length,pulls=groups.filter(g=>['row','vertical-pull'].includes(g)).length;
 if(session.exercises.some(e=>/жим ног|присед|выпад|сгибание ног|разгибание ног|подъём на носки|leg press|squat/i.test(e.name)))advice.push({tone:'warn',text:session.name+': есть силовое упражнение на ноги. Ты просил программу без них — проверь выбор.'});
 if(!session.exercises.length)advice.push({tone:'warn',text:session.name+': пока нет упражнений.'});
 if(pushes&&!pulls)advice.push({tone:'warn',text:session.name+': есть жимы, но нет тяг. Добавь движение для спины.'});
 if(pushes>pulls+2)advice.push({tone:'warn',text:session.name+': жимов заметно больше, чем тяг. Проверь баланс нагрузки на плечи.'});
 const sets=session.exercises.reduce((n,e)=>n+Number(e.sets||0),0);
 if(sets>18)advice.push({tone:'warn',text:session.name+': '+sets+' рабочих подходов. Для возвращения после перерыва разумнее начать с меньшего объёма.'});
 if(session.duration<=45&&sets>14)advice.push({tone:'warn',text:session.name+': объём может не поместиться в это время с нормальным отдыхом.'});
 if(new Set(session.exercises.map(e=>e.name)).size<session.exercises.length)advice.push({tone:'warn',text:session.name+': упражнение повторяется. Убери дубль, если он не нужен.'});
 if(groups.some(g=>!g))advice.push({tone:'info',text:session.name+': есть упражнение вне каталога. Его технику и нагрузку проверка не оценивает.'});
 }
 const gymDays=gym.filter(s=>s.day!=null).map(s=>s.day);if(gymDays.length>1&&gymDays.some(d=>gymDays.includes((d+1)%7)))advice.push({tone:'warn',text:'Силовые дни идут подряд. При возвращении после перерыва удобнее оставить между ними день отдыха.'});
 if(!advice.some(a=>a.tone==='warn'))advice.unshift({tone:'good',text:'Явных проблем со структурой не найдено: объём умеренный, расписание не конфликтует.'});
 advice.push({tone:'info',text:'Это проверка по правилам, без ИИ. Она не оценивает твою технику, самочувствие и индивидуальную переносимость нагрузки.'});return advice;
}

export function sessionAdvice(workouts,session){
 const rows=workouts.filter(w=>w.completedAt&&w.type===session.type&&w.name===session.name).sort((a,b)=>b.completedAt.localeCompare(a.completedAt));
 if(!rows.length)return null;
 if(rows[0].feedback==='hard')return {tone:'warn',text:session.type==='swim'?'В прошлый раз было тяжело. Сегодня сократи число дорожек или увеличь паузы; не повышай дистанцию.':'В прошлый раз было тяжело. Сегодня не повышай вес; при необходимости снизь его или убери один подход.'};
 if(session.type==='swim')return {tone:'info',text:'Ориентируйся на прошлую дистанцию '+(rows[0].distance||0)+' м. Добавляй один отрезок 25 м только после двух комфортных посещений и с полным отдыхом.'};
 const ready=rows.slice(0,2);const high=ready.length===2&&ready.every(w=>['easy','good'].includes(w.feedback)&&w.exercises.length&&w.exercises.every(e=>e.sets.length&&e.sets.every(s=>s.done&&s.reps>=12&&s.weight>0)));
 return {tone:'info',text:high?'Все записанные подходы выполнены. Возможный минимальный шаг веса оценивается отдельно для каждого упражнения по истории и опроснику.':'Начни с комфортной прошлой нагрузки. Сначала добейся уверенных повторов в диапазоне программы без отказа; повышать вес после каждого занятия не нужно.'};
}
