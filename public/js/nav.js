!function(e){function t(t){for(var r,u,c=t[0],i=t[1],l=t[2],f=0,p=[];f<c.length;f++)u=c[f],o[u]&&p.push(o[u][0]),o[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(s&&s(t);p.length;)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,c=1;c<n.length;c++){var i=n[c];0!==o[i]&&(r=!1)}r&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},o={1:0};var a=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},u.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="";var c=window.webpackJsonp=window.webpackJsonp||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var s=i;a.push([8,0]),n()}({8:function(e,t,n){"use strict";var r,o=(r=n(1))&&r.__esModule?r:{default:r};var a=document.getElementById("nav"),u=document.getElementsByName("admin")[0];u&&o.default.get("/role").then(function(e){0===e.data&&u.setAttribute("class","")}),a&&a.addEventListener("click",function(e){var t=e.target.getAttribute("name");window.location.assign("/".concat(t))})}});
//# sourceMappingURL=nav.js.map