"use strict";(self["webpackChunk_4angelsmobile"]=self["webpackChunk_4angelsmobile"]||[]).push([[823],{6823:(e,t,o)=>{o.r(t),o.d(t,{startTapClick:()=>s});var n=o(6587);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const s=e=>{let t,o,s,v=10*-u,f=0;const p=e.getBoolean("animated",!0)&&e.getBoolean("rippleEffect",!0),m=new WeakMap,h=e=>{v=(0,n.u)(e),g(e)},L=e=>{v=(0,n.u)(e),k(e)},w=e=>{if(2===e.button)return;const t=(0,n.u)(e)-u;v<t&&g(e)},E=e=>{const t=(0,n.u)(e)-u;v<t&&k(e)},b=()=>{clearTimeout(s),s=void 0,t&&(y(!1),t=void 0)},g=e=>{t||T(i(e),e)},k=e=>{T(void 0,e)},T=(e,o)=>{if(e&&e===t)return;clearTimeout(s),s=void 0;const{x:i,y:r}=(0,n.p)(o);if(t){if(m.has(t))throw new Error("internal error");t.classList.contains(c)||C(t,i,r),y(!0)}if(e){const t=m.get(e);t&&(clearTimeout(t),m.delete(e));const o=a(e)?0:d;e.classList.remove(c),s=setTimeout((()=>{C(e,i,r),s=void 0}),o)}t=e},C=(e,t,n)=>{if(f=Date.now(),e.classList.add(c),!p)return;const s=r(e);null!==s&&(R(),o=s.addRipple(t,n))},R=()=>{void 0!==o&&(o.then((e=>e())),o=void 0)},y=e=>{R();const o=t;if(!o)return;const n=l-Date.now()+f;if(e&&n>0&&!a(o)){const e=setTimeout((()=>{o.classList.remove(c),m.delete(o)}),l);m.set(o,e)}else o.classList.remove(c)},S=document;S.addEventListener("ionGestureCaptured",b),S.addEventListener("touchstart",h,!0),S.addEventListener("touchcancel",L,!0),S.addEventListener("touchend",L,!0),S.addEventListener("pointercancel",b,!0),S.addEventListener("mousedown",w,!0),S.addEventListener("mouseup",E,!0)},i=e=>{if(void 0===e.composedPath)return e.target.closest(".ion-activatable");{const t=e.composedPath();for(let e=0;e<t.length-2;e++){const o=t[e];if(!(o instanceof ShadowRoot)&&o.classList.contains("ion-activatable"))return o}}},a=e=>e.classList.contains("ion-activatable-instant"),r=e=>{if(e.shadowRoot){const t=e.shadowRoot.querySelector("ion-ripple-effect");if(t)return t}return e.querySelector("ion-ripple-effect")},c="ion-activated",d=200,l=200,u=2500}}]);
//# sourceMappingURL=823.3b24a50c.js.map