// Verified publisher embeds; no video files or trackers load before a tap.
const pg='https://www.puregym.com/exercises/';
export const exercises=[
{id:'chest-machine',name:'Жим от груди в тренажёре',group:'chest',equipment:'Рычажный или блочный тренажёр «Жим от груди сидя»',video:'CIykDiF4sfg',seconds:15,source:pg+'chest/bench-press/seated-chest-press/',cue:'Рукоятки на уровне середины груди. Спина у опоры; возвращай вес плавно.'},
{id:'chest-db',name:'Жим гантелей лёжа',group:'chest',equipment:'Гантели и скамья',video:'AduT4Eq-iP0',seconds:15,source:pg+'chest/bench-press/dumbbell-bench-press/',cue:'Стопы устойчиво, лопатки у скамьи. Начни с лёгких гантелей, без рывка.'},
{id:'chest-incline',name:'Отжимания от высокой опоры',group:'chest',equipment:'Устойчивая опора',video:'yAbg3_pJKvw',seconds:22,source:pg+'chest/press-up/incline-push-ups/',cue:'Чем выше опора, тем легче. Корпус одной линией; опора не должна скользить.'},
{id:'pulldown',name:'Тяга верхнего блока',group:'vertical-pull',equipment:'Тренажёр «Вертикальная тяга» + длинная рукоять',video:'JGeRYIZdojU',seconds:13,source:pg+'back/lat-exercises/lat-pulldown/',cue:'Тяни к верхней части груди, не за голову. Без раскачивания и рывков.'},
{id:'pulldown-close',name:'Тяга верхнего блока узким хватом',group:'vertical-pull',equipment:'Верхний блок и узкая рукоять',video:'IjoFCmLX7z0',seconds:15,source:pg+'back/lat-exercises/close-grip-lat-pulldown/',cue:'Держи корпус устойчиво. Тяни рукоять к верхней части груди, не помогай рывком.'},
{id:'row-supported',name:'Тяга гантелей с опорой грудью',group:'row',equipment:'Гантели и наклонная скамья',video:'Nx0TzjgsI-0',seconds:15,source:'https://www.youtube.com/watch?v=Nx0TzjgsI-0',cue:'Грудь остаётся на скамье. Веди локти назад, не поднимай плечи к ушам.'},
{id:'row-db',name:'Тяга гантелей в наклоне',group:'row',equipment:'Гантели',video:'6gvmcqr226U',seconds:15,source:pg+'back/rows/dumbbell-bent-over-row/',cue:'Спина нейтральна, корпус устойчив. Если поясница устаёт, выбирай вариант с опорой.'},
{id:'row-cable',name:'Тяга горизонтального блока',group:'row',equipment:'Тренажёр «Горизонтальная тяга сидя» + рукоять',video:'xQNrFHEMhI4',seconds:92,author:'Bodybuilding.com',source:'https://www.youtube.com/watch?v=xQNrFHEMhI4',cue:'Тяни к животу, держи спину устойчиво. Не отклоняйся всем телом.'},
{id:'shoulder-machine',name:'Жим плечами в тренажёре',group:'shoulder-press',equipment:'Тренажёр «Жим вверх сидя» со спинкой',video:'GcY6TZxfS0k',seconds:10,source:pg+'arms-and-shoulders/shoulder-press/shoulder-press-machine/',cue:'Спина у опоры, без прогиба в пояснице. Двигайся в комфортной амплитуде.'},
{id:'shoulder-db',name:'Жим гантелей сидя',group:'shoulder-press',equipment:'Гантели и скамья',video:'TsduLWuhlFM',seconds:11,source:pg+'arms-and-shoulders/shoulder-press/seated-shoulder-press/',cue:'Спина у опоры. Не запрокидывай голову и не выталкивай вес поясницей.'},
{id:'curl',name:'Сгибание рук с гантелями',group:'biceps',equipment:'Гантели',video:'MtXdEcW3Eog',seconds:28,source:pg+'arms-and-shoulders/bicep-curl/dumbbell-bicep-curls/',cue:'Локти близко к корпусу. Не раскачивайся; опускай гантели подконтрольно.'},
{id:'hammer',name:'Молотковые сгибания',group:'biceps',equipment:'Гантели',video:'B4RznoFvTl4',seconds:20,source:pg+'arms-and-shoulders/bicep-curl/hammer-curls/',cue:'Ладони смотрят друг на друга. Локти не уходят вперёд.'},
{id:'triceps-cable',name:'Разгибание рук на блоке',group:'triceps',equipment:'Кроссовер / верхний блок + канат или прямая рукоять',video:'LXkCrxn3caQ',seconds:16,source:pg+'arms-and-shoulders/tricep-extension/tricep-pushdowns/',cue:'Локти прижаты к корпусу; двигаются предплечья. Не наваливайся на рукоять.'},
{id:'triceps-db',name:'Разгибание гантели из-за головы',group:'triceps',equipment:'Гантель',video:'9wxRhONFsRA',seconds:20,source:pg+'arms-and-shoulders/tricep-extension/overhead-tricep-extension/',cue:'Лёгкая гантель, локти направлены вперёд. Замени на блок при дискомфорте плеч.'},
{id:'rear-fly',name:'Разведение гантелей в наклоне',group:'rear-shoulder',equipment:'Лёгкие гантели',video:'nlkF7_2O_Lw',seconds:15,source:pg+'arms-and-shoulders/rear-delt-exercises/rear-delt-flyes/',cue:'Небольшой вес, спина нейтральна. Разводи руки без рывков.'},
{id:'deadbug',name:'Мёртвый жук',group:'core',equipment:'Коврик',video:'9RK9UUgKIQE',seconds:11,source:pg+'abs/deadbugs/',cue:'Медленно опускай противоположные руку и ногу, не отрывая поясницу. Повторы — на сторону.'}
];
exercises.push(...[
 {
  "id": "chest-neutral",
  "name": "Жим гантелей нейтральным хватом",
  "group": "chest",
  "equipment": "Две гантели + горизонтальная скамья",
  "video": "fZuQpjhaR_M",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/chest/bench-press/dumbbell-bench-press/",
  "cue": "Ладони смотрят друг на друга. Лопатки у скамьи, локти не разводи широко.",
  "guide": [
   "Ляг на горизонтальную скамью, гантели держи над грудью ладонями друг к другу.",
   "Опускай их плавно по сторонам груди, сохраняя запястья ровными.",
   "Выжми вверх без удара гантелей. Вес указывай за одну гантель."
  ]
 },
 {
  "id": "chest-floor",
  "name": "Жим гантелей лёжа на полу",
  "group": "chest",
  "equipment": "Две гантели + коврик",
  "video": "T0Y3OBF1bNI",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/chest/bench-press/dumbbell-bench-press/",
  "cue": "Опускай плечи до лёгкого касания пола, без удара. Ладони и локти держи устойчиво.",
  "guide": [
   "Ляг на коврик, колени согни, гантели держи над грудью.",
   "Плавно опускай руки, пока плечи мягко не коснутся пола.",
   "Выжми вверх без рывка; пол ограничивает глубину. Вес — одной гантели."
  ]
 },
 {
  "id": "chest-db-incline",
  "name": "Жим гантелей на наклонной скамье",
  "group": "chest",
  "equipment": "Две гантели + регулируемая скамья 30–45°",
  "video": "oZVCBM9f8Eo",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/chest/bench-press/incline-dumbbell-press/",
  "cue": "Небольшой наклон спинки, лопатки у опоры. Не превращай движение в жим над головой.",
  "guide": [
   "Установи спинку примерно на 30–45°, стопы поставь устойчиво.",
   "Опусти гантели по сторонам верхней части груди без чрезмерного растяжения.",
   "Плавно выжми их вверх. Вес подбирай заново, за одну гантель."
  ]
 },
 {
  "id": "row-onearm",
  "name": "Тяга гантели одной рукой с опорой",
  "group": "row",
  "equipment": "Одна гантель + горизонтальная скамья",
  "video": "ZRSGpBUVcNw",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/back/rows/single-arm-dumbbell-row/",
  "cue": "Свободная рука у опоры. Тяни локоть к тазу, не разворачивая корпус. Повторы — на каждую руку.",
  "guide": [
   "Упрись свободной рукой и коленом в устойчивую скамью, спину держи нейтрально.",
   "Тяни гантель к тазу, не поднимая плечо к уху и не вращая корпус.",
   "Плавно опусти; выполни повторы каждой рукой. Записывай вес одной гантели."
  ]
 },
 {
  "id": "curl-cable",
  "name": "Сгибание рук на нижнем блоке",
  "group": "biceps",
  "equipment": "Кроссовер / нижний блок + прямая рукоять",
  "video": "GNlopToAZyg",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/arms-and-shoulders/bicep-curl/cable-bicep-curls/",
  "cue": "Локти рядом с корпусом, ладони вверх. Не помогай спиной.",
  "guide": [
   "Закрепи прямую рукоять на нижнем блоке, возьмись ладонями вверх.",
   "Согни руки, удерживая локти у корпуса и плечи неподвижно.",
   "Плавно разогни руки, не бросая грузовой стек."
  ]
 },
 {
  "id": "curl-concentration",
  "name": "Сгибание гантели сидя с опорой локтя",
  "group": "biceps",
  "equipment": "Одна гантель + скамья",
  "video": "llD6MImgqe8",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/arms-and-shoulders/bicep-curl/concentration-curls/",
  "cue": "Локоть у внутренней стороны бедра, плечо неподвижно. Повторы — каждой рукой.",
  "guide": [
   "Сядь на скамью, поставь стопы устойчиво и упрись локтем во внутреннюю сторону бедра.",
   "Плавно согни руку без поворота корпуса и подъёма плеча.",
   "Опусти гантель подконтрольно; повтори другой рукой. Вес — одной гантели."
  ]
 },
 {
  "id": "shoulder-arnold",
  "name": "Жим Арнольда сидя",
  "group": "shoulder-press",
  "equipment": "Две гантели + скамья со спинкой",
  "video": "jeJttN2EWCo",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/arms-and-shoulders/shoulder-press/arnold-press/",
  "cue": "Небольшой вес, плавный разворот ладоней. При неудобстве выбери обычный жим гантелей.",
  "guide": [
   "Сядь у спинки, гантели перед плечами ладонями к себе.",
   "Плавно выжимай вверх, разворачивая ладони вперёд в комфортной амплитуде.",
   "Опускай обратно без прогиба поясницы. Сначала освой обычный жим сидя."
  ]
 },
 {
  "id": "triceps-kickback",
  "name": "Разгибание руки с гантелью в наклоне",
  "group": "triceps",
  "equipment": "Одна лёгкая гантель + скамья для опоры",
  "video": "JPmbMOu4IYw",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/arms-and-shoulders/tricep-extension/tricep-kickbacks/",
  "cue": "Плечо вдоль корпуса, двигается предплечье. Без махов, каждой рукой отдельно.",
  "guide": [
   "Упрись свободной рукой в скамью, наклони корпус с нейтральной спиной.",
   "Удерживая плечо вдоль туловища, разогни локоть и отведи гантель назад.",
   "Плавно согни руку. Возьми небольшой вес, чтобы не раскачивать плечо."
  ]
 },
 {
  "id": "crunch",
  "name": "Скручивания на полу",
  "group": "core",
  "equipment": "Гимнастический коврик",
  "video": "NnVhqMQRvmM",
  "seconds": null,
  "source": "https://www.puregym.com/exercises/abs/crunches/",
  "cue": "Небольшое движение грудной клетки к тазу. Не тяни шею и не делай сотни повторов ради количества.",
  "guide": [
   "Ляг на коврик, согни колени, стопы поставь на пол, руки скрести на груди.",
   "На выдохе немного подними лопатки, поясница остаётся на полу.",
   "Плавно опустись, не тяни голову руками. Работай без дополнительного веса."
  ]
 },
 {
  "id": "lateral-db",
  "name": "Подъём гантелей в стороны",
  "group": "lateral-shoulder",
  "equipment": "Две лёгкие гантели",
  "video": null,
  "seconds": null,
  "source": "https://www.puregym.com/exercises/arms-and-shoulders/lateral-raises/dumbbell-lateral-raise/",
  "cue": "Мягко согни локти. Поднимай руки примерно до уровня плеч, без маха корпусом.",
  "guide": [
   "Стой устойчиво, держи лёгкие гантели по сторонам, локти слегка согни.",
   "Плавно подними руки в стороны и немного вперёд, примерно до уровня плеч.",
   "Опусти подконтрольно. Не пожимай плечами и не подбрасывай вес."
  ]
 },
 {
  "id": "lateral-seated",
  "name": "Подъём гантелей в стороны сидя",
  "group": "lateral-shoulder",
  "equipment": "Две лёгкие гантели + скамья",
  "video": null,
  "seconds": null,
  "source": "https://www.puregym.com/exercises/arms-and-shoulders/lateral-raises/",
  "cue": "Сядь устойчиво, поднимай гантели без раскачивания. Вес — каждой гантели.",
  "guide": [
   "Сядь на скамью, стопы устойчиво на полу, гантели по сторонам.",
   "Разведи слегка согнутые руки примерно до уровня плеч.",
   "Опускай плавно, не наклоняя корпус вперёд-назад."
  ]
 },
 {
  "id": "chest-fly-db",
  "name": "Разведение гантелей лёжа",
  "group": "chest-fly",
  "equipment": "Две лёгкие гантели + горизонтальная скамья",
  "video": null,
  "seconds": null,
  "source": "https://www.puregym.com/exercises/chest/chest-fly/",
  "cue": "Слегка согнутые локти, небольшая комфортная глубина. Это разведение, а не замена жиму один к одному.",
  "guide": [
   "Ляг на скамью, подними лёгкие гантели над грудью, немного согни локти.",
   "Разводи руки в стороны до комфортного растяжения, без глубокой нижней позиции.",
   "Верни руки по дуге, не меняя угол локтей. Вес — одной гантели."
  ]
 }
]);
exercises.push(...[
 {id:'curl-seated',name:'Сгибание рук с гантелями сидя',group:'biceps',equipment:'Гантели и скамья со спинкой',cue:'Сядь у опоры, локти рядом с корпусом. Вес одной гантели.',guide:['Сядь на скамью со спинкой, стопы поставь удобно и устойчиво.','Согни руки без раскачивания и движения локтей вперёд.','Плавно опусти гантели, оставляя запас повторов.'],source:'https://www.puregym.com/exercises/arms-and-shoulders/bicep-curl/dumbbell-bicep-curls/'},
 {id:'hammer-seated',name:'Молотковые сгибания сидя',group:'biceps',equipment:'Гантели и скамья со спинкой',cue:'Ладони друг к другу, спина у опоры. Вес одной гантели.',guide:['Сядь со спиной у опоры, руки вдоль корпуса, ладони внутрь.','Сгибай руки без рывка, удерживая локти рядом с корпусом.','Опускай подконтрольно, не раскачивай туловище.'],source:'https://www.puregym.com/exercises/arms-and-shoulders/bicep-curl/hammer-curls/'},
 {id:'triceps-rope',name:'Разгибание рук с канатом на блоке',group:'triceps',equipment:'Верхний блок кроссовера и канатная рукоять',cue:'Локти у корпуса, без наваливания на канат. Без раскачивания и дискомфорта в колене.',guide:['Поставь канат на верхний блок. Стой удобно, слегка смягчи колени без глубокого сгибания.','Разгибай локти без рывка и наклона всем телом.','Верни канат плавно. Если неудобно колену, подбери вариант сидя с тренером.'],source:'https://www.puregym.com/exercises/arms-and-shoulders/tricep-extension/tricep-pushdowns/'}
].map(e=>({...e,video:null,seconds:null})));
exercises.push({id:'back-extension-45',name:'Гиперэкстензия на скамье 45°',group:'hip-hinge',equipment:'Наклонная скамья для гиперэкстензии 45° с фиксацией стоп',video:'BZMnTSobIAQ',author:'Muscle & Strength',seconds:null,source:'https://www.muscleandstrength.com/exercises/hyperextension.html',cue:'Необязательно: лёгкий подход после разминки, без блина. Без дискомфорта в колене или пояснице.',guide:['Попроси тренера настроить опору под верхнюю часть бёдер и надёжно зафиксировать стопы. Вход и выход должны быть удобными.','Без дополнительного веса мягко наклонись в тазобедренных суставах в комфортной амплитуде, без рывков.','Поднимись только до прямой линии тела, не переразгибай поясницу. Не работай до усталости; при дискомфорте в колене или пояснице прекрати.']});
// Exact publisher embeds verified 2026-10-26; no runtime is guessed.
const techniqueMedia={
 "lateral-db": {
  "video": "z-kOn7flIZg",
  "author": "PureGym",
  "source": "https://www.puregym.com/exercises/arms-and-shoulders/lateral-raises/dumbbell-lateral-raise/"
 },
 "lateral-seated": {
  "video": "xDrYB81QXmY",
  "author": "PureGym",
  "source": "https://www.puregym.com/exercises/arms-and-shoulders/lateral-raises/seated-lateral-raise/"
 },
 "curl-seated": {
  "video": "BsULGO70tcU",
  "author": "ChadMollickDotCom",
  "source": "https://www.youtube.com/watch?v=BsULGO70tcU"
 },
 "hammer-seated": {
  "video": "BbxA1QF3TxY",
  "author": "ChadMollickDotCom",
  "source": "https://www.youtube.com/watch?v=BbxA1QF3TxY"
 },
 "chest-fly-db": {
  "video": "Nhvz9EzdJ4U",
  "author": "PureGym",
  "source": "https://www.puregym.com/exercises/chest/chest-fly/dumbbell-chest-fly/"
 },
 "triceps-rope": {
  "video": "tev4QScR30s",
  "author": "Catalyst Athletics",
  "source": "https://www.catalystathletics.com/exercise/885/Rope-Tricep-Pushdown/"
 }
};
for(const e of exercises)if(techniqueMedia[e.id])Object.assign(e,techniqueMedia[e.id]);
export function videoEmbedUrl(e){return (!e?.videoProvider||e.videoProvider==='youtube')&&/^[\w-]{11}$/.test(e?.video||'')?'https://www.youtube-nocookie.com/embed/'+e.video+'?playsinline=1&rel=0':null;}
export function videoWatchUrl(e){return videoEmbedUrl(e)?'https://www.youtube.com/watch?v='+e.video:null;}
const aliases={'жим в тренажёре':'chest-machine','жим от груди в тренажере':'chest-machine','тяга горизонтального блока':'row-cable','тяга верхнего блока':'pulldown'};
const normalized=name=>String(name||'').toLowerCase().replace(/ё/g,'е').trim();
const byName=name=>{const n=normalized(name);return exercises.find(e=>normalized(e.name)===n)||exercises.find(e=>e.id===(aliases[n]||Object.entries(aliases).find(([key])=>normalized(key)===n)?.[1]))||null;};
export function findExercise(value){if(value&&typeof value==='object'){if(Object.hasOwn(value,'exerciseId')){if(value.exerciseId===null)return null;const e=exercises.find(e=>e.id===value.exerciseId);return e&&(!value.name||byName(value.name)?.id===e.id)?e:null;}return byName(value.name);}return byName(value);}
export function replacements(value){const current=findExercise(value);return current?exercises.filter(e=>e.group===current.group&&e.id!==current.id):[];}
export function catalogExercise(id,previous={}){const e=exercises.find(e=>e.id===id);if(!e)throw Error('Упражнение не найдено');return {exerciseId:e.id,name:e.name,sets:previous.sets??2,reps:previous.reps??10,...(previous.repMin!=null&&previous.repMax!=null?{repMin:previous.repMin,repMax:previous.repMax}:{}),weight:0,loadStep:0,rest:previous.rest??90,note:e.cue};}
export function customExercise(previous={}){return {...previous,exerciseId:null};}
