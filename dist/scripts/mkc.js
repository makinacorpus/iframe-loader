!function a(r,o,l){function h(e,t){if(!o[e]){if(!r[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(d)return d(e,!0);var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}var n=o[e]={exports:{}};r[e][0].call(n.exports,function(t){return h(r[e][1][t]||t)},n,n.exports,a,r,o,l)}return o[e].exports}for(var d="function"==typeof require&&require,t=0;t<l.length;t++)h(l[t]);return h}({1:[function(t,e,i){!function(t){"function"==typeof define&&define.amd?define(t):void 0!==e&&e.exports?e.exports=t():window.pym=t.call(this)}(function(){var a="xPYMx",u={},c=function(t){var e=document.createEvent("Event");e.initEvent("pym:"+t,!0,!0),document.dispatchEvent(e)},s=function(t){var e=new RegExp("[\\?&]"+t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]")+"=([^&#]*)").exec(location.search);return null===e?"":decodeURIComponent(e[1].replace(/\+/g," "))},r=function(t,e){if(("*"===e.xdomain||t.origin.match(new RegExp(e.xdomain+"$")))&&"string"==typeof t.data)return!0},o=function(t,e,i){return["pym",t,e,i].join(a)},g=Date.now||function(){return(new Date).getTime()},m=function(){for(var t=u.autoInitInstances.length-1;0<=t;t--){var e=u.autoInitInstances[t];e.el.getElementsByTagName("iframe").length&&e.el.getElementsByTagName("iframe")[0].contentWindow||u.autoInitInstances.splice(t,1)}};return u.autoInitInstances=[],u.autoInit=function(t){var e=document.querySelectorAll("[data-pym-src]:not([data-pym-auto-initialized])"),i=e.length;m();for(var s=0;s<i;++s){var n=e[s];n.setAttribute("data-pym-auto-initialized",""),""===n.id&&(n.id="pym-"+s+"-"+Math.random().toString(36).substr(2,5));var a=n.getAttribute("data-pym-src"),r={xdomain:"string",title:"string",name:"string",id:"string",sandbox:"string",allowfullscreen:"boolean",parenturlparam:"string",parenturlvalue:"string",optionalparams:"boolean",trackscroll:"boolean",scrollwait:"number"},o={};for(var l in r)if(null!==n.getAttribute("data-pym-"+l))switch(r[l]){case"boolean":o[l]=!("false"===n.getAttribute("data-pym-"+l));break;case"string":o[l]=n.getAttribute("data-pym-"+l);break;case"number":var h=Number(n.getAttribute("data-pym-"+l));isNaN(h)||(o[l]=h);break;default:console.err("unrecognized attribute type")}var d=new u.Parent(n.id,a,o);u.autoInitInstances.push(d)}return t||c("pym-initialized"),u.autoInitInstances},u.Parent=function(t,e,i){var s;for(var n in this.id=t,this.url=e,this.el=document.getElementById(t),this.iframe=null,this.settings={xdomain:"*",optionalparams:!0,parenturlparam:"parentUrl",parenturlvalue:window.location.href,trackscroll:!1,scrollwait:100},this.messageRegex=(s=this.id,new RegExp("^"+["pym",s,"(\\S+)","(.*)"].join(a)+"$")),this.messageHandlers={},i=i||{},this._constructIframe=function(){var t=this.el.offsetWidth.toString();this.iframe=document.createElement("iframe");var e="",i=this.url.indexOf("#");for(-1<i&&(e=this.url.substring(i,this.url.length),this.url=this.url.substring(0,i)),this.url.indexOf("?")<0?this.url+="?":this.url+="&",this.iframe.src=this.url+"initialWidth="+t+"&childId="+this.id,this.settings.optionalparams&&(this.iframe.src+="&parentTitle="+encodeURIComponent(document.title),this.iframe.src+="&"+this.settings.parenturlparam+"="+encodeURIComponent(this.settings.parenturlvalue)),this.iframe.src+=e,this.iframe.setAttribute("width","100%"),this.iframe.setAttribute("scrolling","no"),this.iframe.setAttribute("marginheight","0"),this.iframe.setAttribute("frameborder","0"),this.settings.title&&this.iframe.setAttribute("title",this.settings.title),void 0!==this.settings.allowfullscreen&&!1!==this.settings.allowfullscreen&&this.iframe.setAttribute("allowfullscreen",""),void 0!==this.settings.sandbox&&"string"==typeof this.settings.sandbox&&this.iframe.setAttribute("sandbox",this.settings.sandbox),this.settings.id&&(document.getElementById(this.settings.id)||this.iframe.setAttribute("id",this.settings.id)),this.settings.name&&this.iframe.setAttribute("name",this.settings.name);this.el.firstChild;)this.el.removeChild(this.el.firstChild);this.el.appendChild(this.iframe),window.addEventListener("resize",this._onResize),this.settings.trackscroll&&window.addEventListener("scroll",this._throttleOnScroll)},this._onResize=function(){this.sendWidth(),this.settings.trackscroll&&this.sendViewportAndIFramePosition()}.bind(this),this._onScroll=function(){this.sendViewportAndIFramePosition()}.bind(this),this._fire=function(t,e){if(t in this.messageHandlers)for(var i=0;i<this.messageHandlers[t].length;i++)this.messageHandlers[t][i].call(this,e)},this.remove=function(){window.removeEventListener("message",this._processMessage),window.removeEventListener("resize",this._onResize),this.el.removeChild(this.iframe),m()},this._processMessage=function(t){if(r(t,this.settings)&&"string"==typeof t.data){var e=t.data.match(this.messageRegex);if(!e||3!==e.length)return!1;var i=e[1],s=e[2];this._fire(i,s)}}.bind(this),this._onHeightMessage=function(t){var e=parseInt(t);this.iframe.setAttribute("height",e+"px")},this._onNavigateToMessage=function(t){(function(t){if(t.match(/^(?:(?:https?|mailto|ftp):|[^&:/?#]*(?:[/?#]|$))/gi))return!0})(t)&&(document.location.href=t)},this._onScrollToChildPosMessage=function(t){var e=document.getElementById(this.id).getBoundingClientRect().top+window.pageYOffset+parseInt(t);window.scrollTo(0,e)},this.onMessage=function(t,e){t in this.messageHandlers||(this.messageHandlers[t]=[]),this.messageHandlers[t].push(e)},this.sendMessage=function(t,e){this.el.getElementsByTagName("iframe").length&&(this.el.getElementsByTagName("iframe")[0].contentWindow?this.el.getElementsByTagName("iframe")[0].contentWindow.postMessage(o(this.id,t,e),"*"):this.remove())},this.sendWidth=function(){var t=this.el.offsetWidth.toString();this.sendMessage("width",t)},this.sendViewportAndIFramePosition=function(){var t=this.iframe.getBoundingClientRect(),e=(window.innerWidth||document.documentElement.clientWidth)+" "+(window.innerHeight||document.documentElement.clientHeight);e+=" "+t.top+" "+t.left,e+=" "+t.bottom+" "+t.right,this.sendMessage("viewport-iframe-position",e)},i)this.settings[n]=i[n];return this._throttleOnScroll=function(i,s,n){var a,r,o,l=null,h=0;n||(n={});var d=function(){h=!1===n.leading?0:g(),l=null,o=i.apply(a,r),l||(a=r=null)};return function(){var t=g();h||!1!==n.leading||(h=t);var e=s-(t-h);return a=this,r=arguments,e<=0||s<e?(l&&(clearTimeout(l),l=null),h=t,o=i.apply(a,r),l||(a=r=null)):l||!1===n.trailing||(l=setTimeout(d,e)),o}}(this._onScroll.bind(this),this.settings.scrollwait),this.onMessage("height",this._onHeightMessage),this.onMessage("navigateTo",this._onNavigateToMessage),this.onMessage("scrollToChildPos",this._onScrollToChildPosMessage),this.onMessage("parentPositionInfo",this.sendViewportAndIFramePosition),window.addEventListener("message",this._processMessage,!1),this._constructIframe(),this},u.Child=function(t){this.parentWidth=null,this.id=null,this.parentTitle=null,this.parentUrl=null,this.settings={renderCallback:null,xdomain:"*",polling:0,parenturlparam:"parentUrl"},this.timerId=null,this.messageRegex=null,this.messageHandlers={},t=t||{},this.onMessage=function(t,e){t in this.messageHandlers||(this.messageHandlers[t]=[]),this.messageHandlers[t].push(e)},this._fire=function(t,e){if(t in this.messageHandlers)for(var i=0;i<this.messageHandlers[t].length;i++)this.messageHandlers[t][i].call(this,e)},this._processMessage=function(t){if(r(t,this.settings)&&"string"==typeof t.data){var e=t.data.match(this.messageRegex);if(e&&3===e.length){var i=e[1],s=e[2];this._fire(i,s)}}}.bind(this),this._onWidthMessage=function(t){var e=parseInt(t);e!==this.parentWidth&&(this.parentWidth=e,this.settings.renderCallback&&this.settings.renderCallback(e),this.sendHeight())},this.sendMessage=function(t,e){window.parent.postMessage(o(this.id,t,e),"*")},this.sendHeight=function(){var t=document.getElementsByTagName("body")[0].offsetHeight.toString();return this.sendMessage("height",t),t}.bind(this),this.getParentPositionInfo=function(){this.sendMessage("parentPositionInfo")},this.scrollParentTo=function(t){this.sendMessage("navigateTo","#"+t)},this.navigateParentTo=function(t){this.sendMessage("navigateTo",t)},this.scrollParentToChildEl=function(t){var e=document.getElementById(t).getBoundingClientRect().top+window.pageYOffset;this.scrollParentToChildPos(e)},this.scrollParentToChildPos=function(t){this.sendMessage("scrollToChildPos",t.toString())};for(var e in this.remove=function(){window.removeEventListener("message",this._processMessage),this.timerId&&clearInterval(this.timerId)},t)this.settings[e]=t[e];this.id=s("childId")||t.id,this.messageRegex=new RegExp("^pym"+a+this.id+a+"(\\S+)"+a+"(.*)$");var i=parseInt(s("initialWidth"));return this.parentUrl=s(this.settings.parenturlparam),this.parentTitle=s("parentTitle"),this.onMessage("width",this._onWidthMessage),window.addEventListener("message",this._processMessage,!1),this.settings.renderCallback&&this.settings.renderCallback(i),this.sendHeight(),this.settings.polling&&(this.timerId=window.setInterval(this.sendHeight,this.settings.polling)),function(t){var e,i=document.getElementsByTagName("html")[0],s=i.className;try{e=window.self!==window.top?"embedded":"not-embedded"}catch(t){e="embedded"}s.indexOf(e)<0&&(i.className=s?s+" "+e:e,t&&t(e),c("marked-embedded"))}(t.onMarkedEmbeddedStatus),this},"undefined"!=typeof document&&u.autoInit(!0),u})},{}],2:[function(t,e,i){t("./modules/main-app.js").init()},{"./modules/main-app.js":4}],3:[function(t,e,i){e.exports=function(){var s,t,e,i,n=[].forEach,a=/^data-(.+)/,r=/\-([a-z])/gi,o=document.createElement("div"),l=!1;function h(){var i={};return n.call(this.attributes,function(t){var e;(s=t.name.match(a))&&(i[(e=s[1],e.replace(r,function(t,e){return e.toUpperCase()}))]=t.value)}),i}null==o.dataset&&(o.addEventListener("DOMAttrModified",function t(){l=!0,this.removeEventListener("DOMAttrModified",t,!1)},!1),o.setAttribute("foo","bar"),t=Element.prototype,e="dataset",i=l?function(){return this._datasetCache||(this._datasetCache=h.call(this)),this._datasetCache}:h,Object.defineProperty?Object.defineProperty(t,e,{get:i}):t.__defineGetter__(e,i),document.addEventListener("DOMAttrModified",function(t){delete t.target._datasetCache},!1))}()},{}],4:[function(t,e,i){e.exports=function(){var e={phSelector:".mkc-placeholder"};t("./dataset-polyfill.js");var o=t("pym.js");function i(e){var t=function(t,e){var i;void 0===t&&(t="");var s=function(t,e){return e<(t=parseInt(t,10).toString(16)).length?t.slice(t.length-e):e>t.length?Array(e-t.length+1).join("0")+t:t};return this.php_js||(this.php_js={}),this.php_js.uniqidSeed||(this.php_js.uniqidSeed=Math.floor(123456789*Math.random())),this.php_js.uniqidSeed++,i=t,i+=s(parseInt((new Date).getTime()/1e3,10),8),i+=s(this.php_js.uniqidSeed,5),e&&(i+=(10*Math.random()).toFixed(8).toString()),i}("mkc-");e.id=t;var i,s,n,a=e.dataset.source,r=new o.Parent(t,(s="https://cartes-elections.makina-corpus.net/",(n={"2015-cantons-et-candidats":{url:"departementales-2015/app/public/"},"2015-resultats-departementales":{url:"departementales-2015/app/public/departement.html"}}[i=a])&&n.url?s+n.url:-1===i.indexOf("_")?s+i+"/":s+i.split("_")[0]+"/"+i.split("_")[1]+".html"),{});r.onMessage("event",function(t){"ready"===t&&(r.sendMessage("data",JSON.stringify(e.dataset)),this.iframe&&this.iframe.setAttribute&&this.iframe.setAttribute("allowfullscreen",""))})}return{init:function(){var t=document.querySelectorAll(e.phSelector);[].forEach.call(t,i)}}}()},{"./dataset-polyfill.js":3,"pym.js":1}]},{},[2]);
//# sourceMappingURL=mkc.js.map
