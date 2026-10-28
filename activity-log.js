export function completedActivities(data){return (data.workouts||[]).filter(w=>w.completedAt).slice().sort((a,b)=>b.completedAt.localeCompare(a.completedAt));}
