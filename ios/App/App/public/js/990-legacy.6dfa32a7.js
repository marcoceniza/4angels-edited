"use strict";(self["webpackChunk_4angelsmobile"]=self["webpackChunk_4angelsmobile"]||[]).push([[990],{8990:(e,t,n)=>{n.r(t),n.d(t,{createSwipeBackGesture:()=>i});var r=n(6587),s=n(545),a=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const i=(e,t,n,i,o)=>{const c=e.ownerDocument.defaultView,l=(0,s.i)(e),u=e=>{const t=50,{startX:n}=e;return l?n>=c.innerWidth-t:n<=t},h=e=>l?-e.deltaX:e.deltaX,d=e=>l?-e.velocityX:e.velocityX,b=e=>u(e)&&t(),k=e=>{const t=h(e),n=t/c.innerWidth;i(n)},w=e=>{const t=h(e),n=c.innerWidth,s=t/n,a=d(e),i=n/2,l=a>=0&&(a>.2||t>i),u=l?1-s:s,b=u*n;let k=0;if(b>5){const e=b/Math.abs(a);k=Math.min(e,540)}o(l,s<=0?.01:(0,r.h)(0,s,.9999),k)};return(0,a.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:b,onStart:n,onMove:k,onEnd:w})}}}]);
//# sourceMappingURL=990-legacy.6dfa32a7.js.map