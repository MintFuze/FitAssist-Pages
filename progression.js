import {findExercise} from './training-library.js';
const DAY=86400000;
const key=e=>findExercise(e)?.id||'custom:'+String(e.name||'').trim().toLowerCase().replace(/ё/g,'е');
const round=n=>Math.round(n*1000)/1000;
export function repRange(reps){if(reps&&typeof reps==='object'){const min=Number(reps.repMin),max=Number(reps.repMax);if(Number.isInteger(min)&&min>0&&Number.isInteger(max)&&max>=min)return {min,max};reps=reps.reps??reps.repTarget??10;}const n=Number(reps);return n>=8&&n<=12?{min:8,max:12}:{min:n,max:n};}
export function exerciseProgression(exercise,workouts,{now=Date.now()}={}){
 const catalog=findExercise(exercise),step=Number(exercise.loadStep)||0,target=repRange(exercise);
 const rows=workouts.filter(w=>w.completedAt&&['gym','home'].includes(w.type)&&Date.parse(w.completedAt)<=now).flatMap(w=>w.exercises.filter(e=>key(e)===key(exercise)).map(e=>({w,e,date:Date.parse(w.completedAt)}))).sort((a,b)=>b.date-a.date);
 const result=(status,title,reason,extra={})=>({status,title,reason,step,range:target,...extra});
 if(!rows.length)return result('start','Сначала подбери рабочий вес','Начни легко, запиши фактические повторы и оцени упражнение после занятия.');
 const last=rows[0],done=last.e.sets.filter(s=>s.done&&!s.extra),weights=[...new Set(done.map(s=>s.weight))],weight=weights.length===1?weights[0]:null;
 const base={lastWeight:weight,lastDate:last.w.completedAt};
 if(last.e.assessment==='pain'||last.w.survey?.pain===true)return result('pain','Не повышать нагрузку','В последней записи отмечена боль. Не выполняй движение через боль; сначала разберись с причиной и подходящим вариантом.',base);
 if(now-last.date>14*DAY)return result('return','После перерыва — без прибавки','Последняя сопоставимая запись старше двух недель. Вернись с комфортной нагрузкой и снова оцени самочувствие.',base);
 if(last.w.survey?.energy==='drained')return result('hold','Восстановись и повтори легче','После занятия отмечено сильное истощение. Не увеличивай вес; сократи нагрузку по самочувствию.',base);
 if(catalog?.group==='core'||catalog?.id==='back-extension-45'||catalog?.id==='chest-incline')return result('bodyweight','Прогресс без прибавки килограммов','Сначала улучшай контроль движения и комфортные повторы. Вес автоматически не рассчитывается для этого варианта.',base);
 if(!catalog)return result('hold','Для этого упражнения — ручная настройка','Упражнение вне проверенного каталога. Приложение не знает его способ учёта веса.',base);
 if(weight==null||weight<=0)return result('hold','Нужен сопоставимый рабочий вес','Запиши один рабочий вес в плановых подходах. Дополнительные подходы не учитываются для прибавки.',base);
 if(Number(exercise.weight)>0&&Math.abs(Number(exercise.weight)-weight)>.001)return result('hold','В программе уже другой вес','Сначала выполни и оцени занятие с текущей настройкой программы. Старые записи не перезаписывают новый вес.',base);
 const distinct=rows.filter((r,i,a)=>a.findIndex(x=>x.w.completedAt.slice(0,10)===r.w.completedAt.slice(0,10))===i),two=distinct.slice(0,2);
 const hard=r=>r.e.assessment==='hard';
 if(two.length===2&&two[0].date-two[1].date<=14*DAY&&two.every(hard)){
  const lower=step?round(Math.floor((weight*.9+1e-8)/step)*step):null;
  return result('reduce','Два раза тяжело — снизить нагрузку','Начни примерно на 5–10% легче и проверь технику. Если доступный шаг слишком большой, подбери снижение вручную.',{...base,suggestedWeight:lower>0&&lower>=weight*.9&&lower<weight?lower:null});
 }
 if(hard(last)||last.w.feedback==='hard'||last.w.survey?.energy==='tired')return result('hold','Сохрани или облегчи нагрузку','В последней записи было тяжело или накопилась усталость. Увеличивать вес сейчас не стоит.',base);
 let episodeStart=last.date;for(let i=1;i<distinct.length;i++){if(distinct[i-1].date-distinct[i].date>14*DAY)break;episodeStart=distinct[i].date;}
 if(now-episodeStart<14*DAY)return result('adapt','Первые две недели — освоение','Пока закрепляй технику и комфортные повторы в диапазоне программы. Автоматическое предложение прибавки появится позже.',base);
 const qualifies=r=>{
  const sets=r.e.sets.filter(s=>!s.extra),planned=Number(r.e.plannedSets),range=repRange(r.e);
  return planned===Number(exercise.sets??exercise.plannedSets)&&planned>0&&sets.length>=planned&&sets.every(s=>s.done&&s.reps>=target.max&&s.weight===weight)&&range.min===target.min&&range.max===target.max&&['easy','good'].includes(r.e.assessment)&&r.w.survey?.energy==='ready'&&r.w.survey?.pain===false&&['easy','good'].includes(r.w.feedback);
 };
 if(two.length<2||two[0].date-two[1].date>14*DAY||!two.every(qualifies))return result('hold','Повтори рабочий вес','Для прибавки нужны два недавних занятия в разные дни: все плановые подходы на верхней границе повторов, уверенная техника, запас 2+ повтора и нормальное самочувствие.',base);
 if(two.some(r=>r.e.sets.some(s=>s.done&&!s.extra&&s.weight!==weight)))return result('hold','Закрепи один рабочий вес','Последние записи выполнены с разной нагрузкой. Сначала повтори текущий вес.',base);
 if(!step)return result('eligible','Можно рассмотреть прибавку','Условия выполнены. Укажи минимальный доступный шаг веса для этого снаряда — приложение рассчитает предложение.',base);
 if(step/weight>.100001)return result('hold','Этот шаг пока слишком большой','Минимальный шаг превышает 10% рабочего веса. Сохрани нагрузку или используй более мелкий доступный шаг.',base);
 return result('increase','Предложение: '+round(weight+step)+' кг','Два успешных занятия с тем же рабочим весом. Добавь один доступный шаг и вернись к нижней границе повторов, сохраняя запас. Сравнивай только один и тот же снаряд.',{...base,suggestedWeight:round(weight+step)});
}

export function removeWorkoutSet(workout,exerciseIndex,setIndex){
 const e=workout?.exercises?.[exerciseIndex];if(!e||!Number.isInteger(setIndex)||setIndex<0||setIndex>=e.sets.length)throw Error('Подход не найден');
 if(e.sets.length<=1)throw Error('Оставь хотя бы один подход');
 return e.sets.splice(setIndex,1)[0];
}
