"use strict";(self["webpackChunk_4angelsmobile"]=self["webpackChunk_4angelsmobile"]||[]).push([[890],{7890:(e,t,n)=>{n.r(t),n.d(t,{pwa_camera_modal_instance:()=>c});var o=n(6696),i=function(e,t,n,o){function i(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,r){function c(e){try{h(o.next(e))}catch(t){r(t)}}function a(e){try{h(o["throw"](e))}catch(t){r(t)}}function h(e){e.done?n(e.value):i(e.value).then(c,a)}h((o=o.apply(e,t||[])).next())}))},r=function(e,t){var n,o,i,r,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(e){return function(t){return h([e,t])}}function h(r){if(n)throw new TypeError("Generator is already executing.");while(c)try{if(n=1,o&&(i=2&r[0]?o["return"]:r[0]?o["throw"]||((i=o["return"])&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return c.label++,{value:r[1],done:!1};case 5:c.label++,o=r[1],r=[0];continue;case 7:r=c.ops.pop(),c.trys.pop();continue;default:if(i=c.trys,!(i=i.length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){c=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){c.label=r[1];break}if(6===r[0]&&c.label<i[1]){c.label=i[1],i=r;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(r);break}i[2]&&c.ops.pop(),c.trys.pop();continue}r=t.call(e,c)}catch(a){r=[6,a],o=0}finally{n=i=0}if(5&r[0])throw r[1];return{value:r[0]?r[1]:void 0,done:!0}}},c=function(){function e(e){var t=this;(0,o.r)(this,e),this.facingMode="user",this.noDevicesText="No camera found",this.noDevicesButtonText="Choose image",this.handlePhoto=function(e){return i(t,void 0,void 0,(function(){return r(this,(function(t){return this.onPhoto.emit(e),[2]}))}))},this.handleNoDeviceError=function(e){return i(t,void 0,void 0,(function(){return r(this,(function(t){return this.noDeviceError.emit(e),[2]}))}))},this.onPhoto=(0,o.c)(this,"onPhoto",7),this.noDeviceError=(0,o.c)(this,"noDeviceError",7)}return e.prototype.handleBackdropClick=function(e){e.target!==this.el&&this.onPhoto.emit(null)},e.prototype.handleComponentClick=function(e){e.stopPropagation()},e.prototype.handleBackdropKeyUp=function(e){"Escape"===e.key&&this.onPhoto.emit(null)},e.prototype.render=function(){var e=this;return(0,o.h)("div",{class:"wrapper",onClick:function(t){return e.handleBackdropClick(t)}},(0,o.h)("div",{class:"content"},(0,o.h)("pwa-camera",{onClick:function(t){return e.handleComponentClick(t)},facingMode:this.facingMode,handlePhoto:this.handlePhoto,handleNoDeviceError:this.handleNoDeviceError,noDevicesButtonText:this.noDevicesButtonText,noDevicesText:this.noDevicesText})))},Object.defineProperty(e.prototype,"el",{get:function(){return(0,o.g)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;contain:strict;--inset-width:600px;--inset-height:600px}.wrapper,:host{display:-ms-flexbox;display:flex}.wrapper{-ms-flex:1;flex:1;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0,0,0,.15)}.content{-webkit-box-shadow:0 0 5px rgba(0,0,0,.2);box-shadow:0 0 5px rgba(0,0,0,.2);width:var(--inset-width);height:var(--inset-height);max-height:100%}@media only screen and (max-width:600px){.content{width:100%;height:100%}}"},enumerable:!0,configurable:!0}),e}()}}]);
//# sourceMappingURL=890-legacy.1276fe6b.js.map