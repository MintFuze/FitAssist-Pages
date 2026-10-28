import {cleanPlan,cleanExerciseMeta,cleanSurvey} from './validation.js';
import {makeThreeDayPlan} from './training-library.js';
const copy=structuredClone;
const bad=m=>{throw Object.assign(Error(m),{status:400});};
const num=(n,min,max,integer=false)=>{if(typeof n!=='number'||!Number.isFinite(n)||n<min||n>max||integer&&!Number.isInteger(n))bad('Проверь числовые значения тренировки');return n;};
const text=(s,max)=>{if(typeof s!=='string'||s.length>max)bad('Некорректная запись');return s;};
export function cleanWorkout(w){
 if(!w||!['gym','home','swim','run','walk','bike','other'].includes(w.type)||!Array.isArray(w.exercises)||w.exercises.length>40)bad('Некорректная тренировка');
 const start=Date.parse(w.startedAt),end=w.completedAt?Date.parse(w.completedAt):null;if(!Number.isFinite(start)||end!==null&&(!Number.isFinite(end)||end<start))bad('Проверь даты тренировки');
 const result={id:text(w.id,80),name:text(w.name,160),type:w.type,startedAt:new Date(start).toISOString(),completedAt:end===null?null:new Date(end).toISOString(),elapsed:num(w.elapsed??0,0,172800),distance:num(w.distance??0,0,1000000),note:text(w.note||'',2000),exercises:w.exercises.map(e=>{if(!Array.isArray(e.sets)||e.sets.length>30)bad('Проверь подходы');return {name:text(e.name,160),...cleanExerciseMeta(e),rest:num(e.rest??90,0,1800),note:text(e.note||'',500),sets:e.sets.map(s=>({weight:num(s.weight,0,1000),reps:num(s.reps,0,10000),done:s.done===true,...(s.extra?{extra:true}:{})}))};})};
 if(w.sessionId!=null)result.sessionId=text(w.sessionId,80);if(w.feedback!=null){if(!['easy','good','hard'].includes(w.feedback))bad('Проверь оценку');result.feedback=w.feedback;}const survey=cleanSurvey(w.survey);if(survey)result.survey=survey;return result;
}
function profile(p={}){const weeklyGoal=Number(p.weeklyGoal??3);if(!Number.isInteger(weeklyGoal)||weeklyGoal<1||weeklyGoal>14)bad('Цель: от 1 до 14 занятий');const result={name:text(p.name||'',60),weeklyGoal};if(Array.isArray(p.trainingArchive))result.trainingArchive=p.trainingArchive.slice(0,100).map(a=>({exerciseId:text(a.exerciseId,80),period:text(a.period||'',80),equipment:text(a.equipment||'',160),sets:(a.sets||[]).slice(0,30).map(s=>({weight:num(s.weight,0,1000),reps:num(s.reps,0,10000)}))}));return result;}
export function trainingState(input){
 if(!input||!Array.isArray(input.workouts)||input.workouts.length>5000)bad('Нужны программа и история FitAssist');const workouts=input.workouts.map(cleanWorkout),ids=new Set();for(const w of workouts){if(ids.has(w.id))bad('Повторяющиеся записи в копии');ids.add(w.id);}if(workouts.filter(w=>!w.completedAt).length>1)bad('В копии несколько незавершённых занятий');
 return {user:{id:'local-owner',login:'На этом устройстве'},profile:profile(input.profile),plan:cleanPlan(input.plan),revision:Number.isInteger(input.revision)&&input.revision>=0?input.revision:0,workouts};
}
export function initialState(){return trainingState({profile:{name:'',weeklyGoal:3},plan:makeThreeDayPlan(),revision:0,workouts:[]});}
export function localService(vault){let chain=Promise.resolve();return {vault,call(path,b){const task=chain.then(async()=>{
 if(path==='auth'){if(vault.exists())await vault.unlock(b.password);else{if(b.password!==b.confirmPassword)bad('Пароли не совпадают');await vault.create(b.password,initialState());}return {};}
 if(path==='logout'){await vault.lock();return {};}
 if(!vault.unlocked())throw Object.assign(Error('Разблокируй приложение'),{status:401});
 if(path==='state')return vault.read();
 const state=await vault.update(s=>{
  if(path==='profile'){s.profile=profile(b);return;}
  if(path==='plan'){if(b.revision!==s.revision)throw Object.assign(Error('Программа изменилась. Обнови страницу'),{status:409});s.plan=cleanPlan(b.plan);s.revision++;return;}
  if(path==='workout'){const w=cleanWorkout(b.workout),old=s.workouts.find(x=>x.id===w.id);if(old?.completedAt&&!w.completedAt)throw Object.assign(Error('Занятие уже завершено'),{status:409});if(!w.completedAt&&s.workouts.some(x=>!x.completedAt&&x.id!==w.id))bad('Уже идёт другая тренировка');s.workouts=[w,...s.workouts.filter(x=>x.id!==w.id)].sort((a,b)=>b.startedAt.localeCompare(a.startedAt));return;}
  if(path==='workout/discard'){s.workouts=s.workouts.filter(x=>x.id!==b.id||x.completedAt);return;}
  if(path==='workout/assessment'){const w=s.workouts.find(x=>x.id===b.id&&x.completedAt);if(!w)bad('Завершённая тренировка не найдена');const candidate=cleanWorkout({...w,feedback:b.feedback,survey:b.survey,exercises:w.exercises.map((e,i)=>({...e,assessment:b.assessments?.[i]||'unknown'}))});Object.assign(w,candidate);return;}
  if(path==='restore-training'){const imported=trainingState(b);Object.assign(s,imported);return;}
  bad('Эта функция недоступна в локальной версии');
 });return path==='plan'?{plan:state.plan,revision:state.revision}:path==='profile'?{profile:state.profile}:{};
 });chain=task.catch(()=>{});return task;}};}
