import{j as g,C as Ur,R as Xr,a as qr,u as Gi,B as Hi,r as z}from"./index-BVKenPga.js";import{P as $i,u as Ki,a as Qi}from"./useSanityProducts-rJ6c8rRK.js";import{C as Zi,P as kr,g as Ji,a as en,b as tn}from"./ProductFilter-kPnTeIyF.js";import"./useDispatch-Bf1ra-Q5.js";function we(o){if(o===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return o}function Gr(o,e){o.prototype=Object.create(e.prototype),o.prototype.constructor=o,o.__proto__=e}/*!
 * GSAP 3.13.0
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var fe={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ze={duration:.5,overwrite:!1,delay:0},nr,Z,F,_e=1e8,j=1/_e,Wt=Math.PI*2,rn=Wt/4,nn=0,Hr=Math.sqrt,sn=Math.cos,an=Math.sin,Q=function(e){return typeof e=="string"},W=function(e){return typeof e=="function"},Te=function(e){return typeof e=="number"},sr=function(e){return typeof e>"u"},be=function(e){return typeof e=="object"},re=function(e){return e!==!1},ar=function(){return typeof window<"u"},xt=function(e){return W(e)||Q(e)},$r=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},ee=Array.isArray,Ut=/(?:-?\.?\d|\.)+/gi,Kr=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Ge=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,jt=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Qr=/[+-]=-?[.\d]+/,Zr=/[^,'"\[\]\s]+/gi,on=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,B,ge,Xt,or,ce={},Tt={},Jr,ei=function(e){return(Tt=Je(e,ce))&&ae},lr=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},ct=function(e,t){return!t&&console.warn(e)},ti=function(e,t){return e&&(ce[e]=t)&&Tt&&(Tt[e]=t)||ce},ht=function(){return 0},ln={suppressEvents:!0,isStart:!0,kill:!1},vt={suppressEvents:!0,kill:!1},un={suppressEvents:!0},ur={},Re=[],qt={},ri,oe={},Et={},Tr=30,wt=[],fr="",cr=function(e){var t=e[0],r,i;if(be(t)||W(t)||(e=[e]),!(r=(t._gsap||{}).harness)){for(i=wt.length;i--&&!wt[i].targetTest(t););r=wt[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new Ci(e[i],r)))||e.splice(i,1);return e},Be=function(e){return e._gsap||cr(pe(e))[0]._gsap},ii=function(e,t,r){return(r=e[t])&&W(r)?e[t]():sr(r)&&e.getAttribute&&e.getAttribute(t)||r},ie=function(e,t){return(e=e.split(",")).forEach(t)||e},q=function(e){return Math.round(e*1e5)/1e5||0},$=function(e){return Math.round(e*1e7)/1e7||0},$e=function(e,t){var r=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),r==="+"?e+i:r==="-"?e-i:r==="*"?e*i:e/i},fn=function(e,t){for(var r=t.length,i=0;e.indexOf(t[i])<0&&++i<r;);return i<r},St=function(){var e=Re.length,t=Re.slice(0),r,i;for(qt={},Re.length=0,r=0;r<e;r++)i=t[r],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},hr=function(e){return!!(e._initted||e._startAt||e.add)},ni=function(e,t,r,i){Re.length&&!Z&&St(),e.render(t,r,!!(Z&&t<0&&hr(e))),Re.length&&!Z&&St()},si=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Zr).length<2?t:Q(e)?e.trim():e},ai=function(e){return e},he=function(e,t){for(var r in t)r in e||(e[r]=t[r]);return e},cn=function(e){return function(t,r){for(var i in r)i in t||i==="duration"&&e||i==="ease"||(t[i]=r[i])}},Je=function(e,t){for(var r in t)e[r]=t[r];return e},Sr=function o(e,t){for(var r in t)r!=="__proto__"&&r!=="constructor"&&r!=="prototype"&&(e[r]=be(t[r])?o(e[r]||(e[r]={}),t[r]):t[r]);return e},Ct=function(e,t){var r={},i;for(i in e)i in t||(r[i]=e[i]);return r},lt=function(e){var t=e.parent||B,r=e.keyframes?cn(ee(e.keyframes)):he;if(re(e.inherit))for(;t;)r(e,t.vars.defaults),t=t.parent||t._dp;return e},hn=function(e,t){for(var r=e.length,i=r===t.length;i&&r--&&e[r]===t[r];);return r<0},oi=function(e,t,r,i,n){var s=e[i],a;if(n)for(a=t[n];s&&s[n]>a;)s=s._prev;return s?(t._next=s._next,s._next=t):(t._next=e[r],e[r]=t),t._next?t._next._prev=t:e[i]=t,t._prev=s,t.parent=t._dp=e,t},Nt=function(e,t,r,i){r===void 0&&(r="_first"),i===void 0&&(i="_last");var n=t._prev,s=t._next;n?n._next=s:e[r]===t&&(e[r]=s),s?s._prev=n:e[i]===t&&(e[i]=n),t._next=t._prev=t.parent=null},Ne=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Ve=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var r=e;r;)r._dirty=1,r=r.parent;return e},dn=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Gt=function(e,t,r,i){return e._startAt&&(Z?e._startAt.revert(vt):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},_n=function o(e){return!e||e._ts&&o(e.parent)},Cr=function(e){return e._repeat?et(e._tTime,e=e.duration()+e._rDelay)*e:0},et=function(e,t){var r=Math.floor(e=$(e/t));return e&&r===e?r-1:r},Pt=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Dt=function(e){return e._end=$(e._start+(e._tDur/Math.abs(e._ts||e._rts||j)||0))},At=function(e,t){var r=e._dp;return r&&r.smoothChildTiming&&e._ts&&(e._start=$(r._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Dt(e),r._dirty||Ve(r,e)),e},li=function(e,t){var r;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(r=Pt(e.rawTime(),t),(!t._dur||yt(0,t.totalDuration(),r)-t._tTime>j)&&t.render(r,!0)),Ve(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(r=e;r._dp;)r.rawTime()>=0&&r.totalTime(r._tTime),r=r._dp;e._zTime=-j}},ye=function(e,t,r,i){return t.parent&&Ne(t),t._start=$((Te(r)?r:r||e!==B?de(e,r,t):e._time)+t._delay),t._end=$(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),oi(e,t,"_first","_last",e._sort?"_start":0),Ht(t)||(e._recent=t),i||li(e,t),e._ts<0&&At(e,e._tTime),e},ui=function(e,t){return(ce.ScrollTrigger||lr("scrollTrigger",t))&&ce.ScrollTrigger.create(t,e)},fi=function(e,t,r,i,n){if(_r(e,t,n),!e._initted)return 1;if(!r&&e._pt&&!Z&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&ri!==le.frame)return Re.push(e),e._lazy=[n,i],1},pn=function o(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||o(t))},Ht=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},mn=function(e,t,r,i){var n=e.ratio,s=t<0||!t&&(!e._start&&pn(e)&&!(!e._initted&&Ht(e))||(e._ts<0||e._dp._ts<0)&&!Ht(e))?0:1,a=e._rDelay,l=0,u,f,h;if(a&&e._repeat&&(l=yt(0,e._tDur,t),f=et(l,a),e._yoyo&&f&1&&(s=1-s),f!==et(e._tTime,a)&&(n=1-s,e.vars.repeatRefresh&&e._initted&&e.invalidate())),s!==n||Z||i||e._zTime===j||!t&&e._zTime){if(!e._initted&&fi(e,t,i,r,l))return;for(h=e._zTime,e._zTime=t||(r?j:0),r||(r=t&&!h),e.ratio=s,e._from&&(s=1-s),e._time=0,e._tTime=l,u=e._pt;u;)u.r(s,u.d),u=u._next;t<0&&Gt(e,t,r,!0),e._onUpdate&&!r&&ue(e,"onUpdate"),l&&e._repeat&&!r&&e.parent&&ue(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===s&&(s&&Ne(e,1),!r&&!Z&&(ue(e,s?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},gn=function(e,t,r){var i;if(r>t)for(i=e._first;i&&i._start<=r;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=r;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},tt=function(e,t,r,i){var n=e._repeat,s=$(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=s/e._dur),e._dur=s,e._tDur=n?n<0?1e10:$(s*(n+1)+e._rDelay*n):s,a>0&&!i&&At(e,e._tTime=e._tDur*a),e.parent&&Dt(e),r||Ve(e.parent,e),e},Pr=function(e){return e instanceof te?Ve(e):tt(e,e._dur)},yn={_start:0,endTime:ht,totalDuration:ht},de=function o(e,t,r){var i=e.labels,n=e._recent||yn,s=e.duration()>=_e?n.endTime(!1):e._dur,a,l,u;return Q(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),u=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?n._start:n.endTime(n._repeat>=0))+(parseFloat(t.substr(1))||0)*(u?(a<0?n:r).totalDuration()/100:1)):a<0?(t in i||(i[t]=s),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),u&&r&&(l=l/100*(ee(r)?r[0]:r).totalDuration()),a>1?o(e,t.substr(0,a-1),r)+l:s+l)):t==null?s:+t},ut=function(e,t,r){var i=Te(t[1]),n=(i?2:1)+(e<2?0:1),s=t[n],a,l;if(i&&(s.duration=t[1]),s.parent=r,e){for(a=s,l=r;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=re(l.vars.inherit)&&l.parent;s.immediateRender=re(a.immediateRender),e<2?s.runBackwards=1:s.startAt=t[n-1]}return new H(t[0],s,t[n+1])},Ae=function(e,t){return e||e===0?t(e):t},yt=function(e,t,r){return r<e?e:r>t?t:r},J=function(e,t){return!Q(e)||!(t=on.exec(e))?"":t[1]},xn=function(e,t,r){return Ae(r,function(i){return yt(e,t,i)})},$t=[].slice,ci=function(e,t){return e&&be(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&be(e[0]))&&!e.nodeType&&e!==ge},bn=function(e,t,r){return r===void 0&&(r=[]),e.forEach(function(i){var n;return Q(i)&&!t||ci(i,1)?(n=r).push.apply(n,pe(i)):r.push(i)})||r},pe=function(e,t,r){return F&&!t&&F.selector?F.selector(e):Q(e)&&!r&&(Xt||!rt())?$t.call((t||or).querySelectorAll(e),0):ee(e)?bn(e,r):ci(e)?$t.call(e,0):e?[e]:[]},Kt=function(e){return e=pe(e)[0]||ct("Invalid scope")||{},function(t){var r=e.current||e.nativeElement||e;return pe(t,r.querySelectorAll?r:r===e?ct("Invalid scope")||or.createElement("div"):e)}},hi=function(e){return e.sort(function(){return .5-Math.random()})},di=function(e){if(W(e))return e;var t=be(e)?e:{each:e},r=Ye(t.ease),i=t.from||0,n=parseFloat(t.base)||0,s={},a=i>0&&i<1,l=isNaN(i)||a,u=t.axis,f=i,h=i;return Q(i)?f=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(f=i[0],h=i[1]),function(_,d,m){var c=(m||t).length,p=s[c],x,b,w,k,y,S,C,P,T;if(!p){if(T=t.grid==="auto"?0:(t.grid||[1,_e])[1],!T){for(C=-_e;C<(C=m[T++].getBoundingClientRect().left)&&T<c;);T<c&&T--}for(p=s[c]=[],x=l?Math.min(T,c)*f-.5:i%T,b=T===_e?0:l?c*h/T-.5:i/T|0,C=0,P=_e,S=0;S<c;S++)w=S%T-x,k=b-(S/T|0),p[S]=y=u?Math.abs(u==="y"?k:w):Hr(w*w+k*k),y>C&&(C=y),y<P&&(P=y);i==="random"&&hi(p),p.max=C-P,p.min=P,p.v=c=(parseFloat(t.amount)||parseFloat(t.each)*(T>c?c-1:u?u==="y"?c/T:T:Math.max(T,c/T))||0)*(i==="edges"?-1:1),p.b=c<0?n-c:n,p.u=J(t.amount||t.each)||0,r=r&&c<0?ki(r):r}return c=(p[_]-p.min)/p.max||0,$(p.b+(r?r(c):c)*p.v)+p.u}},Qt=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(r){var i=$(Math.round(parseFloat(r)/e)*e*t);return(i-i%1)/t+(Te(r)?0:J(r))}},_i=function(e,t){var r=ee(e),i,n;return!r&&be(e)&&(i=r=e.radius||_e,e.values?(e=pe(e.values),(n=!Te(e[0]))&&(i*=i)):e=Qt(e.increment)),Ae(t,r?W(e)?function(s){return n=e(s),Math.abs(n-s)<=i?n:s}:function(s){for(var a=parseFloat(n?s.x:s),l=parseFloat(n?s.y:0),u=_e,f=0,h=e.length,_,d;h--;)n?(_=e[h].x-a,d=e[h].y-l,_=_*_+d*d):_=Math.abs(e[h]-a),_<u&&(u=_,f=h);return f=!i||u<=i?e[f]:s,n||f===s||Te(s)?f:f+J(s)}:Qt(e))},pi=function(e,t,r,i){return Ae(ee(e)?!t:r===!0?!!(r=0):!i,function(){return ee(e)?e[~~(Math.random()*e.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((e-r/2+Math.random()*(t-e+r*.99))/r)*r*i)/i})},vn=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(i){return t.reduce(function(n,s){return s(n)},i)}},wn=function(e,t){return function(r){return e(parseFloat(r))+(t||J(r))}},kn=function(e,t,r){return gi(e,t,0,1,r)},mi=function(e,t,r){return Ae(r,function(i){return e[~~t(i)]})},Tn=function o(e,t,r){var i=t-e;return ee(e)?mi(e,o(0,e.length),t):Ae(r,function(n){return(i+(n-e)%i)%i+e})},Sn=function o(e,t,r){var i=t-e,n=i*2;return ee(e)?mi(e,o(0,e.length-1),t):Ae(r,function(s){return s=(n+(s-e)%n)%n||0,e+(s>i?n-s:s)})},dt=function(e){for(var t=0,r="",i,n,s,a;~(i=e.indexOf("random(",t));)s=e.indexOf(")",i),a=e.charAt(i+7)==="[",n=e.substr(i+7,s-i-7).match(a?Zr:Ut),r+=e.substr(t,i-t)+pi(a?n:+n[0],a?0:+n[1],+n[2]||1e-5),t=s+1;return r+e.substr(t,e.length-t)},gi=function(e,t,r,i,n){var s=t-e,a=i-r;return Ae(n,function(l){return r+((l-e)/s*a||0)})},Cn=function o(e,t,r,i){var n=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!n){var s=Q(e),a={},l,u,f,h,_;if(r===!0&&(i=1)&&(r=null),s)e={p:e},t={p:t};else if(ee(e)&&!ee(t)){for(f=[],h=e.length,_=h-2,u=1;u<h;u++)f.push(o(e[u-1],e[u]));h--,n=function(m){m*=h;var c=Math.min(_,~~m);return f[c](m-c)},r=t}else i||(e=Je(ee(e)?[]:{},e));if(!f){for(l in t)dr.call(a,e,l,"get",t[l]);n=function(m){return gr(m,a)||(s?e.p:e)}}}return Ae(r,n)},Or=function(e,t,r){var i=e.labels,n=_e,s,a,l;for(s in i)a=i[s]-t,a<0==!!r&&a&&n>(a=Math.abs(a))&&(l=s,n=a);return l},ue=function(e,t,r){var i=e.vars,n=i[t],s=F,a=e._ctx,l,u,f;if(n)return l=i[t+"Params"],u=i.callbackScope||e,r&&Re.length&&St(),a&&(F=a),f=l?n.apply(u,l):n.call(u),F=s,f},st=function(e){return Ne(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Z),e.progress()<1&&ue(e,"onInterrupt"),e},He,yi=[],xi=function(e){if(e)if(e=!e.name&&e.default||e,ar()||e.headless){var t=e.name,r=W(e),i=t&&!r&&e.init?function(){this._props=[]}:e,n={init:ht,render:gr,add:dr,kill:Yn,modifier:Vn,rawVars:0},s={targetTest:0,get:0,getSetter:mr,aliases:{},register:0};if(rt(),e!==i){if(oe[t])return;he(i,he(Ct(e,n),s)),Je(i.prototype,Je(n,Ct(e,s))),oe[i.prop=t]=i,e.targetTest&&(wt.push(i),ur[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}ti(t,i),e.register&&e.register(ae,i,ne)}else yi.push(e)},A=255,at={aqua:[0,A,A],lime:[0,A,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,A],navy:[0,0,128],white:[A,A,A],olive:[128,128,0],yellow:[A,A,0],orange:[A,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[A,0,0],pink:[A,192,203],cyan:[0,A,A],transparent:[A,A,A,0]},zt=function(e,t,r){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(r-t)*e*6:e<.5?r:e*3<2?t+(r-t)*(2/3-e)*6:t)*A+.5|0},bi=function(e,t,r){var i=e?Te(e)?[e>>16,e>>8&A,e&A]:0:at.black,n,s,a,l,u,f,h,_,d,m;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),at[e])i=at[e];else if(e.charAt(0)==="#"){if(e.length<6&&(n=e.charAt(1),s=e.charAt(2),a=e.charAt(3),e="#"+n+n+s+s+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&A,i&A,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&A,e&A]}else if(e.substr(0,3)==="hsl"){if(i=m=e.match(Ut),!t)l=+i[0]%360/360,u=+i[1]/100,f=+i[2]/100,s=f<=.5?f*(u+1):f+u-f*u,n=f*2-s,i.length>3&&(i[3]*=1),i[0]=zt(l+1/3,n,s),i[1]=zt(l,n,s),i[2]=zt(l-1/3,n,s);else if(~e.indexOf("="))return i=e.match(Kr),r&&i.length<4&&(i[3]=1),i}else i=e.match(Ut)||at.transparent;i=i.map(Number)}return t&&!m&&(n=i[0]/A,s=i[1]/A,a=i[2]/A,h=Math.max(n,s,a),_=Math.min(n,s,a),f=(h+_)/2,h===_?l=u=0:(d=h-_,u=f>.5?d/(2-h-_):d/(h+_),l=h===n?(s-a)/d+(s<a?6:0):h===s?(a-n)/d+2:(n-s)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(u*100+.5),i[2]=~~(f*100+.5)),r&&i.length<4&&(i[3]=1),i},vi=function(e){var t=[],r=[],i=-1;return e.split(Me).forEach(function(n){var s=n.match(Ge)||[];t.push.apply(t,s),r.push(i+=s.length+1)}),t.c=r,t},Rr=function(e,t,r){var i="",n=(e+i).match(Me),s=t?"hsla(":"rgba(",a=0,l,u,f,h;if(!n)return e;if(n=n.map(function(_){return(_=bi(_,t,1))&&s+(t?_[0]+","+_[1]+"%,"+_[2]+"%,"+_[3]:_.join(","))+")"}),r&&(f=vi(e),l=r.c,l.join(i)!==f.c.join(i)))for(u=e.replace(Me,"1").split(Ge),h=u.length-1;a<h;a++)i+=u[a]+(~l.indexOf(a)?n.shift()||s+"0,0,0,0)":(f.length?f:n.length?n:r).shift());if(!u)for(u=e.split(Me),h=u.length-1;a<h;a++)i+=u[a]+n[a];return i+u[h]},Me=function(){var o="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in at)o+="|"+e+"\\b";return new RegExp(o+")","gi")}(),Pn=/hsl[a]?\(/,wi=function(e){var t=e.join(" "),r;if(Me.lastIndex=0,Me.test(t))return r=Pn.test(t),e[1]=Rr(e[1],r),e[0]=Rr(e[0],r,vi(e[1])),!0},_t,le=function(){var o=Date.now,e=500,t=33,r=o(),i=r,n=1e3/240,s=n,a=[],l,u,f,h,_,d,m=function c(p){var x=o()-i,b=p===!0,w,k,y,S;if((x>e||x<0)&&(r+=x-t),i+=x,y=i-r,w=y-s,(w>0||b)&&(S=++h.frame,_=y-h.time*1e3,h.time=y=y/1e3,s+=w+(w>=n?4:n-w),k=1),b||(l=u(c)),k)for(d=0;d<a.length;d++)a[d](y,_,S,p)};return h={time:0,frame:0,tick:function(){m(!0)},deltaRatio:function(p){return _/(1e3/(p||60))},wake:function(){Jr&&(!Xt&&ar()&&(ge=Xt=window,or=ge.document||{},ce.gsap=ae,(ge.gsapVersions||(ge.gsapVersions=[])).push(ae.version),ei(Tt||ge.GreenSockGlobals||!ge.gsap&&ge||{}),yi.forEach(xi)),f=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),u=f||function(p){return setTimeout(p,s-h.time*1e3+1|0)},_t=1,m(2))},sleep:function(){(f?cancelAnimationFrame:clearTimeout)(l),_t=0,u=ht},lagSmoothing:function(p,x){e=p||1/0,t=Math.min(x||33,e)},fps:function(p){n=1e3/(p||240),s=h.time*1e3+n},add:function(p,x,b){var w=x?function(k,y,S,C){p(k,y,S,C),h.remove(w)}:p;return h.remove(p),a[b?"unshift":"push"](w),rt(),w},remove:function(p,x){~(x=a.indexOf(p))&&a.splice(x,1)&&d>=x&&d--},_listeners:a},h}(),rt=function(){return!_t&&le.wake()},R={},On=/^[\d.\-M][\d.\-,\s]/,Rn=/["']/g,Mn=function(e){for(var t={},r=e.substr(1,e.length-3).split(":"),i=r[0],n=1,s=r.length,a,l,u;n<s;n++)l=r[n],a=n!==s-1?l.lastIndexOf(","):l.length,u=l.substr(0,a),t[i]=isNaN(u)?u.replace(Rn,"").trim():+u,i=l.substr(a+1).trim();return t},Nn=function(e){var t=e.indexOf("(")+1,r=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<r?e.indexOf(")",r+1):r)},Dn=function(e){var t=(e+"").split("("),r=R[t[0]];return r&&t.length>1&&r.config?r.config.apply(null,~e.indexOf("{")?[Mn(t[1])]:Nn(e).split(",").map(si)):R._CE&&On.test(e)?R._CE("",e):r},ki=function(e){return function(t){return 1-e(1-t)}},Ti=function o(e,t){for(var r=e._first,i;r;)r instanceof te?o(r,t):r.vars.yoyoEase&&(!r._yoyo||!r._repeat)&&r._yoyo!==t&&(r.timeline?o(r.timeline,t):(i=r._ease,r._ease=r._yEase,r._yEase=i,r._yoyo=t)),r=r._next},Ye=function(e,t){return e&&(W(e)?e:R[e]||Dn(e))||t},Xe=function(e,t,r,i){r===void 0&&(r=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var n={easeIn:t,easeOut:r,easeInOut:i},s;return ie(e,function(a){R[a]=ce[a]=n,R[s=a.toLowerCase()]=r;for(var l in n)R[s+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=R[a+"."+l]=n[l]}),n},Si=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Ft=function o(e,t,r){var i=t>=1?t:1,n=(r||(e?.3:.45))/(t<1?t:1),s=n/Wt*(Math.asin(1/i)||0),a=function(f){return f===1?1:i*Math.pow(2,-10*f)*an((f-s)*n)+1},l=e==="out"?a:e==="in"?function(u){return 1-a(1-u)}:Si(a);return n=Wt/n,l.config=function(u,f){return o(e,u,f)},l},Lt=function o(e,t){t===void 0&&(t=1.70158);var r=function(s){return s?--s*s*((t+1)*s+t)+1:0},i=e==="out"?r:e==="in"?function(n){return 1-r(1-n)}:Si(r);return i.config=function(n){return o(e,n)},i};ie("Linear,Quad,Cubic,Quart,Quint,Strong",function(o,e){var t=e<5?e+1:e;Xe(o+",Power"+(t-1),e?function(r){return Math.pow(r,t)}:function(r){return r},function(r){return 1-Math.pow(1-r,t)},function(r){return r<.5?Math.pow(r*2,t)/2:1-Math.pow((1-r)*2,t)/2})});R.Linear.easeNone=R.none=R.Linear.easeIn;Xe("Elastic",Ft("in"),Ft("out"),Ft());(function(o,e){var t=1/e,r=2*t,i=2.5*t,n=function(a){return a<t?o*a*a:a<r?o*Math.pow(a-1.5/e,2)+.75:a<i?o*(a-=2.25/e)*a+.9375:o*Math.pow(a-2.625/e,2)+.984375};Xe("Bounce",function(s){return 1-n(1-s)},n)})(7.5625,2.75);Xe("Expo",function(o){return Math.pow(2,10*(o-1))*o+o*o*o*o*o*o*(1-o)});Xe("Circ",function(o){return-(Hr(1-o*o)-1)});Xe("Sine",function(o){return o===1?1:-sn(o*rn)+1});Xe("Back",Lt("in"),Lt("out"),Lt());R.SteppedEase=R.steps=ce.SteppedEase={config:function(e,t){e===void 0&&(e=1);var r=1/e,i=e+(t?0:1),n=t?1:0,s=1-j;return function(a){return((i*yt(0,s,a)|0)+n)*r}}};Ze.ease=R["quad.out"];ie("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(o){return fr+=o+","+o+"Params,"});var Ci=function(e,t){this.id=nn++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:ii,this.set=t?t.getSetter:mr},pt=function(){function o(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,tt(this,+t.duration,1,1),this.data=t.data,F&&(this._ctx=F,F.data.push(this)),_t||le.wake()}var e=o.prototype;return e.delay=function(r){return r||r===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+r-this._delay),this._delay=r,this):this._delay},e.duration=function(r){return arguments.length?this.totalDuration(this._repeat>0?r+(r+this._rDelay)*this._repeat:r):this.totalDuration()&&this._dur},e.totalDuration=function(r){return arguments.length?(this._dirty=0,tt(this,this._repeat<0?r:(r-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(r,i){if(rt(),!arguments.length)return this._tTime;var n=this._dp;if(n&&n.smoothChildTiming&&this._ts){for(At(this,r),!n._dp||n.parent||li(n,this);n&&n.parent;)n.parent._time!==n._start+(n._ts>=0?n._tTime/n._ts:(n.totalDuration()-n._tTime)/-n._ts)&&n.totalTime(n._tTime,!0),n=n.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&r<this._tDur||this._ts<0&&r>0||!this._tDur&&!r)&&ye(this._dp,this,this._start-this._delay)}return(this._tTime!==r||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===j||!r&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=r),ni(this,r,i)),this},e.time=function(r,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),r+Cr(this))%(this._dur+this._rDelay)||(r?this._dur:0),i):this._time},e.totalProgress=function(r,i){return arguments.length?this.totalTime(this.totalDuration()*r,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(r,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-r:r)+Cr(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(r,i){var n=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(r-1)*n,i):this._repeat?et(this._tTime,n)+1:1},e.timeScale=function(r,i){if(!arguments.length)return this._rts===-j?0:this._rts;if(this._rts===r)return this;var n=this.parent&&this._ts?Pt(this.parent._time,this):this._tTime;return this._rts=+r||0,this._ts=this._ps||r===-j?0:this._rts,this.totalTime(yt(-Math.abs(this._delay),this.totalDuration(),n),i!==!1),Dt(this),dn(this)},e.paused=function(r){return arguments.length?(this._ps!==r&&(this._ps=r,r?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(rt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==j&&(this._tTime-=j)))),this):this._ps},e.startTime=function(r){if(arguments.length){this._start=r;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&ye(i,this,r-this._delay),this}return this._start},e.endTime=function(r){return this._start+(re(r)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(r){var i=this.parent||this._dp;return i?r&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Pt(i.rawTime(r),this):this._tTime:this._tTime},e.revert=function(r){r===void 0&&(r=un);var i=Z;return Z=r,hr(this)&&(this.timeline&&this.timeline.revert(r),this.totalTime(-.01,r.suppressEvents)),this.data!=="nested"&&r.kill!==!1&&this.kill(),Z=i,this},e.globalTime=function(r){for(var i=this,n=arguments.length?r:i.rawTime();i;)n=i._start+n/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(r):n},e.repeat=function(r){return arguments.length?(this._repeat=r===1/0?-2:r,Pr(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(r){if(arguments.length){var i=this._time;return this._rDelay=r,Pr(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(r){return arguments.length?(this._yoyo=r,this):this._yoyo},e.seek=function(r,i){return this.totalTime(de(this,r),re(i))},e.restart=function(r,i){return this.play().totalTime(r?-this._delay:0,re(i)),this._dur||(this._zTime=-j),this},e.play=function(r,i){return r!=null&&this.seek(r,i),this.reversed(!1).paused(!1)},e.reverse=function(r,i){return r!=null&&this.seek(r||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(r,i){return r!=null&&this.seek(r,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(r){return arguments.length?(!!r!==this.reversed()&&this.timeScale(-this._rts||(r?-j:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-j,this},e.isActive=function(){var r=this.parent||this._dp,i=this._start,n;return!!(!r||this._ts&&this._initted&&r.isActive()&&(n=r.rawTime(!0))>=i&&n<this.endTime(!0)-j)},e.eventCallback=function(r,i,n){var s=this.vars;return arguments.length>1?(i?(s[r]=i,n&&(s[r+"Params"]=n),r==="onUpdate"&&(this._onUpdate=i)):delete s[r],this):s[r]},e.then=function(r){var i=this;return new Promise(function(n){var s=W(r)?r:ai,a=function(){var u=i.then;i.then=null,W(s)&&(s=s(i))&&(s.then||s===i)&&(i.then=u),n(s),i.then=u};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){st(this)},o}();he(pt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-j,_prom:0,_ps:!1,_rts:1});var te=function(o){Gr(e,o);function e(r,i){var n;return r===void 0&&(r={}),n=o.call(this,r)||this,n.labels={},n.smoothChildTiming=!!r.smoothChildTiming,n.autoRemoveChildren=!!r.autoRemoveChildren,n._sort=re(r.sortChildren),B&&ye(r.parent||B,we(n),i),r.reversed&&n.reverse(),r.paused&&n.paused(!0),r.scrollTrigger&&ui(we(n),r.scrollTrigger),n}var t=e.prototype;return t.to=function(i,n,s){return ut(0,arguments,this),this},t.from=function(i,n,s){return ut(1,arguments,this),this},t.fromTo=function(i,n,s,a){return ut(2,arguments,this),this},t.set=function(i,n,s){return n.duration=0,n.parent=this,lt(n).repeatDelay||(n.repeat=0),n.immediateRender=!!n.immediateRender,new H(i,n,de(this,s),1),this},t.call=function(i,n,s){return ye(this,H.delayedCall(0,i,n),s)},t.staggerTo=function(i,n,s,a,l,u,f){return s.duration=n,s.stagger=s.stagger||a,s.onComplete=u,s.onCompleteParams=f,s.parent=this,new H(i,s,de(this,l)),this},t.staggerFrom=function(i,n,s,a,l,u,f){return s.runBackwards=1,lt(s).immediateRender=re(s.immediateRender),this.staggerTo(i,n,s,a,l,u,f)},t.staggerFromTo=function(i,n,s,a,l,u,f,h){return a.startAt=s,lt(a).immediateRender=re(a.immediateRender),this.staggerTo(i,n,a,l,u,f,h)},t.render=function(i,n,s){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,u=this._dur,f=i<=0?0:$(i),h=this._zTime<0!=i<0&&(this._initted||!u),_,d,m,c,p,x,b,w,k,y,S,C;if(this!==B&&f>l&&i>=0&&(f=l),f!==this._tTime||s||h){if(a!==this._time&&u&&(f+=this._time-a,i+=this._time-a),_=f,k=this._start,w=this._ts,x=!w,h&&(u||(a=this._zTime),(i||!n)&&(this._zTime=i)),this._repeat){if(S=this._yoyo,p=u+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,n,s);if(_=$(f%p),f===l?(c=this._repeat,_=u):(y=$(f/p),c=~~y,c&&c===y&&(_=u,c--),_>u&&(_=u)),y=et(this._tTime,p),!a&&this._tTime&&y!==c&&this._tTime-y*p-this._dur<=0&&(y=c),S&&c&1&&(_=u-_,C=1),c!==y&&!this._lock){var P=S&&y&1,T=P===(S&&c&1);if(c<y&&(P=!P),a=P?0:f%u?u:f,this._lock=1,this.render(a||(C?0:$(c*p)),n,!u)._lock=0,this._tTime=f,!n&&this.parent&&ue(this,"onRepeat"),this.vars.repeatRefresh&&!C&&(this.invalidate()._lock=1),a&&a!==this._time||x!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(u=this._dur,l=this._tDur,T&&(this._lock=2,a=P?u:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!C&&this.invalidate()),this._lock=0,!this._ts&&!x)return this;Ti(this,C)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=gn(this,$(a),$(_)),b&&(f-=_-(_=b._start))),this._tTime=f,this._time=_,this._act=!w,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!n&&!y&&(ue(this,"onStart"),this._tTime!==f))return this;if(_>=a&&i>=0)for(d=this._first;d;){if(m=d._next,(d._act||_>=d._start)&&d._ts&&b!==d){if(d.parent!==this)return this.render(i,n,s);if(d.render(d._ts>0?(_-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(_-d._start)*d._ts,n,s),_!==this._time||!this._ts&&!x){b=0,m&&(f+=this._zTime=-j);break}}d=m}else{d=this._last;for(var M=i<0?i:_;d;){if(m=d._prev,(d._act||M<=d._end)&&d._ts&&b!==d){if(d.parent!==this)return this.render(i,n,s);if(d.render(d._ts>0?(M-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(M-d._start)*d._ts,n,s||Z&&hr(d)),_!==this._time||!this._ts&&!x){b=0,m&&(f+=this._zTime=M?-j:j);break}}d=m}}if(b&&!n&&(this.pause(),b.render(_>=a?0:-j)._zTime=_>=a?1:-1,this._ts))return this._start=k,Dt(this),this.render(i,n,s);this._onUpdate&&!n&&ue(this,"onUpdate",!0),(f===l&&this._tTime>=this.totalDuration()||!f&&a)&&(k===this._start||Math.abs(w)!==Math.abs(this._ts))&&(this._lock||((i||!u)&&(f===l&&this._ts>0||!f&&this._ts<0)&&Ne(this,1),!n&&!(i<0&&!a)&&(f||a||!l)&&(ue(this,f===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(f<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,n){var s=this;if(Te(n)||(n=de(this,n,i)),!(i instanceof pt)){if(ee(i))return i.forEach(function(a){return s.add(a,n)}),this;if(Q(i))return this.addLabel(i,n);if(W(i))i=H.delayedCall(0,i);else return this}return this!==i?ye(this,i,n):this},t.getChildren=function(i,n,s,a){i===void 0&&(i=!0),n===void 0&&(n=!0),s===void 0&&(s=!0),a===void 0&&(a=-_e);for(var l=[],u=this._first;u;)u._start>=a&&(u instanceof H?n&&l.push(u):(s&&l.push(u),i&&l.push.apply(l,u.getChildren(!0,n,s)))),u=u._next;return l},t.getById=function(i){for(var n=this.getChildren(1,1,1),s=n.length;s--;)if(n[s].vars.id===i)return n[s]},t.remove=function(i){return Q(i)?this.removeLabel(i):W(i)?this.killTweensOf(i):(i.parent===this&&Nt(this,i),i===this._recent&&(this._recent=this._last),Ve(this))},t.totalTime=function(i,n){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=$(le.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),o.prototype.totalTime.call(this,i,n),this._forcing=0,this):this._tTime},t.addLabel=function(i,n){return this.labels[i]=de(this,n),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,n,s){var a=H.delayedCall(0,n||ht,s);return a.data="isPause",this._hasPause=1,ye(this,a,de(this,i))},t.removePause=function(i){var n=this._first;for(i=de(this,i);n;)n._start===i&&n.data==="isPause"&&Ne(n),n=n._next},t.killTweensOf=function(i,n,s){for(var a=this.getTweensOf(i,s),l=a.length;l--;)Ce!==a[l]&&a[l].kill(i,n);return this},t.getTweensOf=function(i,n){for(var s=[],a=pe(i),l=this._first,u=Te(n),f;l;)l instanceof H?fn(l._targets,a)&&(u?(!Ce||l._initted&&l._ts)&&l.globalTime(0)<=n&&l.globalTime(l.totalDuration())>n:!n||l.isActive())&&s.push(l):(f=l.getTweensOf(a,n)).length&&s.push.apply(s,f),l=l._next;return s},t.tweenTo=function(i,n){n=n||{};var s=this,a=de(s,i),l=n,u=l.startAt,f=l.onStart,h=l.onStartParams,_=l.immediateRender,d,m=H.to(s,he({ease:n.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:n.duration||Math.abs((a-(u&&"time"in u?u.time:s._time))/s.timeScale())||j,onStart:function(){if(s.pause(),!d){var p=n.duration||Math.abs((a-(u&&"time"in u?u.time:s._time))/s.timeScale());m._dur!==p&&tt(m,p,0,1).render(m._time,!0,!0),d=1}f&&f.apply(m,h||[])}},n));return _?m.render(0):m},t.tweenFromTo=function(i,n,s){return this.tweenTo(n,he({startAt:{time:de(this,i)}},s))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Or(this,de(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Or(this,de(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+j)},t.shiftChildren=function(i,n,s){s===void 0&&(s=0);for(var a=this._first,l=this.labels,u;a;)a._start>=s&&(a._start+=i,a._end+=i),a=a._next;if(n)for(u in l)l[u]>=s&&(l[u]+=i);return Ve(this)},t.invalidate=function(i){var n=this._first;for(this._lock=0;n;)n.invalidate(i),n=n._next;return o.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var n=this._first,s;n;)s=n._next,this.remove(n),n=s;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Ve(this)},t.totalDuration=function(i){var n=0,s=this,a=s._last,l=_e,u,f,h;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-i:i));if(s._dirty){for(h=s.parent;a;)u=a._prev,a._dirty&&a.totalDuration(),f=a._start,f>l&&s._sort&&a._ts&&!s._lock?(s._lock=1,ye(s,a,f-a._delay,1)._lock=0):l=f,f<0&&a._ts&&(n-=f,(!h&&!s._dp||h&&h.smoothChildTiming)&&(s._start+=f/s._ts,s._time-=f,s._tTime-=f),s.shiftChildren(-f,!1,-1/0),l=0),a._end>n&&a._ts&&(n=a._end),a=u;tt(s,s===B&&s._time>n?s._time:n,1,1),s._dirty=0}return s._tDur},e.updateRoot=function(i){if(B._ts&&(ni(B,Pt(i,B)),ri=le.frame),le.frame>=Tr){Tr+=fe.autoSleep||120;var n=B._first;if((!n||!n._ts)&&fe.autoSleep&&le._listeners.length<2){for(;n&&!n._ts;)n=n._next;n||le.sleep()}}},e}(pt);he(te.prototype,{_lock:0,_hasPause:0,_forcing:0});var An=function(e,t,r,i,n,s,a){var l=new ne(this._pt,e,t,0,1,Di,null,n),u=0,f=0,h,_,d,m,c,p,x,b;for(l.b=r,l.e=i,r+="",i+="",(x=~i.indexOf("random("))&&(i=dt(i)),s&&(b=[r,i],s(b,e,t),r=b[0],i=b[1]),_=r.match(jt)||[];h=jt.exec(i);)m=h[0],c=i.substring(u,h.index),d?d=(d+1)%5:c.substr(-5)==="rgba("&&(d=1),m!==_[f++]&&(p=parseFloat(_[f-1])||0,l._pt={_next:l._pt,p:c||f===1?c:",",s:p,c:m.charAt(1)==="="?$e(p,m)-p:parseFloat(m)-p,m:d&&d<4?Math.round:0},u=jt.lastIndex);return l.c=u<i.length?i.substring(u,i.length):"",l.fp=a,(Qr.test(i)||x)&&(l.e=0),this._pt=l,l},dr=function(e,t,r,i,n,s,a,l,u,f){W(i)&&(i=i(n||0,e,s));var h=e[t],_=r!=="get"?r:W(h)?u?e[t.indexOf("set")||!W(e["get"+t.substr(3)])?t:"get"+t.substr(3)](u):e[t]():h,d=W(h)?u?Ln:Mi:pr,m;if(Q(i)&&(~i.indexOf("random(")&&(i=dt(i)),i.charAt(1)==="="&&(m=$e(_,i)+(J(_)||0),(m||m===0)&&(i=m))),!f||_!==i||Zt)return!isNaN(_*i)&&i!==""?(m=new ne(this._pt,e,t,+_||0,i-(_||0),typeof h=="boolean"?Bn:Ni,0,d),u&&(m.fp=u),a&&m.modifier(a,this,e),this._pt=m):(!h&&!(t in e)&&lr(t,i),An.call(this,e,t,_,i,d,l||fe.stringFilter,u))},jn=function(e,t,r,i,n){if(W(e)&&(e=ft(e,n,t,r,i)),!be(e)||e.style&&e.nodeType||ee(e)||$r(e))return Q(e)?ft(e,n,t,r,i):e;var s={},a;for(a in e)s[a]=ft(e[a],n,t,r,i);return s},Pi=function(e,t,r,i,n,s){var a,l,u,f;if(oe[e]&&(a=new oe[e]).init(n,a.rawVars?t[e]:jn(t[e],i,n,s,r),r,i,s)!==!1&&(r._pt=l=new ne(r._pt,n,e,0,1,a.render,a,0,a.priority),r!==He))for(u=r._ptLookup[r._targets.indexOf(n)],f=a._props.length;f--;)u[a._props[f]]=l;return a},Ce,Zt,_r=function o(e,t,r){var i=e.vars,n=i.ease,s=i.startAt,a=i.immediateRender,l=i.lazy,u=i.onUpdate,f=i.runBackwards,h=i.yoyoEase,_=i.keyframes,d=i.autoRevert,m=e._dur,c=e._startAt,p=e._targets,x=e.parent,b=x&&x.data==="nested"?x.vars.targets:p,w=e._overwrite==="auto"&&!nr,k=e.timeline,y,S,C,P,T,M,E,D,N,U,Y,L,G;if(k&&(!_||!n)&&(n="none"),e._ease=Ye(n,Ze.ease),e._yEase=h?ki(Ye(h===!0?n:h,Ze.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!k&&!!i.runBackwards,!k||_&&!i.stagger){if(D=p[0]?Be(p[0]).harness:0,L=D&&i[D.prop],y=Ct(i,ur),c&&(c._zTime<0&&c.progress(1),t<0&&f&&a&&!d?c.render(-1,!0):c.revert(f&&m?vt:ln),c._lazy=0),s){if(Ne(e._startAt=H.set(p,he({data:"isStart",overwrite:!1,parent:x,immediateRender:!0,lazy:!c&&re(l),startAt:null,delay:0,onUpdate:u&&function(){return ue(e,"onUpdate")},stagger:0},s))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Z||!a&&!d)&&e._startAt.revert(vt),a&&m&&t<=0&&r<=0){t&&(e._zTime=t);return}}else if(f&&m&&!c){if(t&&(a=!1),C=he({overwrite:!1,data:"isFromStart",lazy:a&&!c&&re(l),immediateRender:a,stagger:0,parent:x},y),L&&(C[D.prop]=L),Ne(e._startAt=H.set(p,C)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Z?e._startAt.revert(vt):e._startAt.render(-1,!0)),e._zTime=t,!a)o(e._startAt,j,j);else if(!t)return}for(e._pt=e._ptCache=0,l=m&&re(l)||l&&!m,S=0;S<p.length;S++){if(T=p[S],E=T._gsap||cr(p)[S]._gsap,e._ptLookup[S]=U={},qt[E.id]&&Re.length&&St(),Y=b===p?S:b.indexOf(T),D&&(N=new D).init(T,L||y,e,Y,b)!==!1&&(e._pt=P=new ne(e._pt,T,N.name,0,1,N.render,N,0,N.priority),N._props.forEach(function(v){U[v]=P}),N.priority&&(M=1)),!D||L)for(C in y)oe[C]&&(N=Pi(C,y,e,Y,T,b))?N.priority&&(M=1):U[C]=P=dr.call(e,T,C,"get",y[C],Y,b,0,i.stringFilter);e._op&&e._op[S]&&e.kill(T,e._op[S]),w&&e._pt&&(Ce=e,B.killTweensOf(T,U,e.globalTime(t)),G=!e.parent,Ce=0),e._pt&&l&&(qt[E.id]=1)}M&&Ai(e),e._onInit&&e._onInit(e)}e._onUpdate=u,e._initted=(!e._op||e._pt)&&!G,_&&t<=0&&k.render(_e,!0,!0)},En=function(e,t,r,i,n,s,a,l){var u=(e._pt&&e._ptCache||(e._ptCache={}))[t],f,h,_,d;if(!u)for(u=e._ptCache[t]=[],_=e._ptLookup,d=e._targets.length;d--;){if(f=_[d][t],f&&f.d&&f.d._pt)for(f=f.d._pt;f&&f.p!==t&&f.fp!==t;)f=f._next;if(!f)return Zt=1,e.vars[t]="+=0",_r(e,a),Zt=0,l?ct(t+" not eligible for reset"):1;u.push(f)}for(d=u.length;d--;)h=u[d],f=h._pt||h,f.s=(i||i===0)&&!n?i:f.s+(i||0)+s*f.c,f.c=r-f.s,h.e&&(h.e=q(r)+J(h.e)),h.b&&(h.b=f.s+J(h.b))},zn=function(e,t){var r=e[0]?Be(e[0]).harness:0,i=r&&r.aliases,n,s,a,l;if(!i)return t;n=Je({},t);for(s in i)if(s in n)for(l=i[s].split(","),a=l.length;a--;)n[l[a]]=n[s];return n},Fn=function(e,t,r,i){var n=t.ease||i||"power1.inOut",s,a;if(ee(t))a=r[e]||(r[e]=[]),t.forEach(function(l,u){return a.push({t:u/(t.length-1)*100,v:l,e:n})});else for(s in t)a=r[s]||(r[s]=[]),s==="ease"||a.push({t:parseFloat(e),v:t[s],e:n})},ft=function(e,t,r,i,n){return W(e)?e.call(t,r,i,n):Q(e)&&~e.indexOf("random(")?dt(e):e},Oi=fr+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Ri={};ie(Oi+",id,stagger,delay,duration,paused,scrollTrigger",function(o){return Ri[o]=1});var H=function(o){Gr(e,o);function e(r,i,n,s){var a;typeof i=="number"&&(n.duration=i,i=n,n=null),a=o.call(this,s?i:lt(i))||this;var l=a.vars,u=l.duration,f=l.delay,h=l.immediateRender,_=l.stagger,d=l.overwrite,m=l.keyframes,c=l.defaults,p=l.scrollTrigger,x=l.yoyoEase,b=i.parent||B,w=(ee(r)||$r(r)?Te(r[0]):"length"in i)?[r]:pe(r),k,y,S,C,P,T,M,E;if(a._targets=w.length?cr(w):ct("GSAP target "+r+" not found. https://gsap.com",!fe.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,m||_||xt(u)||xt(f)){if(i=a.vars,k=a.timeline=new te({data:"nested",defaults:c||{},targets:b&&b.data==="nested"?b.vars.targets:w}),k.kill(),k.parent=k._dp=we(a),k._start=0,_||xt(u)||xt(f)){if(C=w.length,M=_&&di(_),be(_))for(P in _)~Oi.indexOf(P)&&(E||(E={}),E[P]=_[P]);for(y=0;y<C;y++)S=Ct(i,Ri),S.stagger=0,x&&(S.yoyoEase=x),E&&Je(S,E),T=w[y],S.duration=+ft(u,we(a),y,T,w),S.delay=(+ft(f,we(a),y,T,w)||0)-a._delay,!_&&C===1&&S.delay&&(a._delay=f=S.delay,a._start+=f,S.delay=0),k.to(T,S,M?M(y,T,w):0),k._ease=R.none;k.duration()?u=f=0:a.timeline=0}else if(m){lt(he(k.vars.defaults,{ease:"none"})),k._ease=Ye(m.ease||i.ease||"none");var D=0,N,U,Y;if(ee(m))m.forEach(function(L){return k.to(w,L,">")}),k.duration();else{S={};for(P in m)P==="ease"||P==="easeEach"||Fn(P,m[P],S,m.easeEach);for(P in S)for(N=S[P].sort(function(L,G){return L.t-G.t}),D=0,y=0;y<N.length;y++)U=N[y],Y={ease:U.e,duration:(U.t-(y?N[y-1].t:0))/100*u},Y[P]=U.v,k.to(w,Y,D),D+=Y.duration;k.duration()<u&&k.to({},{duration:u-k.duration()})}}u||a.duration(u=k.duration())}else a.timeline=0;return d===!0&&!nr&&(Ce=we(a),B.killTweensOf(w),Ce=0),ye(b,we(a),n),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!u&&!m&&a._start===$(b._time)&&re(h)&&_n(we(a))&&b.data!=="nested")&&(a._tTime=-j,a.render(Math.max(0,-f)||0)),p&&ui(we(a),p),a}var t=e.prototype;return t.render=function(i,n,s){var a=this._time,l=this._tDur,u=this._dur,f=i<0,h=i>l-j&&!f?l:i<j?0:i,_,d,m,c,p,x,b,w,k;if(!u)mn(this,i,n,s);else if(h!==this._tTime||!i||s||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==f||this._lazy){if(_=h,w=this.timeline,this._repeat){if(c=u+this._rDelay,this._repeat<-1&&f)return this.totalTime(c*100+i,n,s);if(_=$(h%c),h===l?(m=this._repeat,_=u):(p=$(h/c),m=~~p,m&&m===p?(_=u,m--):_>u&&(_=u)),x=this._yoyo&&m&1,x&&(k=this._yEase,_=u-_),p=et(this._tTime,c),_===a&&!s&&this._initted&&m===p)return this._tTime=h,this;m!==p&&(w&&this._yEase&&Ti(w,x),this.vars.repeatRefresh&&!x&&!this._lock&&_!==c&&this._initted&&(this._lock=s=1,this.render($(c*m),!0).invalidate()._lock=0))}if(!this._initted){if(fi(this,f?i:_,s,n,h))return this._tTime=0,this;if(a!==this._time&&!(s&&this.vars.repeatRefresh&&m!==p))return this;if(u!==this._dur)return this.render(i,n,s)}if(this._tTime=h,this._time=_,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(k||this._ease)(_/u),this._from&&(this.ratio=b=1-b),!a&&h&&!n&&!p&&(ue(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(b,d.d),d=d._next;w&&w.render(i<0?i:w._dur*w._ease(_/this._dur),n,s)||this._startAt&&(this._zTime=i),this._onUpdate&&!n&&(f&&Gt(this,i,n,s),ue(this,"onUpdate")),this._repeat&&m!==p&&this.vars.onRepeat&&!n&&this.parent&&ue(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(f&&!this._onUpdate&&Gt(this,i,!0,!0),(i||!u)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Ne(this,1),!n&&!(f&&!a)&&(h||a||x)&&(ue(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),o.prototype.invalidate.call(this,i)},t.resetTo=function(i,n,s,a,l){_t||le.wake(),this._ts||this.play();var u=Math.min(this._dur,(this._dp._time-this._start)*this._ts),f;return this._initted||_r(this,u),f=this._ease(u/this._dur),En(this,i,n,s,a,f,u,l)?this.resetTo(i,n,s,a,1):(At(this,0),this.parent||oi(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,n){if(n===void 0&&(n="all"),!i&&(!n||n==="all"))return this._lazy=this._pt=0,this.parent?st(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Z),this;if(this.timeline){var s=this.timeline.totalDuration();return this.timeline.killTweensOf(i,n,Ce&&Ce.vars.overwrite!==!0)._first||st(this),this.parent&&s!==this.timeline.totalDuration()&&tt(this,this._dur*this.timeline._tDur/s,0,1),this}var a=this._targets,l=i?pe(i):a,u=this._ptLookup,f=this._pt,h,_,d,m,c,p,x;if((!n||n==="all")&&hn(a,l))return n==="all"&&(this._pt=0),st(this);for(h=this._op=this._op||[],n!=="all"&&(Q(n)&&(c={},ie(n,function(b){return c[b]=1}),n=c),n=zn(a,n)),x=a.length;x--;)if(~l.indexOf(a[x])){_=u[x],n==="all"?(h[x]=n,m=_,d={}):(d=h[x]=h[x]||{},m=n);for(c in m)p=_&&_[c],p&&((!("kill"in p.d)||p.d.kill(c)===!0)&&Nt(this,p,"_pt"),delete _[c]),d!=="all"&&(d[c]=1)}return this._initted&&!this._pt&&f&&st(this),this},e.to=function(i,n){return new e(i,n,arguments[2])},e.from=function(i,n){return ut(1,arguments)},e.delayedCall=function(i,n,s,a){return new e(n,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:n,onReverseComplete:n,onCompleteParams:s,onReverseCompleteParams:s,callbackScope:a})},e.fromTo=function(i,n,s){return ut(2,arguments)},e.set=function(i,n){return n.duration=0,n.repeatDelay||(n.repeat=0),new e(i,n)},e.killTweensOf=function(i,n,s){return B.killTweensOf(i,n,s)},e}(pt);he(H.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ie("staggerTo,staggerFrom,staggerFromTo",function(o){H[o]=function(){var e=new te,t=$t.call(arguments,0);return t.splice(o==="staggerFromTo"?5:4,0,0),e[o].apply(e,t)}});var pr=function(e,t,r){return e[t]=r},Mi=function(e,t,r){return e[t](r)},Ln=function(e,t,r,i){return e[t](i.fp,r)},In=function(e,t,r){return e.setAttribute(t,r)},mr=function(e,t){return W(e[t])?Mi:sr(e[t])&&e.setAttribute?In:pr},Ni=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},Bn=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Di=function(e,t){var r=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*e):Math.round((r.s+r.c*e)*1e4)/1e4)+i,r=r._next;i+=t.c}t.set(t.t,t.p,i,t)},gr=function(e,t){for(var r=t._pt;r;)r.r(e,r.d),r=r._next},Vn=function(e,t,r,i){for(var n=this._pt,s;n;)s=n._next,n.p===i&&n.modifier(e,t,r),n=s},Yn=function(e){for(var t=this._pt,r,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Nt(this,t,"_pt"):t.dep||(r=1),t=i;return!r},Wn=function(e,t,r,i){i.mSet(e,t,i.m.call(i.tween,r,i.mt),i)},Ai=function(e){for(var t=e._pt,r,i,n,s;t;){for(r=t._next,i=n;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:s)?t._prev._next=t:n=t,(t._next=i)?i._prev=t:s=t,t=r}e._pt=n},ne=function(){function o(t,r,i,n,s,a,l,u,f){this.t=r,this.s=n,this.c=s,this.p=i,this.r=a||Ni,this.d=l||this,this.set=u||pr,this.pr=f||0,this._next=t,t&&(t._prev=this)}var e=o.prototype;return e.modifier=function(r,i,n){this.mSet=this.mSet||this.set,this.set=Wn,this.m=r,this.mt=n,this.tween=i},o}();ie(fr+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(o){return ur[o]=1});ce.TweenMax=ce.TweenLite=H;ce.TimelineLite=ce.TimelineMax=te;B=new te({sortChildren:!1,defaults:Ze,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});fe.stringFilter=wi;var We=[],kt={},Un=[],Mr=0,Xn=0,It=function(e){return(kt[e]||Un).map(function(t){return t()})},Jt=function(){var e=Date.now(),t=[];e-Mr>2&&(It("matchMediaInit"),We.forEach(function(r){var i=r.queries,n=r.conditions,s,a,l,u;for(a in i)s=ge.matchMedia(i[a]).matches,s&&(l=1),s!==n[a]&&(n[a]=s,u=1);u&&(r.revert(),l&&t.push(r))}),It("matchMediaRevert"),t.forEach(function(r){return r.onMatch(r,function(i){return r.add(null,i)})}),Mr=e,It("matchMedia"))},ji=function(){function o(t,r){this.selector=r&&Kt(r),this.data=[],this._r=[],this.isReverted=!1,this.id=Xn++,t&&this.add(t)}var e=o.prototype;return e.add=function(r,i,n){W(r)&&(n=i,i=r,r=W);var s=this,a=function(){var u=F,f=s.selector,h;return u&&u!==s&&u.data.push(s),n&&(s.selector=Kt(n)),F=s,h=i.apply(s,arguments),W(h)&&s._r.push(h),F=u,s.selector=f,s.isReverted=!1,h};return s.last=a,r===W?a(s,function(l){return s.add(null,l)}):r?s[r]=a:a},e.ignore=function(r){var i=F;F=null,r(this),F=i},e.getTweens=function(){var r=[];return this.data.forEach(function(i){return i instanceof o?r.push.apply(r,i.getTweens()):i instanceof H&&!(i.parent&&i.parent.data==="nested")&&r.push(i)}),r},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(r,i){var n=this;if(r?function(){for(var a=n.getTweens(),l=n.data.length,u;l--;)u=n.data[l],u.data==="isFlip"&&(u.revert(),u.getChildren(!0,!0,!1).forEach(function(f){return a.splice(a.indexOf(f),1)}));for(a.map(function(f){return{g:f._dur||f._delay||f._sat&&!f._sat.vars.immediateRender?f.globalTime(0):-1/0,t:f}}).sort(function(f,h){return h.g-f.g||-1/0}).forEach(function(f){return f.t.revert(r)}),l=n.data.length;l--;)u=n.data[l],u instanceof te?u.data!=="nested"&&(u.scrollTrigger&&u.scrollTrigger.revert(),u.kill()):!(u instanceof H)&&u.revert&&u.revert(r);n._r.forEach(function(f){return f(r,n)}),n.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var s=We.length;s--;)We[s].id===this.id&&We.splice(s,1)},e.revert=function(r){this.kill(r||{})},o}(),qn=function(){function o(t){this.contexts=[],this.scope=t,F&&F.data.push(this)}var e=o.prototype;return e.add=function(r,i,n){be(r)||(r={matches:r});var s=new ji(0,n||this.scope),a=s.conditions={},l,u,f;F&&!s.selector&&(s.selector=F.selector),this.contexts.push(s),i=s.add("onMatch",i),s.queries=r;for(u in r)u==="all"?f=1:(l=ge.matchMedia(r[u]),l&&(We.indexOf(s)<0&&We.push(s),(a[u]=l.matches)&&(f=1),l.addListener?l.addListener(Jt):l.addEventListener("change",Jt)));return f&&i(s,function(h){return s.add(null,h)}),this},e.revert=function(r){this.kill(r||{})},e.kill=function(r){this.contexts.forEach(function(i){return i.kill(r,!0)})},o}(),Ot={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];t.forEach(function(i){return xi(i)})},timeline:function(e){return new te(e)},getTweensOf:function(e,t){return B.getTweensOf(e,t)},getProperty:function(e,t,r,i){Q(e)&&(e=pe(e)[0]);var n=Be(e||{}).get,s=r?ai:si;return r==="native"&&(r=""),e&&(t?s((oe[t]&&oe[t].get||n)(e,t,r,i)):function(a,l,u){return s((oe[a]&&oe[a].get||n)(e,a,l,u))})},quickSetter:function(e,t,r){if(e=pe(e),e.length>1){var i=e.map(function(f){return ae.quickSetter(f,t,r)}),n=i.length;return function(f){for(var h=n;h--;)i[h](f)}}e=e[0]||{};var s=oe[t],a=Be(e),l=a.harness&&(a.harness.aliases||{})[t]||t,u=s?function(f){var h=new s;He._pt=0,h.init(e,r?f+r:f,He,0,[e]),h.render(1,h),He._pt&&gr(1,He)}:a.set(e,l);return s?u:function(f){return u(e,l,r?f+r:f,a,1)}},quickTo:function(e,t,r){var i,n=ae.to(e,he((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),r||{})),s=function(l,u,f){return n.resetTo(t,l,u,f)};return s.tween=n,s},isTweening:function(e){return B.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Ye(e.ease,Ze.ease)),Sr(Ze,e||{})},config:function(e){return Sr(fe,e||{})},registerEffect:function(e){var t=e.name,r=e.effect,i=e.plugins,n=e.defaults,s=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!oe[a]&&!ce[a]&&ct(t+" effect requires "+a+" plugin.")}),Et[t]=function(a,l,u){return r(pe(a),he(l||{},n),u)},s&&(te.prototype[t]=function(a,l,u){return this.add(Et[t](a,be(l)?l:(u=l)&&{},this),u)})},registerEase:function(e,t){R[e]=Ye(t)},parseEase:function(e,t){return arguments.length?Ye(e,t):R},getById:function(e){return B.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var r=new te(e),i,n;for(r.smoothChildTiming=re(e.smoothChildTiming),B.remove(r),r._dp=0,r._time=r._tTime=B._time,i=B._first;i;)n=i._next,(t||!(!i._dur&&i instanceof H&&i.vars.onComplete===i._targets[0]))&&ye(r,i,i._start-i._delay),i=n;return ye(B,r,0),r},context:function(e,t){return e?new ji(e,t):F},matchMedia:function(e){return new qn(e)},matchMediaRefresh:function(){return We.forEach(function(e){var t=e.conditions,r,i;for(i in t)t[i]&&(t[i]=!1,r=1);r&&e.revert()})||Jt()},addEventListener:function(e,t){var r=kt[e]||(kt[e]=[]);~r.indexOf(t)||r.push(t)},removeEventListener:function(e,t){var r=kt[e],i=r&&r.indexOf(t);i>=0&&r.splice(i,1)},utils:{wrap:Tn,wrapYoyo:Sn,distribute:di,random:pi,snap:_i,normalize:kn,getUnit:J,clamp:xn,splitColor:bi,toArray:pe,selector:Kt,mapRange:gi,pipe:vn,unitize:wn,interpolate:Cn,shuffle:hi},install:ei,effects:Et,ticker:le,updateRoot:te.updateRoot,plugins:oe,globalTimeline:B,core:{PropTween:ne,globals:ti,Tween:H,Timeline:te,Animation:pt,getCache:Be,_removeLinkedListItem:Nt,reverting:function(){return Z},context:function(e){return e&&F&&(F.data.push(e),e._ctx=F),F},suppressOverwrites:function(e){return nr=e}}};ie("to,from,fromTo,delayedCall,set,killTweensOf",function(o){return Ot[o]=H[o]});le.add(te.updateRoot);He=Ot.to({},{duration:0});var Gn=function(e,t){for(var r=e._pt;r&&r.p!==t&&r.op!==t&&r.fp!==t;)r=r._next;return r},Hn=function(e,t){var r=e._targets,i,n,s;for(i in t)for(n=r.length;n--;)s=e._ptLookup[n][i],s&&(s=s.d)&&(s._pt&&(s=Gn(s,i)),s&&s.modifier&&s.modifier(t[i],e,r[n],i))},Bt=function(e,t){return{name:e,headless:1,rawVars:1,init:function(i,n,s){s._onInit=function(a){var l,u;if(Q(n)&&(l={},ie(n,function(f){return l[f]=1}),n=l),t){l={};for(u in n)l[u]=t(n[u]);n=l}Hn(a,n)}}}},ae=Ot.registerPlugin({name:"attr",init:function(e,t,r,i,n){var s,a,l;this.tween=r;for(s in t)l=e.getAttribute(s)||"",a=this.add(e,"setAttribute",(l||0)+"",t[s],i,n,0,0,s),a.op=s,a.b=l,this._props.push(s)},render:function(e,t){for(var r=t._pt;r;)Z?r.set(r.t,r.p,r.b,r):r.r(e,r.d),r=r._next}},{name:"endArray",headless:1,init:function(e,t){for(var r=t.length;r--;)this.add(e,r,e[r]||0,t[r],0,0,0,0,0,1)}},Bt("roundProps",Qt),Bt("modifiers"),Bt("snap",_i))||Ot;H.version=te.version=ae.version="3.13.0";Jr=1;ar()&&rt();R.Power0;R.Power1;R.Power2;R.Power3;R.Power4;R.Linear;R.Quad;R.Cubic;R.Quart;R.Quint;R.Strong;R.Elastic;R.Back;R.SteppedEase;R.Bounce;R.Sine;R.Expo;R.Circ;/*!
 * CSSPlugin 3.13.0
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Nr,Pe,Ke,yr,Ie,Dr,xr,$n=function(){return typeof window<"u"},Se={},Le=180/Math.PI,Qe=Math.PI/180,qe=Math.atan2,Ar=1e8,br=/([A-Z])/g,Kn=/(left|right|width|margin|padding|x)/i,Qn=/[\s,\(]\S/,xe={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},er=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Zn=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},Jn=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},es=function(e,t){var r=t.s+t.c*e;t.set(t.t,t.p,~~(r+(r<0?-.5:.5))+t.u,t)},Ei=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},zi=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},ts=function(e,t,r){return e.style[t]=r},rs=function(e,t,r){return e.style.setProperty(t,r)},is=function(e,t,r){return e._gsap[t]=r},ns=function(e,t,r){return e._gsap.scaleX=e._gsap.scaleY=r},ss=function(e,t,r,i,n){var s=e._gsap;s.scaleX=s.scaleY=r,s.renderTransform(n,s)},as=function(e,t,r,i,n){var s=e._gsap;s[t]=r,s.renderTransform(n,s)},V="transform",se=V+"Origin",os=function o(e,t){var r=this,i=this.target,n=i.style,s=i._gsap;if(e in Se&&n){if(this.tfm=this.tfm||{},e!=="transform")e=xe[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return r.tfm[a]=ke(i,a)}):this.tfm[e]=s.x?s[e]:ke(i,e),e===se&&(this.tfm.zOrigin=s.zOrigin);else return xe.transform.split(",").forEach(function(a){return o.call(r,a,t)});if(this.props.indexOf(V)>=0)return;s.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(se,t,"")),e=V}(n||t)&&this.props.push(e,t,n[e])},Fi=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},ls=function(){var e=this.props,t=this.target,r=t.style,i=t._gsap,n,s;for(n=0;n<e.length;n+=3)e[n+1]?e[n+1]===2?t[e[n]](e[n+2]):t[e[n]]=e[n+2]:e[n+2]?r[e[n]]=e[n+2]:r.removeProperty(e[n].substr(0,2)==="--"?e[n]:e[n].replace(br,"-$1").toLowerCase());if(this.tfm){for(s in this.tfm)i[s]=this.tfm[s];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),n=xr(),(!n||!n.isStart)&&!r[V]&&(Fi(r),i.zOrigin&&r[se]&&(r[se]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Li=function(e,t){var r={target:e,props:[],revert:ls,save:os};return e._gsap||ae.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return r.save(i)}),r},Ii,tr=function(e,t){var r=Pe.createElementNS?Pe.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):Pe.createElement(e);return r&&r.style?r:Pe.createElement(e)},me=function o(e,t,r){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(br,"-$1").toLowerCase())||i.getPropertyValue(t)||!r&&o(e,it(t)||t,1)||""},jr="O,Moz,ms,Ms,Webkit".split(","),it=function(e,t,r){var i=t||Ie,n=i.style,s=5;if(e in n&&!r)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);s--&&!(jr[s]+e in n););return s<0?null:(s===3?"ms":s>=0?jr[s]:"")+e},rr=function(){$n()&&window.document&&(Nr=window,Pe=Nr.document,Ke=Pe.documentElement,Ie=tr("div")||{style:{}},tr("div"),V=it(V),se=V+"Origin",Ie.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Ii=!!it("perspective"),xr=ae.core.reverting,yr=1)},Er=function(e){var t=e.ownerSVGElement,r=tr("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),n;i.style.display="block",r.appendChild(i),Ke.appendChild(r);try{n=i.getBBox()}catch{}return r.removeChild(i),Ke.removeChild(r),n},zr=function(e,t){for(var r=t.length;r--;)if(e.hasAttribute(t[r]))return e.getAttribute(t[r])},Bi=function(e){var t,r;try{t=e.getBBox()}catch{t=Er(e),r=1}return t&&(t.width||t.height)||r||(t=Er(e)),t&&!t.width&&!t.x&&!t.y?{x:+zr(e,["x","cx","x1"])||0,y:+zr(e,["y","cy","y1"])||0,width:0,height:0}:t},Vi=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Bi(e))},Ue=function(e,t){if(t){var r=e.style,i;t in Se&&t!==se&&(t=V),r.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),r.removeProperty(i==="--"?t:t.replace(br,"-$1").toLowerCase())):r.removeAttribute(t)}},Oe=function(e,t,r,i,n,s){var a=new ne(e._pt,t,r,0,1,s?zi:Ei);return e._pt=a,a.b=i,a.e=n,e._props.push(r),a},Fr={deg:1,rad:1,turn:1},us={grid:1,flex:1},De=function o(e,t,r,i){var n=parseFloat(r)||0,s=(r+"").trim().substr((n+"").length)||"px",a=Ie.style,l=Kn.test(t),u=e.tagName.toLowerCase()==="svg",f=(u?"client":"offset")+(l?"Width":"Height"),h=100,_=i==="px",d=i==="%",m,c,p,x;if(i===s||!n||Fr[i]||Fr[s])return n;if(s!=="px"&&!_&&(n=o(e,t,r,"px")),x=e.getCTM&&Vi(e),(d||s==="%")&&(Se[t]||~t.indexOf("adius")))return m=x?e.getBBox()[l?"width":"height"]:e[f],q(d?n/m*h:n/100*m);if(a[l?"width":"height"]=h+(_?s:i),c=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!u?e:e.parentNode,x&&(c=(e.ownerSVGElement||{}).parentNode),(!c||c===Pe||!c.appendChild)&&(c=Pe.body),p=c._gsap,p&&d&&p.width&&l&&p.time===le.time&&!p.uncache)return q(n/p.width*h);if(d&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=h+i,m=e[f],b?e.style[t]=b:Ue(e,t)}else(d||s==="%")&&!us[me(c,"display")]&&(a.position=me(e,"position")),c===e&&(a.position="static"),c.appendChild(Ie),m=Ie[f],c.removeChild(Ie),a.position="absolute";return l&&d&&(p=Be(c),p.time=le.time,p.width=c[f]),q(_?m*n/h:m&&n?h/m*n:0)},ke=function(e,t,r,i){var n;return yr||rr(),t in xe&&t!=="transform"&&(t=xe[t],~t.indexOf(",")&&(t=t.split(",")[0])),Se[t]&&t!=="transform"?(n=gt(e,i),n=t!=="transformOrigin"?n[t]:n.svg?n.origin:Mt(me(e,se))+" "+n.zOrigin+"px"):(n=e.style[t],(!n||n==="auto"||i||~(n+"").indexOf("calc("))&&(n=Rt[t]&&Rt[t](e,t,r)||me(e,t)||ii(e,t)||(t==="opacity"?1:0))),r&&!~(n+"").trim().indexOf(" ")?De(e,t,n,r)+r:n},fs=function(e,t,r,i){if(!r||r==="none"){var n=it(t,e,1),s=n&&me(e,n,1);s&&s!==r?(t=n,r=s):t==="borderColor"&&(r=me(e,"borderTopColor"))}var a=new ne(this._pt,e.style,t,0,1,Di),l=0,u=0,f,h,_,d,m,c,p,x,b,w,k,y;if(a.b=r,a.e=i,r+="",i+="",i.substring(0,6)==="var(--"&&(i=me(e,i.substring(4,i.indexOf(")")))),i==="auto"&&(c=e.style[t],e.style[t]=i,i=me(e,t)||i,c?e.style[t]=c:Ue(e,t)),f=[r,i],wi(f),r=f[0],i=f[1],_=r.match(Ge)||[],y=i.match(Ge)||[],y.length){for(;h=Ge.exec(i);)p=h[0],b=i.substring(l,h.index),m?m=(m+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(m=1),p!==(c=_[u++]||"")&&(d=parseFloat(c)||0,k=c.substr((d+"").length),p.charAt(1)==="="&&(p=$e(d,p)+k),x=parseFloat(p),w=p.substr((x+"").length),l=Ge.lastIndex-w.length,w||(w=w||fe.units[t]||k,l===i.length&&(i+=w,a.e+=w)),k!==w&&(d=De(e,t,c,w)||0),a._pt={_next:a._pt,p:b||u===1?b:",",s:d,c:x-d,m:m&&m<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?zi:Ei;return Qr.test(i)&&(a.e=0),this._pt=a,a},Lr={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},cs=function(e){var t=e.split(" "),r=t[0],i=t[1]||"50%";return(r==="top"||r==="bottom"||i==="left"||i==="right")&&(e=r,r=i,i=e),t[0]=Lr[r]||r,t[1]=Lr[i]||i,t.join(" ")},hs=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var r=t.t,i=r.style,n=t.u,s=r._gsap,a,l,u;if(n==="all"||n===!0)i.cssText="",l=1;else for(n=n.split(","),u=n.length;--u>-1;)a=n[u],Se[a]&&(l=1,a=a==="transformOrigin"?se:V),Ue(r,a);l&&(Ue(r,V),s&&(s.svg&&r.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",gt(r,1),s.uncache=1,Fi(i)))}},Rt={clearProps:function(e,t,r,i,n){if(n.data!=="isFromStart"){var s=e._pt=new ne(e._pt,t,r,0,0,hs);return s.u=i,s.pr=-10,s.tween=n,e._props.push(r),1}}},mt=[1,0,0,1,0,0],Yi={},Wi=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Ir=function(e){var t=me(e,V);return Wi(t)?mt:t.substr(7).match(Kr).map(q)},vr=function(e,t){var r=e._gsap||Be(e),i=e.style,n=Ir(e),s,a,l,u;return r.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,n=[l.a,l.b,l.c,l.d,l.e,l.f],n.join(",")==="1,0,0,1,0,0"?mt:n):(n===mt&&!e.offsetParent&&e!==Ke&&!r.svg&&(l=i.display,i.display="block",s=e.parentNode,(!s||!e.offsetParent&&!e.getBoundingClientRect().width)&&(u=1,a=e.nextElementSibling,Ke.appendChild(e)),n=Ir(e),l?i.display=l:Ue(e,"display"),u&&(a?s.insertBefore(e,a):s?s.appendChild(e):Ke.removeChild(e))),t&&n.length>6?[n[0],n[1],n[4],n[5],n[12],n[13]]:n)},ir=function(e,t,r,i,n,s){var a=e._gsap,l=n||vr(e,!0),u=a.xOrigin||0,f=a.yOrigin||0,h=a.xOffset||0,_=a.yOffset||0,d=l[0],m=l[1],c=l[2],p=l[3],x=l[4],b=l[5],w=t.split(" "),k=parseFloat(w[0])||0,y=parseFloat(w[1])||0,S,C,P,T;r?l!==mt&&(C=d*p-m*c)&&(P=k*(p/C)+y*(-c/C)+(c*b-p*x)/C,T=k*(-m/C)+y*(d/C)-(d*b-m*x)/C,k=P,y=T):(S=Bi(e),k=S.x+(~w[0].indexOf("%")?k/100*S.width:k),y=S.y+(~(w[1]||w[0]).indexOf("%")?y/100*S.height:y)),i||i!==!1&&a.smooth?(x=k-u,b=y-f,a.xOffset=h+(x*d+b*c)-x,a.yOffset=_+(x*m+b*p)-b):a.xOffset=a.yOffset=0,a.xOrigin=k,a.yOrigin=y,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!r,e.style[se]="0px 0px",s&&(Oe(s,a,"xOrigin",u,k),Oe(s,a,"yOrigin",f,y),Oe(s,a,"xOffset",h,a.xOffset),Oe(s,a,"yOffset",_,a.yOffset)),e.setAttribute("data-svg-origin",k+" "+y)},gt=function(e,t){var r=e._gsap||new Ci(e);if("x"in r&&!t&&!r.uncache)return r;var i=e.style,n=r.scaleX<0,s="px",a="deg",l=getComputedStyle(e),u=me(e,se)||"0",f,h,_,d,m,c,p,x,b,w,k,y,S,C,P,T,M,E,D,N,U,Y,L,G,v,O,I,K,X,wr,ve,Ee;return f=h=_=c=p=x=b=w=k=0,d=m=1,r.svg=!!(e.getCTM&&Vi(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[V]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[V]!=="none"?l[V]:"")),i.scale=i.rotate=i.translate="none"),C=vr(e,r.svg),r.svg&&(r.uncache?(v=e.getBBox(),u=r.xOrigin-v.x+"px "+(r.yOrigin-v.y)+"px",G=""):G=!t&&e.getAttribute("data-svg-origin"),ir(e,G||u,!!G||r.originIsAbsolute,r.smooth!==!1,C)),y=r.xOrigin||0,S=r.yOrigin||0,C!==mt&&(E=C[0],D=C[1],N=C[2],U=C[3],f=Y=C[4],h=L=C[5],C.length===6?(d=Math.sqrt(E*E+D*D),m=Math.sqrt(U*U+N*N),c=E||D?qe(D,E)*Le:0,b=N||U?qe(N,U)*Le+c:0,b&&(m*=Math.abs(Math.cos(b*Qe))),r.svg&&(f-=y-(y*E+S*N),h-=S-(y*D+S*U))):(Ee=C[6],wr=C[7],I=C[8],K=C[9],X=C[10],ve=C[11],f=C[12],h=C[13],_=C[14],P=qe(Ee,X),p=P*Le,P&&(T=Math.cos(-P),M=Math.sin(-P),G=Y*T+I*M,v=L*T+K*M,O=Ee*T+X*M,I=Y*-M+I*T,K=L*-M+K*T,X=Ee*-M+X*T,ve=wr*-M+ve*T,Y=G,L=v,Ee=O),P=qe(-N,X),x=P*Le,P&&(T=Math.cos(-P),M=Math.sin(-P),G=E*T-I*M,v=D*T-K*M,O=N*T-X*M,ve=U*M+ve*T,E=G,D=v,N=O),P=qe(D,E),c=P*Le,P&&(T=Math.cos(P),M=Math.sin(P),G=E*T+D*M,v=Y*T+L*M,D=D*T-E*M,L=L*T-Y*M,E=G,Y=v),p&&Math.abs(p)+Math.abs(c)>359.9&&(p=c=0,x=180-x),d=q(Math.sqrt(E*E+D*D+N*N)),m=q(Math.sqrt(L*L+Ee*Ee)),P=qe(Y,L),b=Math.abs(P)>2e-4?P*Le:0,k=ve?1/(ve<0?-ve:ve):0),r.svg&&(G=e.getAttribute("transform"),r.forceCSS=e.setAttribute("transform","")||!Wi(me(e,V)),G&&e.setAttribute("transform",G))),Math.abs(b)>90&&Math.abs(b)<270&&(n?(d*=-1,b+=c<=0?180:-180,c+=c<=0?180:-180):(m*=-1,b+=b<=0?180:-180)),t=t||r.uncache,r.x=f-((r.xPercent=f&&(!t&&r.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-f)?-50:0)))?e.offsetWidth*r.xPercent/100:0)+s,r.y=h-((r.yPercent=h&&(!t&&r.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*r.yPercent/100:0)+s,r.z=_+s,r.scaleX=q(d),r.scaleY=q(m),r.rotation=q(c)+a,r.rotationX=q(p)+a,r.rotationY=q(x)+a,r.skewX=b+a,r.skewY=w+a,r.transformPerspective=k+s,(r.zOrigin=parseFloat(u.split(" ")[2])||!t&&r.zOrigin||0)&&(i[se]=Mt(u)),r.xOffset=r.yOffset=0,r.force3D=fe.force3D,r.renderTransform=r.svg?_s:Ii?Ui:ds,r.uncache=0,r},Mt=function(e){return(e=e.split(" "))[0]+" "+e[1]},Vt=function(e,t,r){var i=J(t);return q(parseFloat(t)+parseFloat(De(e,"x",r+"px",i)))+i},ds=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Ui(e,t)},ze="0deg",nt="0px",Fe=") ",Ui=function(e,t){var r=t||this,i=r.xPercent,n=r.yPercent,s=r.x,a=r.y,l=r.z,u=r.rotation,f=r.rotationY,h=r.rotationX,_=r.skewX,d=r.skewY,m=r.scaleX,c=r.scaleY,p=r.transformPerspective,x=r.force3D,b=r.target,w=r.zOrigin,k="",y=x==="auto"&&e&&e!==1||x===!0;if(w&&(h!==ze||f!==ze)){var S=parseFloat(f)*Qe,C=Math.sin(S),P=Math.cos(S),T;S=parseFloat(h)*Qe,T=Math.cos(S),s=Vt(b,s,C*T*-w),a=Vt(b,a,-Math.sin(S)*-w),l=Vt(b,l,P*T*-w+w)}p!==nt&&(k+="perspective("+p+Fe),(i||n)&&(k+="translate("+i+"%, "+n+"%) "),(y||s!==nt||a!==nt||l!==nt)&&(k+=l!==nt||y?"translate3d("+s+", "+a+", "+l+") ":"translate("+s+", "+a+Fe),u!==ze&&(k+="rotate("+u+Fe),f!==ze&&(k+="rotateY("+f+Fe),h!==ze&&(k+="rotateX("+h+Fe),(_!==ze||d!==ze)&&(k+="skew("+_+", "+d+Fe),(m!==1||c!==1)&&(k+="scale("+m+", "+c+Fe),b.style[V]=k||"translate(0, 0)"},_s=function(e,t){var r=t||this,i=r.xPercent,n=r.yPercent,s=r.x,a=r.y,l=r.rotation,u=r.skewX,f=r.skewY,h=r.scaleX,_=r.scaleY,d=r.target,m=r.xOrigin,c=r.yOrigin,p=r.xOffset,x=r.yOffset,b=r.forceCSS,w=parseFloat(s),k=parseFloat(a),y,S,C,P,T;l=parseFloat(l),u=parseFloat(u),f=parseFloat(f),f&&(f=parseFloat(f),u+=f,l+=f),l||u?(l*=Qe,u*=Qe,y=Math.cos(l)*h,S=Math.sin(l)*h,C=Math.sin(l-u)*-_,P=Math.cos(l-u)*_,u&&(f*=Qe,T=Math.tan(u-f),T=Math.sqrt(1+T*T),C*=T,P*=T,f&&(T=Math.tan(f),T=Math.sqrt(1+T*T),y*=T,S*=T)),y=q(y),S=q(S),C=q(C),P=q(P)):(y=h,P=_,S=C=0),(w&&!~(s+"").indexOf("px")||k&&!~(a+"").indexOf("px"))&&(w=De(d,"x",s,"px"),k=De(d,"y",a,"px")),(m||c||p||x)&&(w=q(w+m-(m*y+c*C)+p),k=q(k+c-(m*S+c*P)+x)),(i||n)&&(T=d.getBBox(),w=q(w+i/100*T.width),k=q(k+n/100*T.height)),T="matrix("+y+","+S+","+C+","+P+","+w+","+k+")",d.setAttribute("transform",T),b&&(d.style[V]=T)},ps=function(e,t,r,i,n){var s=360,a=Q(n),l=parseFloat(n)*(a&&~n.indexOf("rad")?Le:1),u=l-i,f=i+u+"deg",h,_;return a&&(h=n.split("_")[1],h==="short"&&(u%=s,u!==u%(s/2)&&(u+=u<0?s:-s)),h==="cw"&&u<0?u=(u+s*Ar)%s-~~(u/s)*s:h==="ccw"&&u>0&&(u=(u-s*Ar)%s-~~(u/s)*s)),e._pt=_=new ne(e._pt,t,r,i,u,Zn),_.e=f,_.u="deg",e._props.push(r),_},Br=function(e,t){for(var r in t)e[r]=t[r];return e},ms=function(e,t,r){var i=Br({},r._gsap),n="perspective,force3D,transformOrigin,svgOrigin",s=r.style,a,l,u,f,h,_,d,m;i.svg?(u=r.getAttribute("transform"),r.setAttribute("transform",""),s[V]=t,a=gt(r,1),Ue(r,V),r.setAttribute("transform",u)):(u=getComputedStyle(r)[V],s[V]=t,a=gt(r,1),s[V]=u);for(l in Se)u=i[l],f=a[l],u!==f&&n.indexOf(l)<0&&(d=J(u),m=J(f),h=d!==m?De(r,l,u,m):parseFloat(u),_=parseFloat(f),e._pt=new ne(e._pt,a,l,h,_-h,er),e._pt.u=m||0,e._props.push(l));Br(a,i)};ie("padding,margin,Width,Radius",function(o,e){var t="Top",r="Right",i="Bottom",n="Left",s=(e<3?[t,r,i,n]:[t+n,t+r,i+r,i+n]).map(function(a){return e<2?o+a:"border"+a+o});Rt[e>1?"border"+o:o]=function(a,l,u,f,h){var _,d;if(arguments.length<4)return _=s.map(function(m){return ke(a,m,u)}),d=_.join(" "),d.split(_[0]).length===5?_[0]:d;_=(f+"").split(" "),d={},s.forEach(function(m,c){return d[m]=_[c]=_[c]||_[(c-1)/2|0]}),a.init(l,d,h)}});var Xi={name:"css",register:rr,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,r,i,n){var s=this._props,a=e.style,l=r.vars.startAt,u,f,h,_,d,m,c,p,x,b,w,k,y,S,C,P;yr||rr(),this.styles=this.styles||Li(e),P=this.styles.props,this.tween=r;for(c in t)if(c!=="autoRound"&&(f=t[c],!(oe[c]&&Pi(c,t,r,i,e,n)))){if(d=typeof f,m=Rt[c],d==="function"&&(f=f.call(r,i,e,n),d=typeof f),d==="string"&&~f.indexOf("random(")&&(f=dt(f)),m)m(this,e,c,f,r)&&(C=1);else if(c.substr(0,2)==="--")u=(getComputedStyle(e).getPropertyValue(c)+"").trim(),f+="",Me.lastIndex=0,Me.test(u)||(p=J(u),x=J(f)),x?p!==x&&(u=De(e,c,u,x)+x):p&&(f+=p),this.add(a,"setProperty",u,f,i,n,0,0,c),s.push(c),P.push(c,0,a[c]);else if(d!=="undefined"){if(l&&c in l?(u=typeof l[c]=="function"?l[c].call(r,i,e,n):l[c],Q(u)&&~u.indexOf("random(")&&(u=dt(u)),J(u+"")||u==="auto"||(u+=fe.units[c]||J(ke(e,c))||""),(u+"").charAt(1)==="="&&(u=ke(e,c))):u=ke(e,c),_=parseFloat(u),b=d==="string"&&f.charAt(1)==="="&&f.substr(0,2),b&&(f=f.substr(2)),h=parseFloat(f),c in xe&&(c==="autoAlpha"&&(_===1&&ke(e,"visibility")==="hidden"&&h&&(_=0),P.push("visibility",0,a.visibility),Oe(this,a,"visibility",_?"inherit":"hidden",h?"inherit":"hidden",!h)),c!=="scale"&&c!=="transform"&&(c=xe[c],~c.indexOf(",")&&(c=c.split(",")[0]))),w=c in Se,w){if(this.styles.save(c),d==="string"&&f.substring(0,6)==="var(--"&&(f=me(e,f.substring(4,f.indexOf(")"))),h=parseFloat(f)),k||(y=e._gsap,y.renderTransform&&!t.parseTransform||gt(e,t.parseTransform),S=t.smoothOrigin!==!1&&y.smooth,k=this._pt=new ne(this._pt,a,V,0,1,y.renderTransform,y,0,-1),k.dep=1),c==="scale")this._pt=new ne(this._pt,y,"scaleY",y.scaleY,(b?$e(y.scaleY,b+h):h)-y.scaleY||0,er),this._pt.u=0,s.push("scaleY",c),c+="X";else if(c==="transformOrigin"){P.push(se,0,a[se]),f=cs(f),y.svg?ir(e,f,0,S,0,this):(x=parseFloat(f.split(" ")[2])||0,x!==y.zOrigin&&Oe(this,y,"zOrigin",y.zOrigin,x),Oe(this,a,c,Mt(u),Mt(f)));continue}else if(c==="svgOrigin"){ir(e,f,1,S,0,this);continue}else if(c in Yi){ps(this,y,c,_,b?$e(_,b+f):f);continue}else if(c==="smoothOrigin"){Oe(this,y,"smooth",y.smooth,f);continue}else if(c==="force3D"){y[c]=f;continue}else if(c==="transform"){ms(this,f,e);continue}}else c in a||(c=it(c)||c);if(w||(h||h===0)&&(_||_===0)&&!Qn.test(f)&&c in a)p=(u+"").substr((_+"").length),h||(h=0),x=J(f)||(c in fe.units?fe.units[c]:p),p!==x&&(_=De(e,c,u,x)),this._pt=new ne(this._pt,w?y:a,c,_,(b?$e(_,b+h):h)-_,!w&&(x==="px"||c==="zIndex")&&t.autoRound!==!1?es:er),this._pt.u=x||0,p!==x&&x!=="%"&&(this._pt.b=u,this._pt.r=Jn);else if(c in a)fs.call(this,e,c,u,b?b+f:f);else if(c in e)this.add(e,c,u||e[c],b?b+f:f,i,n);else if(c!=="parseTransform"){lr(c,f);continue}w||(c in a?P.push(c,0,a[c]):typeof e[c]=="function"?P.push(c,2,e[c]()):P.push(c,1,u||e[c])),s.push(c)}}C&&Ai(this)},render:function(e,t){if(t.tween._time||!xr())for(var r=t._pt;r;)r.r(e,r.d),r=r._next;else t.styles.revert()},get:ke,aliases:xe,getSetter:function(e,t,r){var i=xe[t];return i&&i.indexOf(",")<0&&(t=i),t in Se&&t!==se&&(e._gsap.x||ke(e,"x"))?r&&Dr===r?t==="scale"?ns:is:(Dr=r||{})&&(t==="scale"?ss:as):e.style&&!sr(e.style[t])?ts:~t.indexOf("-")?rs:mr(e,t)},core:{_removeProperty:Ue,_getMatrix:vr}};ae.utils.checkPrefix=it;ae.core.getStyleSaver=Li;(function(o,e,t,r){var i=ie(o+","+e+","+t,function(n){Se[n]=1});ie(e,function(n){fe.units[n]="deg",Yi[n]=1}),xe[i[13]]=o+","+e,ie(r,function(n){var s=n.split(":");xe[s[1]]=i[s[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ie("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(o){fe.units[o]="px"});ae.registerPlugin(Xi);var ot=ae.registerPlugin(Xi)||ae;ot.core.Tween;const bt=({title:o,bgColor:e,productItems:t})=>g.jsx("section",{style:e?{background:e}:void 0,children:g.jsxs(Ur,{fluid:!0,children:[g.jsx("div",{className:"d-flex justify-content-between align-items-center mb-4",children:g.jsx("h1",{className:"h4",children:o})}),g.jsx(Xr,{className:"gx-0 gy-3",children:t.map(r=>g.jsx(qr,{xs:6,sm:4,md:3,lg:3,xl:2,children:g.jsx($i,{title:o,productItem:r})},r.id))})]})}),gs=()=>{const o=Gi();return g.jsx("div",{style:{display:"flex",justifyContent:"center",padding:"2rem 1rem"},children:g.jsxs("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",background:"linear-gradient(135deg, #1a1a1a, #444)",borderRadius:"20px",color:"#fff",boxShadow:"0 10px 40px rgba(0,0,0,0.4)",padding:"1.5rem",maxWidth:"800px",width:"100%",flexWrap:"wrap"},children:[g.jsxs("div",{style:{flex:"1 1 250px",minWidth:0},children:[g.jsx("h2",{style:{fontWeight:"900",fontSize:"clamp(1.3rem, 2.5vw, 2rem)",marginBottom:"0.8rem",lineHeight:1.3},children:"🎁 Earn ₦500 For Every Friend You Refer!"}),g.jsx("p",{style:{fontSize:"0.95rem",opacity:.9,marginBottom:"1.2rem",lineHeight:1.6},children:"Share iProEdge with your friends today. They get ₦500 off, and you earn ₦500 for every successful referral. It’s that simple!"}),g.jsx(Hi,{onClick:()=>o("/refer"),style:{background:"linear-gradient(45deg, #ffd700, #ff7e5f)",border:"none",padding:"0.6rem 1.6rem",borderRadius:"50px",fontWeight:"700",fontSize:"0.95rem",color:"#222",boxShadow:"0 6px 15px rgba(255,215,0,0.4)"},children:"Start Referring Now"})]}),g.jsx("div",{className:"d-none d-md-flex",style:{flexShrink:0,alignItems:"center",justifyContent:"center",background:"rgba(255,255,255,0.1)",borderRadius:"15px",height:"140px",width:"140px",fontSize:"2.2rem",fontWeight:"bold",color:"#ffd700",border:"3px dashed rgba(255,255,255,0.3)",marginLeft:"auto",marginRight:"auto",marginTop:"0.5rem"},children:"₦500"})]})})};/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qi=(...o)=>o.filter((e,t,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ys=o=>o.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=o=>o.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vr=o=>{const e=xs(o);return e.charAt(0).toUpperCase()+e.slice(1)};/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Yt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bs=o=>{for(const e in o)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1},vs=z.createContext({}),ws=()=>z.useContext(vs),ks=z.forwardRef(({color:o,size:e,strokeWidth:t,absoluteStrokeWidth:r,className:i="",children:n,iconNode:s,...a},l)=>{const{size:u=24,strokeWidth:f=2,absoluteStrokeWidth:h=!1,color:_="currentColor",className:d=""}=ws()??{},m=r??h?Number(t??f)*24/Number(e??u):t??f;return z.createElement("svg",{ref:l,...Yt,width:e??u??Yt.width,height:e??u??Yt.height,stroke:o??_,strokeWidth:m,className:qi("lucide",d,i),...!n&&!bs(a)&&{"aria-hidden":"true"},...a},[...s.map(([c,p])=>z.createElement(c,p)),...Array.isArray(n)?n:[n]])});/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=(o,e)=>{const t=z.forwardRef(({className:r,...i},n)=>z.createElement(ks,{ref:n,iconNode:e,className:qi(`lucide-${ys(Vr(o))}`,`lucide-${o}`,r),...i}));return t.displayName=Vr(o),t};/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ts=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],Ss=je("arrow-right",Ts);/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cs=[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]],Ps=je("headphones",Cs);/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os=[["path",{d:"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",key:"1pdavp"}],["path",{d:"M20.054 15.987H3.946",key:"14rxg9"}]],Rs=je("laptop",Os);/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]],Ns=je("shopping-bag",Ms);/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],As=je("smartphone",Ds);/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const js=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],Yr=je("tag",js);/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Es=[["path",{d:"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",key:"ftymec"}],["rect",{x:"2",y:"6",width:"14",height:"12",rx:"2",key:"158x01"}]],zs=je("video",Es);/**
 * @license lucide-react v1.37.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs=[["path",{d:"M12 10v2.2l1.6 1",key:"n3r21l"}],["path",{d:"m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05",key:"18k57s"}],["path",{d:"m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05",key:"16ny36"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}]],Ls=je("watch",Fs),Is={"bi-phone":As,"bi-bag":Ns,"bi-smartwatch":Ls,"bi-camera-video":zs,"bi-earbuds":Ps,"bi-laptop":Rs},Bs=o=>o?typeof o=="function"?o:Is[o]||Yr:Yr,Vs=[{id:1,label:"Phones & Tablets",icon:"bi-phone",color:"#2f86d6"},{id:2,label:"Phone Accessories",icon:"bi-bag",color:"#e0663f"},{id:3,label:"Smart Watches",icon:"bi-smartwatch",color:"#7c5cbf"},{id:4,label:"Electronics",icon:"bi-camera-video",color:"#2f9e6a"},{id:5,label:"Audio",icon:"bi-earbuds",color:"#d6a72f"},{id:6,label:"Computers",icon:"bi-laptop",color:"#c94f7c"}],Ys=({categories:o=Vs,onCategoryClick:e,isLoading:t})=>t?null:g.jsx("section",{className:"category-showcase py-5",children:g.jsxs(Ur,{children:[g.jsxs("div",{className:"category-header text-center mb-5",children:[g.jsx("span",{className:"category-eyebrow",children:"Browse the Shop"}),g.jsx("h2",{className:"category-title",children:"Shop by Category"}),g.jsx("p",{className:"category-subtitle",children:"Genuine phones, tablets, and security cameras — sorted the way you'd browse them in store"})]}),g.jsx(Xr,{className:"g-4 category-grid",children:o.map(r=>{const i=Bs(r.icon);return g.jsx(qr,{xs:6,sm:6,md:4,lg:3,className:"d-flex category-col",children:g.jsxs("div",{className:"category-card w-100 cursor-pointer",onClick:()=>e(r.id),role:"button",tabIndex:0,onKeyDown:n=>{(n.key==="Enter"||n.key===" ")&&e(r.id)},children:[g.jsx("div",{className:"category-icon-wrapper",style:r.color?{"--icon-color":r.color}:void 0,children:g.jsx(i,{className:"category-icon",strokeWidth:1.75})}),g.jsx("h3",{className:"category-name",children:r.label}),g.jsxs("div",{className:"category-browse",children:[g.jsx("span",{children:"Browse"}),g.jsx(Ss,{size:14})]})]})},r.id)})})]})}),Wr=[{icon:"bi-truck",label:"Pay on Delivery — Lagos"},{icon:"bi-patch-check-fill",label:"100% Genuine, Verified Stock"},{icon:"bi-shield-check",label:"Warranty on Every Device"},{icon:"bi-lightning-charge-fill",label:"Same-Day Dispatch"},{icon:"bi-headset",label:"Real Human Support"}],Gs=()=>{const{products:o=[],loading:e}=Ki(),[t,r]=z.useState([]),[i,n]=z.useState(""),[s,a]=z.useState(""),[l,u]=z.useState("newest"),[f,h]=z.useState([]),[_,d]=z.useState(!1),[m,c]=z.useState(!1),[p,x]=z.useState({group:null,brand:null,type:null,priceRange:null,minRating:null,inStock:!1,minDiscount:null}),b=z.useRef(null),w=z.useRef(null),k=z.useRef(null),y=z.useRef([]);y.current=[],Qi(),z.useEffect(()=>{!e&&k.current&&ot.fromTo(k.current,{opacity:0,y:30},{opacity:1,y:0,duration:.8,ease:"power2.out",delay:.2})},[e]),z.useEffect(()=>{!e&&b.current&&ot.fromTo(b.current,{opacity:0,y:-20},{opacity:1,y:0,duration:.8,ease:"power2.out"})},[e]),z.useEffect(()=>{if(w.current){const v=w.current.querySelectorAll(".hero-text, .hero-btn, .hero-tag");v.length>0&&ot.fromTo(v,{y:80,opacity:0,skewY:8},{y:0,opacity:1,skewY:0,duration:1,stagger:.12,ease:"power4.out"})}},[]),z.useEffect(()=>{y.current.length>0&&ot.fromTo(y.current,{y:40,opacity:0,scale:.95},{y:0,opacity:1,scale:1,duration:.6,stagger:.08,ease:"expo.out"})},[t]);const S=v=>{v&&!y.current.includes(v)&&y.current.push(v)},C=(v,O)=>{const I=[...v];switch(O){case"priceLowHigh":return I.sort((K,X)=>(K.price||0)-(X.price||0));case"priceHighLow":return I.sort((K,X)=>(X.price||0)-(K.price||0));case"popular":return I.sort((K,X)=>(X.popularity||0)-(K.popularity||0));default:return I.sort((K,X)=>new Date(X.createdAt||0)-new Date(K.createdAt||0))}};z.useEffect(()=>{let v=[...o];if(p.group&&(v=v.filter(O=>O.category===p.group)),p.brand&&(v=v.filter(O=>O.brand===p.brand)),p.type&&(v=v.filter(O=>O.productType===p.type)),p.priceRange){const{min:O,max:I}=p.priceRange;v=v.filter(K=>{const X=K.price||0;return X>=O&&X<=I})}if(p.minRating&&(v=v.filter(O=>(O.avgRating||0)>=p.minRating)),p.inStock&&(v=v.filter(O=>O.inStock===!0)),p.minDiscount&&(v=v.filter(O=>(O.discount||0)>=p.minDiscount)),s.trim()){const O=s.toLowerCase();v=v.filter(I=>I.productName&&I.productName.toLowerCase().includes(O)||I.brand&&I.brand.toLowerCase().includes(O)||I.productType&&I.productType.toLowerCase().includes(O)||I.category&&I.category.toLowerCase().includes(O))}r(C(v,l))},[o,p,s,l]);const P=v=>{v.preventDefault(),a(i),d(!1)},T=v=>{const O=v.target.value;if(n(O),O.trim().length>0){const I=o.filter(K=>{var X;return(X=K.productName)==null?void 0:X.toLowerCase().includes(O.toLowerCase())}).map(K=>K.productName).slice(0,6);h([...new Set(I)]),d(!0)}else h([]),d(!1),a("")},M=v=>{n(v),d(!1),a(v)},E=v=>{x({group:v,brand:null,type:null}),n(""),a(""),setTimeout(()=>{var O;(O=b.current)==null||O.scrollIntoView({behavior:"smooth",block:"start"})},100)},D=()=>{x({group:null,brand:null,type:null,priceRange:null,minRating:null,inStock:!1,minDiscount:null}),n(""),a("")},N=p.group||p.brand||p.type||p.priceRange||p.minRating||p.inStock||p.minDiscount||s,U=o.filter(v=>Array.isArray(v.labels)&&v.labels.includes("bigDiscount")),Y=o.filter(v=>Array.isArray(v.labels)&&v.labels.includes("newArrivals")),L=o.filter(v=>!U.includes(v)&&!Y.includes(v)&&Array.isArray(v.labels)&&v.labels.includes("bestSales")),G=()=>p.type?Ji(p.type):p.brand?en(p.brand):p.group?tn(p.group):"All Products";return g.jsxs(z.Fragment,{children:[g.jsx("div",{className:"trust-ticker",children:g.jsx("div",{className:"trust-ticker-track",children:[...Wr,...Wr].map((v,O)=>g.jsxs("span",{className:"trust-item",children:[g.jsx("i",{className:`bi ${v.icon}`}),v.label]},O))})}),!N&&g.jsxs("section",{ref:w,className:"hero-section",children:[g.jsx("div",{className:"hero-noise"}),g.jsx("div",{className:"container position-relative",children:g.jsxs("div",{className:"row align-items-center",children:[g.jsxs("div",{className:"col-12 col-lg-7",children:[g.jsxs("span",{className:"hero-tag",children:[g.jsx("i",{className:"bi bi-geo-alt-fill me-1"})," Serving Lagos & Nationwide Delivery"]}),g.jsxs("h1",{className:"hero-text display-3 mb-4",children:["Original Tech.",g.jsx("br",{}),g.jsx("span",{className:"hero-accent",children:"Real Naija Prices."})]}),g.jsx("p",{className:"hero-text lead mb-4",children:"Phones, tablets, smart watches, audio, computers and electronics — sourced genuine, tested before dispatch, backed by warranty. No wahala."}),g.jsxs("div",{className:"hero-btn-row",children:[g.jsxs("button",{className:"hero-btn btn-market",onClick:()=>x({group:"phones-tablets",brand:null,type:null}),children:[g.jsx("i",{className:"bi bi-shop me-2"}),"Shop Phones & Tablets"]}),g.jsxs("button",{className:"hero-btn btn-market-ghost",onClick:()=>x({group:"electronics",brand:null,type:null}),children:["Browse All Categories",g.jsx("i",{className:"bi bi-arrow-right ms-2"})]})]})]}),g.jsx("div",{className:"col-12 col-lg-5 d-none d-lg-block",children:g.jsxs("div",{className:"hero-tag-card",children:[g.jsxs("div",{className:"hero-tag-card-row",children:[g.jsx("i",{className:"bi bi-phone-fill"}),g.jsx("span",{children:"Verified Genuine"})]}),g.jsx("div",{className:"hero-tag-card-price",children:"₦ Fair Market Price"}),g.jsxs("div",{className:"hero-tag-card-row muted",children:[g.jsx("i",{className:"bi bi-shield-check"}),g.jsx("span",{children:"Warranty included"})]})]})})]})})]}),!N&&g.jsx("div",{ref:k,children:g.jsx(Ys,{categories:Zi,onCategoryClick:E,isLoading:e})}),!N&&!e&&g.jsxs(g.Fragment,{children:[U.length>0&&g.jsx(bt,{title:"🔥 Flash Deals — Big Discounts",bgColor:"#FFF4E8",productItems:U.slice(0,8)}),Y.length>0&&g.jsx(bt,{title:"✨ Just Landed",bgColor:"#F0FAF5",productItems:Y.slice(0,8)}),L.length>0&&g.jsx(bt,{title:"⭐ Customer Favourites",bgColor:"#FBF9F4",productItems:L.slice(0,8)})]}),g.jsx("div",{ref:b,className:"filter-navigation sticky-top py-3",children:g.jsx("div",{className:"container",children:g.jsxs("form",{className:"filter-bar d-flex flex-wrap align-items-center justify-content-between gap-3 position-relative py-2",onSubmit:P,children:[g.jsxs("div",{className:"filter-search flex-grow-1 me-3 d-flex align-items-center",style:{position:"relative",minWidth:0},children:[g.jsx("input",{type:"text",className:"form-control filter-search-input",placeholder:"Search phones, tablets, cameras...",value:i,onChange:T,onKeyDown:v=>{v.key==="Enter"&&(P(v),d(!1)),v.key==="Escape"&&d(!1)},onBlur:()=>setTimeout(()=>d(!1),150),onFocus:()=>f.length>0&&d(!0),autoComplete:"off"}),_&&f.length>0&&g.jsx("ul",{className:"autocomplete-dropdown",children:f.map((v,O)=>g.jsxs("li",{onMouseDown:()=>M(v),className:"autocomplete-item",children:[g.jsx("i",{className:"bi bi-search text-muted me-2",style:{fontSize:12}}),v]},O))}),g.jsxs("button",{className:"btn-market-sm ms-2",id:"search-button",type:"submit",children:[g.jsx("i",{className:"bi bi-search"}),g.jsx("span",{className:"ms-1  d-sm-inline",children:"Search"})]})]}),g.jsx("div",{className:"sort-dropdown me-3",children:g.jsxs("select",{className:"form-select",value:l,onChange:v=>u(v.target.value),children:[g.jsx("option",{value:"newest",children:"Sort: Newest"}),g.jsx("option",{value:"priceLowHigh",children:"Price: Low to High"}),g.jsx("option",{value:"priceHighLow",children:"Price: High to Low"}),g.jsx("option",{value:"popular",children:"Most Popular"})]})}),N&&g.jsxs("button",{className:"clear-btn",type:"button",onClick:D,children:[g.jsx("i",{className:"bi bi-x-lg me-1"})," Clear"]})]})})}),g.jsxs("div",{className:"container-fluid py-4",children:[g.jsxs("button",{className:"mobile-filter-btn d-md-none",onClick:()=>c(!0),children:[g.jsx("i",{className:"bi bi-sliders me-2"}),"Filters",N&&g.jsx("span",{className:"mobile-filter-dot"})]}),g.jsxs("div",{className:"row g-4",children:[g.jsx("div",{className:"col-12 col-md-3 col-lg-2 d-none d-md-block",children:g.jsx(kr,{products:o,onFilterChange:v=>{x({group:v.group,brand:v.brand,type:v.type,priceRange:v.priceRange,minRating:v.minRating,inStock:v.inStock,minDiscount:v.minDiscount}),n(""),a("")}})}),g.jsxs("div",{className:"col-12 col-md-9 col-lg-10",children:[!N&&!e&&g.jsxs("div",{className:"catalog-heading",children:[g.jsx("h2",{children:"Browse Everything In Stock"}),g.jsx("p",{children:"Or use the filters on the left to narrow it down."})]}),e&&g.jsxs("div",{className:"text-center py-5",children:[g.jsx("div",{className:"market-spinner",role:"status",children:g.jsx("span",{className:"visually-hidden",children:"Loading..."})}),g.jsx("p",{className:"mt-3 loading-copy",children:"Checking current stock..."})]}),!e&&t.length>0&&g.jsx(bt,{title:G(),bgColor:"white",productItems:t,cardRef:S}),!e&&t.length===0&&g.jsxs("div",{className:"no-products-message text-center py-5",children:[g.jsx("i",{className:"bi bi-search"}),g.jsx("h3",{className:"mt-3",children:"Nothing matches that search"}),g.jsx("p",{className:"text-muted",children:"Try a different category, brand, or spelling — or clear filters to see everything in stock."}),g.jsxs("button",{className:"btn-market",onClick:D,children:[g.jsx("i",{className:"bi bi-arrow-left me-2"}),"View All Products"]})]})]})]})]}),m&&g.jsx("div",{className:"mobile-filter-backdrop d-md-none",onClick:()=>c(!1),children:g.jsxs("div",{className:"mobile-filter-drawer",onClick:v=>v.stopPropagation(),children:[g.jsxs("div",{className:"mobile-filter-drawer-header",children:[g.jsx("h5",{children:"Filters"}),g.jsx("button",{className:"mobile-filter-close",onClick:()=>c(!1),children:g.jsx("i",{className:"bi bi-x-lg"})})]}),g.jsx("div",{className:"mobile-filter-drawer-body",children:g.jsx(kr,{products:o,onFilterChange:v=>{x({group:v.group,brand:v.brand,type:v.type,priceRange:v.priceRange,minRating:v.minRating,inStock:v.inStock,minDiscount:v.minDiscount}),n(""),a(""),c(!1)}})})]})}),g.jsx(gs,{}),g.jsx("style",{jsx:!0,children:`
        @import url("https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap");

        :root {
          --ink: #14171f;
          --paper: #f6f5f1;
          --sky: #2f86d6;
          --sky-deep: #1b5fa6;
          --sky-tint: #eaf4fc;
          --gold: #f2a93b;
          --clay: #e8552b;
          --line: rgba(20, 23, 31, 0.1);
        }

        /* ── Trust ticker: LED-signage nod to Computer Village storefronts ── */
        .trust-ticker {
          background: var(--sky-deep);
          overflow: hidden;
          white-space: nowrap;
          padding: 0.5rem 0;
        }

        .trust-ticker-track {
          display: inline-flex;
          animation: scroll-ticker 28s linear infinite;
        }

        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #fdfcf9;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          padding: 0 2rem;
          border-right: 1px solid rgba(253, 252, 249, 0.2);
        }

        .trust-item i {
          color: var(--gold);
        }

        @keyframes scroll-ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-ticker-track {
            animation: none;
          }
        }

        /* ── Hero ── */
        .hero-section {
          position: relative;
          background: linear-gradient(
            160deg,
            #ffffff 0%,
            var(--sky-tint) 55%,
            #dcecfa 100%
          );
          padding: 4.5rem 0 5rem;
          overflow: hidden;
          border-bottom: 1px solid var(--line);
        }

        .hero-noise {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            135deg,
            rgba(27, 95, 166, 0.025) 0px,
            rgba(27, 95, 166, 0.025) 1px,
            transparent 1px,
            transparent 10px
          );
          pointer-events: none;
        }

        .hero-tag {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          color: var(--sky-deep);
          border: 1px solid rgba(47, 134, 214, 0.3);
          font-family: "JetBrains Mono", monospace;
          font-size: 0.75rem;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 8px rgba(27, 95, 166, 0.08);
        }

        .hero-text {
          font-family: "Sora", sans-serif;
          color: var(--ink);
          letter-spacing: -0.02em;
        }

        h1.hero-text {
          font-weight: 800;
          line-height: 1.05;
        }

        .hero-accent {
          color: var(--sky-deep);
        }

        p.hero-text {
          font-family: "Inter", sans-serif;
          color: #475569;
          max-width: 46ch;
        }

        .hero-btn-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.9rem;
        }

        .btn-market,
        .btn-market-ghost,
        .btn-market-sm {
          font-family: "Sora", sans-serif;
          font-weight: 700;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease,
            background 0.15s ease;
        }

        .btn-market {
          background: var(--sky);
          color: #fff;
          padding: 0.85rem 1.6rem;
        }

        .btn-market:hover {
          background: var(--sky-deep);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(47, 134, 214, 0.28);
        }

        .btn-market-ghost {
          background: transparent;
          color: var(--sky-deep);
          border: 1px solid rgba(27, 95, 166, 0.3);
          padding: 0.85rem 1.6rem;
        }

        .btn-market-ghost:hover {
          background: #ffffff;
          transform: translateY(-2px);
        }

        .btn-market-sm {
          background: var(--sky);
          color: #fff;
          padding: 0.5rem 1.1rem;
          display: inline-flex;
          align-items: center;
        }

        .btn-market-sm:hover {
          background: var(--sky-deep);
        }

        /* ── Hero price-tag card: styled like a real tagged price sticker ── */
        .hero-tag-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.75rem;
          transform: rotate(2deg);
          box-shadow: 0 24px 48px rgba(27, 95, 166, 0.18);
          font-family: "JetBrains Mono", monospace;
          border: 1px solid var(--line);
        }

        .hero-tag-card-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--ink);
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .hero-tag-card-row i {
          color: var(--sky-deep);
        }

        .hero-tag-card-row.muted {
          color: #6b7280;
          font-weight: 500;
        }

        .hero-tag-card-price {
          font-family: "Sora", sans-serif;
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--sky-deep);
          padding: 0.6rem 0;
          border-top: 1px dashed var(--line);
          border-bottom: 1px dashed var(--line);
          margin-bottom: 0.75rem;
        }

        /* ── Filter bar ── */
        .filter-navigation {
          background: rgba(246, 245, 241, 0.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
          z-index: 99;
        }

        .filter-bar {
          border: none;
        }

        .filter-search {
          min-width: 0;
        }

        .filter-search-input {
          /* Bootstrap's .form-control sets width:100%, which inside this
             flex row fights the search button for space and pushes it
             off-screen on narrow viewports. Constrain it explicitly. */
          flex: 1 1 auto;
          min-width: 0;
          width: auto;
          border-radius: 10px;
          border: 1px solid var(--line);
          background: #fff;
          font-family: "Inter", sans-serif;
        }

        .filter-search-input:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 3px rgba(47, 134, 214, 0.15);
        }

        .sort-dropdown select {
          border-radius: 10px;
          background: #fff;
          border: 1px solid var(--line);
          font-family: "Inter", sans-serif;
        }

        .sort-dropdown select:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 3px rgba(47, 134, 214, 0.15);
        }

        .clear-btn {
          border-radius: 10px;
          font-weight: 600;
          font-family: "Inter", sans-serif;
          padding: 0.5rem 1.1rem;
          background: transparent;
          border: 1px solid var(--clay);
          color: var(--clay);
          transition: all 0.15s ease;
        }

        .clear-btn:hover {
          background: var(--clay);
          color: #fff;
        }

        /* Autocomplete */
        .autocomplete-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 90px;
          z-index: 1001;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 12px;
          list-style: none;
          margin: 4px 0 0;
          padding: 4px 0;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
          max-height: 220px;
          overflow-y: auto;
          font-family: "Inter", sans-serif;
        }

        .autocomplete-item {
          padding: 9px 16px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          transition: background 0.15s;
        }

        .autocomplete-item:hover {
          background: rgba(47, 134, 214, 0.08);
        }

        /* Catalog section heading (only shown in browse-all mode) */
        .catalog-heading {
          margin-bottom: 1.25rem;
        }

        .catalog-heading h2 {
          font-family: "Sora", sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: var(--ink);
          margin-bottom: 0.25rem;
        }

        .catalog-heading p {
          font-family: "Inter", sans-serif;
          color: #64748b;
          font-size: 0.9rem;
          margin: 0;
        }

        /* Loading */
        .market-spinner {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 3px solid var(--line);
          border-top-color: var(--sky);
          margin: 0 auto;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .loading-copy {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.85rem;
          color: #6b7280;
        }

        /* No Products Message */
        .no-products-message {
          background: var(--paper);
          border-radius: 18px;
          padding: 60px 15px;
          font-family: "Inter", sans-serif;
        }

        .no-products-message i {
          font-size: 44px;
          color: #b8c2bc;
        }

        .no-products-message h3 {
          font-family: "Sora", sans-serif;
          font-weight: 700;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .filter-bar {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0 !important;
          }

          .filter-search,
          .sort-dropdown,
          .clear-btn {
            width: 100%;
          }

          .btn-market-sm {
            flex: 0 0 auto;
          }

          .hero-section {
            text-align: left;
            padding: 3rem 0 3.5rem;
          }

          h1.hero-text {
            font-size: 2.1rem;
          }
          /* ── Mobile filter trigger ── */
          .mobile-filter-btn {
            display: inline-flex;
            align-items: center;
            position: relative;
            background: #fff;
            border: 1px solid var(--line);
            border-radius: 10px;
            padding: 0.6rem 1.1rem;
            font-family: "Sora", sans-serif;
            font-weight: 700;
            font-size: 0.9rem;
            color: var(--ink);
            margin-bottom: 1rem;
          }

          .mobile-filter-btn i {
            color: var(--sky-deep);
          }

          .mobile-filter-dot {
            position: absolute;
            top: -4px;
            right: -4px;
            width: 10px;
            height: 10px;
            background: var(--clay);
            border-radius: 50%;
            border: 2px solid #fff;
          }

          /* ── Mobile filter drawer ── */
          .mobile-filter-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(20, 23, 31, 0.45);
            z-index: 1050;
            display: flex;
            justify-content: flex-end;
            animation: fadeIn 0.2s ease;
          }

          .mobile-filter-drawer {
            width: min(85vw, 340px);
            height: 100%;
            background: #fff;
            display: flex;
            flex-direction: column;
            animation: slideIn 0.25s ease;
            overflow-y: auto;
          }

          .mobile-filter-drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.25rem;
            border-bottom: 1px solid var(--line);
            position: sticky;
            top: 0;
            background: #fff;
          }

          .mobile-filter-drawer-header h5 {
            font-family: "Sora", sans-serif;
            font-weight: 800;
            margin: 0;
          }

          .mobile-filter-close {
            background: none;
            border: none;
            font-size: 1.1rem;
            color: var(--ink);
          }

          .mobile-filter-drawer-body {
            padding: 1rem 1.25rem 2rem;
          }

          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        }
      `})]})};export{Gs as default};
