!function(e){function t(t){for(var r,d,c=t[0],i=t[1],u=t[2],p=0,s=[];p<c.length;p++)d=c[p],a[d]&&s.push(a[d][0]),a[d]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(l&&l(t);s.length;)s.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var i=n[c];0!==a[i]&&(r=!1)}r&&(o.splice(t--,1),e=d(d.s=n[0]))}return e}var r={},a={3:0};var o=[];function d(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,d),n.l=!0,n.exports}d.m=e,d.c=r,d.d=function(e,t,n){d.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},d.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},d.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return d.d(t,"a",t),t},d.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},d.p="";var c=window.webpackJsonp=window.webpackJsonp||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=i;o.push([29,0]),n()}({29:function(e,t,n){"use strict";var r,a=(r=n(1))&&r.__esModule?r:{default:r};var o=document.getElementById("users");o&&(a.default.get("users").then(function(e){var t=e.data.length?e.data:void 0;if(t){var n=["Confirmado","Pendiente","Rechazada","Cancelado"],r=new DocumentFragment;t.forEach(function(e){var t=document.createElement("tr"),a=document.createElement("td");a.textContent=e.firstName,t.appendChild(a),(a=document.createElement("td")).textContent=e.lastName,t.appendChild(a),(a=document.createElement("td")).textContent=n[e.confirmation],t.appendChild(a),(a=document.createElement("td")).setAttribute("class","fee"),a.setAttribute("name","fee-".concat(e.id)),a.textContent="$".concat(e.fee.toString()),t.appendChild(a),(a=document.createElement("td")).appendChild(document.createTextNode("$"));var o=document.createElement("input");o.setAttribute("type","number"),o.setAttribute("name","adder-".concat(e.id)),o.setAttribute("class","adder"),o.setAttribute("placeholder","0.0"),o.setAttribute("step","10"),a.appendChild(o);var d=document.createElement("button");d.setAttribute("type","button"),d.setAttribute("class","deposit"),d.setAttribute("key",e.id),d.appendChild(document.createTextNode("e")),a.appendChild(d),t.appendChild(a),r.appendChild(t)}),o.appendChild(r)}}),o.addEventListener("click",function(e){var t=e.target;if(t&&"deposit"===t.getAttribute("class")){var n=t.getAttribute("key"),r=t.parentElement,o=r.parentElement,d=r.children["adder-".concat(n)],c={deposit:d.value,id:n};c.deposit?a.default.put("/addfee",c).then(function(e){var n=e.data;if(n.err)return console.error(n.err),n.err;o.children["fee-".concat(t.getAttribute("key"))].innerText="$".concat(n.fee)}):console.log("agrega un valor"),d.setAttribute("value","0")}}))}});
//# sourceMappingURL=admin.js.map