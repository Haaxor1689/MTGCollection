(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,n,o){"use strict";o.r(n);var t=o(0),i=o.n(t),a=o(3),r=o.n(a),c=o(4),l=o(1),s=o.n(l),u="213841300532-aqinavnoi53if8cbk6re0aa6gkf965q3.apps.googleusercontent.com",d=function(){var e=i.a.useState(),n=Object(c.a)(e,2),o=n[0],t=n[1];return i.a.createElement("div",null,o?i.a.createElement("div",null,i.a.createElement(l.GoogleLogout,{clientId:u,onLogoutSuccess:function(){console.log("Logged out."),t(void 0)}}),i.a.createElement("img",{src:o.getBasicProfile().getImageUrl()}),i.a.createElement("div",null,o.getBasicProfile().getName())):i.a.createElement(s.a,{clientId:u,onSuccess:function(e){console.log({response:e}),t(e)},onFailure:function(e){console.log({response:e})},autoLoad:!0}))},g=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function f(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var o=e.installing;null!=o&&(o.onstatechange=function(){"installed"===o.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}r.a.render(i.a.createElement(d,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/MTGCollection",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/MTGCollection","/service-worker.js");g?(function(e,n){fetch(e).then(function(o){var t=o.headers.get("content-type");404===o.status||null!=t&&-1===t.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):f(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):f(n,e)})}}()},5:function(e,n,o){e.exports=o(11)}},[[5,1,2]]]);
//# sourceMappingURL=main.17b47475.chunk.js.map