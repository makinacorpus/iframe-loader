!function t(e,i,s){function n(a,o){if(!i[a]){if(!e[a]){var h="function"==typeof require&&require;if(!o&&h)return h(a,!0);if(r)return r(a,!0);var d=new Error("Cannot find module '"+a+"'");throw d.code="MODULE_NOT_FOUND",d}var l=i[a]={exports:{}};e[a][0].call(l.exports,function(t){var i=e[a][1][t];return n(i?i:t)},l,l.exports,t,e,i,s)}return i[a].exports}for(var r="function"==typeof require&&require,a=0;a<s.length;a++)n(s[a]);return n}({1:[function(t){var e=t("./modules/main-app.js");e.init()},{"./modules/main-app.js":6}],2:[function(t,e){!function(t){"function"==typeof define&&define.amd?define(t):"undefined"!=typeof e&&e.exports?e.exports=t():window.pym=t.call(this)}(function(){var t="xPYMx",e={},i=function(t){var e=new RegExp("[\\?&]"+t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")+"=([^&#]*)"),i=e.exec(location.search);return null===i?"":decodeURIComponent(i[1].replace(/\+/g," "))},s=function(t,e){return"*"===e.xdomain||t.origin.match(new RegExp(e.xdomain+"$"))?!0:void 0},n=function(e,i,s){var n=["pym",e,i,s];return n.join(t)},r=function(e){var i=["pym",e,"(\\S+)","(.+)"];return new RegExp("^"+i.join(t)+"$")},a=function(){for(var t=document.querySelectorAll("[data-pym-src]:not([data-pym-auto-initialized])"),i=t.length,s=0;i>s;++s){var n=t[s];n.setAttribute("data-pym-auto-initialized",""),""===n.id&&(n.id="pym-"+s);var r=n.getAttribute("data-pym-src"),a=n.getAttribute("data-pym-xdomain"),o={};a&&(o.xdomain=a),new e.Parent(n.id,r,o)}};return e.Parent=function(t,e,i){this.id=t,this.url=e,this.el=document.getElementById(t),this.iframe=null,this.settings={xdomain:"*"},this.messageRegex=r(this.id),this.messageHandlers={},this._constructIframe=function(){var t=this.el.offsetWidth.toString();this.iframe=document.createElement("iframe");var e="",i=this.url.indexOf("#");i>-1&&(e=this.url.substring(i,this.url.length),this.url=this.url.substring(0,i)),this.url+=this.url.indexOf("?")<0?"?":"&",this.iframe.src=this.url+"initialWidth="+t+"&childId="+this.id+e,this.iframe.setAttribute("width","100%"),this.iframe.setAttribute("scrolling","no"),this.iframe.setAttribute("marginheight","0"),this.iframe.setAttribute("frameborder","0"),this.el.appendChild(this.iframe);var s=this;window.addEventListener("resize",function(){s.sendWidth()})},this._fire=function(t,e){if(t in this.messageHandlers)for(var i=0;i<this.messageHandlers[t].length;i++)this.messageHandlers[t][i].call(this,e)},this._processMessage=function(t){if(s(t,this.settings)){var e=t.data.match(this.messageRegex);if(!e||3!==e.length)return!1;var i=e[1],n=e[2];this._fire(i,n)}},this._onHeightMessage=function(t){var e=parseInt(t);this.iframe.setAttribute("height",e+"px")},this.onMessage=function(t,e){t in this.messageHandlers||(this.messageHandlers[t]=[]),this.messageHandlers[t].push(e)},this.sendMessage=function(t,e){this.el.getElementsByTagName("iframe")[0].contentWindow.postMessage(n(this.id,t,e),"*")},this.sendWidth=function(){var t=this.el.offsetWidth.toString();this.sendMessage("width",t)};for(var a in i)this.settings[a]=i[a];this.onMessage("height",this._onHeightMessage);var o=this;return window.addEventListener("message",function(t){return o._processMessage(t)},!1),this._constructIframe(),this},e.Child=function(e){this.parentWidth=null,this.id=null,this.settings={renderCallback:null,xdomain:"*",polling:0},this.messageRegex=null,this.messageHandlers={},this.onMessage=function(t,e){t in this.messageHandlers||(this.messageHandlers[t]=[]),this.messageHandlers[t].push(e)},this._fire=function(t,e){if(t in this.messageHandlers)for(var i=0;i<this.messageHandlers[t].length;i++)this.messageHandlers[t][i].call(this,e)},this._processMessage=function(t){if(s(t,this.settings)){var e=t.data.match(this.messageRegex);if(e&&3===e.length){var i=e[1],n=e[2];this._fire(i,n)}}},this.sendMessage=function(t,e){window.parent.postMessage(n(this.id,t,e),"*")},this.sendHeight=function(){var t=document.getElementsByTagName("body")[0].offsetHeight.toString();o.sendMessage("height",t)},this._onWidthMessage=function(t){var e=parseInt(t);e!==this.parentWidth&&(this.parentWidth=e,this.settings.renderCallback&&this.settings.renderCallback(e),this.sendHeight())},this.id=i("childId")||e.id,this.messageRegex=new RegExp("^pym"+t+this.id+t+"(\\S+)"+t+"(.+)$");var r=parseInt(i("initialWidth"));this.onMessage("width",this._onWidthMessage);for(var a in e)this.settings[a]=e[a];var o=this;return window.addEventListener("message",function(t){o._processMessage(t)},!1),this.settings.renderCallback&&this.settings.renderCallback(r),this.sendHeight(),this.settings.polling&&window.setInterval(this.sendHeight,this.settings.polling),this},a(),e})},{}],3:[function(t,e){e.exports=t("./lib/randomstring")},{"./lib/randomstring":4}],4:[function(t,e,i){var s="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";i.generate=function(t){t=t?t:32;for(var e="",i=0;t>i;i++){var n=Math.floor(Math.random()*s.length);e+=s.substring(n,n+1)}return e}},{}],5:[function(t,e){e.exports=function(){function t(){d=!0,this.removeEventListener("DOMAttrModified",t,!1)}function e(t){return t.replace(o,function(t,e){return e.toUpperCase()})}function i(){var t={};return r.call(this.attributes,function(i){(n=i.name.match(a))&&(t[e(n[1])]=i.value)}),t}function s(t,e,i){Object.defineProperty?Object.defineProperty(t,e,{get:i}):t.__defineGetter__(e,i)}var n,r=[].forEach,a=/^data-(.+)/,o=/\-([a-z])/gi,h=document.createElement("div"),d=!1;void 0==h.dataset&&(h.addEventListener("DOMAttrModified",t,!1),h.setAttribute("foo","bar"),s(Element.prototype,"dataset",d?function(){return this._datasetCache||(this._datasetCache=i.call(this)),this._datasetCache}:i),document.addEventListener("DOMAttrModified",function(t){delete t.target._datasetCache},!1))}()},{}],6:[function(t,e){e.exports=function(){function e(t){var e={"2015-cantons-et-candidats":{url:"http://cartes-elections.makina-corpus.net/departementales-2015/app/public/"},"departementales-2015_regions":{url:"http://cartes-elections.makina-corpus.net/departementales-2015/regions.html"},"departementales-2015_departements":{url:"http://cartes-elections.makina-corpus.net/departementales-2015/departements.html"},"departementales-2015_cantons":{url:"http://cartes-elections.makina-corpus.net/departementales-2015/cantons.html"},"2015-resultats-departementales":{url:"http://cartes-elections.makina-corpus.net/departementales-2015/app/public/departement.html"}},i=e[t];return i&&i.url?i.url:"about:blank"}function i(){return document.querySelectorAll(r.phSelector)}function s(t){var i="mkc-"+o.generate(8);t.id=i;var s=t.dataset.source,n=new a.Parent(i,e(s),{});n.onMessage("event",function(e){"ready"===e&&(n.sendMessage("data",JSON.stringify(t.dataset)),this.iframe&&this.iframe.setAttribute&&this.iframe.setAttribute("allowfullscreen",""))})}function n(){var t=i();[].forEach.call(t,s)}var r={phSelector:".mkc-placeholder"};t("./dataset-polyfill.js");var a=t("pym.js"),o=t("randomstring");return{init:n}}()},{"./dataset-polyfill.js":5,"pym.js":2,randomstring:3}]},{},[1]);
//# sourceMappingURL=mkc.js.map