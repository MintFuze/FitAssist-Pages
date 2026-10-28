export function refreshSwipe({startX,startY,endX,endY,atBottom}){return atBottom&&startY-endY>95&&startY-endY>Math.abs(endX-startX)*1.6;}
