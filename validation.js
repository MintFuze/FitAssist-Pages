import {findExercise} from './exercise-catalog.js';
const invalid=message=>Object.assign(new Error(message),{status:400});
export function cleanSurvey(s){if(s==null)return undefined;if(!s||!['ready','tired','drained','unknown'].includes(s.energy)||![true,false,null].includes(s.pain))throw invalid('Проверь оценку самочувствия');return {energy:s.energy,pain:s.pain};}
export function cleanRepRange(e){if(e.repMin==null&&e.repMax==null)return {};const min=Number(e.repMin),max=Number(e.repMax);if(e.repMin==null||e.repMax==null||!Number.isInteger(min)||!Number.isInteger(max)||min<1||max<min||max>1000)throw invalid('Проверь диапазон повторов');return {repMin:min,repMax:max};}
export function cleanExerciseMeta(e){const result={...cleanRepRange(e)};if(e.assessment!=null){if(!['easy','good','hard','pain','unknown'].includes(e.assessment))throw invalid('Проверь оценку упражнения');result.assessment=e.assessment;}for(const [key,min,max,integer]of [['repTarget',0,10000,false],['plannedSets',1,30,true],['loadStep',0,20,false]]){if(e[key]==null)continue;const n=Number(e[key]);if(!Number.isFinite(n)||n<min||n>max||(integer&&!Number.isInteger(n)))throw invalid('Проверь параметры упражнения');result[key]=n;}if(e.exerciseId===null)result.exerciseId=null;else if(e.exerciseId!=null){if(typeof e.exerciseId!=='string'||!/^[-\w]{1,80}$/.test(e.exerciseId))throw invalid('Проверь упражнение');if(!findExercise(e))throw invalid('Название и упражнение из каталога не совпадают');result.exerciseId=e.exerciseId;}return result;}
export function cleanPlan(plan) {
  if(!plan || typeof plan.title!=='string' || plan.title.length>120 || !Array.isArray(plan.sessions) || plan.sessions.length>40)throw invalid('Некорректный формат плана');
  const ids=new Set();
  return {title:plan.title,sessions:plan.sessions.map(s=>{
    const id=String(s.id||crypto.randomUUID());
    if(ids.has(id)||id.length>80)throw invalid('Идентификаторы тренировок должны различаться');ids.add(id);
    if(typeof s.name!=='string'||!s.name.trim()||s.name.length>120||!['gym','swim','home','run'].includes(s.type))throw invalid('Проверь название и вид тренировки');
    if(!Array.isArray(s.exercises)||s.exercises.length>40)throw invalid('Слишком много упражнений');
    const exercises=s.exercises.map(e=>{
      if(typeof e.name!=='string'||!e.name.trim()||e.name.length>160)throw invalid('У упражнения должно быть название');
      const sets=Number(e.sets??3),reps=Number(e.reps??10),rest=Number(e.rest??90),weight=Number(e.weight??0);
      if(!Number.isInteger(sets)||sets<1||sets>20||!Number.isFinite(reps)||reps<0||reps>10000||!Number.isFinite(rest)||rest<0||rest>1800||!Number.isFinite(weight)||weight<0||weight>1000)throw invalid('Проверь подходы, повторения и нагрузку');
      const loadStep=Number(e.loadStep??0);if(!Number.isFinite(loadStep)||loadStep<0||loadStep>20)throw invalid('Проверь шаг веса');
      const linked=findExercise(e);if(e.exerciseId!=null&&!linked)throw invalid('Выбери упражнение из каталога или отметь его как своё');
      return {name:linked?.name||e.name.trim(),...(linked?{exerciseId:linked.id}:Object.hasOwn(e,'exerciseId')?{exerciseId:null}:{}),sets,reps,...cleanRepRange(e),rest,weight,loadStep,note:String(e.note||'').slice(0,500)};
    });
    const day=s.day==null?null:Number(s.day),duration=Number(s.duration??45);
    if(day!==null&&(!Number.isInteger(day)||day<0||day>6))throw invalid('День недели: от 0 до 6');
    if(!Number.isFinite(duration)||duration<1||duration>480)throw invalid('Проверь длительность');
    return {id,name:s.name.trim(),type:s.type,day,duration,note:String(s.note||'').slice(0,2000),exercises};
  })};
}
