export function fullCalendarDate(day){
 const date=new Date(day+'T12:00:00');
 const label=date.toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'});
 return label.charAt(0).toUpperCase()+label.slice(1);
}
