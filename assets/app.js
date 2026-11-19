var D0=Object.defineProperty;var N0=(s,t,e)=>t in s?D0(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var Ht=(s,t,e)=>N0(s,typeof t!="symbol"?t+"":t,e);var Sp="1.3.27";function Tp(s,t,e){return Math.max(s,Math.min(t,e))}function O0(s,t,e){return(1-e)*s+e*t}function U0(s,t,e,n){return O0(s,t,1-Math.exp(-e*n))}function F0(s,t){return(s%t+t)%t}var B0=class{constructor(){Ht(this,"isRunning",!1);Ht(this,"value",0);Ht(this,"from",0);Ht(this,"to",0);Ht(this,"currentTime",0);Ht(this,"lerp");Ht(this,"duration");Ht(this,"easing");Ht(this,"onUpdate")}advance(s){if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=s;let e=Tp(0,this.currentTime/this.duration,1);t=e>=1;let n=t?1:this.easing(e);this.value=this.from+(this.to-this.from)*n}else this.lerp?(this.value=U0(this.value,this.to,this.lerp*60,s),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),this.onUpdate?.(this.value,t)}stop(){this.isRunning=!1}fromTo(s,t,{lerp:e,duration:n,easing:i,onStart:r,onUpdate:o}){this.from=this.value=s,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,r?.(),this.onUpdate=o}};function z0(s,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,s.apply(this,n)},t)}}var k0=class{constructor(s,t,{autoResize:e=!0,debounce:n=250}={}){Ht(this,"width",0);Ht(this,"height",0);Ht(this,"scrollHeight",0);Ht(this,"scrollWidth",0);Ht(this,"debouncedResize");Ht(this,"wrapperResizeObserver");Ht(this,"contentResizeObserver");Ht(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ht(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ht(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=s,this.content=t,e&&(this.debouncedResize=z0(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},wp=class{constructor(){Ht(this,"events",{})}emit(s,...t){let e=this.events[s]||[];for(let n=0,i=e.length;n<i;n++)e[n]?.(...t)}on(s,t){return this.events[s]?this.events[s].push(t):this.events[s]=[t],()=>{this.events[s]=this.events[s]?.filter(e=>t!==e)}}off(s,t){this.events[s]=this.events[s]?.filter(e=>t!==e)}destroy(){this.events={}}},V0=100/6,Rs={passive:!1};function Mp(s,t){return s===1?V0:s===2?t:1}var G0=class{constructor(s,t={wheelMultiplier:1,touchMultiplier:1}){Ht(this,"touchStart",{x:0,y:0});Ht(this,"lastDelta",{x:0,y:0});Ht(this,"window",{width:0,height:0});Ht(this,"emitter",new wp);Ht(this,"onTouchStart",s=>{let{clientX:t,clientY:e}=s.targetTouches?s.targetTouches[0]:s;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:s})});Ht(this,"onTouchMove",s=>{let{clientX:t,clientY:e}=s.targetTouches?s.targetTouches[0]:s,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:s})});Ht(this,"onTouchEnd",s=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:s})});Ht(this,"onWheel",s=>{let{deltaX:t,deltaY:e,deltaMode:n}=s,i=Mp(n,this.window.width),r=Mp(n,this.window.height);t*=i,e*=r,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:s})});Ht(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=s,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Rs),this.element.addEventListener("touchstart",this.onTouchStart,Rs),this.element.addEventListener("touchmove",this.onTouchMove,Rs),this.element.addEventListener("touchend",this.onTouchEnd,Rs)}on(s,t){return this.emitter.on(s,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Rs),this.element.removeEventListener("touchstart",this.onTouchStart,Rs),this.element.removeEventListener("touchmove",this.onTouchMove,Rs),this.element.removeEventListener("touchend",this.onTouchEnd,Rs)}},bp=s=>Math.min(1,1.001-2**(-10*s)),Ep=class{constructor({wrapper:s=window,content:t=document.documentElement,eventsTarget:e=s,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:r=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:h=!1,orientation:d="vertical",gestureOrientation:u=d==="horizontal"?"both":"vertical",touchMultiplier:f=1,wheelMultiplier:p=1,autoResize:_=!0,prevent:m,virtualScroll:g,overscroll:y=!0,autoRaf:M=!1,anchors:v=!1,autoToggle:E=!1,allowNestedScroll:A=!1,__experimental__naiveDimensions:x=!1,naiveDimensions:S=x,stopInertiaOnNavigate:P=!1,respectReducedMotion:w=!0}={}){Ht(this,"_isScrolling",!1);Ht(this,"_isStopped",!1);Ht(this,"_isLocked",!1);Ht(this,"_preventNextNativeScrollEvent",!1);Ht(this,"_resetVelocityTimeout",null);Ht(this,"_rafId",null);Ht(this,"_isDraggingSelection",!1);Ht(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Ht(this,"isTouching");Ht(this,"isIos");Ht(this,"time",0);Ht(this,"userData",{});Ht(this,"lastVelocity",0);Ht(this,"velocity",0);Ht(this,"direction",0);Ht(this,"options");Ht(this,"targetScroll");Ht(this,"animatedScroll");Ht(this,"animate",new B0);Ht(this,"emitter",new wp);Ht(this,"dimensions");Ht(this,"virtualScroll");Ht(this,"onScrollEnd",s=>{s instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&s.stopPropagation()});Ht(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ht(this,"onTransitionEnd",s=>{s.propertyName?.includes("overflow")&&s.target===this.rootElement&&this.checkOverflow()});Ht(this,"onClick",s=>{let t=s.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){let n=t.find(i=>e.host===i.host&&e.pathname===i.pathname&&i.hash);if(n){let i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,r=decodeURIComponent(n.hash);this.scrollTo(r,i);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});Ht(this,"onPointerDown",s=>{s.button===1&&this.reset()});Ht(this,"onVirtualScroll",s=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(s)===!1)return;let{deltaX:t,deltaY:e,event:n}=s;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;let i=n.type.includes("touch"),r=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";let o=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));let c=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(p=>p instanceof HTMLElement&&(typeof c=="function"&&c?.(p)||p.hasAttribute?.("data-lenis-prevent")||h==="vertical"&&p.hasAttribute?.("data-lenis-prevent-vertical")||h==="horizontal"&&p.hasAttribute?.("data-lenis-prevent-horizontal")||i&&p.hasAttribute?.("data-lenis-prevent-touch")||r&&p.hasAttribute?.("data-lenis-prevent-wheel")||this.options.allowNestedScroll&&this.hasNestedScroll(p,{deltaX:t,deltaY:e}))))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&r)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let d=e;this.options.gestureOrientation==="both"?d=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();let u=i&&this.options.syncTouch,f=i&&n.type==="touchend";f&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...u?{lerp:f?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ht(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){let s=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-s,this.direction=Math.sign(this.animatedScroll-s),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ht(this,"raf",s=>{let t=s-(this.time||s);this.time=s,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Sp,window.lenis||(window.lenis={}),window.lenis.version=Sp,d==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!s||s===document.documentElement)&&(s=window),typeof a=="number"&&typeof l!="function"?l=bp:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:s,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:r,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:h,gestureOrientation:u,orientation:d,touchMultiplier:f,wheelMultiplier:p,autoResize:_,prevent:m,virtualScroll:g,overscroll:y,autoRaf:M,anchors:v,autoToggle:E,allowNestedScroll:A,naiveDimensions:S,stopInertiaOnNavigate:P,respectReducedMotion:w},this.dimensions=new k0(s,t,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new G0(e,{touchMultiplier:f,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(s,t){return this.emitter.on(s,t)}off(s,t){return this.emitter.off(s,t)}get overflow(){let s=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[s]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(s){this.isHorizontal?this.options.wrapper.scrollTo({left:s,behavior:"instant"}):this.options.wrapper.scrollTo({top:s,behavior:"instant"})}isTouchOnSelectionHandle(s){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let e=s.targetTouches[0]??s.changedTouches[0];if(!e)return!1;let n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;let i=n[0],r=n[n.length-1],o=40,a=Math.hypot(e.clientX-i.left,e.clientY-i.top)<=o,l=Math.hypot(e.clientX-r.right,e.clientY-r.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(s,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:i=!0,lerp:r=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:a=i?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:d}={}){if(this.prefersReducedMotion&&(i?e=!0:(r=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!h)return;let u=s,f=t;if(typeof u=="string"&&["top","left","start","#"].includes(u))u=0;else if(typeof u=="string"&&["bottom","right","end"].includes(u))u=this.limit;else{let p=null;if(typeof u=="string"?(p=u.startsWith("#")?document.getElementById(u.slice(1)):document.querySelector(u),p||(u==="#top"?u=0:console.warn("Lenis: Target not found",u))):u instanceof Element&&(p=u),p){if(this.options.wrapper!==window){let v=this.rootElement.getBoundingClientRect();f-=this.isHorizontal?v.left:v.top}let _=p.getBoundingClientRect(),m=getComputedStyle(p),g=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),y=getComputedStyle(this.rootElement),M=this.isHorizontal?Number.parseFloat(y.scrollPaddingLeft):Number.parseFloat(y.scrollPaddingTop);u=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(g)?0:g)-(Number.isNaN(M)?0:M)}}if(typeof u=="number"){if(u+=f,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;let p=u-this.animatedScroll;p>this.limit/2?u-=this.limit:p<-this.limit/2&&(u+=this.limit)}}else u=Tp(0,u,this.limit);if(u===this.targetScroll){l?.(this),c?.(this);return}if(this.userData=d??{},e){this.animatedScroll=this.targetScroll=u,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=u),typeof o=="number"&&typeof a!="function"?a=bp:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,u,{duration:o,easing:a,lerp:r,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l?.(this)},onUpdate:(p,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=p-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=p,this.setScroll(this.scroll),i&&(this.targetScroll=p),_||this.emit(),_&&(this.reset(),this.emit(),c?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(s,{deltaX:t,deltaY:e}){let n=Date.now();s._lenis||(s._lenis={});let i=s._lenis,r,o,a,l,c,h,d,u,f,p;if(n-(i.time??0)>2e3){i.time=Date.now();let A=window.getComputedStyle(s);if(i.computedStyle=A,r=["auto","overlay","scroll"].includes(A.overflowX),o=["auto","overlay","scroll"].includes(A.overflowY),c=["auto"].includes(A.overscrollBehaviorX),h=["auto"].includes(A.overscrollBehaviorY),i.hasOverflowX=r,i.hasOverflowY=o,!(r||o))return!1;d=s.scrollWidth,u=s.scrollHeight,f=s.clientWidth,p=s.clientHeight,a=d>f,l=u>p,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=d,i.scrollHeight=u,i.clientWidth=f,i.clientHeight=p,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=h}else a=i.isScrollableX,l=i.isScrollableY,r=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,u=i.scrollHeight,f=i.clientWidth,p=i.clientHeight,c=i.hasOverscrollBehaviorX,h=i.hasOverscrollBehaviorY;if(!(r&&a||o&&l))return!1;let _=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical",m,g,y,M,v,E;if(_==="horizontal")m=Math.round(s.scrollLeft),g=d-f,y=t,M=r,v=a,E=c;else if(_==="vertical")m=Math.round(s.scrollTop),g=u-p,y=e,M=o,v=l,E=h;else return!1;return!E&&(m>=g||m<=0)?!0:(y>0?m<g:m>0)&&M&&v}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){let s=this.options.wrapper;return this.isHorizontal?s.scrollX??s.scrollLeft:s.scrollY??s.scrollTop}get scroll(){return this.options.infinite?F0(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(s){this._isScrolling!==s&&(this._isScrolling=s,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(s){this._isStopped!==s&&(this._isStopped=s,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(s){this._isLocked!==s&&(this._isLocked=s,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let s="lenis";return this.options.autoToggle&&(s+=" lenis-autoToggle"),this.isStopped&&(s+=" lenis-stopped"),this.isLocked&&(s+=" lenis-locked"),this.isScrolling&&(s+=" lenis-scrolling"),this.isScrolling==="smooth"&&(s+=" lenis-smooth"),s}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(s=>{this.rootElement.classList.add(s)})}cleanUpClassName(){for(let s of Array.from(this.rootElement.classList))(s==="lenis"||s.startsWith("lenis-"))&&this.rootElement.classList.remove(s)}};function is(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Op(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}var Jn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Jo={duration:.5,overwrite:!1,delay:0},Vu,pn,Oe,xi=1e8,be=1/xi,Du=Math.PI*2,H0=Du/4,W0=0,Up=Math.sqrt,X0=Math.cos,q0=Math.sin,sn=function(t){return typeof t=="string"},We=function(t){return typeof t=="function"},rs=function(t){return typeof t=="number"},zl=function(t){return typeof t>"u"},Gi=function(t){return typeof t=="object"},Zn=function(t){return t!==!1},Gu=function(){return typeof window<"u"},Cl=function(t){return We(t)||sn(t)},Fp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},bn=Array.isArray,Y0=/random\([^)]+\)/g,Z0=/,\s*/g,Ap=/(?:-?\.?\d|\.)+/gi,Hu=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,cr=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Eu=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Wu=/[+-]=-?[.\d]+/,J0=/[^,'"\[\]\s]+/gi,$0=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ze,ki,Nu,Xu,si={},Ll={},Bp,zp=function(t){return(Ll=Vr(t,si))&&Tn},kl=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},$o=function(t,e){return!e&&console.warn(t)},kp=function(t,e){return t&&(si[t]=e)&&Ll&&(Ll[t]=e)||si},Ko=function(){return 0},K0={suppressEvents:!0,isStart:!0,kill:!1},Rl={suppressEvents:!0,kill:!1},Q0={suppressEvents:!0},qu={},Is=[],Ou={},Vp,qn={},Au={},Cp=30,Pl=[],Yu="",Zu=function(t){var e=t[0],n,i;if(Gi(e)||We(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Pl.length;i--&&!Pl[i].targetTest(e););n=Pl[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Qu(t[i],n)))||t.splice(i,1);return t},Ls=function(t){return t._gsap||Zu(vi(t))[0]._gsap},Ju=function(t,e,n){return(n=t[e])&&We(n)?t[e]():zl(n)&&t.getAttribute&&t.getAttribute(e)||n},Un=function(t,e){return(t=t.split(",")).forEach(e)||t},Xe=function(t){return Math.round(t*1e5)/1e5||0},Be=function(t){return Math.round(t*1e7)/1e7||0},hr=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},j0=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Dl=function(){var t=Is.length,e=Is.slice(0),n,i;for(Ou={},Is.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},$u=function(t){return!!(t._initted||t._startAt||t.add)},Gp=function(t,e,n,i){Is.length&&!pn&&Dl(),t.render(e,n,i||!!(pn&&e<0&&$u(t))),Is.length&&!pn&&Dl()},Hp=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(J0).length<2?e:sn(t)?t.trim():t},Wp=function(t){return t},ri=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},tx=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Vr=function(t,e){for(var n in e)t[n]=e[n];return t},Rp=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Gi(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},Nl=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},qo=function(t){var e=t.parent||ze,n=t.keyframes?tx(bn(t.keyframes)):ri;if(Zn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},ex=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Xp=function(t,e,n,i,r){n===void 0&&(n="_first"),i===void 0&&(i="_last");var o=t[i],a;if(r)for(a=e[r];o&&o[r]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Vl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,o=e._next;r?r._next=o:t[n]===e&&(t[n]=o),o?o._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},Ds=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},or=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},nx=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Uu=function(t,e,n,i){return t._startAt&&(pn?t._startAt.revert(Rl):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},ix=function s(t){return!t||t._ts&&s(t.parent)},Pp=function(t){return t._repeat?Gr(t._tTime,t=t.duration()+t._rDelay)*t:0},Gr=function(t,e){var n=Math.floor(t=Be(t/e));return t&&n===t?n-1:n},Ol=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Gl=function(t){return t._end=Be(t._start+(t._tDur/Math.abs(t._ts||t._rts||be)||0))},Hl=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Be(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Gl(t),n._dirty||or(n,t)),t},qp=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=Ol(t.rawTime(),e),(!e._dur||ea(0,e.totalDuration(),n)-e._tTime>be)&&e.render(n,!0)),or(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-be}},Vi=function(t,e,n,i){return e.parent&&Ds(e),e._start=Be((rs(n)?n:!n&&Ul(e)&&(!t._last||t._last._start>=t._time)?t._last?t._last._start:t._time:n||t!==ze?_i(t,n,e):t._time)+e._delay),e._end=Be(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Xp(t,e,"_first","_last",t._sort?"_start":0),Ul(e)||(t._recent=e),i||qp(t,e),t._ts<0&&Hl(t,t._tTime),t},Yp=function(t,e){return(si.ScrollTrigger||kl("scrollTrigger",e))&&si.ScrollTrigger.create(e,t)},Zp=function(t,e,n,i,r){if(ef(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!pn&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Vp!==Yn.frame)return Is.push(t),t._lazy=[r,i],1},sx=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},Ul=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},rx=function(t,e,n,i){var r=t.ratio,o=e<0||!e&&(!t._start&&sx(t)&&!(!t._initted&&Ul(t))||(t._ts<0||t._dp._ts<0)&&!Ul(t))?0:1,a=t._rDelay,l=0,c,h,d;if(a&&t._repeat&&(l=ea(0,t._tDur,e),h=Gr(l,a),t._yoyo&&h&1&&(o=1-o),h!==Gr(t._tTime,a)&&(r=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==r||pn||i||t._zTime===be||!e&&t._zTime){if(!t._initted&&Zp(t,e,i,n,l))return;for(d=t._zTime,t._zTime=e||(n?be:0),n||(n=e&&!d),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Uu(t,e,n,!0),t._onUpdate&&!n&&ii(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&ii(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&Ds(t,1),!n&&!pn&&(ii(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},ox=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Hr=function(t,e,n,i){var r=t._repeat,o=Be(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=r?r<0?1e10:Be(o*(r+1)+t._rDelay*r):o,a>0&&!i&&Hl(t,t._tTime=t._tDur*a),t.parent&&Gl(t),n||or(t.parent,t),t},Ip=function(t){return t instanceof Mn?or(t):Hr(t,t._dur)},ax={_start:0,endTime:Ko,totalDuration:Ko},_i=function s(t,e,n){var i=t.labels,r=t._recent||ax,o=t.duration()>=xi?r.endTime(!1):t._dur,a,l,c;return sn(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?r:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(bn(n)?n[0]:n).totalDuration()),a>1?s(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Yo=function(t,e,n){var i=rs(e[1]),r=(i?2:1)+(t<2?0:1),o=e[r],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Zn(l.vars.inherit)&&l.parent;o.immediateRender=Zn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[r-1]}return new Ye(e[0],o,e[r+1])},Ns=function(t,e){return t||t===0?e(t):e},ea=function(t,e,n){return n<t?t:n>e?e:n},mn=function(t,e){return!sn(t)||!(e=$0.exec(t))?"":e[1]},lx=function(t,e,n){return Ns(n,function(i){return ea(t,e,i)})},Fu=[].slice,Jp=function(t,e){return t&&Gi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Gi(t[0]))&&!t.nodeType&&t!==ki},cx=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return sn(i)&&!e||Jp(i,1)?(r=n).push.apply(r,vi(i)):n.push(i)})||n},vi=function(t,e,n){return Oe&&!e&&Oe.selector?Oe.selector(t):sn(t)&&!n&&(Nu||!Wr())?Fu.call((e||Xu).querySelectorAll(t),0):bn(t)?cx(t,n):Jp(t)?Fu.call(t,0):t?[t]:[]},Bu=function(t){return t=vi(t)[0]||$o("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return vi(e,n.querySelectorAll?n:n===t?$o("Invalid scope")||Xu.createElement("div"):t)}},$p=function(t){return t.sort(function(){return .5-Math.random()})},Kp=function(t){if(We(t))return t;var e=Gi(t)?t:{each:t},n=ar(e.ease),i=e.from||0,r=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,d=i;return sn(i)?h=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],d=i[1]),function(u,f,p){var _=(p||e).length,m=o[_],g,y,M,v,E,A,x,S,P;if(!m){if(P=e.grid==="auto"?0:(e.grid||[1,xi])[1],!P){for(x=-xi;x<(x=p[P++].getBoundingClientRect().left)&&P<_;);P<_&&P--}for(m=o[_]=[],g=l?Math.min(P,_)*h-.5:i%P,y=P===xi?0:l?_*d/P-.5:i/P|0,x=0,S=xi,A=0;A<_;A++)M=A%P-g,v=y-(A/P|0),m[A]=E=c?Math.abs(c==="y"?v:M):Up(M*M+v*v),E>x&&(x=E),E<S&&(S=E);i==="random"&&$p(m),m.max=x-S,m.min=S,m.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(P>_?_-1:c?c==="y"?_/P:P:Math.max(P,_/P))||0)*(i==="edges"?-1:1),m.b=_<0?r-_:r,m.u=mn(e.amount||e.each)||0,n=n&&_<0?Mx(n):n}return _=(m[u]-m.min)/m.max||0,Be(m.b+(n?n(_):_)*m.v)+m.u}},zu=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Be(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(rs(n)?0:mn(n))}},Qp=function(t,e){var n=bn(t),i,r;return!n&&Gi(t)&&(i=n=t.radius||xi,t.values?(t=vi(t.values),(r=!rs(t[0]))&&(i*=i)):t=zu(t.increment)),Ns(e,n?We(t)?function(o){return r=t(o),Math.abs(r-o)<=i?r:o}:function(o){for(var a=parseFloat(r?o.x:o),l=parseFloat(r?o.y:0),c=xi,h=0,d=t.length,u,f;d--;)r?(u=t[d].x-a,f=t[d].y-l,u=u*u+f*f):u=Math.abs(t[d]-a),u<c&&(c=u,h=d);return h=!i||c<=i?t[h]:o,r||h===o||rs(o)?h:h+mn(o)}:zu(t))},jp=function(t,e,n,i){return Ns(bn(t)?!e:n===!0?!!(n=0):!i,function(){return bn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},hx=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,o){return o(r)},i)}},ux=function(t,e){return function(n){return t(parseFloat(n))+(e||mn(n))}},fx=function(t,e,n){return em(t,e,0,1,n)},tm=function(t,e,n){return Ns(n,function(i){return t[~~e(i)]})},dx=function s(t,e,n){var i=e-t;return bn(t)?tm(t,s(0,t.length),e):Ns(n,function(r){return(i+(r-t)%i)%i+t})},px=function s(t,e,n){var i=e-t,r=i*2;return bn(t)?tm(t,s(0,t.length-1),e):Ns(n,function(o){return o=(r+(o-t)%r)%r||0,t+(o>i?r-o:o)})},Xr=function(t){return t.replace(Y0,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(Z0);return jp(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},em=function(t,e,n,i,r){var o=e-t,a=i-n;return Ns(r,function(l){return n+((l-t)/o*a||0)})},mx=function s(t,e,n,i){var r=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!r){var o=sn(t),a={},l,c,h,d,u;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(bn(t)&&!bn(e)){for(h=[],d=t.length,u=d-2,c=1;c<d;c++)h.push(s(t[c-1],t[c]));d--,r=function(p){p*=d;var _=Math.min(u,~~p);return h[_](p-_)},n=e}else i||(t=Vr(bn(t)?[]:{},t));if(!h){for(l in e)ju.call(a,t,l,"get",e[l]);r=function(p){return rf(p,a)||(o?t.p:t)}}}return Ns(n,r)},Lp=function(t,e,n){var i=t.labels,r=xi,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&r>(a=Math.abs(a))&&(l=o,r=a);return l},ii=function(t,e,n){var i=t.vars,r=i[e],o=Oe,a=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&Is.length&&Dl(),a&&(Oe=a),h=l?r.apply(c,l):r.call(c),Oe=o,h},Wo=function(t){return Ds(t),t.scrollTrigger&&t.scrollTrigger.kill(!!pn),t.progress()<1&&ii(t,"onInterrupt"),t},kr,nm=[],im=function(t){if(t)if(t=!t.name&&t.default||t,Gu()||t.headless){var e=t.name,n=We(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:Ko,render:rf,add:ju,kill:Lx,modifier:Ix,rawVars:0},o={targetTest:0,get:0,getSetter:Wl,aliases:{},register:0};if(Wr(),t!==i){if(qn[e])return;ri(i,ri(Nl(t,r),o)),Vr(i.prototype,Vr(r,Nl(t,o))),qn[i.prop=e]=i,t.targetTest&&(Pl.push(i),qu[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}kp(e,i),t.register&&t.register(Tn,i,Fn)}else nm.push(t)},Ae=255,Xo={aqua:[0,Ae,Ae],lime:[0,Ae,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ae],navy:[0,0,128],white:[Ae,Ae,Ae],olive:[128,128,0],yellow:[Ae,Ae,0],orange:[Ae,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ae,0,0],pink:[Ae,192,203],cyan:[0,Ae,Ae],transparent:[Ae,Ae,Ae,0]},Cu=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Ae+.5|0},sm=function(t,e,n){var i=t?rs(t)?[t>>16,t>>8&Ae,t&Ae]:0:Xo.black,r,o,a,l,c,h,d,u,f,p;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Xo[t])i=Xo[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+r+r+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Ae,i&Ae,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Ae,t&Ae]}else if(t.substr(0,3)==="hsl"){if(i=p=t.match(Ap),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,r=h*2-o,i.length>3&&(i[3]*=1),i[0]=Cu(l+1/3,r,o),i[1]=Cu(l,r,o),i[2]=Cu(l-1/3,r,o);else if(~t.indexOf("="))return i=t.match(Hu),n&&i.length<4&&(i[3]=1),i}else i=t.match(Ap)||Xo.transparent;i=i.map(Number)}return e&&!p&&(r=i[0]/Ae,o=i[1]/Ae,a=i[2]/Ae,d=Math.max(r,o,a),u=Math.min(r,o,a),h=(d+u)/2,d===u?l=c=0:(f=d-u,c=h>.5?f/(2-d-u):f/(d+u),l=d===r?(o-a)/f+(o<a?6:0):d===o?(a-r)/f+2:(r-o)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},rm=function(t){var e=[],n=[],i=-1;return t.split(ss).forEach(function(r){var o=r.match(cr)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Dp=function(t,e,n){var i="",r=(t+i).match(ss),o=e?"hsla(":"rgba(",a=0,l,c,h,d;if(!r)return t;if(r=r.map(function(u){return(u=sm(u,e,1))&&o+(e?u[0]+","+u[1]+"%,"+u[2]+"%,"+u[3]:u.join(","))+")"}),n&&(h=rm(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(ss,"1").split(cr),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?r.shift()||o+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(ss),d=c.length-1;a<d;a++)i+=c[a]+r[a];return i+c[d]},ss=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Xo)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),gx=/hsl[a]?\(/,Ku=function(t){var e=t.join(" "),n;if(ss.lastIndex=0,ss.test(e))return n=gx.test(e),t[1]=Dp(t[1],n),t[0]=Dp(t[0],n,rm(t[1])),!0},Qo,Yn=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,o=r,a=[],l,c,h,d,u,f,p=function _(m){var g=s()-i,y=m===!0,M,v,E,A;if((g>t||g<0)&&(n+=g-e),i+=g,E=i-n,M=E-o,(M>0||y)&&(A=++d.frame,u=E-d.time*1e3,d.time=E=E/1e3,o+=M+(M>=r?0:r-M),v=1),y||(l=c(_)),v)for(f=0;f<a.length;f++)a[f](E,u,A,m)};return d={time:0,frame:0,tick:function(){p(!0)},deltaRatio:function(m){return u/(1e3/(m||60))},wake:function(){Bp&&(!Nu&&Gu()&&(ki=Nu=window,Xu=ki.document||{},si.gsap=Tn,(ki.gsapVersions||(ki.gsapVersions=[])).push(Tn.version),zp(Ll||ki.GreenSockGlobals||!ki.gsap&&ki||{}),nm.forEach(im)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=h||function(m){return setTimeout(m,o-d.time*1e3+1|0)},Qo=1,p(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),Qo=0,c=Ko},lagSmoothing:function(m,g){t=m||1/0,e=Math.min(g||33,t)},fps:function(m){r=1e3/(m||240),o=d.time*1e3+r},add:function(m,g,y){var M=g?function(v,E,A,x){m(v,E,A,x),d.remove(M)}:m;return d.remove(m),a[y?"unshift":"push"](M),Wr(),M},remove:function(m,g){~(g=a.indexOf(m))&&a.splice(g,1)&&f>=g&&f--},_listeners:a},d})(),Wr=function(){return!Qo&&Yn.wake()},me={},_x=/^[\d.\-M][\d.\-,\s]/,xx=/["']/g,vx=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,o=n.length,a,l,c;r<o;r++)l=n[r],a=r!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(xx,"").trim():+c,i=l.substr(a+1).trim();return e},yx=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},Sx=function(t){var e=(t+"").split("("),n=me[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[vx(e[1])]:yx(t).split(",").map(Hp)):me._CE&&_x.test(t)?me._CE("",t):n},Mx=function(t){return function(e){return 1-t(1-e)}},ar=function(t,e){return t&&(We(t)?t:me[t]||Sx(t))||e},ur=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},o;return Un(t,function(a){me[a]=si[a]=r,me[o=a.toLowerCase()]=n;for(var l in r)me[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=me[a+"."+l]=r[l]}),r},om=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Ru=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),o=r/Du*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*q0((h-o)*r)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:om(a);return r=Du/r,l.config=function(c,h){return s(t,c,h)},l},Pu=function s(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:om(n);return i.config=function(r){return s(t,r)},i};Un("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;ur(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});me.Linear.easeNone=me.none=me.Linear.easeIn;ur("Elastic",Ru("in"),Ru("out"),Ru());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(a){return a<e?s*a*a:a<n?s*Math.pow(a-1.5/t,2)+.75:a<i?s*(a-=2.25/t)*a+.9375:s*Math.pow(a-2.625/t,2)+.984375};ur("Bounce",function(o){return 1-r(1-o)},r)})(7.5625,2.75);ur("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});ur("Circ",function(s){return-(Up(1-s*s)-1)});ur("Sine",function(s){return s===1?1:-X0(s*H0)+1});ur("Back",Pu("in"),Pu("out"),Pu());me.SteppedEase=me.steps=si.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,o=1-be;return function(a){return((i*ea(0,o,a)|0)+r)*n}}};Jo.ease=me["quad.out"];Un("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Yu+=s+","+s+"Params,"});var Qu=function(t,e){this.id=W0++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Ju,this.set=e?e.getSetter:Wl},jo=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Hr(this,+e.duration,1,1),this.data=e.data,Oe&&(this._ctx=Oe,Oe.data.push(this)),Qo||Yn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Hr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Wr(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Hl(this,n),!r._dp||r.parent||qp(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Vi(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===be||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Gp(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Pp(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Pp(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?Gr(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-be?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?Ol(this.parent._time,this):this._tTime,o=this._rts<0;this._rts=+n||0,this._ts=this._ps||n===-be?0:this._rts;var a=this.totalDuration();return(o!==this._rts<0||r>0&&r<a)&&this.totalTime(ea(-Math.abs(this._delay),a,r),i!==!1),Gl(this),nx(this)},t.paused=function(n){if(!arguments.length)return this._ps;if(this._ps!==n)if(this._ps=n,n)this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0;else{Wr(),this._ts=this._rts;var i=this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,r=this.progress()===1&&Math.abs(this._zTime)!==be,o;if(r)for(this._tTime-=be,o=this._first;o;){if(!o._dur&&o._zTime<0&&o._ts&&o._start<=i+be){r=!1;break}o=o._next}this.totalTime(i,r)}return this},t.startTime=function(n){if(arguments.length){this._start=Be(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Vi(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Zn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Ol(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Q0);var i=pn;return pn=n,$u(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),pn=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Ip(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Ip(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(_i(this,n),Zn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Zn(i)),this._dur||(this._zTime=-be),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-be:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-be,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-be)},t.eventCallback=function(n,i,r){var o=this.vars;return arguments.length>1?(i?(o[n]=i,r&&(o[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(o){var a=We(n)?n:Wp,l=function(){var h=i.then;i.then=null,r&&r(),We(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=h),o(a),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Wo(this)},s})();ri(jo.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-be,_prom:0,_ps:!1,_rts:1});var Mn=(function(s){Op(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=Zn(n.sortChildren),ze&&Vi(n.parent||ze,is(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&Yp(is(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,o){return Yo(0,arguments,this),this},e.from=function(i,r,o){return Yo(1,arguments,this),this},e.fromTo=function(i,r,o,a){return Yo(2,arguments,this),this},e.set=function(i,r,o){return r.duration=0,r.parent=this,qo(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Ye(i,r,_i(this,o),1),this},e.call=function(i,r,o){return Vi(this,Ye.delayedCall(0,i,r),o)},e.staggerTo=function(i,r,o,a,l,c,h){return o.duration=r,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new Ye(i,o,_i(this,l)),this},e.staggerFrom=function(i,r,o,a,l,c,h){return o.runBackwards=1,qo(o).immediateRender=Zn(o.immediateRender),this.staggerTo(i,r,o,a,l,c,h)},e.staggerFromTo=function(i,r,o,a,l,c,h,d){return a.startAt=o,qo(a).immediateRender=Zn(a.immediateRender),this.staggerTo(i,r,a,l,c,h,d)},e.render=function(i,r,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Be(i),d=this._zTime<0!=i<0&&(this._initted||!c),u,f,p,_,m,g,y,M,v,E,A,x;if(this!==ze&&h>l&&i>=0&&(h=l),h!==this._tTime||o||d){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),u=h,v=this._start,M=this._ts,g=!M,d&&(c||(a=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(A=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,r,o);if(u=Be(h%m),h===l?(_=this._repeat,u=c):(E=Be(h/m),_=~~E,_&&_===E&&(u=c,_--),u>c&&(u=c)),E=Gr(this._tTime,m),!a&&this._tTime&&E!==_&&this._tTime-E*m-this._dur<=0&&(E=_),A&&_&1&&(u=c-u,x=1),_!==E&&!this._lock){var S=A&&E&1,P=S===(A&&_&1);if(_<E&&(S=!S),a=S?0:h%c?c:h,this._lock=1,this.render(a||(x?0:Be(_*m)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&ii(this,"onRepeat"),this.vars.repeatRefresh&&!x&&(this.invalidate()._lock=1,E=_),a&&a!==this._time||g!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,P&&(this._lock=2,a=S?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!x&&this.invalidate()),this._lock=0,!this._ts&&!g)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=ox(this,Be(a),Be(u)),y&&(h-=u-(u=y._start))),this._tTime=h,this._time=u,this._act=!!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&c&&!r&&!E&&(ii(this,"onStart"),this._tTime!==h))return this;if(u>=a&&i>=0)for(f=this._first;f;){if(p=f._next,(f._act||u>=f._start)&&f._ts&&y!==f){if(f.parent!==this)return this.render(i,r,o);if(f.render(f._ts>0?(u-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(u-f._start)*f._ts,r,o),u!==this._time||!this._ts&&!g){y=0,p&&(h+=this._zTime=-be);break}}f=p}else{f=this._last;for(var w=i<0?i:u;f;){if(p=f._prev,(f._act||w<=f._end)&&f._ts&&y!==f){if(f.parent!==this)return this.render(i,r,o);if(f.render(f._ts>0?(w-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(w-f._start)*f._ts,r,o||pn&&$u(f)),u!==this._time||!this._ts&&!g){y=0,p&&(h+=this._zTime=w?-be:be);break}}f=p}}if(y&&!r&&(this.pause(),y.render(u>=a?0:-be)._zTime=u>=a?1:-1,this._ts))return this._start=v,Gl(this),this.render(i,r,o);this._onUpdate&&!r&&ii(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(v===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ds(this,1),!r&&!(i<0&&!a)&&(h||a||!l)&&(ii(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var o=this;if(rs(r)||(r=_i(this,r,i)),!(i instanceof jo)){if(bn(i))return i.forEach(function(a){return o.add(a,r)}),this;if(sn(i))return this.addLabel(i,r);if(We(i))i=Ye.delayedCall(0,i);else return this}return this!==i?Vi(this,i,r):this},e.getChildren=function(i,r,o,a){i===void 0&&(i=!0),r===void 0&&(r=!0),o===void 0&&(o=!0),a===void 0&&(a=-xi);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ye?r&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,o)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),o=r.length;o--;)if(r[o].vars.id===i)return r[o]},e.remove=function(i){return sn(i)?this.removeLabel(i):We(i)?this.killTweensOf(i):(i.parent===this&&Vl(this,i),i===this._recent&&(this._recent=this._last),or(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Be(Yn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=_i(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,o){var a=Ye.delayedCall(0,r||Ko,o);return a.data="isPause",this._hasPause=1,Vi(this,a,_i(this,i))},e.removePause=function(i){var r=this._first;for(i=_i(this,i);r;)r._start===i&&r.data==="isPause"&&Ds(r),r=r._next},e.killTweensOf=function(i,r,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Ps!==a[l]&&a[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var o=[],a=vi(i),l=this._first,c=rs(r),h;l;)l instanceof Ye?j0(l._targets,a)&&(c?(!Ps||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&o.push(l):(h=l.getTweensOf(a,r)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,r){r=r||{};var o=this,a=_i(o,i),l=r,c=l.startAt,h=l.onStart,d=l.onStartParams,u=l.immediateRender,f,p=Ye.to(o,ri({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||be,onStart:function(){if(o.pause(),!f){var m=r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());p._dur!==m&&Hr(p,m,0,1).render(p._time,!0,!0),f=1}h&&h.apply(p,d||[])}},r));return u?p.render(0):p},e.tweenFromTo=function(i,r,o){return this.tweenTo(r,ri({startAt:{time:_i(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Lp(this,_i(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Lp(this,_i(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+be)},e.shiftChildren=function(i,r,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=Be(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(r)for(c in l)l[c]>=o&&(l[c]+=i);return or(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,o;r;)o=r._next,this.remove(r),r=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),or(this)},e.totalDuration=function(i){var r=0,o=this,a=o._last,l=xi,c,h,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Vi(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(r-=h,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=Be(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>r&&a._ts&&(r=a._end),a=c;Hr(o,o===ze&&o._time>r?o._time:r,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(ze._ts&&(Gp(ze,Ol(i,ze)),Vp=Yn.frame),Yn.frame>=Cp){Cp+=Jn.autoSleep||120;var r=ze._first;if((!r||!r._ts)&&Jn.autoSleep&&Yn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||Yn.sleep()}}},t})(jo);ri(Mn.prototype,{_lock:0,_hasPause:0,_forcing:0});var bx=function(t,e,n,i,r,o,a){var l=new Fn(this._pt,t,e,0,1,sf,null,r),c=0,h=0,d,u,f,p,_,m,g,y;for(l.b=n,l.e=i,n+="",i+="",(g=~i.indexOf("random("))&&(i=Xr(i)),o&&(y=[n,i],o(y,t,e),n=y[0],i=y[1]),u=n.match(Eu)||[];d=Eu.exec(i);)p=d[0],_=i.substring(c,d.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),p!==u[h++]&&(m=parseFloat(u[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:m,c:p.charAt(1)==="="?hr(m,p)-m:parseFloat(p)-m,m:f&&f<4?Math.round:0},c=Eu.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Wu.test(i)||g)&&(l.e=0),this._pt=l,l},ju=function(t,e,n,i,r,o,a,l,c,h){We(i)&&(i=i(r||0,t,o));var d=t[e],u=n!=="get"?n:We(d)?c?t[e.indexOf("set")||!We(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():d,f=We(d)?c?Cx:lm:nf,p;if(sn(i)&&(~i.indexOf("random(")&&(i=Xr(i)),i.charAt(1)==="="&&(p=hr(u,i)+(mn(u)||0),(p||p===0)&&(i=p))),!h||u!==i||ku)return!isNaN(u*i)&&i!==""?(p=new Fn(this._pt,t,e,+u||0,i-(u||0),typeof d=="boolean"?Px:cm,0,f),c&&(p.fp=c),a&&p.modifier(a,this,t),this._pt=p):(!d&&!(e in t)&&kl(e,i),bx.call(this,t,e,u,i,f,l||Jn.stringFilter,c))},Tx=function(t,e,n,i,r){if(We(t)&&(t=Zo(t,r,e,n,i)),!Gi(t)||t.style&&t.nodeType||bn(t)||Fp(t))return sn(t)?Zo(t,r,e,n,i):t;var o={},a;for(a in t)o[a]=Zo(t[a],r,e,n,i);return o},tf=function(t,e,n,i,r,o){var a,l,c,h;if(qn[t]&&(a=new qn[t]).init(r,a.rawVars?e[t]:Tx(e[t],i,r,o,n),n,i,o)!==!1&&(n._pt=l=new Fn(n._pt,r,t,0,1,a.render,a,0,a.priority),n!==kr))for(c=n._ptLookup[n._targets.indexOf(r)],h=a._props.length;h--;)c[a._props[h]]=l;return a},Ps,ku,ef=function s(t,e,n){var i=t.vars,r=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,d=i.yoyoEase,u=i.keyframes,f=i.autoRevert,p=t._dur,_=t._startAt,m=t._targets,g=t.parent,y=g&&g.data==="nested"?g.vars.targets:m,M=t._overwrite==="auto"&&!Vu,v=t.timeline,E=i.easeReverse||d,A,x,S,P,w,L,N,V,I,z,G,F,j;if(v&&(!u||!r)&&(r="none"),t._ease=ar(r,Jo.ease),t._rEase=E&&(ar(E)||t._ease),t._from=!v&&!!i.runBackwards,t._from&&(t.ratio=1),!v||u&&!i.stagger){if(V=m[0]?Ls(m[0]).harness:0,F=V&&i[V.prop],A=Nl(i,qu),_&&(_._zTime<0&&_.progress(1),e<0&&h&&a&&!f?_.render(-1,!0):_.revert(h&&p?Rl:K0),_._lazy=0),o){if(Ds(t._startAt=Ye.set(m,ri({data:"isStart",overwrite:!1,parent:g,immediateRender:!0,lazy:!_&&Zn(l),startAt:null,delay:0,onUpdate:c&&function(){return ii(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(pn||!a&&!f)&&t._startAt.revert(Rl),a&&p&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&p&&!_){if(e&&(a=!1),S=ri({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Zn(l),immediateRender:a,stagger:0,parent:g},A),F&&(S[V.prop]=F),Ds(t._startAt=Ye.set(m,S)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(pn?t._startAt.revert(Rl):t._startAt.render(-1,!0)),t._zTime=e,!a)s(t._startAt,be,be);else if(!e)return}for(t._pt=t._ptCache=0,l=p&&Zn(l)||l&&!p,x=0;x<m.length;x++){if(w=m[x],N=w._gsap||Zu(m)[x]._gsap,t._ptLookup[x]=z={},Ou[N.id]&&Is.length&&Dl(),G=y===m?x:y.indexOf(w),V&&(I=new V).init(w,F||A,t,G,y)!==!1&&(t._pt=P=new Fn(t._pt,w,I.name,0,1,I.render,I,0,I.priority),I._props.forEach(function(X){z[X]=P}),I.priority&&(L=1)),!V||F)for(S in A)qn[S]&&(I=tf(S,A,t,G,w,y))?I.priority&&(L=1):z[S]=P=ju.call(t,w,S,"get",A[S],G,y,0,i.stringFilter);t._op&&t._op[x]&&t.kill(w,t._op[x]),M&&t._pt&&(Ps=t,ze.killTweensOf(w,z,t.globalTime(e)),j=!t.parent,Ps=0),t._pt&&l&&(Ou[N.id]=1)}L&&of(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!j,u&&e<=0&&v.render(xi,!0,!0)},wx=function(t,e,n,i,r,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,d,u,f;if(!c)for(c=t._ptCache[e]=[],u=t._ptLookup,f=t._targets.length;f--;){if(h=u[f][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return ku=1,t.vars[e]="+=0",ef(t,a),ku=0,l?$o(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(f=c.length;f--;)d=c[f],h=d._pt||d,h.s=(i||i===0)&&!r?i:h.s+(i||0)+o*h.c,h.c=n-h.s,d.e&&(d.e=Xe(n)+mn(d.e)),d.b&&(d.b=h.s+mn(d.b))},Ex=function(t,e){var n=t[0]?Ls(t[0]).harness:0,i=n&&n.aliases,r,o,a,l;if(!i)return e;r=Vr({},e);for(o in i)if(o in r)for(l=i[o].split(","),a=l.length;a--;)r[l[a]]=r[o];return r},Ax=function(t,e,n,i){var r=e.ease||i||"power1.inOut",o,a;if(bn(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:r})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:r})},Zo=function(t,e,n,i,r){return We(t)?t.call(e,n,i,r):sn(t)&&~t.indexOf("random(")?Xr(t):t},Fl=Yu+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",am={};Un(Fl+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return am[s]=1});Fl=Fl.split(",");var Ye=(function(s){Op(t,s);function t(n,i,r,o){var a;typeof i=="number"&&(r.duration=i,i=r,r=null),a=s.call(this,o?i:qo(i))||this;var l=a.vars,c=l.duration,h=l.delay,d=l.immediateRender,u=l.stagger,f=l.overwrite,p=l.keyframes,_=l.defaults,m=l.scrollTrigger,g=i.parent||ze,y=(bn(n)||Fp(n)?rs(n[0]):"length"in i)?[n]:vi(n),M,v,E,A,x,S,P,w;if(a._targets=y.length?Zu(y):$o("GSAP target "+n+" not found. https://gsap.com",!Jn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,p||u||Cl(c)||Cl(h)){i=a.vars;var L=i.easeReverse||i.yoyoEase;if(M=a.timeline=new Mn({data:"nested",defaults:_||{},targets:g&&g.data==="nested"?g.vars.targets:y}),M.kill(),M.parent=M._dp=is(a),M._start=0,u||Cl(c)||Cl(h)){if(A=y.length,P=u&&Kp(u),Gi(u))for(x in u)~Fl.indexOf(x)&&(w||(w={}),w[x]=u[x]);for(v=0;v<A;v++)E=Nl(i,am),E.stagger=0,L&&(E.easeReverse=L),w&&Vr(E,w),S=y[v],E.duration=+Zo(c,is(a),v,S,y),E.delay=(+Zo(h,is(a),v,S,y)||0)-a._delay,!u&&A===1&&E.delay&&(a._delay=h=E.delay,a._start+=h,E.delay=0),M.to(S,E,P?P(v,S,y):0),M._ease=me.none;M.duration()?c=h=0:a.timeline=0}else if(p){qo(ri(M.vars.defaults,{ease:"none"})),M._ease=ar(p.ease||i.ease||"none");var N=0,V,I,z;if(bn(p))p.forEach(function(G){return M.to(y,G,">")}),M.duration();else{E={};for(x in p)x==="ease"||x==="easeEach"||Ax(x,p[x],E,p.easeEach);for(x in E)for(V=E[x].sort(function(G,F){return G.t-F.t}),N=0,v=0;v<V.length;v++)I=V[v],z={ease:I.e,duration:(I.t-(v?V[v-1].t:0))/100*c},z[x]=I.v,M.to(y,z,N),N+=z.duration;M.duration()<c&&M.to({},{duration:c-M.duration()})}}c||a.duration(c=M.duration())}else a.timeline=0;return f===!0&&!Vu&&(Ps=is(a),ze.killTweensOf(y),Ps=0),Vi(g,is(a),r),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!p&&a._start===Be(g._time)&&Zn(d)&&ix(is(a))&&g.data!=="nested")&&(a._tTime=-be,a.render(Math.max(0,-h)||0)),m&&Yp(is(a),m),a}var e=t.prototype;return e.render=function(i,r,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,d=i>l-be&&!h?l:i<be?0:i,u,f,p,_,m,g,y,M;if(!c)rx(this,i,r,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(u=d,M=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,o);if(u=Be(d%_),d===l?(p=this._repeat,u=c):(m=Be(d/_),p=~~m,p&&p===m?(u=c,p--):u>c&&(u=c)),g=this._yoyo&&p&1,g&&(u=c-u),m=Gr(this._tTime,_),u===a&&!o&&this._initted&&p===m)return this._tTime=d,this;p!==m&&this.vars.repeatRefresh&&!g&&!this._lock&&u!==_&&this._initted&&(this._lock=o=1,this.render(Be(_*p),!0).invalidate()._lock=0)}if(!this._initted){if(Zp(this,h?i:u,o,r,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&p!==m))return this;if(c!==this._dur)return this.render(i,r,o)}if(this._rEase){var v=u<a;if(v!==this._inv){var E=v?a:c-a;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=E?(v?-1:1)/E:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((u-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(u/c);if(this._from&&(this.ratio=y=1-y),this._tTime=d,this._time=u,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&d&&!r&&!m&&(ii(this,"onStart"),this._tTime!==d))return this;for(f=this._pt;f;)f.r(y,f.d),f=f._next;M&&M.render(i<0?i:M._dur*M._ease(u/this._dur),r,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&Uu(this,i,r,o),ii(this,"onUpdate")),this._repeat&&p!==m&&this.vars.onRepeat&&!r&&this.parent&&ii(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(h&&!this._onUpdate&&Uu(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ds(this,1),!r&&!(h&&!a)&&(d||a||g)&&(ii(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,o,a,l){Qo||Yn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||ef(this,c),h=this._ease(c/this._dur),wx(this,i,r,o,a,h,c,l)?this.resetTo(i,r,o,a,1):(Hl(this,0),this.parent||Xp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Wo(this):this.scrollTrigger&&this.scrollTrigger.kill(!!pn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Ps&&Ps.vars.overwrite!==!0)._first||Wo(this),this.parent&&o!==this.timeline.totalDuration()&&Hr(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?vi(i):a,c=this._ptLookup,h=this._pt,d,u,f,p,_,m,g;if((!r||r==="all")&&ex(a,l))return r==="all"&&(this._pt=0),Wo(this);for(d=this._op=this._op||[],r!=="all"&&(sn(r)&&(_={},Un(r,function(y){return _[y]=1}),r=_),r=Ex(a,r)),g=a.length;g--;)if(~l.indexOf(a[g])){u=c[g],r==="all"?(d[g]=r,p=u,f={}):(f=d[g]=d[g]||{},p=r);for(_ in p)m=u&&u[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Vl(this,m,"_pt"),delete u[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&h&&Wo(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return Yo(1,arguments)},t.delayedCall=function(i,r,o,a){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,r,o){return Yo(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,o){return ze.killTweensOf(i,r,o)},t})(jo);ri(Ye.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Un("staggerTo,staggerFrom,staggerFromTo",function(s){Ye[s]=function(){var t=new Mn,e=Fu.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var nf=function(t,e,n){return t[e]=n},lm=function(t,e,n){return t[e](n)},Cx=function(t,e,n,i){return t[e](i.fp,n)},Rx=function(t,e,n){return t.setAttribute(e,n)},Wl=function(t,e){return We(t[e])?lm:zl(t[e])&&t.setAttribute?Rx:nf},cm=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},Px=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},sf=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},rf=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Ix=function(t,e,n,i){for(var r=this._pt,o;r;)o=r._next,r.p===i&&r.modifier(t,e,n),r=o},Lx=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Vl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},Dx=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},of=function(t){for(var e=t._pt,n,i,r,o;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=r},Fn=(function(){function s(e,n,i,r,o,a,l,c,h){this.t=n,this.s=r,this.c=o,this.p=i,this.r=a||cm,this.d=l||this,this.set=c||nf,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=Dx,this.m=n,this.mt=r,this.tween=i},s})();Un(Yu+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return qu[s]=1});si.TweenMax=si.TweenLite=Ye;si.TimelineLite=si.TimelineMax=Mn;ze=new Mn({sortChildren:!1,defaults:Jo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Jn.stringFilter=Ku;var lr=[],Il={},Nx=[],Np=0,Ox=0,Iu=function(t){return(Il[t]||Nx).map(function(e){return e()})},ta=function(){var t=Date.now(),e=[];t-Np>2&&(Iu("matchMediaInit"),lr.forEach(function(n){var i=n.queries,r=n.conditions,o,a,l,c;for(a in i)o=ki.matchMedia(i[a]).matches,o&&(l=1),o!==r[a]&&(r[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Iu("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Np=t,Iu("matchMedia"))},hm=(function(){function s(e,n){this.selector=n&&Bu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Ox++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){We(n)&&(r=i,i=n,n=We);var o=this,a=function(){var c=Oe,h=o.selector,d;return c&&c!==o&&c.data.push(o),r&&(o.selector=Bu(r)),Oe=o,d=i.apply(o,arguments),We(d)&&o._r.push(d),Oe=c,o.selector=h,o.isReverted=!1,d};return o.last=a,n===We?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Oe;Oe=null,n(this),Oe=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof Ye&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var a=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,d){return d.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof Mn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ye)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i){for(var o=lr.length;o--;)lr[o].id===this.id&&lr.splice(o,1);this._mqs&&this._mqs.forEach(function(a){return a.removeListener?a.removeListener(ta):a.removeEventListener("change",ta)}),this._mqs=null}},t.revert=function(n){this.kill(n||{})},s})(),Ux=(function(){function s(e){this.contexts=[],this.scope=e,Oe&&Oe.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){Gi(n)||(n={matches:n});var o=new hm(0,r||this.scope),a=o.conditions={},l,c,h;Oe&&!o.selector&&(o.selector=Oe.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=ki.matchMedia(n[c]),l&&(lr.indexOf(o)<0&&lr.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(ta):l.addEventListener("change",ta),(o._mqs||(o._mqs=[])).push(l)));return h&&i(o,function(d){return o.add(null,d)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),Bl={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return im(i)})},timeline:function(t){return new Mn(t)},getTweensOf:function(t,e){return ze.getTweensOf(t,e)},getProperty:function(t,e,n,i){sn(t)&&(t=vi(t)[0]);var r=Ls(t||{}).get,o=n?Wp:Hp;return n==="native"&&(n=""),t&&(e?o((qn[e]&&qn[e].get||r)(t,e,n,i)):function(a,l,c){return o((qn[a]&&qn[a].get||r)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=vi(t),t.length>1){var i=t.map(function(h){return Tn.quickSetter(h,e,n)}),r=i.length;return function(h){for(var d=r;d--;)i[d](h)}}t=t[0]||{};var o=qn[e],a=Ls(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var d=new o;kr._pt=0,d.init(t,n?h+n:h,kr,0,[t]),d.render(1,d),kr._pt&&rf(1,kr)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,r=Tn.to(t,ri((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,h){return r.resetTo(e,l,c,h)};return o.tween=r,o},isTweening:function(t){return ze.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=ar(t.ease,Jo.ease)),Rp(Jo,t||{})},config:function(t){return Rp(Jn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!qn[a]&&!si[a]&&$o(e+" effect requires "+a+" plugin.")}),Au[e]=function(a,l,c){return n(vi(a),ri(l||{},r),c)},o&&(Mn.prototype[e]=function(a,l,c){return this.add(Au[e](a,Gi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){me[t]=ar(e)},parseEase:function(t,e){return arguments.length?ar(t,e):me},getById:function(t){return ze.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Mn(t),i,r;for(n.smoothChildTiming=Zn(t.smoothChildTiming),ze.remove(n),n._dp=0,n._time=n._tTime=ze._time,i=ze._first;i;)r=i._next,(e||!(!i._dur&&i instanceof Ye&&i.vars.onComplete===i._targets[0]))&&Vi(n,i,i._start-i._delay),i=r;return Vi(ze,n,0),n},context:function(t,e){return t?new hm(t,e):Oe},matchMedia:function(t){return new Ux(t)},matchMediaRefresh:function(){return lr.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||ta()},addEventListener:function(t,e){var n=Il[t]||(Il[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=Il[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:dx,wrapYoyo:px,distribute:Kp,random:jp,snap:Qp,normalize:fx,getUnit:mn,clamp:lx,splitColor:sm,toArray:vi,selector:Bu,mapRange:em,pipe:hx,unitize:ux,interpolate:mx,shuffle:$p},install:zp,effects:Au,ticker:Yn,updateRoot:Mn.updateRoot,plugins:qn,globalTimeline:ze,core:{PropTween:Fn,globals:kp,Tween:Ye,Timeline:Mn,Animation:jo,getCache:Ls,_removeLinkedListItem:Vl,reverting:function(){return pn},context:function(t){return t&&Oe&&(Oe.data.push(t),t._ctx=Oe),Oe},suppressOverwrites:function(t){return Vu=t}}};Un("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return Bl[s]=Ye[s]});Yn.add(Mn.updateRoot);kr=Bl.to({},{duration:0});var Fx=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Bx=function(t,e){var n=t._targets,i,r,o;for(i in e)for(r=n.length;r--;)o=t._ptLookup[r][i],o&&(o=o.d)&&(o._pt&&(o=Fx(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[r],i))},Lu=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,o){o._onInit=function(a){var l,c;if(sn(r)&&(l={},Un(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}Bx(a,r)}}}},Tn=Bl.registerPlugin({name:"attr",init:function(t,e,n,i,r){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,r,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)pn?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Lu("roundProps",zu),Lu("modifiers"),Lu("snap",Qp))||Bl;Ye.version=Mn.version=Tn.version="3.15.1";Bp=1;Gu()&&Wr();var zx=me.Power0,kx=me.Power1,Vx=me.Power2,Gx=me.Power3,Hx=me.Power4,Wx=me.Linear,Xx=me.Quad,qx=me.Cubic,Yx=me.Quart,Zx=me.Quint,Jx=me.Strong,$x=me.Elastic,Kx=me.Back,Qx=me.SteppedEase,jx=me.Bounce,tv=me.Sine,ev=me.Expo,nv=me.Circ;var um,Os,Yr,ff,mr,iv,fm,df,sv=function(){return typeof window<"u"},as={},pr=180/Math.PI,Zr=Math.PI/180,qr=Math.atan2,dm=1e8,pf=/([A-Z])/g,rv=/(left|right|width|margin|padding|x)/i,ov=/[\s,\(]\S/,Hi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},lf=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},av=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},lv=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},cv=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},hv=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Sm=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Mm=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},uv=function(t,e,n){return t.style[e]=n},fv=function(t,e,n){return t.style.setProperty(e,n)},dv=function(t,e,n){return t._gsap[e]=n},pv=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},mv=function(t,e,n,i,r){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(r,o)},gv=function(t,e,n,i,r){var o=t._gsap;o[e]=n,o.renderTransform(r,o)},ke="transform",$n=ke+"Origin",_v=function s(t,e){var n=this,i=this.target,r=i.style,o=i._gsap;if(t in as&&r){if(this.tfm=this.tfm||{},t!=="transform")t=Hi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=os(i,a)}):this.tfm[t]=o.x?o[t]:os(i,t),t===$n&&(this.tfm.zOrigin=o.zOrigin);else return Hi.transform.split(",").forEach(function(a){return s.call(n,a,e)});if(this.props.indexOf(ke)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push($n,e,"")),t=ke}(r||e)&&this.props.push(t,e,r[t])},bm=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},xv=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,o;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(pf,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=df(),(!r||!r.isStart)&&!n[ke]&&(bm(n),i.zOrigin&&n[$n]&&(n[$n]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Tm=function(t,e){var n={target:t,props:[],revert:xv,save:_v};return t._gsap||Tn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},wm,cf=function(t,e){var n=Os.createElementNS?Os.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Os.createElement(t);return n&&n.style?n:Os.createElement(t)},oi=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(pf,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,Jr(e)||e,1)||""},pm="O,Moz,ms,Ms,Webkit".split(","),Jr=function(t,e,n){var i=e||mr,r=i.style,o=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(pm[o]+t in r););return o<0?null:(o===3?"ms":o>=0?pm[o]:"")+t},hf=function(){sv()&&window.document&&(um=window,Os=um.document,Yr=Os.documentElement,mr=cf("div")||{style:{}},iv=cf("div"),ke=Jr(ke),$n=ke+"Origin",mr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",wm=!!Jr("perspective"),df=Tn.core.reverting,ff=1)},mm=function(t){var e=t.ownerSVGElement,n=cf("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),Yr.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),Yr.removeChild(n),r},gm=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Em=function(t){var e,n;try{e=t.getBBox()}catch{e=mm(t),n=1}return e&&(e.width||e.height)||n||(e=mm(t)),e&&!e.width&&!e.x&&!e.y?{x:+gm(t,["x","cx","x1"])||0,y:+gm(t,["y","cy","y1"])||0,width:0,height:0}:e},Am=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Em(t))},Fs=function(t,e){if(e){var n=t.style,i;e in as&&e!==$n&&(e=ke),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(pf,"-$1").toLowerCase())):n.removeAttribute(e)}},Us=function(t,e,n,i,r,o){var a=new Fn(t._pt,e,n,0,1,o?Mm:Sm);return t._pt=a,a.b=i,a.e=r,t._props.push(n),a},_m={deg:1,rad:1,turn:1},vv={grid:1,flex:1},Bs=function s(t,e,n,i){var r=parseFloat(n)||0,o=(n+"").trim().substr((r+"").length)||"px",a=mr.style,l=rv.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),d=100,u=i==="px",f=i==="%",p,_,m,g;if(i===o||!r||_m[i]||_m[o])return r;if(o!=="px"&&!u&&(r=s(t,e,n,"px")),g=t.getCTM&&Am(t),(f||o==="%")&&(as[e]||~e.indexOf("adius")))return p=g?t.getBBox()[l?"width":"height"]:t[h],Xe(f?r/p*d:r/100*p);if(a[l?"width":"height"]=d+(u?o:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,g&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Os||!_.appendChild)&&(_=Os.body),m=_._gsap,m&&f&&m.width&&l&&m.time===Yn.time&&!m.uncache)return Xe(r/m.width*d);if(f&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=d+i,p=t[h],y?t.style[e]=y:Fs(t,e)}else(f||o==="%")&&!vv[oi(_,"display")]&&(a.position=oi(t,"position")),_===t&&(a.position="static"),_.appendChild(mr),p=mr[h],_.removeChild(mr),a.position="absolute";return l&&f&&(m=Ls(_),m.time=Yn.time,m.width=_[h]),Xe(u?p*r/d:p&&r?d/p*r:0)},os=function(t,e,n,i){var r;return ff||hf(),e in Hi&&e!=="transform"&&(e=Hi[e],~e.indexOf(",")&&(e=e.split(",")[0])),as[e]&&e!=="transform"?(r=sa(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:ql(oi(t,$n))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=Xl[e]&&Xl[e](t,e,n)||oi(t,e)||Ju(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?Bs(t,e,r,n)+n:r},yv=function(t,e,n,i){if(!n||n==="none"){var r=Jr(e,t,1),o=r&&oi(t,r,1);o&&o!==n?(e=r,n=o):e==="borderColor"&&(n=oi(t,"borderTopColor"))}var a=new Fn(this._pt,t.style,e,0,1,sf),l=0,c=0,h,d,u,f,p,_,m,g,y,M,v,E;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=oi(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=oi(t,e)||i,_?t.style[e]=_:Fs(t,e)),h=[n,i],Ku(h),n=h[0],i=h[1],u=n.match(cr)||[],E=i.match(cr)||[],E.length){for(;d=cr.exec(i);)m=d[0],y=i.substring(l,d.index),p?p=(p+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(p=1),m!==(_=u[c++]||"")&&(f=parseFloat(_)||0,v=_.substr((f+"").length),m.charAt(1)==="="&&(m=hr(f,m)+v),g=parseFloat(m),M=m.substr((g+"").length),l=cr.lastIndex-M.length,M||(M=M||Jn.units[e]||v,l===i.length&&(i+=M,a.e+=M)),v!==M&&(f=Bs(t,e,_,M)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:f,c:g-f,m:p&&p<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?Mm:Sm;return Wu.test(i)&&(a.e=0),this._pt=a,a},xm={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Sv=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=xm[n]||n,e[1]=xm[i]||i,e.join(" ")},Mv=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,o=n._gsap,a,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)a=r[c],as[a]&&(l=1,a=a==="transformOrigin"?$n:ke),Fs(n,a);l&&(Fs(n,ke),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",sa(n,1),o.uncache=1,bm(i)))}},Xl={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var o=t._pt=new Fn(t._pt,e,n,0,0,Mv);return o.u=i,o.pr=-10,o.tween=r,t._props.push(n),1}}},ia=[1,0,0,1,0,0],Cm={},Rm=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},vm=function(t){var e=oi(t,ke);return Rm(e)?ia:e.substr(7).match(Hu).map(Xe)},mf=function(t,e){var n=t._gsap||Ls(t),i=t.style,r=vm(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?ia:r):(r===ia&&!t.offsetParent&&t!==Yr&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,Yr.appendChild(t)),r=vm(t),l?i.display=l:Fs(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):Yr.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},uf=function(t,e,n,i,r,o){var a=t._gsap,l=r||mf(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,d=a.xOffset||0,u=a.yOffset||0,f=l[0],p=l[1],_=l[2],m=l[3],g=l[4],y=l[5],M=e.split(" "),v=parseFloat(M[0])||0,E=parseFloat(M[1])||0,A,x,S,P;n?l!==ia&&(x=f*m-p*_)&&(S=v*(m/x)+E*(-_/x)+(_*y-m*g)/x,P=v*(-p/x)+E*(f/x)-(f*y-p*g)/x,v=S,E=P):(A=Em(t),v=A.x+(~M[0].indexOf("%")?v/100*A.width:v),E=A.y+(~(M[1]||M[0]).indexOf("%")?E/100*A.height:E)),i||i!==!1&&a.smooth?(g=v-c,y=E-h,a.xOffset=d+(g*f+y*_)-g,a.yOffset=u+(g*p+y*m)-y):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=E,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[$n]="0px 0px",o&&(Us(o,a,"xOrigin",c,v),Us(o,a,"yOrigin",h,E),Us(o,a,"xOffset",d,a.xOffset),Us(o,a,"yOffset",u,a.yOffset)),t.setAttribute("data-svg-origin",v+" "+E)},sa=function(t,e){var n=t._gsap||new Qu(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=oi(t,$n)||"0",h,d,u,f,p,_,m,g,y,M,v,E,A,x,S,P,w,L,N,V,I,z,G,F,j,X,R,K,Tt,Ut,Z,ut;return h=d=u=_=m=g=y=M=v=0,f=p=1,n.svg=!!(t.getCTM&&Am(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[ke]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ke]!=="none"?l[ke]:"")),i.scale=i.rotate=i.translate="none"),x=mf(t,n.svg),n.svg&&(n.uncache?(j=t.getBBox(),c=n.xOrigin-j.x+"px "+(n.yOrigin-j.y)+"px",F=""):F=!e&&t.getAttribute("data-svg-origin"),uf(t,F||c,!!F||n.originIsAbsolute,n.smooth!==!1,x)),E=n.xOrigin||0,A=n.yOrigin||0,x!==ia&&(L=x[0],N=x[1],V=x[2],I=x[3],h=z=x[4],d=G=x[5],x.length===6?(f=Math.sqrt(L*L+N*N),p=Math.sqrt(I*I+V*V),_=L||N?qr(N,L)*pr:0,y=V||I?qr(V,I)*pr+_:0,y&&(p*=Math.abs(Math.cos(y*Zr))),n.svg&&(h-=E-(E*L+A*V),d-=A-(E*N+A*I))):(ut=x[6],Ut=x[7],R=x[8],K=x[9],Tt=x[10],Z=x[11],h=x[12],d=x[13],u=x[14],S=qr(ut,Tt),m=S*pr,S&&(P=Math.cos(-S),w=Math.sin(-S),F=z*P+R*w,j=G*P+K*w,X=ut*P+Tt*w,R=z*-w+R*P,K=G*-w+K*P,Tt=ut*-w+Tt*P,Z=Ut*-w+Z*P,z=F,G=j,ut=X),S=qr(-V,Tt),g=S*pr,S&&(P=Math.cos(-S),w=Math.sin(-S),F=L*P-R*w,j=N*P-K*w,X=V*P-Tt*w,Z=I*w+Z*P,L=F,N=j,V=X),S=qr(N,L),_=S*pr,S&&(P=Math.cos(S),w=Math.sin(S),F=L*P+N*w,j=z*P+G*w,N=N*P-L*w,G=G*P-z*w,L=F,z=j),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,g=180-g),f=Xe(Math.sqrt(L*L+N*N+V*V)),p=Xe(Math.sqrt(G*G+ut*ut)),S=qr(z,G),y=Math.abs(S)>2e-4?S*pr:0,v=Z?1/(Z<0?-Z:Z):0),n.svg&&(F=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Rm(oi(t,ke)),F&&t.setAttribute("transform",F))),Math.abs(y)>90&&Math.abs(y)<270&&(r?(f*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(p*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-d)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=u+o,n.scaleX=Xe(f),n.scaleY=Xe(p),n.rotation=Xe(_)+a,n.rotationX=Xe(m)+a,n.rotationY=Xe(g)+a,n.skewX=y+a,n.skewY=M+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[$n]=ql(c)),n.xOffset=n.yOffset=0,n.force3D=Jn.force3D,n.renderTransform=n.svg?Tv:wm?Pm:bv,n.uncache=0,n},ql=function(t){return(t=t.split(" "))[0]+" "+t[1]},af=function(t,e,n){var i=mn(e);return Xe(parseFloat(e)+parseFloat(Bs(t,"x",n+"px",i)))+i},bv=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Pm(t,e)},fr="0deg",na="0px",dr=") ",Pm=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,d=n.rotationX,u=n.skewX,f=n.skewY,p=n.scaleX,_=n.scaleY,m=n.transformPerspective,g=n.force3D,y=n.target,M=n.zOrigin,v="",E=g==="auto"&&t&&t!==1||g===!0;if(M&&(d!==fr||h!==fr)){var A=parseFloat(h)*Zr,x=Math.sin(A),S=Math.cos(A),P;A=parseFloat(d)*Zr,P=Math.cos(A),o=af(y,o,x*P*-M),a=af(y,a,-Math.sin(A)*-M),l=af(y,l,S*P*-M+M)}m!==na&&(v+="perspective("+m+dr),(i||r)&&(v+="translate("+i+"%, "+r+"%) "),(E||o!==na||a!==na||l!==na)&&(v+=l!==na||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+dr),c!==fr&&(v+="rotate("+c+dr),h!==fr&&(v+="rotateY("+h+dr),d!==fr&&(v+="rotateX("+d+dr),(u!==fr||f!==fr)&&(v+="skew("+u+", "+f+dr),(p!==1||_!==1)&&(v+="scale("+p+", "+_+dr),y.style[ke]=v||"translate(0, 0)"},Tv=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,d=n.scaleX,u=n.scaleY,f=n.target,p=n.xOrigin,_=n.yOrigin,m=n.xOffset,g=n.yOffset,y=n.forceCSS,M=parseFloat(o),v=parseFloat(a),E,A,x,S,P;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Zr,c*=Zr,E=Math.cos(l)*d,A=Math.sin(l)*d,x=Math.sin(l-c)*-u,S=Math.cos(l-c)*u,c&&(h*=Zr,P=Math.tan(c-h),P=Math.sqrt(1+P*P),x*=P,S*=P,h&&(P=Math.tan(h),P=Math.sqrt(1+P*P),E*=P,A*=P)),E=Xe(E),A=Xe(A),x=Xe(x),S=Xe(S)):(E=d,S=u,A=x=0),(M&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(M=Bs(f,"x",o,"px"),v=Bs(f,"y",a,"px")),(p||_||m||g)&&(M=Xe(M+p-(p*E+_*x)+m),v=Xe(v+_-(p*A+_*S)+g)),(i||r)&&(P=f.getBBox(),M=Xe(M+i/100*P.width),v=Xe(v+r/100*P.height)),P="matrix("+E+","+A+","+x+","+S+","+M+","+v+")",f.setAttribute("transform",P),y&&(f.style[ke]=P)},wv=function(t,e,n,i,r){var o=360,a=sn(r),l=parseFloat(r)*(a&&~r.indexOf("rad")?pr:1),c=l-i,h=i+c+"deg",d,u;return a&&(d=r.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*dm)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*dm)%o-~~(c/o)*o)),t._pt=u=new Fn(t._pt,e,n,i,c,av),u.e=h,u.u="deg",t._props.push(n),u},ym=function(t,e){for(var n in e)t[n]=e[n];return t},Ev=function(t,e,n){var i=ym({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,d,u,f,p;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[ke]=e,a=sa(n,1),Fs(n,ke),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ke],o[ke]=e,a=sa(n,1),o[ke]=c);for(l in as)c=i[l],h=a[l],c!==h&&r.indexOf(l)<0&&(f=mn(c),p=mn(h),d=f!==p?Bs(n,l,c,p):parseFloat(c),u=parseFloat(h),t._pt=new Fn(t._pt,a,l,d,u-d,lf),t._pt.u=p||0,t._props.push(l));ym(a,i)};Un("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",o=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(a){return t<2?s+a:"border"+a+s});Xl[t>1?"border"+s:s]=function(a,l,c,h,d){var u,f;if(arguments.length<4)return u=o.map(function(p){return os(a,p,c)}),f=u.join(" "),f.split(u[0]).length===5?u[0]:f;u=(h+"").split(" "),f={},o.forEach(function(p,_){return f[p]=u[_]=u[_]||u[(_-1)/2|0]}),a.init(l,f,d)}});var gf={name:"css",register:hf,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var o=this._props,a=t.style,l=n.vars.startAt,c,h,d,u,f,p,_,m,g,y,M,v,E,A,x,S,P;ff||hf(),this.styles=this.styles||Tm(t),S=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(qn[_]&&tf(_,e,n,i,t,r)))){if(f=typeof h,p=Xl[_],f==="function"&&(h=h.call(n,i,t,r),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=Xr(h)),p)p(this,t,_,h,n)&&(x=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",ss.lastIndex=0,ss.test(c)||(m=mn(c),g=mn(h),g?m!==g&&(c=Bs(t,_,c,g)+g):m&&(h+=m)),this.add(a,"setProperty",c,h,i,r,0,0,_),o.push(_),S.push(_,0,a[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],sn(c)&&~c.indexOf("random(")&&(c=Xr(c)),mn(c+"")||c==="auto"||(c+=Jn.units[_]||mn(os(t,_))||""),(c+"").charAt(1)==="="&&(c=os(t,_))):c=os(t,_),u=parseFloat(c),y=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),y&&(h=h.substr(2)),d=parseFloat(h),_ in Hi&&(_==="autoAlpha"&&(u===1&&os(t,"visibility")==="hidden"&&d&&(u=0),S.push("visibility",0,a.visibility),Us(this,a,"visibility",u?"inherit":"hidden",d?"inherit":"hidden",!d)),_!=="scale"&&_!=="transform"&&(_=Hi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),M=_ in as,M){if(this.styles.save(_),P=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=oi(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var w=t.style.perspective;t.style.perspective=h,h=oi(t,"perspective"),w?t.style.perspective=w:Fs(t,"perspective")}d=parseFloat(h)}if(v||(E=t._gsap,E.renderTransform&&!e.parseTransform||sa(t,e.parseTransform),A=e.smoothOrigin!==!1&&E.smooth,v=this._pt=new Fn(this._pt,a,ke,0,1,E.renderTransform,E,0,-1),v.dep=1),_==="scale")this._pt=new Fn(this._pt,E,"scaleY",E.scaleY,(y?hr(E.scaleY,y+d):d)-E.scaleY||0,lf),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){S.push($n,0,a[$n]),h=Sv(h),E.svg?uf(t,h,0,A,0,this):(g=parseFloat(h.split(" ")[2])||0,g!==E.zOrigin&&Us(this,E,"zOrigin",E.zOrigin,g),Us(this,a,_,ql(c),ql(h)));continue}else if(_==="svgOrigin"){uf(t,h,1,A,0,this);continue}else if(_ in Cm){wv(this,E,_,u,y?hr(u,y+h):h);continue}else if(_==="smoothOrigin"){Us(this,E,"smooth",E.smooth,h);continue}else if(_==="force3D"){E[_]=h;continue}else if(_==="transform"){Ev(this,h,t);continue}}else _ in a||(_=Jr(_)||_);if(M||(d||d===0)&&(u||u===0)&&!ov.test(h)&&_ in a)m=(c+"").substr((u+"").length),d||(d=0),g=mn(h)||(_ in Jn.units?Jn.units[_]:m),m!==g&&(u=Bs(t,_,c,g)),this._pt=new Fn(this._pt,M?E:a,_,u,(y?hr(u,y+d):d)-u,!M&&(g==="px"||_==="zIndex")&&e.autoRound!==!1?hv:lf),this._pt.u=g||0,M&&P!==h?(this._pt.b=c,this._pt.e=P,this._pt.r=cv):m!==g&&g!=="%"&&(this._pt.b=c,this._pt.r=lv);else if(_ in a)yv.call(this,t,_,c,y?y+h:h);else if(_ in t)this.add(t,_,c||t[_],y?y+h:h,i,r);else if(_!=="parseTransform"){kl(_,h);continue}M||(_ in a?S.push(_,0,a[_]):typeof t[_]=="function"?S.push(_,2,t[_]()):S.push(_,1,c||t[_])),o.push(_)}}x&&of(this)},render:function(t,e){if(e.tween._time||!df())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:os,aliases:Hi,getSetter:function(t,e,n){var i=Hi[e];return i&&i.indexOf(",")<0&&(e=i),e in as&&e!==$n&&(t._gsap.x||os(t,"x"))?n&&fm===n?e==="scale"?pv:dv:(fm=n||{})&&(e==="scale"?mv:gv):t.style&&!zl(t.style[e])?uv:~e.indexOf("-")?fv:Wl(t,e)},core:{_removeProperty:Fs,_getMatrix:mf}};Tn.utils.checkPrefix=Jr;Tn.core.getStyleSaver=Tm;(function(s,t,e,n){var i=Un(s+","+t+","+e,function(r){as[r]=1});Un(t,function(r){Jn.units[r]="deg",Cm[r]=1}),Hi[i[13]]=s+","+t,Un(n,function(r){var o=r.split(":");Hi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Un("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){Jn.units[s]="px"});Tn.registerPlugin(gf);var Re=Tn.registerPlugin(gf)||Tn,L1=Re.core.Tween;function Im(s,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(s,n.key,n)}}function Av(s,t,e){return t&&Im(s.prototype,t),e&&Im(s,e),s}var gn,Jl,Cv,Kn,zs,ks,Kr,Dm,gr,Qr,Nm,ls,Ri,Om,Um=function(){return gn||typeof window<"u"&&(gn=window.gsap)&&gn.registerPlugin&&gn},Fm=1,$r=[],se=[],Pi=[],oa=Date.now,_f=function(t,e){return e},Rv=function(){var t=Qr.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,se),i.push.apply(i,Pi),se=n,Pi=i,_f=function(o,a){return e[o](a)}},hs=function(t,e){return~Pi.indexOf(t)&&Pi[Pi.indexOf(t)+1][e]},aa=function(t){return!!~Nm.indexOf(t)},zn=function(t,e,n,i,r){return t.addEventListener(e,n,{passive:i!==!1,capture:!!r})},Bn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Yl="scrollLeft",Zl="scrollTop",xf=function(){return ls&&ls.isPressed||se.cache++},$l=function(t,e){var n=function i(r){if(r||r===0){Fm&&Kn.history.scrollRestoration!=="manual"&&(Kn.history.scrollRestoration="manual");var o=ls&&ls.isPressed;r=i.v=Math.round(r)||(ls&&ls.iOS?1:0),t(r),i.cacheID=se.cache,o&&_f("ss",r)}else(e||se.cache!==i.cacheID||_f("ref"))&&(i.cacheID=se.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},wn={s:Yl,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:$l(function(s){return arguments.length?Kn.scrollTo(s,Ke.sc()):Kn.pageXOffset||zs[Yl]||ks[Yl]||Kr[Yl]||0})},Ke={s:Zl,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:wn,sc:$l(function(s){return arguments.length?Kn.scrollTo(wn.sc(),s):Kn.pageYOffset||zs[Zl]||ks[Zl]||Kr[Zl]||0})},kn=function(t,e){return(e&&e._ctx&&e._ctx.selector||gn.utils.toArray)(t)[0]||(typeof t=="string"&&gn.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},Pv=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},cs=function(t,e){var n=e.s,i=e.sc;aa(t)&&(t=zs.scrollingElement||ks);var r=se.indexOf(t),o=i===Ke.sc?1:2;!~r&&(r=se.push(t)-1),se[r+o]||zn(t,"scroll",xf);var a=se[r+o],l=a||(se[r+o]=$l(hs(t,n),!0)||(aa(t)?i:$l(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=gn.getProperty(t,"scrollBehavior")==="smooth"),l},Kl=function(t,e,n){var i=t,r=t,o=oa(),a=o,l=e||50,c=Math.max(500,l*3),h=function(p,_){var m=oa();_||m-o>l?(r=i,i=p,a=o,o=m):n?i+=p:i=r+(p-r)/(m-a)*(o-a)},d=function(){r=i=n?0:i,a=o=0},u=function(p){var _=a,m=r,g=oa();return(p||p===0)&&p!==i&&h(p),o===a||g-a>c?0:(i+(n?m:-m))/((n?g:o)-_)*1e3};return{update:h,reset:d,getVelocity:u}},ra=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Lm=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},Bm=function(){Qr=gn.core.globals().ScrollTrigger,Qr&&Qr.core&&Rv()},zm=function(t){return gn=t||Um(),!Jl&&gn&&typeof document<"u"&&document.body&&(Kn=window,zs=document,ks=zs.documentElement,Kr=zs.body,Nm=[Kn,zs,ks,Kr],Cv=gn.utils.clamp,Om=gn.core.context||function(){},gr="onpointerenter"in Kr?"pointer":"mouse",Dm=qe.isTouch=Kn.matchMedia&&Kn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Kn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Ri=qe.eventTypes=("ontouchstart"in ks?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ks?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Fm=0},500),Jl=1),Qr||Bm(),Jl};wn.op=Ke;se.cache=0;var qe=(function(){function s(e){this.init(e)}var t=s.prototype;return t.init=function(n){Jl||zm(gn)||console.warn("Please gsap.registerPlugin(Observer)"),Qr||Bm();var i=n.tolerance,r=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,d=n.onStop,u=n.onStopDelay,f=n.ignore,p=n.wheelSpeed,_=n.event,m=n.onDragStart,g=n.onDragEnd,y=n.onDrag,M=n.onPress,v=n.onRelease,E=n.onRight,A=n.onLeft,x=n.onUp,S=n.onDown,P=n.onChangeX,w=n.onChangeY,L=n.onChange,N=n.onToggleX,V=n.onToggleY,I=n.onHover,z=n.onHoverEnd,G=n.onMove,F=n.ignoreCheck,j=n.isNormalizer,X=n.onGestureStart,R=n.onGestureEnd,K=n.onWheel,Tt=n.onEnable,Ut=n.onDisable,Z=n.onClick,ut=n.scrollSpeed,Mt=n.capture,At=n.allowClicks,gt=n.lockAxis,Lt=n.onLockAxis;this.target=a=kn(a)||ks,this.vars=n,f&&(f=gn.utils.toArray(f)),i=i||1e-9,r=r||0,p=p||1,ut=ut||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Kn.getComputedStyle(Kr).lineHeight)||22);var ge,Dt,Wt,It,Q,lt,ct,B=this,dt=0,Xt=0,Nt=n.passive||!h&&n.passive!==!1,Vt=cs(a,wn),Kt=cs(a,Ke),ie=Vt(),U=Kt(),oe=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Ri[0]==="pointerdown",$t=aa(a),Zt=a.ownerDocument||zs,pt=[0,0,0],pe=[0,0,0],Bt=0,qt=function(){return Bt=oa()},C=function(vt,rt){return(B.event=vt)&&f&&Pv(vt.target,f)||rt&&oe&&vt.pointerType!=="touch"||F&&F(vt,rt)},b=function(){B._vx.reset(),B._vy.reset(),Dt.pause(),d&&d(B)},W=function(){var vt=B.deltaX=Lm(pt),rt=B.deltaY=Lm(pe),nt=Math.abs(vt)>=i,St=Math.abs(rt)>=i;L&&(nt||St)&&L(B,vt,rt,pt,pe),nt&&(E&&B.deltaX>0&&E(B),A&&B.deltaX<0&&A(B),P&&P(B),N&&B.deltaX<0!=dt<0&&N(B),dt=B.deltaX,pt[0]=pt[1]=pt[2]=0),St&&(S&&B.deltaY>0&&S(B),x&&B.deltaY<0&&x(B),w&&w(B),V&&B.deltaY<0!=Xt<0&&V(B),Xt=B.deltaY,pe[0]=pe[1]=pe[2]=0),(It||Wt)&&(G&&G(B),Wt&&(m&&Wt===1&&m(B),y&&y(B),Wt=0),It=!1),lt&&!(lt=!1)&&Lt&&Lt(B),Q&&(K(B),Q=!1),ge=0},ot=function(vt,rt,nt){pt[nt]+=vt,pe[nt]+=rt,B._vx.update(vt),B._vy.update(rt),c?ge||(ge=requestAnimationFrame(W)):W()},st=function(vt,rt){gt&&!ct&&(B.axis=ct=Math.abs(vt)>Math.abs(rt)?"x":"y",lt=!0),ct!=="y"&&(pt[2]+=vt,B._vx.update(vt,!0)),ct!=="x"&&(pe[2]+=rt,B._vy.update(rt,!0)),c?ge||(ge=requestAnimationFrame(W)):W()},mt=function(vt){if(!C(vt,1)){vt=ra(vt,h);var rt=vt.clientX,nt=vt.clientY,St=rt-B.x,it=nt-B.y,Rt=B.isDragging;B.x=rt,B.y=nt,(Rt||(St||it)&&(Math.abs(B.startX-rt)>=r||Math.abs(B.startY-nt)>=r))&&(Wt||(Wt=Rt?2:1),Rt||(B.isDragging=!0),st(St,it))}},yt=B.onPress=function(at){C(at,1)||at&&at.button||(B.axis=ct=null,Dt.pause(),B.isPressed=!0,at=ra(at),dt=Xt=0,B.startX=B.x=at.clientX,B.startY=B.y=at.clientY,B._vx.reset(),B._vy.reset(),zn(j?a:Zt,Ri[1],mt,Nt,!0),B.deltaX=B.deltaY=0,M&&M(B))},q=B.onRelease=function(at){if(!C(at,1)){Bn(j?a:Zt,Ri[1],mt,!0);var vt=!isNaN(B.y-B.startY),rt=B.isDragging,nt=rt&&(Math.abs(B.x-B.startX)>3||Math.abs(B.y-B.startY)>3),St=ra(at);!nt&&vt&&(B._vx.reset(),B._vy.reset(),h&&At&&gn.delayedCall(.08,function(){if(oa()-Bt>300&&!at.defaultPrevented){if(at.target.click)at.target.click();else if(Zt.createEvent){var it=Zt.createEvent("MouseEvents");it.initMouseEvent("click",!0,!0,Kn,1,St.screenX,St.screenY,St.clientX,St.clientY,!1,!1,!1,!1,0,null),at.target.dispatchEvent(it)}}})),B.isDragging=B.isGesturing=B.isPressed=!1,d&&rt&&!j&&Dt.restart(!0),Wt&&W(),g&&rt&&g(B),v&&v(B,nt)}},et=function(vt){return vt.touches&&vt.touches.length>1&&(B.isGesturing=!0)&&X(vt,B.isDragging)},ft=function(){return(B.isGesturing=!1)||R(B)},D=function(vt){if(!C(vt)){var rt=Vt(),nt=Kt();ot((rt-ie)*ut,(nt-U)*ut,1),ie=rt,U=nt,d&&Dt.restart(!0)}},tt=function(vt){if(!C(vt)){vt=ra(vt,h),K&&(Q=!0);var rt=(vt.deltaMode===1?l:vt.deltaMode===2?Kn.innerHeight:1)*p;ot(vt.deltaX*rt,vt.deltaY*rt,0),d&&!j&&Dt.restart(!0)}},$=function(vt){if(!C(vt)){var rt=vt.clientX,nt=vt.clientY,St=rt-B.x,it=nt-B.y;B.x=rt,B.y=nt,It=!0,d&&Dt.restart(!0),(St||it)&&st(St,it)}},_t=function(vt){B.event=vt,I(B)},ht=function(vt){B.event=vt,z(B)},xt=function(vt){return C(vt)||ra(vt,h)&&Z(B)};Dt=B._dc=gn.delayedCall(u||.25,b).pause(),B.deltaX=B.deltaY=0,B._vx=Kl(0,50,!0),B._vy=Kl(0,50,!0),B.scrollX=Vt,B.scrollY=Kt,B.isDragging=B.isGesturing=B.isPressed=!1,Om(this),B.enable=function(at){return B.isEnabled||(zn($t?Zt:a,"scroll",xf),o.indexOf("scroll")>=0&&zn($t?Zt:a,"scroll",D,Nt,Mt),o.indexOf("wheel")>=0&&zn(a,"wheel",tt,Nt,Mt),(o.indexOf("touch")>=0&&Dm||o.indexOf("pointer")>=0)&&(zn(a,Ri[0],yt,Nt,Mt),zn(Zt,Ri[2],q),zn(Zt,Ri[3],q),At&&zn(a,"click",qt,!0,!0),Z&&zn(a,"click",xt),X&&zn(Zt,"gesturestart",et),R&&zn(Zt,"gestureend",ft),I&&zn(a,gr+"enter",_t),z&&zn(a,gr+"leave",ht),G&&zn(a,gr+"move",$)),B.isEnabled=!0,B.isDragging=B.isGesturing=B.isPressed=It=Wt=!1,B._vx.reset(),B._vy.reset(),ie=Vt(),U=Kt(),at&&at.type&&yt(at),Tt&&Tt(B)),B},B.disable=function(){B.isEnabled&&($r.filter(function(at){return at!==B&&aa(at.target)}).length||Bn($t?Zt:a,"scroll",xf),B.isPressed&&(B._vx.reset(),B._vy.reset(),Bn(j?a:Zt,Ri[1],mt,!0)),Bn($t?Zt:a,"scroll",D,Mt),Bn(a,"wheel",tt,Mt),Bn(a,Ri[0],yt,Mt),Bn(Zt,Ri[2],q),Bn(Zt,Ri[3],q),Bn(a,"click",qt,!0),Bn(a,"click",xt),Bn(Zt,"gesturestart",et),Bn(Zt,"gestureend",ft),Bn(a,gr+"enter",_t),Bn(a,gr+"leave",ht),Bn(a,gr+"move",$),B.isEnabled=B.isPressed=B.isDragging=!1,Ut&&Ut(B))},B.kill=B.revert=function(){B.disable();var at=$r.indexOf(B);at>=0&&$r.splice(at,1),ls===B&&(ls=0)},$r.push(B),j&&aa(a)&&(ls=B),B.enable(_)},Av(s,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),s})();qe.version="3.15.1";qe.create=function(s){return new qe(s)};qe.register=zm;qe.getAll=function(){return $r.slice()};qe.getById=function(s){return $r.filter(function(t){return t.vars.id===s})[0]};Um()&&gn.registerPlugin(qe);var Ot,no,le,Me,ci,ye,Lf,dc,ya,pa,ca,Ql,En,gc,wf,Gn,km,Vm,io,ig,vf,sg,Vn,Ef,rg,og,Vs,Af,Df,so,Nf,Gs,Cf,yf,jl=1,An=Date.now,Sf=An(),Mi=0,ha=0,Gm=function(t,e,n){var i=li(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},Hm=function(t,e){return e&&(!li(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},Iv=function s(){return ha&&requestAnimationFrame(s)},Wm=function(){return gc=1},Xm=function(){return gc=0},Wi=function(t){return t},ua=function(t){return Math.round(t*1e5)/1e5||0},ag=function(){return typeof window<"u"},lg=function(){return Ot||ag()&&(Ot=window.gsap)&&Ot.registerPlugin&&Ot},Mr=function(t){return!!~Lf.indexOf(t)},cg=function(t){return(t==="Height"?Nf:le["inner"+t])||ci["client"+t]||ye["client"+t]},hg=function(t){return hs(t,"getBoundingClientRect")||(Mr(t)?function(){return fc.width=le.innerWidth,fc.height=Nf,fc}:function(){return us(t)})},Lv=function(t,e,n){var i=n.d,r=n.d2,o=n.a;return(o=hs(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?cg(r):t["client"+r])||0}},Dv=function(t,e){return!e||~Pi.indexOf(t)?hg(t):function(){return fc}},Xi=function(t,e){var n=e.s,i=e.d2,r=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=hs(t,n))?o()-hg(t)()[r]:Mr(t)?(ci[n]||ye[n])-cg(i):t[n]-t["offset"+i])},tc=function(t,e){for(var n=0;n<io.length;n+=3)(!e||~e.indexOf(io[n+1]))&&t(io[n],io[n+1],io[n+2])},li=function(t){return typeof t=="string"},Cn=function(t){return typeof t=="function"},fa=function(t){return typeof t=="number"},_r=function(t){return typeof t=="object"},la=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},jr=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},to=Math.abs,ug="left",fg="top",Of="right",Uf="bottom",vr="width",yr="height",ma="Right",ga="Left",_a="Top",xa="Bottom",Qe="padding",yi="margin",oo="Width",Ff="Height",rn="px",Si=function(t){return le.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},Nv=function(t){var e=Si(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},qm=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},us=function(t,e){var n=e&&Si(t)[wf]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ot.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},pc=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},dg=function(t){var e=[],n=t.labels,i=t.duration(),r;for(r in n)e.push(n[r]/i);return e},Ov=function(t){return function(e){return Ot.utils.snap(dg(t),e)}},Bf=function(t){var e=Ot.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,r){return i-r});return n?function(i,r,o){o===void 0&&(o=.001);var a;if(!r)return e(i);if(r>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,r,o){o===void 0&&(o=.001);var a=e(i);return!r||Math.abs(a-i)<o||a-i<0==r<0?a:e(r<0?i-t:i+t)}},Uv=function(t){return function(e,n){return Bf(dg(t))(e,n.direction)}},ec=function(t,e,n,i){return n.split(",").forEach(function(r){return t(e,r,i)})},hn=function(t,e,n,i,r){return t.addEventListener(e,n,{passive:!i,capture:!!r})},cn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},nc=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},Ym={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ic={toggleActions:"play",anticipatePin:0},mc={top:0,left:0,center:.5,bottom:1,right:1},lc=function(t,e){if(li(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in mc?mc[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},sc=function(t,e,n,i,r,o,a,l){var c=r.startColor,h=r.endColor,d=r.fontSize,u=r.indent,f=r.fontWeight,p=Me.createElement("div"),_=Mr(n)||hs(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,g=_?ye:n.tagName==="IFRAME"?n.contentDocument.body:n,y=t.indexOf("start")!==-1,M=y?c:h,v="border-color:"+M+";font-size:"+d+";color:"+M+";font-weight:"+f+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(i===Ke?Of:Uf)+":"+(o+parseFloat(u))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=y,p.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),p.style.cssText=v,p.innerText=e||e===0?t+"-"+e:t,g.children[0]?g.insertBefore(p,g.children[0]):g.appendChild(p),p._offset=p["offset"+i.op.d2],cc(p,0,i,y),p},cc=function(t,e,n,i){var r={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,r[n.a+"Percent"]=i?-100:0,r[n.a]=i?"1px":0,r["border"+o+oo]=1,r["border"+a+oo]=0,r[n.p]=e+"px",Ot.set(t,r)},ae=[],Rf={},Sa,Zm=function(){return An()-Mi>34&&(Sa||(Sa=requestAnimationFrame(fs)))},eo=function(){(!Vn||!Vn.isPressed||Vn.startX>ye.clientWidth)&&(se.cache++,Vn?Sa||(Sa=requestAnimationFrame(fs)):fs(),Mi||Tr("scrollStart"),Mi=An())},Mf=function(){og=le.innerWidth,rg=le.innerHeight},da=function(t){se.cache++,(t===!0||!En&&!sg&&!Me.fullscreenElement&&!Me.webkitFullscreenElement&&(!Ef||og!==le.innerWidth||Math.abs(le.innerHeight-rg)>le.innerHeight*.25))&&dc.restart(!0)},br={},Fv=[],pg=function s(){return cn(ne,"scrollEnd",s)||xr(!0)},Tr=function(t){return br[t]&&br[t].map(function(e){return e()})||Fv},ai=[],mg=function(t){for(var e=0;e<ai.length;e+=5)(!t||ai[e+4]&&ai[e+4].query===t)&&(ai[e].style.cssText=ai[e+1],ai[e].getBBox&&ai[e].setAttribute("transform",ai[e+2]||""),ai[e+3].uncache=1)},gg=function(){se.cache++,se.forEach(function(t){return Cn(t)&&(t.rec=t())})},zf=function(t,e){var n;for(Gn=0;Gn<ae.length;Gn++)n=ae[Gn],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));Gs=!0,e&&mg(e),e||Tr("revert")},_g=function(t,e){se.cache++,(e||!Hn)&&se.forEach(function(n){return Cn(n)&&n.cacheID++&&(n.rec=0)}),li(t)&&(Df=t,le.history.scrollRestoration!==t&&(le.history.scrollRestoration=t))},Hn,Sr=0,Jm,Bv=function(){if(Jm!==Sr){var t=Jm=Sr;requestAnimationFrame(function(){return t===Sr&&xr(!0)})}},xg=function(){ye.appendChild(so),Nf=!Vn&&so.offsetHeight||le.innerHeight,ye.removeChild(so)},$m=function(t){return ya(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},xr=function(t,e){if(ci=Me.documentElement,ye=Me.body,Lf=[le,Me,ci,ye],Mi&&!t&&!Gs){hn(ne,"scrollEnd",pg);return}xg(),Hn=ne.isRefreshing=!0,Gs||gg();var n=Tr("refreshInit");ig&&ne.sort(),e||zf(),se.forEach(function(i){Cn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),ae.slice(0).forEach(function(i){return i.refresh()}),Gs=!1,ae.forEach(function(i){if(i._subPinOffset&&i.pin){var r=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[r];i.revert(!0,1),i.adjustPinSpacing(i.pin[r]-o),i.refresh()}}),Cf=1,$m(!0),ae.forEach(function(i){var r=Xi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>r,a=i._startClamp&&i.start>=r;(o||a)&&i.setPositions(a?r-1:i.start,o?Math.max(a?r:i.start+1,r):i.end,!0)}),$m(!1),Cf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),se.forEach(function(i){Cn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),_g(Df,1),dc.pause(),Sr++,Hn=2,fs(2),ae.forEach(function(i){return Cn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Hn=ne.isRefreshing=!1,Tr("refresh")},Pf=0,hc=1,va,fs=function(t){if(t===2||!Hn&&!Gs){ne.isUpdating=!0,va&&va.update(0);var e=ae.length,n=An(),i=n-Sf>=50,r=e&&ae[0].scroll();if(hc=Pf>r?-1:1,Hn||(Pf=r),i&&(Mi&&!gc&&n-Mi>200&&(Mi=0,Tr("scrollEnd")),ca=Sf,Sf=n),hc<0){for(Gn=e;Gn-- >0;)ae[Gn]&&ae[Gn].update(0,i);hc=1}else for(Gn=0;Gn<e;Gn++)ae[Gn]&&ae[Gn].update(0,i);ne.isUpdating=!1}Sa=0},If=[ug,fg,Uf,Of,yi+xa,yi+ma,yi+_a,yi+ga,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],uc=If.concat([vr,yr,"boxSizing","max"+oo,"max"+Ff,"position",yi,Qe,Qe+_a,Qe+ma,Qe+xa,Qe+ga]),zv=function(t,e,n){ro(n);var i=t._gsap;if(i.spacerIsNative)ro(i.spacerState);else if(t._gsap.swappedIn){var r=e.parentNode;r&&(r.insertBefore(t,e),r.removeChild(e))}t._gsap.swappedIn=!1},bf=function(t,e,n,i){if(!t._gsap.swappedIn){for(var r=If.length,o=e.style,a=t.style,l;r--;)l=If[r],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Uf]=a[Of]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[vr]=pc(t,wn)+rn,o[yr]=pc(t,Ke)+rn,o[Qe]=a[yi]=a[fg]=a[ug]="0",ro(i),a[vr]=a["max"+oo]=n[vr],a[yr]=a["max"+Ff]=n[yr],a[Qe]=n[Qe],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},kv=/([A-Z])/g,ro=function(t){if(t){var e=t.t.style,n=t.length,i=0,r,o;for((t.t._gsap||Ot.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],r=t[i],o?e[r]=o:e[r]&&e.removeProperty(r.replace(kv,"-$1").toLowerCase())}},rc=function(t){for(var e=uc.length,n=t.style,i=[],r=0;r<e;r++)i.push(uc[r],n[uc[r]]);return i.t=t,i},Vv=function(t,e,n){for(var i=[],r=t.length,o=n?8:0,a;o<r;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},fc={left:0,top:0},Km=function(t,e,n,i,r,o,a,l,c,h,d,u,f,p){Cn(t)&&(t=t(l)),li(t)&&t.substr(0,3)==="max"&&(t=u+(t.charAt(4)==="="?lc("0"+t.substr(3),n):0));var _=f?f.time():0,m,g,y;if(f&&f.seek(0),isNaN(t)||(t=+t),fa(t))f&&(t=Ot.utils.mapRange(f.scrollTrigger.start,f.scrollTrigger.end,0,u,t)),a&&cc(a,n,i,!0);else{Cn(e)&&(e=e(l));var M=(t||"0").split(" "),v,E,A,x;y=kn(e,l)||ye,v=us(y)||{},(!v||!v.left&&!v.top)&&Si(y).display==="none"&&(x=y.style.display,y.style.display="block",v=us(y),x?y.style.display=x:y.style.removeProperty("display")),E=lc(M[0],v[i.d]),A=lc(M[1]||"0",n),t=v[i.p]-c[i.p]-h+E+r-A,a&&cc(a,A,i,n-A<20||a._isStart&&A>20),n-=n-A}if(p&&(l[p]=t||-.001,t<0&&(t=0)),o){var S=t+n,P=o._isStart;m="scroll"+i.d2,cc(o,S,i,P&&S>20||!P&&(d?Math.max(ye[m],ci[m]):o.parentNode[m])<=S+1),d&&(c=us(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+rn))}return f&&y&&(m=us(y),f.seek(u),g=us(y),f._caScrollDist=m[i.p]-g[i.p],t=t/f._caScrollDist*u),f&&f.seek(_),f?t:Math.round(t)},Gv=/(webkit|moz|length|cssText|inset)/i,Qm=function(t,e,n,i){if(t.parentNode!==e){var r=t.style,o,a;if(e===ye){t._stOrig=r.cssText,a=Si(t);for(o in a)!+o&&!Gv.test(o)&&a[o]&&typeof r[o]=="string"&&o!=="0"&&(r[o]=a[o]);r.top=n,r.left=i}else r.cssText=t._stOrig;Ot.core.getCache(t).uncache=1,e.appendChild(t)}},vg=function(t,e,n){var i=e,r=i;return function(o){var a=Math.round(t());return a!==i&&a!==r&&Math.abs(a-i)>3&&Math.abs(a-r)>3&&(o=a,n&&n()),r=i,i=Math.round(o),i}},oc=function(t,e,n){var i={};i[e.p]="+="+n,Ot.set(t,i)},jm=function(t,e){var n=cs(t,e),i="_scroll"+e.p2,r=function o(a,l,c,h,d){var u=o.tween,f=l.onComplete,p={};c=c||n();var _=vg(n,c,function(){u.kill(),o.tween=0});return d=h&&d||0,h=h||a-c,u&&u.kill(),l[i]=a,l.inherit=!1,l.modifiers=p,p[i]=function(){return _(c+h*u.ratio+d*u.ratio*u.ratio)},l.onUpdate=function(){se.cache++,o.tween&&fs()},l.onComplete=function(){o.tween=0,f&&f.call(u)},u=o.tween=Ot.to(t,l),u};return t[i]=n,n.wheelHandler=function(){return r.tween&&r.tween.kill()&&(r.tween=0)},hn(t,"wheel",n.wheelHandler),ne.isTouch&&hn(t,"touchmove",n.wheelHandler),r},ne=(function(){function s(e,n){no||s.register(Ot)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Af(this),this.init(e,n)}var t=s.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ha){this.update=this.refresh=this.kill=Wi;return}n=qm(li(n)||fa(n)||n.nodeType?{trigger:n}:n,ic);var r=n,o=r.onUpdate,a=r.toggleClass,l=r.id,c=r.onToggle,h=r.onRefresh,d=r.scrub,u=r.trigger,f=r.pin,p=r.pinSpacing,_=r.invalidateOnRefresh,m=r.anticipatePin,g=r.onScrubComplete,y=r.onSnapComplete,M=r.once,v=r.snap,E=r.pinReparent,A=r.pinSpacer,x=r.containerAnimation,S=r.fastScrollEnd,P=r.preventOverlaps,w=n.horizontal||n.containerAnimation&&n.horizontal!==!1?wn:Ke,L=!d&&d!==0,N=kn(n.scroller||le),V=Ot.core.getCache(N),I=Mr(N),z=("pinType"in n?n.pinType:hs(N,"pinType")||I&&"fixed")==="fixed",G=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],F=L&&n.toggleActions.split(" "),j="markers"in n?n.markers:ic.markers,X=I?0:parseFloat(Si(N)["border"+w.p2+oo])||0,R=this,K=n.onRefreshInit&&function(){return n.onRefreshInit(R)},Tt=Lv(N,I,w),Ut=Dv(N,I),Z=0,ut=0,Mt=0,At=cs(N,w),gt,Lt,ge,Dt,Wt,It,Q,lt,ct,B,dt,Xt,Nt,Vt,Kt,ie,U,oe,$t,Zt,pt,pe,Bt,qt,C,b,W,ot,st,mt,yt,q,et,ft,D,tt,$,_t,ht;if(R._startClamp=R._endClamp=!1,R._dir=w,m*=45,R.scroller=N,R.scroll=x?x.time.bind(x):At,Dt=At(),Gs&&At.rec==null&&(At.rec=Dt),R.vars=n,i=i||n.animation,"refreshPriority"in n&&(ig=1,n.refreshPriority===-9999&&(va=R)),V.tweenScroll=V.tweenScroll||{top:jm(N,Ke),left:jm(N,wn)},R.tweenTo=gt=V.tweenScroll[w.p],R.scrubDuration=function(nt){et=fa(nt)&&nt,et?q?q.duration(nt):q=Ot.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:et,paused:!0,onComplete:function(){return g&&g(R)}}):(q&&q.progress(1).kill(),q=0)},i&&(i.vars.lazy=!1,i._initted&&!R.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),R.animation=i.pause(),i.scrollTrigger=R,R.scrubDuration(d),mt=0,l||(l=i.vars.id)),v&&((!_r(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in ye.style&&Ot.set(I?[ye,ci]:N,{scrollBehavior:"auto"}),se.forEach(function(nt){return Cn(nt)&&nt.target===(I?Me.scrollingElement||ci:N)&&(nt.smooth=!1)}),ge=Cn(v.snapTo)?v.snapTo:v.snapTo==="labels"?Ov(i):v.snapTo==="labelsDirectional"?Uv(i):v.directional!==!1?function(nt,St){return Bf(v.snapTo)(nt,An()-ut<500?0:St.direction)}:Ot.utils.snap(v.snapTo),ft=v.duration||{min:.1,max:2},ft=_r(ft)?pa(ft.min,ft.max):pa(ft,ft),D=Ot.delayedCall(v.delay||et/2||.1,function(){var nt=At(),St=An()-ut<500,it=gt.tween;if((St||Math.abs(R.getVelocity())<10)&&!it&&!gc&&Z!==nt){var Rt=(nt-It)/Vt,he=i&&!L?i.totalProgress():Rt,jt=St?0:(he-yt)/(An()-ca)*1e3||0,De=Ot.utils.clamp(-Rt,1-Rt,to(jt/2)*jt/.185),Ze=Rt+(v.inertia===!1?0:De),Ne,Te,ve=v,tn=ve.onStart,we=ve.onInterrupt,vn=ve.onComplete;if(Ne=ge(Ze,R),fa(Ne)||(Ne=Ze),Te=Math.max(0,Math.round(It+Ne*Vt)),nt<=Q&&nt>=It&&Te!==nt){if(it&&!it._initted&&it.data<=to(Te-nt))return;v.inertia===!1&&(De=Ne-Rt),gt(Te,{duration:ft(to(Math.max(to(Ze-he),to(Ne-he))*.185/jt/.05||0)),ease:v.ease||"power3",data:to(Te-nt),onInterrupt:function(){return D.restart(!0)&&we&&jr(R,we)},onComplete:function(){R.update(),Z=At(),i&&!L&&(q?q.resetTo("totalProgress",Ne,i._tTime/i._tDur):i.progress(Ne)),mt=yt=i&&!L?i.totalProgress():R.progress,y&&y(R),vn&&jr(R,vn)}},nt,De*Vt,Te-nt-De*Vt),tn&&jr(R,tn,gt.tween)}}else R.isActive&&Z!==nt&&D.restart(!0)}).pause()),l&&(Rf[l]=R),u=R.trigger=kn(u||f!==!0&&f),ht=u&&u._gsap&&u._gsap.stRevert,ht&&(ht=ht(R)),f=f===!0?u:kn(f),li(a)&&(a={targets:u,className:a}),f&&(p===!1||p===yi||(p=!p&&f.parentNode&&f.parentNode.style&&Si(f.parentNode).display==="flex"?!1:Qe),R.pin=f,Lt=Ot.core.getCache(f),Lt.spacer?Kt=Lt.pinState:(A&&(A=kn(A),A&&!A.nodeType&&(A=A.current||A.nativeElement),Lt.spacerIsNative=!!A,A&&(Lt.spacerState=rc(A))),Lt.spacer=oe=A||Me.createElement("div"),oe.classList.add("pin-spacer"),l&&oe.classList.add("pin-spacer-"+l),Lt.pinState=Kt=rc(f)),n.force3D!==!1&&Ot.set(f,{force3D:!0}),R.spacer=oe=Lt.spacer,st=Si(f),qt=st[p+w.os2],Zt=Ot.getProperty(f),pt=Ot.quickSetter(f,w.a,rn),bf(f,oe,st),U=rc(f)),j){Xt=_r(j)?qm(j,Ym):Ym,B=sc("scroller-start",l,N,w,Xt,0),dt=sc("scroller-end",l,N,w,Xt,0,B),$t=B["offset"+w.op.d2];var xt=kn(hs(N,"content")||N);lt=this.markerStart=sc("start",l,xt,w,Xt,$t,0,x),ct=this.markerEnd=sc("end",l,xt,w,Xt,$t,0,x),x&&(_t=Ot.quickSetter([lt,ct],w.a,rn)),!z&&!(Pi.length&&hs(N,"fixedMarkers")===!0)&&(Nv(I?ye:N),Ot.set([B,dt],{force3D:!0}),b=Ot.quickSetter(B,w.a,rn),ot=Ot.quickSetter(dt,w.a,rn))}if(x){var at=x.vars.onUpdate,vt=x.vars.onUpdateParams;x.eventCallback("onUpdate",function(){R.update(0,0,1),at&&at.apply(x,vt||[])})}if(R.previous=function(){return ae[ae.indexOf(R)-1]},R.next=function(){return ae[ae.indexOf(R)+1]},R.revert=function(nt,St){if(!St)return R.kill(!0);var it=nt!==!1||!R.enabled,Rt=En;it!==R.isReverted&&(it&&(tt=Math.max(At(),R.scroll.rec||0),Mt=R.progress,$=i&&i.progress()),lt&&[lt,ct,B,dt].forEach(function(he){return he.style.display=it?"none":"block"}),it&&(En=R,R.update(it)),f&&(!E||!R.isActive)&&(it?zv(f,oe,Kt):bf(f,oe,Si(f),C)),it||R.update(it),En=Rt,R.isReverted=it)},R.refresh=function(nt,St,it,Rt){if(!((En||!R.enabled)&&!St)){if(f&&nt&&Mi){hn(s,"scrollEnd",pg);return}!Hn&&K&&K(R),En=R,gt.tween&&!it&&(gt.tween.kill(),gt.tween=0),q&&q.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(H){return H.vars.immediateRender&&H.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),R.isReverted||R.revert(!0,!0),R._subPinOffset=!1;var he=Tt(),jt=Ut(),De=x?x.duration():Xi(N,w),Ze=Vt<=.01||!Vt,Ne=0,Te=Rt||0,ve=_r(it)?it.end:n.end,tn=n.endTrigger||u,we=_r(it)?it.start:n.start||(n.start===0||!u?0:f?"0 0":"0 100%"),vn=R.pinnedContainer=n.pinnedContainer&&kn(n.pinnedContainer,R),ei=u&&Math.max(0,ae.indexOf(R))||0,Ge=ei,Je,en,ni,zr,nn,He,gi,Ho,El,As,T,O,J;for(j&&_r(it)&&(O=Ot.getProperty(B,w.p),J=Ot.getProperty(dt,w.p));Ge-- >0;)He=ae[Ge],He.end||He.refresh(0,1)||(En=R),gi=He.pin,gi&&(gi===u||gi===f||gi===vn)&&!He.isReverted&&(As||(As=[]),As.unshift(He),He.revert(!0,!0)),He!==ae[Ge]&&(ei--,Ge--);for(Cn(we)&&(we=we(R)),we=Gm(we,"start",R),It=Km(we,u,he,w,At(),lt,B,R,jt,X,z,De,x,R._startClamp&&"_startClamp")||(f?-.001:0),Cn(ve)&&(ve=ve(R)),li(ve)&&!ve.indexOf("+=")&&(~ve.indexOf(" ")?ve=(li(we)?we.split(" ")[0]:"")+ve:(Ne=lc(ve.substr(2),he),ve=li(we)?we:(x?Ot.utils.mapRange(0,x.duration(),x.scrollTrigger.start,x.scrollTrigger.end,It):It)+Ne,tn=u)),ve=Gm(ve,"end",R),Q=Math.max(It,Km(ve||(tn?"100% 0":De),tn,he,w,At()+Ne,ct,dt,R,jt,X,z,De,x,R._endClamp&&"_endClamp"))||-.001,Ne=0,Ge=ei;Ge--;)He=ae[Ge]||{},gi=He.pin,gi&&He.start-He._pinPush<=It&&!x&&He.end>0&&(Je=He.end-(R._startClamp?Math.max(0,He.start):He.start),(gi===u&&He.start-He._pinPush<It||gi===vn)&&isNaN(we)&&(Ne+=Je*(1-He.progress)),gi===f&&(Te+=Je));if(It+=Ne,Q+=Ne,R._startClamp&&(R._startClamp+=Ne),R._endClamp&&!Hn&&(R._endClamp=Q||-.001,Q=Math.min(Q,Xi(N,w))),Vt=Q-It||(It-=.01)&&.001,Ze&&(Mt=Ot.utils.clamp(0,1,Ot.utils.normalize(It,Q,tt))),R._pinPush=Te,lt&&Ne&&(Je={},Je[w.a]="+="+Ne,vn&&(Je[w.p]="-="+At()),Ot.set([lt,ct],Je)),f&&!(Cf&&R.end>=Xi(N,w)))Je=Si(f),zr=w===Ke,ni=At(),pe=parseFloat(Zt(w.a))+Te,!De&&Q>1&&(T=(I?Me.scrollingElement||ci:N).style,T={style:T,value:T["overflow"+w.a.toUpperCase()]},I&&Si(ye)["overflow"+w.a.toUpperCase()]!=="scroll"&&(T.style["overflow"+w.a.toUpperCase()]="scroll")),bf(f,oe,Je),U=rc(f),en=us(f,!0),Ho=z&&cs(N,zr?wn:Ke)(),p?(C=[p+w.os2,Vt+Te+rn],C.t=oe,Ge=p===Qe?pc(f,w)+Vt+Te:0,Ge&&(C.push(w.d,Ge+rn),oe.style.flexBasis!=="auto"&&(oe.style.flexBasis=Ge+rn)),ro(C),vn&&ae.forEach(function(H){H.pin===vn&&H.vars.pinSpacing!==!1&&(H._subPinOffset=!0)}),z&&At(tt)):(Ge=pc(f,w),Ge&&oe.style.flexBasis!=="auto"&&(oe.style.flexBasis=Ge+rn)),z&&(nn={top:en.top+(zr?ni-It:Ho)+rn,left:en.left+(zr?Ho:ni-It)+rn,boxSizing:"border-box",position:"fixed"},nn[vr]=nn["max"+oo]=Math.ceil(en.width)+rn,nn[yr]=nn["max"+Ff]=Math.ceil(en.height)+rn,nn[yi]=nn[yi+_a]=nn[yi+ma]=nn[yi+xa]=nn[yi+ga]="0",nn[Qe]=Je[Qe],nn[Qe+_a]=Je[Qe+_a],nn[Qe+ma]=Je[Qe+ma],nn[Qe+xa]=Je[Qe+xa],nn[Qe+ga]=Je[Qe+ga],ie=Vv(Kt,nn,E),Hn&&At(0)),i?(El=i._initted,vf(1),i.render(i.duration(),!0,!0),Bt=Zt(w.a)-pe+Vt+Te,W=Math.abs(Vt-Bt)>1,z&&W&&ie.splice(ie.length-2,2),i.render(0,!0,!0),El||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),vf(0)):Bt=Vt,T&&(T.value?T.style["overflow"+w.a.toUpperCase()]=T.value:T.style.removeProperty("overflow-"+w.a));else if(u&&At()&&!x)for(en=u.parentNode;en&&en!==ye;)en._pinOffset&&(It-=en._pinOffset,Q-=en._pinOffset),en=en.parentNode;As&&As.forEach(function(H){return H.revert(!1,!0)}),R.start=It,R.end=Q,Dt=Wt=Hn?tt:At(),!x&&!Hn&&!Gs&&(Dt<tt&&At(tt),R.scroll.rec=0),R.revert(!1,!0),ut=An(),D&&(Z=-1,D.restart(!0)),En=0,i&&L&&(i._initted||$)&&i.progress()!==$&&i.progress($||0,!0).render(i.time(),!0,!0),(Ze||Mt!==R.progress||x||_||i&&!i._initted)&&(i&&!L&&(i._initted||Mt||i.vars.immediateRender!==!1)&&i.totalProgress(x&&It<-.001&&!Mt?Ot.utils.normalize(It,Q,0):Mt,!0),R.progress=Ze||(Dt-It)/Vt===Mt?0:Mt),f&&p&&(oe._pinOffset=Math.round(R.progress*Bt)),q&&q.invalidate(),isNaN(O)||(O-=Ot.getProperty(B,w.p),J-=Ot.getProperty(dt,w.p),oc(B,w,O),oc(lt,w,O-(Rt||0)),oc(dt,w,J),oc(ct,w,J-(Rt||0))),Ze&&!Hn&&R.update(),h&&!Hn&&!Nt&&(Nt=!0,h(R),Nt=!1)}},R.getVelocity=function(){return(At()-Wt)/(An()-ca)*1e3||0},R.endAnimation=function(){la(R.callbackAnimation),i&&(q?q.progress(1):i.paused()?L||la(i,R.direction<0,1):la(i,i.reversed()))},R.labelToScroll=function(nt){return i&&i.labels&&(It||R.refresh()||It)+i.labels[nt]/i.duration()*Vt||0},R.getTrailing=function(nt){var St=ae.indexOf(R),it=R.direction>0?ae.slice(0,St).reverse():ae.slice(St+1);return(li(nt)?it.filter(function(Rt){return Rt.vars.preventOverlaps===nt}):it).filter(function(Rt){return R.direction>0?Rt.end<=It:Rt.start>=Q})},R.update=function(nt,St,it){if(!(x&&!it&&!nt)){var Rt=Hn===!0?tt:R.scroll(),he=nt?0:(Rt-It)/Vt,jt=he<0?0:he>1?1:he||0,De=R.progress,Ze,Ne,Te,ve,tn,we,vn,ei;if(St&&(Wt=Dt,Dt=x?At():Rt,v&&(yt=mt,mt=i&&!L?i.totalProgress():jt)),m&&f&&!En&&!jl&&Mi&&(!jt&&It<Rt+(Rt-Wt)/(An()-ca)*m?jt=1e-4:jt===1&&Q>Rt+(Rt-Wt)/(An()-ca)*m&&(jt=.9999)),jt!==De&&R.enabled){if(Ze=R.isActive=!!jt&&jt<1,Ne=!!De&&De<1,we=Ze!==Ne,tn=we||!!jt!=!!De,R.direction=jt>De?1:-1,R.progress=jt,tn&&!En&&(Te=jt&&!De?0:jt===1?1:De===1?2:3,L&&(ve=!we&&F[Te+1]!=="none"&&F[Te+1]||F[Te],ei=i&&(ve==="complete"||ve==="reset"||ve in i))),P&&(we||ei)&&(ei||d||!i)&&(Cn(P)?P(R):R.getTrailing(P).forEach(function(ni){return ni.endAnimation()})),L||(q&&!En&&!jl?(q._dp._time-q._start!==q._time&&q.render(q._dp._time-q._start),q.resetTo?q.resetTo("totalProgress",jt,i._tTime/i._tDur):(q.vars.totalProgress=jt,q.invalidate().restart())):i&&i.totalProgress(jt,!!(En&&(ut||nt)))),f){if(nt&&p&&(oe.style[p+w.os2]=qt),!z)pt(ua(pe+Bt*jt));else if(tn){if(vn=!nt&&jt>De&&Q+1>Rt&&Rt+1>=Xi(N,w),E)if(!nt&&(Ze||vn)){var Ge=us(f,!0),Je=Rt-It;Qm(f,ye,Ge.top+(w===Ke?Je:0)+rn,Ge.left+(w===Ke?0:Je)+rn)}else Qm(f,oe);ro(Ze||vn?ie:U),W&&jt<1&&Ze||pt(pe+(jt===1&&!vn?Bt:0))}}v&&!gt.tween&&!En&&!jl&&D.restart(!0),a&&(we||M&&jt&&(jt<1||!yf))&&ya(a.targets).forEach(function(ni){return ni.classList[Ze||M?"add":"remove"](a.className)}),o&&!L&&!nt&&o(R),tn&&!En?(L&&(ei&&(ve==="complete"?i.pause().totalProgress(1):ve==="reset"?i.restart(!0).pause():ve==="restart"?i.restart(!0):i[ve]()),o&&o(R)),(we||!yf)&&(c&&we&&jr(R,c),G[Te]&&jr(R,G[Te]),M&&(jt===1?R.kill(!1,1):G[Te]=0),we||(Te=jt===1?1:3,G[Te]&&jr(R,G[Te]))),S&&!Ze&&Math.abs(R.getVelocity())>(fa(S)?S:2500)&&(la(R.callbackAnimation),q?q.progress(1):la(i,ve==="reverse"?1:!jt,1))):L&&o&&!En&&o(R)}if(ot){var en=x?Rt/x.duration()*(x._caScrollDist||0):Rt;b(en+(B._isFlipped?1:0)),ot(en)}_t&&_t(-Rt/x.duration()*(x._caScrollDist||0))}},R.enable=function(nt,St){R.enabled||(R.enabled=!0,hn(N,"resize",da),I||hn(N,"scroll",eo),K&&hn(s,"refreshInit",K),nt!==!1&&(R.progress=Mt=0,Dt=Wt=Z=At()),St!==!1&&R.refresh())},R.getTween=function(nt){return nt&&gt?gt.tween:q},R.setPositions=function(nt,St,it,Rt){if(x){var he=x.scrollTrigger,jt=x.duration(),De=he.end-he.start;nt=he.start+De*nt/jt,St=he.start+De*St/jt}R.refresh(!1,!1,{start:Hm(nt,it&&!!R._startClamp),end:Hm(St,it&&!!R._endClamp)},Rt),R.update()},R.adjustPinSpacing=function(nt){if(C&&nt){var St=C.indexOf(w.d)+1;C[St]=parseFloat(C[St])+nt+rn,C[1]=parseFloat(C[1])+nt+rn,ro(C)}},R.disable=function(nt,St){if(nt!==!1&&R.revert(!0,!0),R.enabled&&(R.enabled=R.isActive=!1,St||q&&q.pause(),tt=0,Lt&&(Lt.uncache=1),K&&cn(s,"refreshInit",K),D&&(D.pause(),gt.tween&&gt.tween.kill()&&(gt.tween=0)),!I)){for(var it=ae.length;it--;)if(ae[it].scroller===N&&ae[it]!==R)return;cn(N,"resize",da),I||cn(N,"scroll",eo)}},R.kill=function(nt,St){R.disable(nt,St),q&&!St&&q.kill(),l&&delete Rf[l];var it=ae.indexOf(R);it>=0&&ae.splice(it,1),it===Gn&&hc>0&&Gn--,it=0,ae.forEach(function(Rt){return Rt.scroller===R.scroller&&(it=1)}),it||Hn||Gs||(R.scroll.rec=0),i&&(i.scrollTrigger=null,nt&&i.revert({kill:!1}),St||i.kill()),lt&&[lt,ct,B,dt].forEach(function(Rt){return Rt.parentNode&&Rt.parentNode.removeChild(Rt)}),va===R&&(va=0),f&&(Lt&&(Lt.uncache=1),it=0,ae.forEach(function(Rt){return Rt.pin===f&&it++}),it||(Lt.spacer=0)),n.onKill&&n.onKill(R)},ae.push(R),R.enable(!1,!1),ht&&ht(R),i&&i.add&&!Vt){var rt=R.update;R.update=function(){R.update=rt,se.cache++,It||Q||R.refresh()},Ot.delayedCall(.01,R.update),Vt=.01,It=Q=0}else R.refresh();f&&Bv()},s.register=function(n){return no||(Ot=n||lg(),ag()&&window.document&&s.enable(),no=ha),no},s.defaults=function(n){if(n)for(var i in n)ic[i]=n[i];return ic},s.disable=function(n,i){ha=0,ae.forEach(function(o){return o[i?"kill":"disable"](n)}),cn(le,"wheel",eo),cn(Me,"scroll",eo),clearInterval(Ql),cn(Me,"touchcancel",Wi),cn(ye,"touchstart",Wi),ec(cn,Me,"pointerdown,touchstart,mousedown",Wm),ec(cn,Me,"pointerup,touchend,mouseup",Xm),dc.kill(),tc(cn);for(var r=0;r<se.length;r+=3)nc(cn,se[r],se[r+1]),nc(cn,se[r],se[r+2])},s.enable=function(){if(le=window,Me=document,ci=Me.documentElement,ye=Me.body,Ot){if(ya=Ot.utils.toArray,pa=Ot.utils.clamp,Af=Ot.core.context||Wi,vf=Ot.core.suppressOverwrites||Wi,Df=le.history.scrollRestoration||"auto",Pf=le.pageYOffset||0,Ot.core.globals("ScrollTrigger",s),ye){ha=1,so=document.createElement("div"),so.style.height="100vh",so.style.position="absolute",xg(),Iv(),qe.register(Ot),s.isTouch=qe.isTouch,Vs=qe.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ef=qe.isTouch===1,hn(le,"wheel",eo),Lf=[le,Me,ci,ye],Ot.matchMedia?(s.matchMedia=function(h){var d=Ot.matchMedia(),u;for(u in h)d.add(u,h[u]);return d},Ot.addEventListener("matchMediaInit",function(){gg(),zf()}),Ot.addEventListener("matchMediaRevert",function(){return mg()}),Ot.addEventListener("matchMedia",function(){xr(0,1),Tr("matchMedia")}),Ot.matchMedia().add("(orientation: portrait)",function(){return Mf(),Mf})):console.warn("Requires GSAP 3.11.0 or later"),Mf(),hn(Me,"scroll",eo);var n=ye.hasAttribute("style"),i=ye.style,r=i.borderTopStyle,o=Ot.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=us(ye),Ke.m=Math.round(a.top+Ke.sc())||0,wn.m=Math.round(a.left+wn.sc())||0,r?i.borderTopStyle=r:i.removeProperty("border-top-style"),n||(ye.setAttribute("style",""),ye.removeAttribute("style")),Ql=setInterval(Zm,250),Ot.delayedCall(.5,function(){return jl=0}),hn(Me,"touchcancel",Wi),hn(ye,"touchstart",Wi),ec(hn,Me,"pointerdown,touchstart,mousedown",Wm),ec(hn,Me,"pointerup,touchend,mouseup",Xm),wf=Ot.utils.checkPrefix("transform"),uc.push(wf),no=An(),dc=Ot.delayedCall(.2,xr).pause(),io=[Me,"visibilitychange",function(){var h=le.innerWidth,d=le.innerHeight;Me.hidden?(km=h,Vm=d):(km!==h||Vm!==d)&&da()},Me,"DOMContentLoaded",xr,le,"load",xr,le,"resize",da],tc(hn),ae.forEach(function(h){return h.enable(0,1)}),l=0;l<se.length;l+=3)nc(cn,se[l],se[l+1]),nc(cn,se[l],se[l+2])}else if(Me){var c=function h(){s.enable(),Me.removeEventListener("DOMContentLoaded",h)};Me.addEventListener("DOMContentLoaded",c)}}},s.config=function(n){"limitCallbacks"in n&&(yf=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Ql)||(Ql=i)&&setInterval(Zm,i),"ignoreMobileResize"in n&&(Ef=s.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(tc(cn)||tc(hn,n.autoRefreshEvents||"none"),sg=(n.autoRefreshEvents+"").indexOf("resize")===-1)},s.scrollerProxy=function(n,i){var r=kn(n),o=se.indexOf(r),a=Mr(r);~o&&se.splice(o,a?6:2),i&&(a?Pi.unshift(le,i,ye,i,ci,i):Pi.unshift(r,i))},s.clearMatchMedia=function(n){ae.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},s.isInViewport=function(n,i,r){var o=(li(n)?kn(n):n).getBoundingClientRect(),a=o[r?vr:yr]*i||0;return r?o.right-a>0&&o.left+a<le.innerWidth:o.bottom-a>0&&o.top+a<le.innerHeight},s.positionInViewport=function(n,i,r){li(n)&&(n=kn(n));var o=n.getBoundingClientRect(),a=o[r?vr:yr],l=i==null?a/2:i in mc?mc[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return r?(o.left+l)/le.innerWidth:(o.top+l)/le.innerHeight},s.killAll=function(n){if(ae.slice(0).forEach(function(r){return r.vars.id!=="ScrollSmoother"&&r.kill()}),n!==!0){var i=br.killAll||[];br={},i.forEach(function(r){return r()})}},s})();ne.version="3.15.1";ne.saveStyles=function(s){return s?ya(s).forEach(function(t){if(t&&t.style){var e=ai.indexOf(t);e>=0&&ai.splice(e,5),ai.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),Ot.core.getCache(t),Af())}}):ai};ne.revert=function(s,t){return zf(!s,t)};ne.create=function(s,t){return new ne(s,t)};ne.refresh=function(s){return s?da(!0):(no||ne.register())&&xr(!0)};ne.update=function(s){return++se.cache&&fs(s===!0?2:0)};ne.clearScrollMemory=_g;ne.maxScroll=function(s,t){return Xi(s,t?wn:Ke)};ne.getScrollFunc=function(s,t){return cs(kn(s),t?wn:Ke)};ne.getById=function(s){return Rf[s]};ne.getAll=function(){return ae.filter(function(s){return s.vars.id!=="ScrollSmoother"})};ne.isScrolling=function(){return!!Mi};ne.snapDirectional=Bf;ne.addEventListener=function(s,t){var e=br[s]||(br[s]=[]);~e.indexOf(t)||e.push(t)};ne.removeEventListener=function(s,t){var e=br[s],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};ne.batch=function(s,t){var e=[],n={},i=t.interval||.016,r=t.batchMax||1e9,o=function(c,h){var d=[],u=[],f=Ot.delayedCall(i,function(){h(d,u),d=[],u=[]}).pause();return function(p){d.length||f.restart(!0),d.push(p.trigger),u.push(p),r<=d.length&&f.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&Cn(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return Cn(r)&&(r=r(),hn(ne,"refresh",function(){return r=t.batchMax()})),ya(s).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(ne.create(c))}),e};var tg=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},Tf=function s(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(qe.isTouch?" pinch-zoom":""):"none",t===ci&&s(ye,e)},ac={auto:1,scroll:1},Hv=function(t){var e=t.event,n=t.target,i=t.axis,r=(e.changedTouches?e.changedTouches[0]:e).target,o=r._gsap||Ot.core.getCache(r),a=An(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;r&&r!==ye&&(r.scrollHeight<=r.clientHeight&&r.scrollWidth<=r.clientWidth||!(ac[(l=Si(r)).overflowY]||ac[l.overflowX]));)r=r.parentNode;o._isScroll=r&&r!==n&&!Mr(r)&&(ac[(l=Si(r)).overflowY]||ac[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},yg=function(t,e,n,i){return qe.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&Hv,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&hn(Me,qe.eventTypes[0],ng,!1,!0)},onDisable:function(){return cn(Me,qe.eventTypes[0],ng,!0)}})},Wv=/(input|label|select|textarea)/i,eg,ng=function(t){var e=Wv.test(t.target.tagName);(e||eg)&&(t._gsapAllow=!0,eg=e)},Xv=function(t){_r(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,r=e.allowNestedScroll,o=e.onRelease,a,l,c=kn(t.target)||ci,h=Ot.core.globals().ScrollSmoother,d=h&&h.get(),u=Vs&&(t.content&&kn(t.content)||d&&t.content!==!1&&!d.smooth()&&d.content()),f=cs(c,Ke),p=cs(c,wn),_=1,m=(qe.isTouch&&le.visualViewport?le.visualViewport.scale*le.visualViewport.width:le.outerWidth)/le.innerWidth,g=0,y=Cn(i)?function(){return i(a)}:function(){return i||2.8},M,v,E=yg(c,t.type,!0,r),A=function(){return v=!1},x=Wi,S=Wi,P=function(){l=Xi(c,Ke),S=pa(Vs?1:0,l),n&&(x=pa(0,Xi(c,wn))),M=Sr},w=function(){u._gsap.y=ua(parseFloat(u._gsap.y)+f.offset)+"px",u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(u._gsap.y)+", 0, 1)",f.offset=f.cacheID=0},L=function(){if(v){requestAnimationFrame(A);var j=ua(a.deltaY/2),X=S(f.v-j);if(u&&X!==f.v+f.offset){f.offset=X-f.v;var R=ua((parseFloat(u&&u._gsap.y)||0)-f.offset);u.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+R+", 0, 1)",u._gsap.y=R+"px",f.cacheID=se.cache,fs()}return!0}f.offset&&w(),v=!0},N,V,I,z,G=function(){P(),N.isActive()&&N.vars.scrollY>l&&(f()>l?N.progress(1)&&f(l):N.resetTo("scrollY",l))};return u&&Ot.set(u,{y:"+=0"}),t.ignoreCheck=function(F){return Vs&&F.type==="touchmove"&&L(F)||_>1.05&&F.type!=="touchstart"||a.isGesturing||F.touches&&F.touches.length>1},t.onPress=function(){v=!1;var F=_;_=ua((le.visualViewport&&le.visualViewport.scale||1)/m),N.pause(),F!==_&&Tf(c,_>1.01?!0:n?!1:"x"),V=p(),I=f(),P(),M=Sr},t.onRelease=t.onGestureStart=function(F,j){if(f.offset&&w(),!j)z.restart(!0);else{se.cache++;var X=y(),R,K;n&&(R=p(),K=R+X*.05*-F.velocityX/.227,X*=tg(p,R,K,Xi(c,wn)),N.vars.scrollX=x(K)),R=f(),K=R+X*.05*-F.velocityY/.227,X*=tg(f,R,K,Xi(c,Ke)),N.vars.scrollY=S(K),N.invalidate().duration(X).play(.01),(Vs&&N.vars.scrollY>=l||R>=l-1)&&Ot.to({},{onUpdate:G,duration:X})}o&&o(F)},t.onWheel=function(){N._ts&&N.pause(),An()-g>1e3&&(M=0,g=An())},t.onChange=function(F,j,X,R,K){if(Sr!==M&&P(),j&&n&&p(x(R[2]===j?V+(F.startX-F.x):p()+j-R[1])),X){f.offset&&w();var Tt=K[2]===X,Ut=Tt?I+F.startY-F.y:f()+X-K[1],Z=S(Ut);Tt&&Ut!==Z&&(I+=Z-Ut),f(Z)}(X||j)&&fs()},t.onEnable=function(){Tf(c,n?!1:"x"),ne.addEventListener("refresh",G),hn(le,"resize",G),f.smooth&&(f.target.style.scrollBehavior="auto",f.smooth=p.smooth=!1),E.enable()},t.onDisable=function(){Tf(c,!0),cn(le,"resize",G),ne.removeEventListener("refresh",G),E.kill()},t.lockAxis=t.lockAxis!==!1,a=new qe(t),a.iOS=Vs,Vs&&!f()&&f(1),Vs&&Ot.ticker.add(Wi),z=a._dc,N=Ot.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:vg(f,f(),function(){return N.pause()})},onUpdate:fs,onComplete:z.vars.onComplete}),a};ne.sort=function(s){if(Cn(s))return ae.sort(s);var t=le.pageYOffset||0;return ne.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+le.innerHeight}),ae.sort(s||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};ne.observe=function(s){return new qe(s)};ne.normalizeScroll=function(s){if(typeof s>"u")return Vn;if(s===!0&&Vn)return Vn.enable();if(s===!1){Vn&&Vn.kill(),Vn=s;return}var t=s instanceof qe?s:Xv(s);return Vn&&Vn.target===t.target&&Vn.kill(),Mr(t.target)&&(Vn=t),t};ne.core={_getVelocityProp:Kl,_inputObserver:yg,_scrollers:se,_proxies:Pi,bridge:{ss:function(){Mi||Tr("scrollStart"),Mi=An()},ref:function(){return En}}};lg()&&Ot.registerPlugin(ne);var e_=0,bd=1,n_=2;var fl=1,Ih=2,Uo=3,er=0,Xn=1,Ei=2,Dr=0,Fo=1,Td=2,wd=3,Ed=4,i_=5;var Nr=100,s_=101,r_=102,o_=103,a_=104,l_=200,c_=201,h_=202,u_=203,Ad=204,Cd=205,f_=206,d_=207,p_=208,m_=209,g_=210,__=211,x_=212,v_=213,y_=214,qc=0,Yc=1,Zc=2,bo=3,Jc=4,$c=5,Kc=6,Qc=7,Rd=0,S_=1,M_=2,ji=0,Pd=1,Id=2,Ld=3,dl=4,Dd=5,Nd=6,Od=7;var Ud=300,Or=301,Bo=302,Lh=303,Dh=304,jc=1e3,Yi=1001,th=1002,fn=1003,b_=1004;var pl=1005;var Wn=1006,Nh=1007;var Ts=1008;var ti=1009,Fd=1010,Bd=1011,zo=1012,Oh=1013,Oi=1014,Ui=1015,Fi=1016,Uh=1017,Fh=1018,Ur=1020,zd=35902,kd=35899,Vd=1021,Gd=1022,Bi=1023,ys=1026,ws=1027,Hd=1028,Bh=1029,nr=1030,zh=1031;var kh=1033,ml=33776,gl=33777,_l=33778,xl=33779,Vh=35840,Gh=35841,Hh=35842,Wh=35843,Xh=36196,qh=37492,Yh=37496,Zh=37488,Jh=37489,vl=37490,$h=37491,Kh=37808,Qh=37809,jh=37810,tu=37811,eu=37812,nu=37813,iu=37814,su=37815,ru=37816,ou=37817,au=37818,lu=37819,cu=37820,hu=37821,uu=36492,fu=36494,du=36495,pu=36283,mu=36284,yl=36285,gu=36286;var La=2300,eh=2301,Wc=2302,ud=2303,fd=2400,dd=2401,pd=2402;var T_=3200;var _u=0,w_=1,Es="",In="srgb",Da="srgb-linear",Na="linear",Se="srgb";var Xc=7680;var E_=519,A_=512,C_=513,R_=514,Wd=515,P_=516,I_=517,Xd=518,qd=519,L_=35044;var Yd="300 es",Ti=2e3,To=2001;function qv(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Yv(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Oa(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function D_(){let s=Oa("canvas");return s.style.display="block",s}var Sg={},wo=null;function Zd(...s){let t="THREE."+s.shift();wo?wo("log",t,...s):console.log(t,...s)}function N_(s){let t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Yt(...s){s=N_(s);let t="THREE."+s.shift();if(wo)wo("warn",t,...s);else{let e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function Jt(...s){s=N_(s);let t="THREE."+s.shift();if(wo)wo("error",t,...s);else{let e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function Ca(...s){let t=s.join(" ");t in Sg||(Sg[t]=!0,Yt(...s))}function O_(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var U_={[qc]:qc,[Zc]:Kc,[Jc]:Jc,[bo]:$c,[Yc]:Yc,[Kc]:Zc,[Qc]:Qc,[$c]:bo},$i=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let i=n[t];if(i!==void 0){let r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}},Rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Mg=1234567,So=Math.PI/180,Eo=180/Math.PI;function Fr(){let s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Rn[s&255]+Rn[s>>8&255]+Rn[s>>16&255]+Rn[s>>24&255]+"-"+Rn[t&255]+Rn[t>>8&255]+"-"+Rn[t>>16&15|64]+Rn[t>>24&255]+"-"+Rn[e&63|128]+Rn[e>>8&255]+"-"+Rn[e>>16&255]+Rn[e>>24&255]+Rn[n&255]+Rn[n>>8&255]+Rn[n>>16&255]+Rn[n>>24&255]).toLowerCase()}function ce(s,t,e){return Math.max(t,Math.min(e,s))}function Jd(s,t){return(s%t+t)%t}function Zv(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Jv(s,t,e){return s!==t?(e-s)/(t-s):0}function Ra(s,t,e){return(1-e)*s+e*t}function $v(s,t,e,n){return Ra(s,t,1-Math.exp(-e*n))}function Kv(s,t=1){return t-Math.abs(Jd(s,t*2)-t)}function Qv(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function jv(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function ty(s,t){return s+Math.floor(Math.random()*(t-s+1))}function ey(s,t){return s+Math.random()*(t-s)}function ny(s){return s*(.5-Math.random())}function iy(s){s!==void 0&&(Mg=s);let t=Mg+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function sy(s){return s*So}function ry(s){return s*Eo}function oy(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function ay(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function $d(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function ly(s,t,e,n,i){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:Yt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Kd(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function F_(s,t){if(t.constructor===Float32Array)return s;let e=Kd(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function B_(s,t){if(t.constructor===Float32Array)return s;let e=Kd(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}var xu={DEG2RAD:So,RAD2DEG:Eo,generateUUID:Fr,clamp:ce,euclideanModulo:Jd,mapLinear:Zv,inverseLerp:Jv,lerp:Ra,damp:$v,pingpong:Kv,smoothstep:Qv,smootherstep:jv,randInt:ty,randFloat:ey,randFloatSpread:ny,seededRandom:iy,degToRad:sy,radToDeg:ry,isPowerOfTwo:oy,ceilPowerOfTwo:ay,floorPowerOfTwo:$d,setQuaternionFromProperEuler:ly,normalize:B_,denormalize:F_},ip=class ip{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ip.prototype.isVector2=!0;var Et=ip,Ki=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(d!==_||l!==u||c!==f||h!==p){let m=l*u+c*f+h*p+d*_;m<0&&(u=-u,f=-f,p=-p,_=-_,m=-m);let g=1-a;if(m<.9995){let y=Math.acos(m),M=Math.sin(y);g=Math.sin(g*y)/M,a=Math.sin(a*y)/M,l=l*g+u*a,c=c*g+f*a,h=h*g+p*a,d=d*g+_*a}else{l=l*g+u*a,c=c*g+f*a,h=h*g+p*a,d=d*g+_*a;let y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*d+l*f-c*u,t[e+1]=l*p+h*u+c*d-a*f,t[e+2]=c*p+h*f+a*u-l*d,t[e+3]=h*p-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Yt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ce(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,o=t._w,a=this.dot(t);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-e;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+o*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},sp=class sp{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(bg.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(bg.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return kf.copy(this).projectOnVector(t),this.sub(kf)}reflect(t){return this.sub(kf.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};sp.prototype.isVector3=!0;var k=sp,kf=new k,bg=new Ki,rp=class rp{constructor(t,e,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=i[0],m=i[3],g=i[6],y=i[1],M=i[4],v=i[7],E=i[2],A=i[5],x=i[8];return r[0]=o*_+a*y+l*E,r[3]=o*m+a*M+l*A,r[6]=o*g+a*v+l*x,r[1]=c*_+h*y+d*E,r[4]=c*m+h*M+d*A,r[7]=c*g+h*v+d*x,r[2]=u*_+f*y+p*E,r[5]=u*m+f*M+p*A,r[8]=u*g+f*v+p*x,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return t[0]=d*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=u*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return Ca("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Vf.makeScale(t,e)),this}rotate(t){return Ca("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Vf.makeRotation(-t)),this}translate(t,e){return Ca("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Vf.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};rp.prototype.isMatrix3=!0;var Qt=rp,Vf=new Qt,Tg=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wg=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cy(){let s={enabled:!0,workingColorSpace:Da,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Se&&(i.r=vs(i.r),i.g=vs(i.g),i.b=vs(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Se&&(i.r=Mo(i.r),i.g=Mo(i.g),i.b=Mo(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Es?Na:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Da]:{primaries:t,whitePoint:n,transfer:Na,toXYZ:Tg,fromXYZ:wg,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:In},outputColorSpaceConfig:{drawingBufferColorSpace:In}},[In]:{primaries:t,whitePoint:n,transfer:Se,toXYZ:Tg,fromXYZ:wg,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:In}}}),s}var de=cy();function vs(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Mo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ao,nh=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ao===void 0&&(ao=Oa("canvas")),ao.width=t.width,ao.height=t.height;let i=ao.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=ao}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Oa("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=vs(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vs(e[n]/255)*255):e[n]=vs(e[n]);return{data:e,width:t.width,height:t.height}}else return Yt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},hy=0,Ao=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:hy++}),this.uuid=Fr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Gf(i[o].image)):r.push(Gf(i[o]))}else r=Gf(i);n.url=r}return e||(t.images[this.uuid]=n),n}};function Gf(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?nh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Yt("Texture: Unable to serialize Texture."),{})}var uy=0,Hf=new k,Qn=class s extends $i{constructor(t=s.DEFAULT_IMAGE,e=s.DEFAULT_MAPPING,n=Yi,i=Yi,r=Wn,o=Ts,a=Bi,l=ti,c=s.DEFAULT_ANISOTROPY,h=Es){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:uy++}),this.uuid=Fr(),this.name="",this.source=new Ao(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Hf).x}get height(){return this.source.getSize(Hf).y}get depth(){return this.source.getSize(Hf).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){Yt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Yt(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ud)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jc:t.x=t.x-Math.floor(t.x);break;case Yi:t.x=t.x<0?0:1;break;case th:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jc:t.y=t.y-Math.floor(t.y);break;case Yi:t.y=t.y<0?0:1;break;case th:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Qn.DEFAULT_IMAGE=null;Qn.DEFAULT_MAPPING=Ud;Qn.DEFAULT_ANISOTROPY=1;var op=class op{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],_=l[2],m=l[6],g=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+m)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let M=(c+1)/2,v=(f+1)/2,E=(g+1)/2,A=(h+u)/4,x=(d+_)/4,S=(p+m)/4;return M>v&&M>E?M<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(M),i=A/n,r=x/n):v>E?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=A/i,r=S/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=x/r,i=S/r),this.set(n,i,r,e),this}let y=Math.sqrt((m-p)*(m-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-p)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this.w=ce(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this.w=ce(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};op.prototype.isVector4=!0;var Ue=op,ih=class extends $i{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ue(0,0,t,e),this.scissorTest=!1,this.viewport=new Ue(0,0,t,e),this.textures=[];let i=n.count;for(let r=0;r<i;r++)this.textures[r]=new Qn({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Wn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let i=Object.assign({},t.textures[e].image);this.textures[e].source=new Ao(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},fi=class extends ih{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ua=class extends Qn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=fn,this.minFilter=fn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var sh=class extends Qn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=fn,this.minFilter=fn,this.wrapR=Yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ph=class Ph{constructor(t,e,n,i,r,o,a,l,c,h,d,u,f,p,_,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,d,u,f,p,_,m)}set(t,e,n,i,r,o,a,l,c,h,d,u,f,p,_,m){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=i,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=d,g[14]=u,g[3]=f,g[7]=p,g[11]=_,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ph().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,i=1/lo.setFromMatrixColumn(t,0).length(),r=1/lo.setFromMatrixColumn(t,1).length(),o=1/lo.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,p=a*h,_=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+p*c,e[5]=u-_*c,e[9]=-a*l,e[2]=_-u*c,e[6]=p+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,p=c*h,_=c*d;e[0]=u+_*a,e[4]=p*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=_+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,p=c*h,_=c*d;e[0]=u-_*a,e[4]=-o*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=_-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,p=a*h,_=a*d;e[0]=l*h,e[4]=p*c-f,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=_-u*d,e[8]=p*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+p,e[10]=u-_*d}else if(t.order==="XZY"){let u=o*l,f=o*c,p=a*l,_=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=o*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(fy,t,dy)}lookAt(t,e,n){let i=this.elements;return hi.subVectors(t,e),hi.lengthSq()===0&&(hi.z=1),hi.normalize(),Hs.crossVectors(n,hi),Hs.lengthSq()===0&&(Math.abs(n.z)===1?hi.x+=1e-4:hi.z+=1e-4,hi.normalize(),Hs.crossVectors(n,hi)),Hs.normalize(),_c.crossVectors(hi,Hs),i[0]=Hs.x,i[4]=_c.x,i[8]=hi.x,i[1]=Hs.y,i[5]=_c.y,i[9]=hi.y,i[2]=Hs.z,i[6]=_c.z,i[10]=hi.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],m=n[10],g=n[14],y=n[3],M=n[7],v=n[11],E=n[15],A=i[0],x=i[4],S=i[8],P=i[12],w=i[1],L=i[5],N=i[9],V=i[13],I=i[2],z=i[6],G=i[10],F=i[14],j=i[3],X=i[7],R=i[11],K=i[15];return r[0]=o*A+a*w+l*I+c*j,r[4]=o*x+a*L+l*z+c*X,r[8]=o*S+a*N+l*G+c*R,r[12]=o*P+a*V+l*F+c*K,r[1]=h*A+d*w+u*I+f*j,r[5]=h*x+d*L+u*z+f*X,r[9]=h*S+d*N+u*G+f*R,r[13]=h*P+d*V+u*F+f*K,r[2]=p*A+_*w+m*I+g*j,r[6]=p*x+_*L+m*z+g*X,r[10]=p*S+_*N+m*G+g*R,r[14]=p*P+_*V+m*F+g*K,r[3]=y*A+M*w+v*I+E*j,r[7]=y*x+M*L+v*z+E*X,r[11]=y*S+M*N+v*G+E*R,r[15]=y*P+M*V+v*F+E*K,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],_=t[7],m=t[11],g=t[15],y=l*f-c*u,M=a*f-c*d,v=a*u-l*d,E=o*f-c*h,A=o*u-l*h,x=o*d-a*h;return e*(_*y-m*M+g*v)-n*(p*y-m*E+g*A)+i*(p*M-_*E+g*x)-r*(p*v-_*A+m*x)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],o=t[5],a=t[9],l=t[2],c=t[6],h=t[10];return e*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],_=t[13],m=t[14],g=t[15],y=e*a-n*o,M=e*l-i*o,v=e*c-r*o,E=n*l-i*a,A=n*c-r*a,x=i*c-r*l,S=h*_-d*p,P=h*m-u*p,w=h*g-f*p,L=d*m-u*_,N=d*g-f*_,V=u*g-f*m,I=y*V-M*N+v*L+E*w-A*P+x*S;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/I;return t[0]=(a*V-l*N+c*L)*z,t[1]=(i*N-n*V-r*L)*z,t[2]=(_*x-m*A+g*E)*z,t[3]=(u*A-d*x-f*E)*z,t[4]=(l*w-o*V-c*P)*z,t[5]=(e*V-i*w+r*P)*z,t[6]=(m*v-p*x-g*M)*z,t[7]=(h*x-u*v+f*M)*z,t[8]=(o*N-a*w+c*S)*z,t[9]=(n*w-e*N-r*S)*z,t[10]=(p*A-_*v+g*y)*z,t[11]=(d*v-h*A-f*y)*z,t[12]=(a*P-o*L-l*S)*z,t[13]=(e*L-n*P+i*S)*z,t[14]=(_*M-p*E-m*y)*z,t[15]=(h*E-d*M+u*y)*z,this}scale(t){let e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){let i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,p=r*d,_=o*h,m=o*d,g=a*d,y=l*c,M=l*h,v=l*d,E=n.x,A=n.y,x=n.z;return i[0]=(1-(_+g))*E,i[1]=(f+v)*E,i[2]=(p-M)*E,i[3]=0,i[4]=(f-v)*A,i[5]=(1-(u+g))*A,i[6]=(m+y)*A,i[7]=0,i[8]=(p+M)*x,i[9]=(m-y)*x,i[10]=(1-(u+_))*x,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){let i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let o=lo.set(i[0],i[1],i[2]).length(),a=lo.set(i[4],i[5],i[6]).length(),l=lo.set(i[8],i[9],i[10]).length();r<0&&(o=-o),Ii.copy(this);let c=1/o,h=1/a,d=1/l;return Ii.elements[0]*=c,Ii.elements[1]*=c,Ii.elements[2]*=c,Ii.elements[4]*=h,Ii.elements[5]*=h,Ii.elements[6]*=h,Ii.elements[8]*=d,Ii.elements[9]*=d,Ii.elements[10]*=d,e.setFromRotationMatrix(Ii),n.x=o,n.y=a,n.z=l,this}makePerspective(t,e,n,i,r,o,a=Ti,l=!1){let c=this.elements,h=2*r/(e-t),d=2*r/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i),p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===Ti)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===To)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=Ti,l=!1){let c=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),f=-(n+i)/(n-i),p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===Ti)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===To)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};Ph.prototype.isMatrix4=!0;var Pe=Ph,lo=new k,Ii=new Pe,fy=new k(0,0,0),dy=new k(1,1,1),Hs=new k,_c=new k,hi=new k,Eg=new Pe,Ag=new Ki,Ss=class s{constructor(t=0,e=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ce(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ce(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Yt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Eg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Eg,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ag.setFromEuler(this),this.setFromQuaternion(Ag,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ss.DEFAULT_ORDER="XYZ";var Fa=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},py=0,Cg=new k,co=new Ki,ds=new Pe,xc=new k,Ma=new k,my=new k,gy=new Ki,Rg=new k(1,0,0),Pg=new k(0,1,0),Ig=new k(0,0,1),Lg={type:"added"},_y={type:"removed"},ho={type:"childadded",child:null},Wf={type:"childremoved",child:null},_n=class s extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:py++}),this.uuid=Fr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let t=new k,e=new Ss,n=new Ki,i=new k(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Qt}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return co.setFromAxisAngle(t,e),this.quaternion.multiply(co),this}rotateOnWorldAxis(t,e){return co.setFromAxisAngle(t,e),this.quaternion.premultiply(co),this}rotateX(t){return this.rotateOnAxis(Rg,t)}rotateY(t){return this.rotateOnAxis(Pg,t)}rotateZ(t){return this.rotateOnAxis(Ig,t)}translateOnAxis(t,e){return Cg.copy(t).applyQuaternion(this.quaternion),this.position.add(Cg.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Rg,t)}translateY(t){return this.translateOnAxis(Pg,t)}translateZ(t){return this.translateOnAxis(Ig,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ds.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?xc.copy(t):xc.set(t,e,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ma.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ds.lookAt(Ma,xc,this.up):ds.lookAt(xc,Ma,this.up),this.quaternion.setFromRotationMatrix(ds),i&&(ds.extractRotation(i.matrixWorld),co.setFromRotationMatrix(ds),this.quaternion.premultiply(co.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Jt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Lg),ho.child=t,this.dispatchEvent(ho),ho.child=null):Jt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_y),Wf.child=t,this.dispatchEvent(Wf),Wf.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ds.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ds.multiply(t.parent.matrixWorld)),t.applyMatrix4(ds),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Lg),ho.child=t,this.dispatchEvent(ho),ho.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ma,t,my),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ma,gy,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};_n.DEFAULT_UP=new k(0,1,0);_n.DEFAULT_MATRIX_AUTO_UPDATE=!0;_n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Zi=class extends _n{constructor(){super(),this.isGroup=!0,this.type="Group"}},xy={type:"move"},Co=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let _ of t.hand.values()){let m=e.getJointPose(_,n),g=this._getHandJoint(c,_);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(xy)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Zi;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},z_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ws={h:0,s:0,l:0},vc={h:0,s:0,l:0};function Xf(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}var ee=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=In){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=de.workingColorSpace){if(t=Jd(t,1),e=ce(e,0,1),n=ce(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Xf(o,r,t+1/3),this.g=Xf(o,r,t),this.b=Xf(o,r,t-1/3)}return de.colorSpaceToWorking(this,i),this}setStyle(t,e=In){function n(r){r!==void 0&&parseFloat(r)<1&&Yt("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Yt("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);Yt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=In){let n=z_[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Yt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}copyLinearToSRGB(t){return this.r=Mo(t.r),this.g=Mo(t.g),this.b=Mo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=In){return de.workingToColorSpace(Pn.copy(this),t),Math.round(ce(Pn.r*255,0,255))*65536+Math.round(ce(Pn.g*255,0,255))*256+Math.round(ce(Pn.b*255,0,255))}getHexString(t=In){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.workingToColorSpace(Pn.copy(this),e);let n=Pn.r,i=Pn.g,r=Pn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.workingToColorSpace(Pn.copy(this),e),t.r=Pn.r,t.g=Pn.g,t.b=Pn.b,t}getStyle(t=In){de.workingToColorSpace(Pn.copy(this),t);let e=Pn.r,n=Pn.g,i=Pn.b;return t!==In?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ws),this.setHSL(Ws.h+t,Ws.s+e,Ws.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ws),t.getHSL(vc);let n=Ra(Ws.h,vc.h,e),i=Ra(Ws.s,vc.s,e),r=Ra(Ws.l,vc.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Pn=new ee;ee.NAMES=z_;var Ba=class s{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new ee(t),this.near=e,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},za=class extends _n{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ss,this.environmentIntensity=1,this.environmentRotation=new Ss,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Li=new k,ps=new k,qf=new k,ms=new k,uo=new k,fo=new k,Dg=new k,Yf=new k,Zf=new k,Jf=new k,$f=new Ue,Kf=new Ue,Qf=new Ue,xs=class s{constructor(t=new k,e=new k,n=new k){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Li.subVectors(t,e),i.cross(Li);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Li.subVectors(i,e),ps.subVectors(n,e),qf.subVectors(t,e);let o=Li.dot(Li),a=Li.dot(ps),l=Li.dot(qf),c=ps.dot(ps),h=ps.dot(qf),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ms)===null?!1:ms.x>=0&&ms.y>=0&&ms.x+ms.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,ms)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ms.x),l.addScaledVector(o,ms.y),l.addScaledVector(a,ms.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return $f.setScalar(0),Kf.setScalar(0),Qf.setScalar(0),$f.fromBufferAttribute(t,e),Kf.fromBufferAttribute(t,n),Qf.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector($f,r.x),o.addScaledVector(Kf,r.y),o.addScaledVector(Qf,r.z),o}static isFrontFacing(t,e,n,i){return Li.subVectors(n,e),ps.subVectors(t,e),Li.cross(ps).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Li.subVectors(this.c,this.b),ps.subVectors(this.a,this.b),Li.cross(ps).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return s.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return s.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return s.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return s.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return s.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,i=this.b,r=this.c,o,a;uo.subVectors(i,n),fo.subVectors(r,n),Yf.subVectors(t,n);let l=uo.dot(Yf),c=fo.dot(Yf);if(l<=0&&c<=0)return e.copy(n);Zf.subVectors(t,i);let h=uo.dot(Zf),d=fo.dot(Zf);if(h>=0&&d<=h)return e.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),e.copy(n).addScaledVector(uo,o);Jf.subVectors(t,r);let f=uo.dot(Jf),p=fo.dot(Jf);if(p>=0&&f<=p)return e.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(fo,a);let m=h*p-f*d;if(m<=0&&d-h>=0&&f-p>=0)return Dg.subVectors(r,i),a=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(Dg,a);let g=1/(m+_+u);return o=_*g,a=u*g,e.copy(n).addScaledVector(uo,o).addScaledVector(fo,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Zs=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Di.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Di.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Di.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Di):Di.fromBufferAttribute(r,o),Di.applyMatrix4(t.matrixWorld),this.expandByPoint(Di);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yc.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),yc.copy(n.boundingBox)),yc.applyMatrix4(t.matrixWorld),this.union(yc)}let i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Di),Di.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ba),Sc.subVectors(this.max,ba),po.subVectors(t.a,ba),mo.subVectors(t.b,ba),go.subVectors(t.c,ba),Xs.subVectors(mo,po),qs.subVectors(go,mo),wr.subVectors(po,go);let e=[0,-Xs.z,Xs.y,0,-qs.z,qs.y,0,-wr.z,wr.y,Xs.z,0,-Xs.x,qs.z,0,-qs.x,wr.z,0,-wr.x,-Xs.y,Xs.x,0,-qs.y,qs.x,0,-wr.y,wr.x,0];return!jf(e,po,mo,go,Sc)||(e=[1,0,0,0,1,0,0,0,1],!jf(e,po,mo,go,Sc))?!1:(Mc.crossVectors(Xs,qs),e=[Mc.x,Mc.y,Mc.z],jf(e,po,mo,go,Sc))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Di).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Di).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},gs=[new k,new k,new k,new k,new k,new k,new k,new k],Di=new k,yc=new Zs,po=new k,mo=new k,go=new k,Xs=new k,qs=new k,wr=new k,ba=new k,Sc=new k,Mc=new k,Er=new k;function jf(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Er.fromArray(s,r);let a=i.x*Math.abs(Er.x)+i.y*Math.abs(Er.y)+i.z*Math.abs(Er.z),l=t.dot(Er),c=e.dot(Er),h=n.dot(Er);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var je=new k,bc=new Et,vy=0,Ji=class extends $i{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vy++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=L_,this.updateRanges=[],this.gpuType=Ui,this.version=0,this._normalizationScale=t!==void 0?Kd(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)bc.fromBufferAttribute(this,e),bc.applyMatrix3(t),this.setXY(e,bc.x,bc.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix3(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):F_(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):B_(t,this.array)}};var ka=class extends Ji{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Va=class extends Ji{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var Le=class extends Ji{constructor(t,e,n){super(new Float32Array(t),e,n)}},yy=new Zs,Ta=new k,td=new k,Pr=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):yy.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ta.subVectors(t,this.center);let e=Ta.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ta,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(td.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ta.copy(t.center).add(td)),this.expandByPoint(Ta.copy(t.center).sub(td))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Sy=0,bi=new Pe,ed=new _n,_o=new k,ui=new Zs,wa=new Zs,un=new k,jn=class s extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sy++}),this.uuid=Fr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(qv(t)?Va:ka)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return bi.makeRotationFromQuaternion(t),this.applyMatrix4(bi),this}rotateX(t){return bi.makeRotationX(t),this.applyMatrix4(bi),this}rotateY(t){return bi.makeRotationY(t),this.applyMatrix4(bi),this}rotateZ(t){return bi.makeRotationZ(t),this.applyMatrix4(bi),this}translate(t,e,n){return bi.makeTranslation(t,e,n),this.applyMatrix4(bi),this}scale(t,e,n){return bi.makeScale(t,e,n),this.applyMatrix4(bi),this}lookAt(t){return ed.lookAt(t),ed.updateMatrix(),this.applyMatrix4(ed.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_o).negate(),this.translate(_o.x,_o.y,_o.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let i=0,r=t.length;i<r;i++){let o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Le(n,3))}else{let n=Math.min(t.length,e.count);for(let i=0;i<n;i++){let r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Yt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zs);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){let r=e[n];ui.setFromBufferAttribute(r),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Jt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pr);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Jt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let n=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];wa.setFromBufferAttribute(a),this.morphTargetsRelative?(un.addVectors(ui.min,wa.min),ui.expandByPoint(un),un.addVectors(ui.max,wa.max),ui.expandByPoint(un)):(ui.expandByPoint(wa.min),ui.expandByPoint(wa.max))}ui.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)un.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(un));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)un.fromBufferAttribute(a,c),l&&(_o.fromBufferAttribute(t,c),un.add(_o)),i=Math.max(i,n.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Jt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Jt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,i=e.normal,r=e.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Ji(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let P=0;P<n.count;P++)a[P]=new k,l[P]=new k;let h=new k,d=new k,u=new k,f=new Et,p=new Et,_=new Et,m=new k,g=new k;function y(P,w,L){c[P]=c[w]=c[L]=1,h.fromBufferAttribute(n,P),d.fromBufferAttribute(n,w),u.fromBufferAttribute(n,L),f.fromBufferAttribute(r,P),p.fromBufferAttribute(r,w),_.fromBufferAttribute(r,L),d.sub(h),u.sub(h),p.sub(f),_.sub(f);let N=1/(p.x*_.y-_.x*p.y);isFinite(N)&&(m.copy(d).multiplyScalar(_.y).addScaledVector(u,-p.y).multiplyScalar(N),g.copy(u).multiplyScalar(p.x).addScaledVector(d,-_.x).multiplyScalar(N),a[P].add(m),a[w].add(m),a[L].add(m),l[P].add(g),l[w].add(g),l[L].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let P=0,w=M.length;P<w;++P){let L=M[P],N=L.start,V=L.count;for(let I=N,z=N+V;I<z;I+=3)y(t.getX(I+0),t.getX(I+1),t.getX(I+2))}let v=new k,E=new k,A=new k,x=new k;function S(P){A.fromBufferAttribute(i,P),x.copy(A);let w=a[P];v.copy(w),v.sub(A.multiplyScalar(A.dot(w))).normalize(),E.crossVectors(x,w);let N=E.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,N)}for(let P=0,w=n.count;P<w;++P)c[P]&&S(P);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ji(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new k,r=new k,o=new k,a=new k,l=new k,c=new k,h=new k,d=new k;if(t)for(let u=0,f=t.count;u<f;u+=3){let p=t.getX(u+0),_=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)un.fromBufferAttribute(t,e),un.normalize(),t.setXYZ(e,un.x,un.y,un.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let g=0;g<h;g++)u[p++]=c[f++]}return new Ji(u,h,d)}if(this.index===null)return Yt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let i=t.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var nd=new k,My=new k,by=new Qt,Ni=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let i=nd.subVectors(n,e).cross(My.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let i=t.delta(nd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let o=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:e.copy(t.start).addScaledVector(i,o)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||by.getNormalMatrix(t),i=this.coplanarPoint(nd).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},Ty=0,Ms=class extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ty++}),this.uuid=Fr(),this.name="",this.type="Material",this.blending=Fo,this.side=er,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ad,this.blendDst=Cd,this.blendEquation=Nr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ee(0,0,0),this.blendAlpha=0,this.depthFunc=bo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=E_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xc,this.stencilZFail=Xc,this.stencilZPass=Xc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){Yt(`Material: parameter '${e}' has value of undefined.`);continue}let i=this[e];if(i===void 0){Yt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ee().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new Ni().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Et().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Et().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var _s=new k,id=new k,Tc=new k,wc=new k,Ga=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_s)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=_s.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_s.copy(this.origin).addScaledVector(this.direction,e),_s.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){id.copy(t).add(e).multiplyScalar(.5),Tc.copy(e).sub(t).normalize(),wc.copy(this.origin).sub(id);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Tc),a=wc.dot(this.direction),l=-wc.dot(Tc),c=wc.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*l-a,u=o*a-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(id).addScaledVector(Tc,u),f}intersectSphere(t,e){if(t.radius<0)return null;_s.subVectors(t.center,this.origin);let n=_s.dot(this.direction),i=_s.dot(_s)-n*n,r=t.radius*t.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,_s)!==null}intersectTriangle(t,e,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=t.x-o.x,u=t.y-o.y,f=t.z-o.z,p=e.x-o.x,_=e.y-o.y,m=e.z-o.z,g=n.x-o.x,y=n.y-o.y,M=n.z-o.z,v=Math.abs(l),E=Math.abs(c),A=Math.abs(h),x,S,P,w,L,N,V,I,z,G,F,j;if(v>=E&&v>=A?(P=l,N=d,z=p,j=g,l>=0?(x=c,S=h,w=u,L=f,V=_,I=m,G=y,F=M):(x=h,S=c,w=f,L=u,V=m,I=_,G=M,F=y)):E>=A?(P=c,N=u,z=_,j=y,c>=0?(x=h,S=l,w=f,L=d,V=m,I=p,G=M,F=g):(x=l,S=h,w=d,L=f,V=p,I=m,G=g,F=M)):(P=h,N=f,z=m,j=M,h>=0?(x=l,S=c,w=d,L=u,V=p,I=_,G=g,F=y):(x=c,S=l,w=u,L=d,V=_,I=p,G=y,F=g)),P===0)return null;let X=x/P,R=S/P,K=1/P,Tt=w-X*N,Ut=L-R*N,Z=V-X*z,ut=I-R*z,Mt=G-X*j,At=F-R*j,gt=Mt*ut-At*Z,Lt=Tt*At-Ut*Mt,ge=Z*Ut-ut*Tt;if(i){if(gt<0||Lt<0||ge<0)return null}else if((gt<0||Lt<0||ge<0)&&(gt>0||Lt>0||ge>0))return null;let Dt=gt+Lt+ge;if(Dt===0)return null;let Wt=K*(gt*N+Lt*z+ge*j);return(Dt>0?Wt<0:Wt>0)?null:this.at(Wt/Dt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ro=class extends Ms{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ee(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ss,this.combine=Rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Ng=new Pe,Ar=new Ga,Ec=new Pr,Og=new k,Ac=new k,Cc=new k,Rc=new k,sd=new k,Pc=new k,Ug=new k,Ic=new k,xn=class extends _n{constructor(t=new jn,e=new Ro){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);let a=this.morphTargetInfluences;if(r&&a){Pc.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(sd.fromBufferAttribute(d,t),o?Pc.addScaledVector(sd,h):Pc.addScaledVector(sd.sub(e),h))}e.add(Pc)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ec.copy(n.boundingSphere),Ec.applyMatrix4(r),Ar.copy(t.ray).recast(t.near),!(Ec.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(Ec,Og)===null||Ar.origin.distanceToSquared(Og)>(t.far-t.near)**2))&&(Ng.copy(r).invert(),Ar.copy(t.ray).applyMatrix4(Ng),!(n.boundingBox!==null&&Ar.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ar)))}_computeIntersections(t,e,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let m=u[p],g=o[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,E=M;v<E;v+=3){let A=a.getX(v),x=a.getX(v+1),S=a.getX(v+2);i=Lc(this,g,t,n,c,h,d,A,x,S),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){let y=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);i=Lc(this,o,t,n,c,h,d,y,M,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let m=u[p],g=o[m.materialIndex],y=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,E=M;v<E;v+=3){let A=v,x=v+1,S=v+2;i=Lc(this,g,t,n,c,h,d,A,x,S),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=p,g=_;m<g;m+=3){let y=m,M=m+1,v=m+2;i=Lc(this,o,t,n,c,h,d,y,M,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}};function wy(s,t,e,n,i,r,o,a){let l;if(t.side===Xn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===er,a),l===null)return null;Ic.copy(a),Ic.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Ic);return c<e.near||c>e.far?null:{distance:c,point:Ic.clone(),object:s}}function Lc(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Ac),s.getVertexPosition(l,Cc),s.getVertexPosition(c,Rc);let h=wy(s,t,e,n,Ac,Cc,Rc,Ug);if(h){let d=new k;xs.getBarycoord(Ug,Ac,Cc,Rc,d),i&&(h.uv=xs.getInterpolatedAttribute(i,a,l,c,d,new Et)),r&&(h.uv1=xs.getInterpolatedAttribute(r,a,l,c,d,new Et)),o&&(h.normal=xs.getInterpolatedAttribute(o,a,l,c,d,new k),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new k,materialIndex:0};xs.getNormal(Ac,Cc,Rc,u.normal),h.face=u,h.barycoord=d}return h}var rh=class extends Qn{constructor(t=null,e=1,n=1,i,r,o,a,l,c=fn,h=fn,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Cr=new Pr,Ey=new Et(.5,.5),Dc=new k,Js=class{constructor(t=new Ni,e=new Ni,n=new Ni,i=new Ni,r=new Ni,o=new Ni){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ti,n=!1){let i=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],_=r[9],m=r[10],g=r[11],y=r[12],M=r[13],v=r[14],E=r[15];if(i[0].setComponents(c-o,f-h,g-p,E-y).normalize(),i[1].setComponents(c+o,f+h,g+p,E+y).normalize(),i[2].setComponents(c+a,f+d,g+_,E+M).normalize(),i[3].setComponents(c-a,f-d,g-_,E-M).normalize(),n)i[4].setComponents(l,u,m,v).normalize(),i[5].setComponents(c-l,f-u,g-m,E-v).normalize();else if(i[4].setComponents(c-l,f-u,g-m,E-v).normalize(),e===Ti)i[5].setComponents(c+l,f+u,g+m,E+v).normalize();else if(e===To)i[5].setComponents(l,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Cr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Cr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Cr)}intersectsSprite(t){Cr.center.set(0,0,0);let e=Ey.distanceTo(t.center);return Cr.radius=.7071067811865476+e,Cr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Cr)}intersectsSphere(t){let e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let i=e[n];if(Dc.x=i.normal.x>0?t.max.x:t.min.x,Dc.y=i.normal.y>0?t.max.y:t.min.y,Dc.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Dc)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Fg=new Pe,oh=class s{constructor(){this.coordinateSystem=Ti,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){let r=e[i];Fg.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new Js),n[i].setFromProjectionMatrix(Fg,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new Js),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new s().copy(this)}};var Ir=class extends Ms{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ee(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},ah=new k,lh=new k,Bg=new Pe,Ea=new Ga,Nc=new Pr,rd=new k,zg=new k,ch=class extends _n{constructor(t=new jn,e=new Ir){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let i=1,r=e.count;i<r;i++)ah.fromBufferAttribute(e,i-1),lh.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=ah.distanceTo(lh);t.setAttribute("lineDistance",new Le(n,1))}else Yt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,i=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nc.copy(n.boundingSphere),Nc.applyMatrix4(i),Nc.radius+=r,t.ray.intersectsSphere(Nc)===!1)return;Bg.copy(i).invert(),Ea.copy(t.ray).applyMatrix4(Bg);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,m=p-1;_<m;_+=c){let g=h.getX(_),y=h.getX(_+1),M=Oc(this,t,Ea,l,g,y,_);M&&e.push(M)}if(this.isLineLoop){let _=h.getX(p-1),m=h.getX(f),g=Oc(this,t,Ea,l,_,m,p-1);g&&e.push(g)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,m=p-1;_<m;_+=c){let g=Oc(this,t,Ea,l,_,_+1,_);g&&e.push(g)}if(this.isLineLoop){let _=Oc(this,t,Ea,l,p-1,f,p-1);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Oc(s,t,e,n,i,r,o){let a=s.geometry.attributes.position;if(ah.fromBufferAttribute(a,i),lh.fromBufferAttribute(a,r),e.distanceSqToSegment(ah,lh,rd,zg)>n)return;rd.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(rd);if(!(c<t.near||c>t.far))return{distance:c,point:zg.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var kg=new k,Vg=new k,Po=class extends ch{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let i=0,r=e.count;i<r;i+=2)kg.fromBufferAttribute(e,i),Vg.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+kg.distanceTo(Vg);t.setAttribute("lineDistance",new Le(n,1))}else Yt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ha=class extends Qn{constructor(t=[],e=Or,n,i,r,o,a,l,c,h){super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var bs=class extends Qn{constructor(t,e,n=Oi,i,r,o,a=fn,l=fn,c,h=ys,d=1){if(h!==ys&&h!==ws)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:d};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ao(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Wa=class extends bs{constructor(t,e=Oi,n=Or,i,r,o=fn,a=fn,l,c=ys){let h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Xa=class extends Qn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},$s=class s extends jn{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Le(c,3)),this.setAttribute("normal",new Le(h,3)),this.setAttribute("uv",new Le(d,2));function p(_,m,g,y,M,v,E,A,x,S,P){let w=v/x,L=E/S,N=v/2,V=E/2,I=A/2,z=x+1,G=S+1,F=0,j=0,X=new k;for(let R=0;R<G;R++){let K=R*L-V;for(let Tt=0;Tt<z;Tt++){let Ut=Tt*w-N;X[_]=Ut*y,X[m]=K*M,X[g]=I,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[g]=A>0?1:-1,h.push(X.x,X.y,X.z),d.push(Tt/x),d.push(1-R/S),F+=1}}for(let R=0;R<S;R++)for(let K=0;K<x;K++){let Tt=u+K+z*R,Ut=u+K+z*(R+1),Z=u+(K+1)+z*(R+1),ut=u+(K+1)+z*R;l.push(Tt,Ut,ut),l.push(Ut,Z,ut),j+=6}a.addGroup(f,j,P),f+=j,u+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var qa=class s extends jn{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],p=0,_=[],m=n/2,g=0;y(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Le(d,3)),this.setAttribute("normal",new Le(u,3)),this.setAttribute("uv",new Le(f,2));function y(){let v=new k,E=new k,A=0,x=(e-t)/n;for(let S=0;S<=r;S++){let P=[],w=S/r,L=w*(e-t)+t;for(let N=0;N<=i;N++){let V=N/i,I=V*l+a,z=Math.sin(I),G=Math.cos(I);E.x=L*z,E.y=-w*n+m,E.z=L*G,d.push(E.x,E.y,E.z),v.set(z,x,G).normalize(),u.push(v.x,v.y,v.z),f.push(V,1-w),P.push(p++)}_.push(P)}for(let S=0;S<i;S++)for(let P=0;P<r;P++){let w=_[P][S],L=_[P+1][S],N=_[P+1][S+1],V=_[P][S+1];(t>0||P!==0)&&(h.push(w,L,V),A+=3),(e>0||P!==r-1)&&(h.push(L,N,V),A+=3)}c.addGroup(g,A,0),g+=A}function M(v){let E=p,A=new Et,x=new k,S=0,P=v===!0?t:e,w=v===!0?1:-1;for(let N=1;N<=i;N++)d.push(0,m*w,0),u.push(0,w,0),f.push(.5,.5),p++;let L=p;for(let N=0;N<=i;N++){let I=N/i*l+a,z=Math.cos(I),G=Math.sin(I);x.x=P*G,x.y=m*w,x.z=P*z,d.push(x.x,x.y,x.z),u.push(0,w,0),A.x=z*.5+.5,A.y=G*.5*w+.5,f.push(A.x,A.y),p++}for(let N=0;N<i;N++){let V=E+N,I=L+N;v===!0?h.push(I,I+1,V):h.push(I+1,I,V),S+=3}c.addGroup(g,S,v===!0?1:2),g+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Uc=new k,Fc=new k,od=new k,Bc=new xs,Ya=class extends jn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let i=Math.pow(10,4),r=Math.cos(So*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u=new Map,f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:m,c:g}=Bc;if(_.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),g.fromBufferAttribute(a,c[2]),Bc.getNormal(od),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,d[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let y=0;y<3;y++){let M=(y+1)%3,v=d[y],E=d[M],A=Bc[h[y]],x=Bc[h[M]],S=`${v}_${E}`,P=`${E}_${v}`,w=u.get(P);w?(od.dot(w.normal)<=r&&(f.push(A.x,A.y,A.z),f.push(x.x,x.y,x.z)),u.set(P,null)):u.has(S)||u.set(S,{index0:c[y],index1:c[M],normal:od.clone()})}}for(let p of u.values())if(p){let{index0:_,index1:m}=p;Uc.fromBufferAttribute(a,_),Fc.fromBufferAttribute(a,m),f.push(Uc.x,Uc.y,Uc.z),f.push(Fc.x,Fc.y,Fc.z)}this.setAttribute("position",new Le(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},di=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Yt("Curve: .getPoint() not implemented.")}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){let n=this.getLengths(),i=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new Et:new k);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){let n=new k,i=[],r=[],o=[],a=new k,l=new Pe;for(let f=0;f<=t;f++){let p=f/t;i[f]=this.getTangentAt(p,new k)}r[0]=new k,o[0]=new k;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(ce(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(ce(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}},Io=class extends di{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Et){let n=e,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},hh=class extends Io{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Qd(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return s+t*r+e*o+n*a}}}var Gg=new k,Hg=new k,ad=new Qd,ld=new Qd,cd=new Qd,uh=class extends di{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new k){let n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Hg.subVectors(i[0],i[1]).add(i[0]),c=Hg);let d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Gg.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Gg),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),m<1e-4&&(m=_),ad.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,_,m),ld.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,_,m),cd.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,_,m)}else this.curveType==="catmullrom"&&(ad.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),ld.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),cd.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(ad.calc(l),ld.calc(l),cd.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new k().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Wg(s,t,e,n,i){let r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function Ay(s,t){let e=1-s;return e*e*t}function Cy(s,t){return 2*(1-s)*s*t}function Ry(s,t){return s*s*t}function Pa(s,t,e,n){return Ay(s,t)+Cy(s,e)+Ry(s,n)}function Py(s,t){let e=1-s;return e*e*e*t}function Iy(s,t){let e=1-s;return 3*e*e*s*t}function Ly(s,t){return 3*(1-s)*s*s*t}function Dy(s,t){return s*s*s*t}function Ia(s,t,e,n,i){return Py(s,t)+Iy(s,e)+Ly(s,n)+Dy(s,i)}var Za=class extends di{constructor(t=new Et,e=new Et,n=new Et,i=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Et){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ia(t,i.x,r.x,o.x,a.x),Ia(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},fh=class extends di{constructor(t=new k,e=new k,n=new k,i=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new k){let n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ia(t,i.x,r.x,o.x,a.x),Ia(t,i.y,r.y,o.y,a.y),Ia(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ja=class extends di{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},dh=class extends di{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$a=class extends di{constructor(t=new Et,e=new Et,n=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Et){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Pa(t,i.x,r.x,o.x),Pa(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ph=class extends di{constructor(t=new k,e=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new k){let n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Pa(t,i.x,r.x,o.x),Pa(t,i.y,r.y,o.y),Pa(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ka=class extends di{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){let n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(Wg(a,l.x,c.x,h.x,d.x),Wg(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let i=t.points[e];this.points.push(new Et().fromArray(i))}return this}},md=Object.freeze({__proto__:null,ArcCurve:hh,CatmullRomCurve3:uh,CubicBezierCurve:Za,CubicBezierCurve3:fh,EllipseCurve:Io,LineCurve:Ja,LineCurve3:dh,QuadraticBezierCurve:$a,QuadraticBezierCurve3:ph,SplineCurve:Ka}),mh=class extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new md[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let i=t.curves[e];this.curves.push(new md[i.type]().fromJSON(i))}return this.cacheLengths=null,this}},Qa=class extends mh{constructor(t){super(),this.type="Path",this.currentPoint=new Et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new Ja(this.currentPoint.clone(),new Et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){let r=new $a(this.currentPoint.clone(),new Et(t,e),new Et(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){let a=new Za(this.currentPoint.clone(),new Et(t,e),new Et(n,i),new Et(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new Ka(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){let c=new Io(t,e,n,i,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Lo=class extends Qa{constructor(t){super(t),this.uuid=Fr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let i=t.holes[e];this.holes.push(new Qa().fromJSON(i))}return this}};function Ny(s,t,e=2){let n=t&&t.length,i=n?t[0]*e:s.length,r=k_(s,0,i,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=zy(s,t,r,e)),s.length>80*e){a=s[0],l=s[1];let h=a,d=l;for(let u=e;u<i;u+=e){let f=s[u],p=s[u+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return ja(r,o,e,a,l,c,0),o}function k_(s,t,e,n,i){let r;if(i===$y(s,t,e,n)>0)for(let o=t;o<e;o+=n)r=Xg(o/n|0,s[o],s[o+1],r);else for(let o=e-n;o>=t;o-=n)r=Xg(o/n|0,s[o],s[o+1],r);return r&&Do(r,r.next)&&(el(r),r=r.next),r}function Lr(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Do(e,e.next)||Ve(e.prev,e,e.next)===0)){if(el(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ja(s,t,e,n,i,r,o){if(!s)return;!o&&r&&Wy(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Uy(s,n,i,r):Oy(s)){t.push(l.i,s.i,c.i),el(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Fy(Lr(s),t),ja(s,t,e,n,i,r,2)):o===2&&By(s,t,e,n,i,r):ja(Lr(s),t,e,n,i,r,1);break}}}function Oy(s){let t=s.prev,e=s,n=s.next;if(Ve(t,e,n)>=0)return!1;let i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=Math.min(i,r,o),d=Math.min(a,l,c),u=Math.max(i,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&Aa(i,a,r,l,o,c,p.x,p.y)&&Ve(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Uy(s,t,e,n){let i=s.prev,r=s,o=s.next;if(Ve(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=Math.min(a,l,c),p=Math.min(h,d,u),_=Math.max(a,l,c),m=Math.max(h,d,u),g=gd(f,p,t,e,n),y=gd(_,m,t,e,n),M=s.prevZ,v=s.nextZ;for(;M&&M.z>=g&&v&&v.z<=y;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=m&&M!==i&&M!==o&&Aa(a,h,l,d,c,u,M.x,M.y)&&Ve(M.prev,M,M.next)>=0||(M=M.prevZ,v.x>=f&&v.x<=_&&v.y>=p&&v.y<=m&&v!==i&&v!==o&&Aa(a,h,l,d,c,u,v.x,v.y)&&Ve(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;M&&M.z>=g;){if(M.x>=f&&M.x<=_&&M.y>=p&&M.y<=m&&M!==i&&M!==o&&Aa(a,h,l,d,c,u,M.x,M.y)&&Ve(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=p&&v.y<=m&&v!==i&&v!==o&&Aa(a,h,l,d,c,u,v.x,v.y)&&Ve(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Fy(s,t){let e=s;do{let n=e.prev,i=e.next.next;!Do(n,i)&&G_(n,e,e.next,i)&&tl(n,i)&&tl(i,n)&&(t.push(n.i,e.i,i.i),el(e),el(e.next),e=s=i),e=e.next}while(e!==s);return Lr(e)}function By(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Yy(o,a)){let l=H_(o,a);o=Lr(o,o.next),l=Lr(l,l.next),ja(o,t,e,n,i,r,0),ja(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function zy(s,t,e,n){let i=[];for(let r=0,o=t.length;r<o;r++){let a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=k_(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(qy(c))}i.sort(ky);for(let r=0;r<i.length;r++)e=Vy(i[r],e);return e}function ky(s,t){let e=s.x-t.x;if(e===0&&(e=s.y-t.y,e===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(t.next.y-t.y)/(t.next.x-t.x);e=n-i}return e}function Vy(s,t){let e=Gy(s,t);if(!e)return t;let n=H_(e,s);return Lr(n,n.next),Lr(e,e.next)}function Gy(s,t){let e=t,n=s.x,i=s.y,r=-1/0,o;if(Do(s,e))return e;do{if(Do(s,e.next))return e.next;if(i<=e.y&&i>=e.next.y&&e.next.y!==e.y){let d=e.x+(i-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=n&&d>r&&(r=d,o=e.x<e.next.x?e:e.next,d===n))return o}e=e.next}while(e!==t);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;e=o;do{if(n>=e.x&&e.x>=l&&n!==e.x&&V_(i<c?n:r,i,l,c,i<c?r:n,i,e.x,e.y)){let d=Math.abs(i-e.y)/(n-e.x);tl(e,s)&&(d<h||d===h&&(e.x>o.x||e.x===o.x&&Hy(o,e)))&&(o=e,h=d)}e=e.next}while(e!==a);return o}function Hy(s,t){return Ve(s.prev,s,t.prev)<0&&Ve(t.next,s,s.next)<0}function Wy(s,t,e,n){let i=s;do i.z===0&&(i.z=gd(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Xy(i)}function Xy(s){let t,e=1;do{let n=s,i;s=null;let r=null;for(t=0;n;){t++;let o=n,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,e*=2}while(t>1);return s}function gd(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function qy(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function V_(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function Aa(s,t,e,n,i,r,o,a){return!(s===o&&t===a)&&V_(s,t,e,n,i,r,o,a)}function Yy(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!Zy(s,t)&&(tl(s,t)&&tl(t,s)&&Jy(s,t)&&(Ve(s.prev,s,t.prev)||Ve(s,t.prev,t))||Do(s,t)&&Ve(s.prev,s,s.next)>0&&Ve(t.prev,t,t.next)>0)}function Ve(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Do(s,t){return s.x===t.x&&s.y===t.y}function G_(s,t,e,n){let i=kc(Ve(s,t,e)),r=kc(Ve(s,t,n)),o=kc(Ve(e,n,s)),a=kc(Ve(e,n,t));return!!(i!==r&&o!==a||i===0&&zc(s,e,t)||r===0&&zc(s,n,t)||o===0&&zc(e,s,n)||a===0&&zc(e,t,n))}function zc(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function kc(s){return s>0?1:s<0?-1:0}function Zy(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&G_(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function tl(s,t){return Ve(s.prev,s,s.next)<0?Ve(s,t,s.next)>=0&&Ve(s,s.prev,t)>=0:Ve(s,t,s.prev)<0||Ve(s,s.next,t)<0}function Jy(s,t){let e=s,n=!1,i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function H_(s,t){let e=_d(s.i,s.x,s.y),n=_d(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Xg(s,t,e,n){let i=_d(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function el(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function _d(s,t,e){return{i:s,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function $y(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var xd=class{static triangulate(t,e,n=2){return Ny(t,e,n)}},Rr=class s{static area(t){let e=t.length,n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return s.area(t)<0}static triangulateShape(t,e){let n=[],i=[],r=[];qg(t),Yg(n,t);let o=t.length;e.forEach(qg);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,Yg(n,e[l]);let a=xd.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function qg(s){let t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Yg(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}var nl=class s extends jn{constructor(t=new Lo([new Et(.5,.5),new Et(-.5,.5),new Et(-.5,-.5),new Et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,i=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new Le(i,3)),this.setAttribute("uv",new Le(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:Ky,M,v=!1,E,A,x,S;if(g){M=g.getSpacedPoints(h),v=!0,u=!1;let Q=g.isCatmullRomCurve3?g.closed:!1;E=g.computeFrenetFrames(h,Q),A=new k,x=new k,S=new k}u||(m=0,f=0,p=0,_=0);let P=a.extractPoints(c),w=P.shape,L=P.holes;if(!Rr.isClockWise(w)){w=w.reverse();for(let Q=0,lt=L.length;Q<lt;Q++){let ct=L[Q];Rr.isClockWise(ct)&&(L[Q]=ct.reverse())}}function V(Q){let ct=10000000000000001e-36,B=Q[0];for(let dt=1;dt<=Q.length;dt++){let Xt=dt%Q.length,Nt=Q[Xt],Vt=Nt.x-B.x,Kt=Nt.y-B.y,ie=Vt*Vt+Kt*Kt,U=Math.max(Math.abs(Nt.x),Math.abs(Nt.y),Math.abs(B.x),Math.abs(B.y)),oe=ct*U*U;if(ie<=oe){Q.splice(Xt,1),dt--;continue}B=Nt}}V(w),L.forEach(V);let I=L.length,z=w;for(let Q=0;Q<I;Q++){let lt=L[Q];w=w.concat(lt)}function G(Q,lt,ct){return lt||Jt("ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(lt,ct)}let F=w.length;function j(Q,lt,ct){let B,dt,Xt,Nt=Q.x-lt.x,Vt=Q.y-lt.y,Kt=ct.x-Q.x,ie=ct.y-Q.y,U=Nt*Nt+Vt*Vt,oe=Nt*ie-Vt*Kt;if(Math.abs(oe)>Number.EPSILON){let $t=Math.sqrt(U),Zt=Math.sqrt(Kt*Kt+ie*ie),pt=lt.x-Vt/$t,pe=lt.y+Nt/$t,Bt=ct.x-ie/Zt,qt=ct.y+Kt/Zt,C=((Bt-pt)*ie-(qt-pe)*Kt)/(Nt*ie-Vt*Kt);B=pt+Nt*C-Q.x,dt=pe+Vt*C-Q.y;let b=B*B+dt*dt;if(b<=2)return new Et(B,dt);Xt=Math.sqrt(b/2)}else{let $t=!1;Nt>Number.EPSILON?Kt>Number.EPSILON&&($t=!0):Nt<-Number.EPSILON?Kt<-Number.EPSILON&&($t=!0):Math.sign(Vt)===Math.sign(ie)&&($t=!0),$t?(B=-Vt,dt=Nt,Xt=Math.sqrt(U)):(B=Nt,dt=Vt,Xt=Math.sqrt(U/2))}return new Et(B/Xt,dt/Xt)}let X=[];for(let Q=0,lt=z.length,ct=lt-1,B=Q+1;Q<lt;Q++,ct++,B++)ct===lt&&(ct=0),B===lt&&(B=0),X[Q]=j(z[Q],z[ct],z[B]);let R=[],K,Tt=X.concat();for(let Q=0,lt=I;Q<lt;Q++){let ct=L[Q];K=[];for(let B=0,dt=ct.length,Xt=dt-1,Nt=B+1;B<dt;B++,Xt++,Nt++)Xt===dt&&(Xt=0),Nt===dt&&(Nt=0),K[B]=j(ct[B],ct[Xt],ct[Nt]);R.push(K),Tt=Tt.concat(K)}let Ut;if(m===0)Ut=Rr.triangulateShape(z,L);else{let Q=[],lt=[];for(let ct=0;ct<m;ct++){let B=ct/m,dt=f*Math.cos(B*Math.PI/2),Xt=p*Math.sin(B*Math.PI/2)+_;for(let Nt=0,Vt=z.length;Nt<Vt;Nt++){let Kt=G(z[Nt],X[Nt],Xt);Lt(Kt.x,Kt.y,-dt),B===0&&Q.push(Kt)}for(let Nt=0,Vt=I;Nt<Vt;Nt++){let Kt=L[Nt];K=R[Nt];let ie=[];for(let U=0,oe=Kt.length;U<oe;U++){let $t=G(Kt[U],K[U],Xt);Lt($t.x,$t.y,-dt),B===0&&ie.push($t)}B===0&&lt.push(ie)}}Ut=Rr.triangulateShape(Q,lt)}let Z=Ut.length,ut=p+_;for(let Q=0;Q<F;Q++){let lt=u?G(w[Q],Tt[Q],ut):w[Q];v?(x.copy(E.normals[0]).multiplyScalar(lt.x),A.copy(E.binormals[0]).multiplyScalar(lt.y),S.copy(M[0]).add(x).add(A),Lt(S.x,S.y,S.z)):Lt(lt.x,lt.y,0)}for(let Q=1;Q<=h;Q++)for(let lt=0;lt<F;lt++){let ct=u?G(w[lt],Tt[lt],ut):w[lt];v?(x.copy(E.normals[Q]).multiplyScalar(ct.x),A.copy(E.binormals[Q]).multiplyScalar(ct.y),S.copy(M[Q]).add(x).add(A),Lt(S.x,S.y,S.z)):Lt(ct.x,ct.y,d/h*Q)}for(let Q=m-1;Q>=0;Q--){let lt=Q/m,ct=f*Math.cos(lt*Math.PI/2),B=p*Math.sin(lt*Math.PI/2)+_;for(let dt=0,Xt=z.length;dt<Xt;dt++){let Nt=G(z[dt],X[dt],B);Lt(Nt.x,Nt.y,d+ct)}for(let dt=0,Xt=L.length;dt<Xt;dt++){let Nt=L[dt];K=R[dt];for(let Vt=0,Kt=Nt.length;Vt<Kt;Vt++){let ie=G(Nt[Vt],K[Vt],B);v?Lt(ie.x,ie.y+M[h-1].y,M[h-1].x+ct):Lt(ie.x,ie.y,d+ct)}}}Mt(),At();function Mt(){let Q=i.length/3;if(u){let lt=0,ct=F*lt;for(let B=0;B<Z;B++){let dt=Ut[B];ge(dt[2]+ct,dt[1]+ct,dt[0]+ct)}lt=h+m*2,ct=F*lt;for(let B=0;B<Z;B++){let dt=Ut[B];ge(dt[0]+ct,dt[1]+ct,dt[2]+ct)}}else{for(let lt=0;lt<Z;lt++){let ct=Ut[lt];ge(ct[2],ct[1],ct[0])}for(let lt=0;lt<Z;lt++){let ct=Ut[lt];ge(ct[0]+F*h,ct[1]+F*h,ct[2]+F*h)}}n.addGroup(Q,i.length/3-Q,0)}function At(){let Q=i.length/3,lt=0;gt(z,lt),lt+=z.length;for(let ct=0,B=L.length;ct<B;ct++){let dt=L[ct];gt(dt,lt),lt+=dt.length}n.addGroup(Q,i.length/3-Q,1)}function gt(Q,lt){let ct=Q.length;for(;--ct>=0;){let B=ct,dt=ct-1;dt<0&&(dt=Q.length-1);for(let Xt=0,Nt=h+m*2;Xt<Nt;Xt++){let Vt=F*Xt,Kt=F*(Xt+1),ie=lt+B+Vt,U=lt+dt+Vt,oe=lt+dt+Kt,$t=lt+B+Kt;Dt(ie,U,oe,$t)}}}function Lt(Q,lt,ct){l.push(Q),l.push(lt),l.push(ct)}function ge(Q,lt,ct){Wt(Q),Wt(lt),Wt(ct);let B=i.length/3,dt=y.generateTopUV(n,i,B-3,B-2,B-1);It(dt[0]),It(dt[1]),It(dt[2])}function Dt(Q,lt,ct,B){Wt(Q),Wt(lt),Wt(B),Wt(lt),Wt(ct),Wt(B);let dt=i.length/3,Xt=y.generateSideWallUV(n,i,dt-6,dt-3,dt-2,dt-1);It(Xt[0]),It(Xt[1]),It(Xt[3]),It(Xt[1]),It(Xt[2]),It(Xt[3])}function Wt(Q){i.push(l[Q*3+0]),i.push(l[Q*3+1]),i.push(l[Q*3+2])}function It(Q){r.push(Q.x),r.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Qy(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new md[i.type]().fromJSON(i)),new s(n,t.options)}},Ky={generateTopUV:function(s,t,e,n,i){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new Et(r,o),new Et(a,l),new Et(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],p=t[i*3+2],_=t[r*3],m=t[r*3+1],g=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new Et(o,1-l),new Et(c,1-d),new Et(u,1-p),new Et(_,1-g)]:[new Et(a,1-l),new Et(h,1-d),new Et(f,1-p),new Et(m,1-g)]}};function Qy(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ks=class s extends jn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],p=[],_=[],m=[];for(let g=0;g<h;g++){let y=g*u-o;for(let M=0;M<c;M++){let v=M*d-r;p.push(v,-y,0),_.push(0,0,1),m.push(M/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let y=0;y<a;y++){let M=y+c*g,v=y+c*(g+1),E=y+1+c*(g+1),A=y+1+c*g;f.push(M,v,A),f.push(v,E,A)}this.setIndex(f),this.setAttribute("position",new Le(p,3)),this.setAttribute("normal",new Le(_,3)),this.setAttribute("uv",new Le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.width,t.height,t.widthSegments,t.heightSegments)}};var il=class s extends jn{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new k,u=new k,f=[],p=[],_=[],m=[];for(let g=0;g<=n;g++){let y=[],M=g/n,v=o+M*a,E=t*Math.cos(v),A=Math.sqrt(t*t-E*E),x=0;g===0&&o===0?x=.5/e:g===n&&l===Math.PI&&(x=-.5/e);for(let S=0;S<=e;S++){let P=S/e,w=i+P*r;d.x=-A*Math.cos(w),d.y=E,d.z=A*Math.sin(w),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(P+x,1-M),y.push(c++)}h.push(y)}for(let g=0;g<n;g++)for(let y=0;y<e;y++){let M=h[g][y+1],v=h[g][y],E=h[g+1][y],A=h[g+1][y+1];(g!==0||o>0)&&f.push(M,v,A),(g!==n-1||l<Math.PI)&&f.push(v,E,A)}this.setIndex(f),this.setAttribute("position",new Le(p,3)),this.setAttribute("normal",new Le(_,3)),this.setAttribute("uv",new Le(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new s(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Br(s){let t={};for(let e in s){t[e]={};for(let n in s[e]){let i=s[e][n];if(Zg(i))i.isRenderTargetTexture?(Yt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(Zg(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function Dn(s){let t={};for(let e=0;e<s.length;e++){let n=Br(s[e]);for(let i in n)t[i]=n[i]}return t}function Zg(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function jy(s){let t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function jd(s){let t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}var W_={clone:Br,merge:Dn},tS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qi=class extends Ms{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tS,this.fragmentShader=eS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Br(t.uniforms),this.uniformsGroups=jy(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new ee().setHex(i.value);break;case"v2":this.uniforms[n].value=new Et().fromArray(i.value);break;case"v3":this.uniforms[n].value=new k().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ue().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Qt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new Pe().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},gh=class extends Qi{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},wi=class extends Ms{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ee(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ee(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_u,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ss,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var _h=class extends Ms{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=T_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},xh=class extends Ms{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function xo(s,t){return!s||s.constructor===t?s:typeof t.BYTES_PER_ELEMENT=="number"?new t(s):Array.prototype.slice.call(s)}function Vc(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}var Qs=class{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=e[++n],t<i)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i;for(let o=0;o!==i;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},vh=class extends Qs{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:fd,endingEnd:fd}}intervalChanged_(t,e,n){let i=this.parameterPositions,r=t-2,o=t+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case dd:r=t,a=2*e-n;break;case pd:r=i.length-2,a=e+i[r]-i[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case dd:o=t,l=2*n-e;break;case pd:o=1,l=n+i[1]-i[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-e)/(i-e),_=p*p,m=_*p,g=-u*m+2*u*_-u*p,y=(1+u)*m+(-1.5-2*u)*_+(-.5+u)*p+1,M=(-1-f)*m+(1.5+f)*_+.5*p,v=f*m-f*_;for(let E=0;E!==a;++E)r[E]=g*o[h+E]+y*o[c+E]+M*o[l+E]+v*o[d+E];return r}},yh=class extends Qs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(i-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Sh=class extends Qs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}},Mh=class extends Qs{interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-e)/(i-e),_=1-p;for(let m=0;m!==a;++m)r[m]=o[c+m]*_+o[l+m]*p;return r}let u=a*2,f=t-1;for(let p=0;p!==a;++p){let _=o[c+p],m=o[l+p],g=f*u+p*2,y=d[g],M=d[g+1],v=t*u+p*2,E=h[v],A=h[v+1],x=iS(n,e,y,E,i);r[p]=X_(x,_,M,A,m)}return r}};function X_(s,t,e,n,i){let r=1-s;return r*r*r*t+3*r*r*s*e+3*r*s*s*n+s*s*s*i}function nS(s,t,e,n,i){let r=1-s;return 3*r*r*(e-t)+6*r*s*(n-e)+3*s*s*(i-n)}function iS(s,t,e,n,i){let r=(s-t)/(i-t);for(let o=0;o<8;o++){let a=X_(r,t,e,n,i)-s;if(Math.abs(a)<1e-10)break;let l=nS(r,t,e,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var pi=class{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=xo(e,this.TimeBufferType),this.values=xo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:xo(t.times,Array),values:xo(t.values,Array)};let i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i),Vc(t.settings)&&(n.settings={inTangents:xo(t.settings.inTangents,Array),outTangents:xo(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Sh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new yh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new vh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new Mh(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case La:e=this.InterpolantFactoryMethodDiscrete;break;case eh:e=this.InterpolantFactoryMethodLinear;break;case Wc:e=this.InterpolantFactoryMethodSmooth;break;case ud:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Yt("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return La;case this.InterpolantFactoryMethodLinear:return eh;case this.InterpolantFactoryMethodSmooth:return Wc;case this.InterpolantFactoryMethodBezier:return ud}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t;Vc(this.settings)&&(Jg(this.settings.inTangents,t),Jg(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t;Vc(this.settings)&&($g(this.settings.inTangents,t),$g(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Jt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Jt("KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Jt("KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){Jt("KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(i!==void 0&&Yv(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){Jt("KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Wc,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let _=e[d+p];if(_!==e[u+p]||_!==e[f+p]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,Vc(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Jg(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]+=t}function $g(s,t){for(let e=0,n=s.length;e!==n;e+=2)s[e]*=t}pi.prototype.ValueTypeName="";pi.prototype.TimeBufferType=Float32Array;pi.prototype.ValueBufferType=Float32Array;pi.prototype.DefaultInterpolation=eh;var js=class extends pi{constructor(t,e,n){super(t,e,n)}};js.prototype.ValueTypeName="bool";js.prototype.ValueBufferType=Array;js.prototype.DefaultInterpolation=La;js.prototype.InterpolantFactoryMethodLinear=void 0;js.prototype.InterpolantFactoryMethodSmooth=void 0;var bh=class extends pi{constructor(t,e,n,i){super(t,e,n,i)}};bh.prototype.ValueTypeName="color";var Th=class extends pi{constructor(t,e,n,i){super(t,e,n,i)}};Th.prototype.ValueTypeName="number";var wh=class extends Qs{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(i-e),c=t*a;for(let h=c+a;c!==h;c+=4)Ki.slerpFlat(r,0,o,c-a,o,c,l);return r}},sl=class extends pi{constructor(t,e,n,i){super(t,e,n,i)}InterpolantFactoryMethodLinear(t){return new wh(this.times,this.values,this.getValueSize(),t)}};sl.prototype.ValueTypeName="quaternion";sl.prototype.InterpolantFactoryMethodSmooth=void 0;var tr=class extends pi{constructor(t,e,n){super(t,e,n)}};tr.prototype.ValueTypeName="string";tr.prototype.ValueBufferType=Array;tr.prototype.DefaultInterpolation=La;tr.prototype.InterpolantFactoryMethodLinear=void 0;tr.prototype.InterpolantFactoryMethodSmooth=void 0;var Eh=class extends pi{constructor(t,e,n,i){super(t,e,n,i)}};Eh.prototype.ValueTypeName="vector";var Ah=class{constructor(t,e,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},q_=new Ah,Ch=class{constructor(t){this.manager=t!==void 0?t:q_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};Ch.DEFAULT_MATERIAL_NAME="__DEFAULT";var No=class extends _n{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ee(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},rl=class extends No{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(_n.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ee(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},hd=new Pe,Kg=new k,Qg=new k,ol=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.mapType=ti,this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Js,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new Ue(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Kg.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kg),Qg.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Qg),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){hd.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(hd,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===To||t.reversedDepth?e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):e.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),e.multiply(hd)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Gc=new k,Hc=new Ki,qi=new k,al=class extends _n{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=Ti,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Gc,Hc,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gc,Hc,qi.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Gc,Hc,qi),qi.x===1&&qi.y===1&&qi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gc,Hc,qi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ys=new k,jg=new Et,t_=new Et,Ln=class extends al{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Eo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(So*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Eo*2*Math.atan(Math.tan(So*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ys.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ys.x,Ys.y).multiplyScalar(-t/Ys.z),Ys.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ys.x,Ys.y).multiplyScalar(-t/Ys.z)}getViewSize(t,e){return this.getViewBounds(t,jg,t_),e.subVectors(t_,jg)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(So*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var vd=class extends ol{constructor(){super(new Ln(90,1,.5,500)),this.isPointLightShadow=!0}},ll=class extends No{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new vd}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},cl=class extends al{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},yd=class extends ol{constructor(){super(new cl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},hl=class extends No{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(_n.DEFAULT_UP),this.updateMatrix(),this.target=new _n,this.shadow=new yd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}};var vo=-90,yo=1,Oo=class extends _n{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ln(vo,yo,t,e);i.layers=this.layers,this.add(i);let r=new Ln(vo,yo,t,e);r.layers=this.layers,this.add(r);let o=new Ln(vo,yo,t,e);o.layers=this.layers,this.add(o);let a=new Ln(vo,yo,t,e);a.layers=this.layers,this.add(a);let l=new Ln(vo,yo,t,e);l.layers=this.layers,this.add(l);let c=new Ln(vo,yo,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Ti)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===To)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,2,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,3,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=_,t.setRenderTarget(n,5,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Rh=class extends Ln{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var tp="\\[\\]\\.:\\/",sS=new RegExp("["+tp+"]","g"),ep="[^"+tp+"]",rS="[^"+tp.replace("\\.","")+"]",oS=/((?:WC+[\/:])*)/.source.replace("WC",ep),aS=/(WCOD+)?/.source.replace("WCOD",rS),lS=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ep),cS=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ep),hS=new RegExp("^"+oS+aS+lS+cS+"$"),uS=["material","materials","bones","map"],Sd=class{constructor(t,e,n){let i=n||Ie.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},Ie=class s{constructor(t,e,n){this.path=e,this.parsedPath=n||s.parseTrackName(e),this.node=s.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new s.Composite(t,e,n):new s(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(sS,"")}static parseTrackName(t){let e=hS.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);uS.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=s.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Yt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Jt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Jt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Jt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Jt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Jt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Jt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[i];if(o===void 0){let c=e.nodeName;Jt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){Jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Jt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ie.Composite=Sd;Ie.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ie.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ie.prototype.GetterByBindingType=[Ie.prototype._getValue_direct,Ie.prototype._getValue_array,Ie.prototype._getValue_arrayElement,Ie.prototype._getValue_toArray];Ie.prototype.SetterByBindingTypeAndVersioning=[[Ie.prototype._setValue_direct,Ie.prototype._setValue_direct_setNeedsUpdate,Ie.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_array,Ie.prototype._setValue_array_setNeedsUpdate,Ie.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_arrayElement,Ie.prototype._setValue_arrayElement_setNeedsUpdate,Ie.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ie.prototype._setValue_fromArray,Ie.prototype._setValue_fromArray_setNeedsUpdate,Ie.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var F1=new Float32Array(1);var ap=class ap{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};ap.prototype.isMatrix2=!0;var Md=ap;var ul=class extends Po{constructor(t=10,e=10,n=4473924,i=8947848){n=new ee(n),i=new ee(i);let r=e/2,o=t/e,a=t/2,l=[],c=[];for(let u=0,f=0,p=-a;u<=e;u++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);let _=u===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new jn;h.setAttribute("position",new Le(l,3)),h.setAttribute("color",new Le(c,3));let d=new Ir({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function np(s,t,e,n){let i=fS(n);switch(e){case Vd:return s*t;case Hd:return s*t/i.components*i.byteLength;case Bh:return s*t/i.components*i.byteLength;case nr:return s*t*2/i.components*i.byteLength;case zh:return s*t*2/i.components*i.byteLength;case Gd:return s*t*3/i.components*i.byteLength;case Bi:return s*t*4/i.components*i.byteLength;case kh:return s*t*4/i.components*i.byteLength;case ml:case gl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case _l:case xl:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Gh:case Wh:return Math.max(s,16)*Math.max(t,8)/4;case Vh:case Hh:return Math.max(s,8)*Math.max(t,8)/2;case Xh:case qh:case Zh:case Jh:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case Yh:case vl:case $h:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Kh:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Qh:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case jh:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case tu:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case eu:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case nu:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case iu:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case su:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case ru:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case ou:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case au:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case lu:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case cu:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case hu:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case uu:case fu:case du:return Math.ceil(s/4)*Math.ceil(t/4)*16;case pu:case mu:return Math.ceil(s/4)*Math.ceil(t/4)*8;case yl:case gu:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function fS(s){switch(s){case ti:case Fd:return{byteLength:1,components:1};case zo:case Bd:case Fi:return{byteLength:2,components:1};case Uh:case Fh:return{byteLength:2,components:4};case Oi:case Oh:case Ui:return{byteLength:4,components:1};case zd:case kd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Yt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function p0(){let s=null,t=!1,e=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),e(r,o)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function pS(s){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var mS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,_S=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,yS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,SS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,MS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,TS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ES=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,AS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,CS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,RS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,PS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,IS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,LS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,DS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,NS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,OS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,US=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,FS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,BS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,kS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,VS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,GS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,HS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,WS="gl_FragColor = linearToOutputTexel( gl_FragColor );",XS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,YS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,ZS=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,JS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$S=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,KS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,QS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,eM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,nM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,iM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,oM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,aM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,fM=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,dM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gM=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,_M=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,SM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,MM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,TM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,wM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,EM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,AM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,CM=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,RM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,PM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,IM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,LM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,DM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,NM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,OM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,FM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,BM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,VM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,GM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,HM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,WM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,XM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,YM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ZM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,JM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,$M=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,KM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,QM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,jM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,eb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,nb=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ib=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rb=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ob=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ab=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,lb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,cb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,hb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ub=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,db=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,pb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_b=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Mb=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,bb=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Tb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eb=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ab=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Rb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pb=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ib=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Db=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ob=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ub=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Hb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xb=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qb=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,re={alphahash_fragment:mS,alphahash_pars_fragment:gS,alphamap_fragment:_S,alphamap_pars_fragment:xS,alphatest_fragment:vS,alphatest_pars_fragment:yS,aomap_fragment:SS,aomap_pars_fragment:MS,batching_pars_vertex:bS,batching_vertex:TS,begin_vertex:wS,beginnormal_vertex:ES,bsdfs:AS,iridescence_fragment:CS,bumpmap_pars_fragment:RS,clipping_planes_fragment:PS,clipping_planes_pars_fragment:IS,clipping_planes_pars_vertex:LS,clipping_planes_vertex:DS,color_fragment:NS,color_pars_fragment:OS,color_pars_vertex:US,color_vertex:FS,common:BS,defaultnormal_vertex:zS,displacementmap_pars_vertex:kS,displacementmap_vertex:VS,emissivemap_fragment:GS,emissivemap_pars_fragment:HS,colorspace_fragment:WS,colorspace_pars_fragment:XS,envmap_fragment:qS,envmap_common_pars_fragment:YS,envmap_pars_fragment:ZS,envmap_pars_vertex:JS,envmap_physical_pars_fragment:oM,envmap_vertex:$S,fog_vertex:KS,fog_pars_vertex:QS,fog_fragment:jS,fog_pars_fragment:tM,gradientmap_pars_fragment:eM,lightmap_pars_fragment:nM,lights_lambert_fragment:iM,lights_lambert_pars_fragment:sM,lights_pars_begin:rM,lights_toon_fragment:aM,lights_toon_pars_fragment:lM,lights_phong_fragment:cM,lights_phong_pars_fragment:hM,lights_physical_fragment:uM,lights_physical_pars_fragment:fM,lights_fragment_begin:dM,lights_fragment_maps:pM,lights_fragment_end:mM,lightprobes_pars_fragment:gM,logdepthbuf_fragment:_M,logdepthbuf_pars_fragment:xM,logdepthbuf_pars_vertex:vM,logdepthbuf_vertex:yM,map_fragment:SM,map_pars_fragment:MM,map_particle_fragment:bM,map_particle_pars_fragment:TM,metalnessmap_fragment:wM,metalnessmap_pars_fragment:EM,morphinstance_vertex:AM,morphcolor_vertex:CM,morphnormal_vertex:RM,morphtarget_pars_vertex:PM,morphtarget_vertex:IM,normal_fragment_begin:LM,normal_fragment_maps:DM,normal_pars_fragment:NM,normal_pars_vertex:OM,normal_vertex:UM,normalmap_pars_fragment:FM,clearcoat_normal_fragment_begin:BM,clearcoat_normal_fragment_maps:zM,clearcoat_pars_fragment:kM,iridescence_pars_fragment:VM,opaque_fragment:GM,packing:HM,premultiplied_alpha_fragment:WM,project_vertex:XM,dithering_fragment:qM,dithering_pars_fragment:YM,roughnessmap_fragment:ZM,roughnessmap_pars_fragment:JM,shadowmap_pars_fragment:$M,shadowmap_pars_vertex:KM,shadowmap_vertex:QM,shadowmask_pars_fragment:jM,skinbase_vertex:tb,skinning_pars_vertex:eb,skinning_vertex:nb,skinnormal_vertex:ib,specularmap_fragment:sb,specularmap_pars_fragment:rb,tonemapping_fragment:ob,tonemapping_pars_fragment:ab,transmission_fragment:lb,transmission_pars_fragment:cb,uv_pars_fragment:hb,uv_pars_vertex:ub,uv_vertex:fb,worldpos_vertex:db,background_vert:pb,background_frag:mb,backgroundCube_vert:gb,backgroundCube_frag:_b,cube_vert:xb,cube_frag:vb,depth_vert:yb,depth_frag:Sb,distance_vert:Mb,distance_frag:bb,equirect_vert:Tb,equirect_frag:wb,linedashed_vert:Eb,linedashed_frag:Ab,meshbasic_vert:Cb,meshbasic_frag:Rb,meshlambert_vert:Pb,meshlambert_frag:Ib,meshmatcap_vert:Lb,meshmatcap_frag:Db,meshnormal_vert:Nb,meshnormal_frag:Ob,meshphong_vert:Ub,meshphong_frag:Fb,meshphysical_vert:Bb,meshphysical_frag:zb,meshtoon_vert:kb,meshtoon_frag:Vb,points_vert:Gb,points_frag:Hb,shadow_vert:Wb,shadow_frag:Xb,sprite_vert:qb,sprite_frag:Yb},Ct={common:{diffuse:{value:new ee(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ee(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ee(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new ee(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},es={basic:{uniforms:Dn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:Dn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)},envMapIntensity:{value:1}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:Dn([Ct.common,Ct.specularmap,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)},specular:{value:new ee(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:Dn([Ct.common,Ct.envmap,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.roughnessmap,Ct.metalnessmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:Dn([Ct.common,Ct.aomap,Ct.lightmap,Ct.emissivemap,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.gradientmap,Ct.fog,Ct.lights,{emissive:{value:new ee(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:Dn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,Ct.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:Dn([Ct.points,Ct.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:Dn([Ct.common,Ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:Dn([Ct.common,Ct.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:Dn([Ct.common,Ct.bumpmap,Ct.normalmap,Ct.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:Dn([Ct.sprite,Ct.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distance:{uniforms:Dn([Ct.common,Ct.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distance_vert,fragmentShader:re.distance_frag},shadow:{uniforms:Dn([Ct.lights,Ct.fog,{color:{value:new ee(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};es.physical={uniforms:Dn([es.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new ee(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new ee(0)},specularColor:{value:new ee(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};var vu={r:0,b:0,g:0},Zb=new Pe,m0=new Qt;m0.set(-1,0,0,0,1,0,0,0,1);function Jb(s,t,e,n,i,r){let o=new ee(0),a=i===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let M=y.isScene===!0?y.background:null;if(M&&M.isTexture){let v=y.backgroundBlurriness>0;M=t.get(M,v)}return M}function p(y){let M=!1,v=f(y);v===null?m(o,a):v&&v.isColor&&(m(v,1),M=!0);let E=s.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||M)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(y,M){let v=f(M);v&&v.isCubeTexture?(c===void 0&&(c=new xn(new $s(1,1,1),new Qi({name:"BackgroundCubeMaterial",uniforms:Br(es.backgroundCube.uniforms),vertexShader:es.backgroundCube.vertexShader,fragmentShader:es.backgroundCube.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,A,x){this.matrixWorld.copyPosition(x.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Zb.makeRotationFromEuler(M.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(m0),c.material.toneMapped=de.getTransfer(v.colorSpace)!==Se,(h!==v||d!==v.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new xn(new Ks(2,2),new Qi({name:"BackgroundMaterial",uniforms:Br(es.background.uniforms),vertexShader:es.background.vertexShader,fragmentShader:es.background.fragmentShader,side:er,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=de.getTransfer(v.colorSpace)!==Se,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function m(y,M){y.getRGB(vu,jd(s)),e.buffers.color.setClear(vu.r,vu.g,vu.b,M,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,M=1){o.set(y),a=M,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,m(o,a)},render:p,addToRenderList:_,dispose:g}}function $b(s,t){let e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(L,N,V,I,z){let G=!1,F=d(L,I,V,N);r!==F&&(r=F,c(r.object)),G=f(L,I,V,z),G&&p(L,I,V,z),z!==null&&t.update(z,s.ELEMENT_ARRAY_BUFFER),(G||o)&&(o=!1,v(L,N,V,I),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return s.createVertexArray()}function c(L){return s.bindVertexArray(L)}function h(L){return s.deleteVertexArray(L)}function d(L,N,V,I){let z=I.wireframe===!0,G=n[N.id];G===void 0&&(G={},n[N.id]=G);let F=L.isInstancedMesh===!0?L.id:0,j=G[F];j===void 0&&(j={},G[F]=j);let X=j[V.id];X===void 0&&(X={},j[V.id]=X);let R=X[z];return R===void 0&&(R=u(l()),X[z]=R),R}function u(L){let N=[],V=[],I=[];for(let z=0;z<e;z++)N[z]=0,V[z]=0,I[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:V,attributeDivisors:I,object:L,attributes:{},index:null}}function f(L,N,V,I){let z=r.attributes,G=N.attributes,F=0,j=V.getAttributes();for(let X in j)if(j[X].location>=0){let K=z[X],Tt=G[X];if(Tt===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(Tt=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(Tt=L.instanceColor)),K===void 0||K.attribute!==Tt||Tt&&K.data!==Tt.data)return!0;F++}return r.attributesNum!==F||r.index!==I}function p(L,N,V,I){let z={},G=N.attributes,F=0,j=V.getAttributes();for(let X in j)if(j[X].location>=0){let K=G[X];K===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(K=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(K=L.instanceColor));let Tt={};Tt.attribute=K,K&&K.data&&(Tt.data=K.data),z[X]=Tt,F++}r.attributes=z,r.attributesNum=F,r.index=I}function _(){let L=r.newAttributes;for(let N=0,V=L.length;N<V;N++)L[N]=0}function m(L){g(L,0)}function g(L,N){let V=r.newAttributes,I=r.enabledAttributes,z=r.attributeDivisors;V[L]=1,I[L]===0&&(s.enableVertexAttribArray(L),I[L]=1),z[L]!==N&&(s.vertexAttribDivisor(L,N),z[L]=N)}function y(){let L=r.newAttributes,N=r.enabledAttributes;for(let V=0,I=N.length;V<I;V++)N[V]!==L[V]&&(s.disableVertexAttribArray(V),N[V]=0)}function M(L,N,V,I,z,G,F){F===!0?s.vertexAttribIPointer(L,N,V,z,G):s.vertexAttribPointer(L,N,V,I,z,G)}function v(L,N,V,I){_();let z=I.attributes,G=V.getAttributes(),F=N.defaultAttributeValues;for(let j in G){let X=G[j];if(X.location>=0){let R=z[j];if(R===void 0&&(j==="instanceMatrix"&&L.instanceMatrix&&(R=L.instanceMatrix),j==="instanceColor"&&L.instanceColor&&(R=L.instanceColor)),R!==void 0){let K=R.normalized,Tt=R.itemSize,Ut=t.get(R);if(Ut===void 0)continue;let Z=Ut.buffer,ut=Ut.type,Mt=Ut.bytesPerElement,At=ut===s.INT||ut===s.UNSIGNED_INT||R.gpuType===Oh;if(R.isInterleavedBufferAttribute){let gt=R.data,Lt=gt.isInterleavedBuffer===!0?gt.stride:gt.itemSize,ge=R.offset;if(gt.isInstancedInterleavedBuffer||gt.isInstancedBufferAttribute){for(let Dt=0;Dt<X.locationSize;Dt++)g(X.location+Dt,gt.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let Dt=0;Dt<X.locationSize;Dt++)m(X.location+Dt);s.bindBuffer(s.ARRAY_BUFFER,Z);for(let Dt=0;Dt<X.locationSize;Dt++)M(X.location+Dt,Tt/X.locationSize,ut,K,Lt*Mt,(ge+Tt/X.locationSize*Dt)*Mt,At)}else{if(R.isInstancedBufferAttribute){for(let gt=0;gt<X.locationSize;gt++)g(X.location+gt,R.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=R.meshPerAttribute*R.count)}else for(let gt=0;gt<X.locationSize;gt++)m(X.location+gt);s.bindBuffer(s.ARRAY_BUFFER,Z);for(let gt=0;gt<X.locationSize;gt++)M(X.location+gt,Tt/X.locationSize,ut,K,Tt*Mt,Tt/X.locationSize*gt*Mt,At)}}else if(F!==void 0){let K=F[j];if(K!==void 0)switch(K.length){case 2:s.vertexAttrib2fv(X.location,K);break;case 3:s.vertexAttrib3fv(X.location,K);break;case 4:s.vertexAttrib4fv(X.location,K);break;default:s.vertexAttrib1fv(X.location,K)}}}}y()}function E(){P();for(let L in n){let N=n[L];for(let V in N){let I=N[V];for(let z in I){let G=I[z];for(let F in G)h(G[F].object),delete G[F];delete I[z]}}delete n[L]}}function A(L){if(n[L.id]===void 0)return;let N=n[L.id];for(let V in N){let I=N[V];for(let z in I){let G=I[z];for(let F in G)h(G[F].object),delete G[F];delete I[z]}}delete n[L.id]}function x(L){for(let N in n){let V=n[N];for(let I in V){let z=V[I];if(z[L.id]===void 0)continue;let G=z[L.id];for(let F in G)h(G[F].object),delete G[F];delete z[L.id]}}}function S(L){for(let N in n){let V=n[N],I=L.isInstancedMesh===!0?L.id:0,z=V[I];if(z!==void 0){for(let G in z){let F=z[G];for(let j in F)h(F[j].object),delete F[j];delete z[G]}delete V[I],Object.keys(V).length===0&&delete n[N]}}}function P(){w(),o=!0,r!==i&&(r=i,c(r.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:w,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfObject:S,releaseStatesOfProgram:x,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function Kb(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function a(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function Qb(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let x=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(x.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(x){return!(x!==Bi&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(x){let S=x===Fi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(x!==ti&&x!==Ui&&!S&&n.convert(x)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(x){if(x==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";x="mediump"}return x==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Yt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&d===!1;e.reversedDepthBuffer===!0&&d===!1&&Yt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&d===!0&&Yt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),g=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=s.getParameter(s.MAX_SAMPLES),A=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:y,maxVaryings:M,maxFragmentUniforms:v,maxSamples:E,samples:A}}function jb(s){let t=this,e=null,n=0,i=!1,r=!1,o=new Ni,a=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,g=s.get(d);if(!i||p===null||p.length===0||r&&!m)r?h(null):c();else{let y=r?0:n,M=y*4,v=g.clippingState||null;l.value=v,v=h(p,u,M,f);for(let E=0;E!==M;++E)v[E]=e[E];g.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){let _=d!==null?d.length:0,m=null;if(_!==0){if(m=l.value,p!==!0||m===null){let g=f+_*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<g)&&(m=new Float32Array(g));for(let M=0,v=f;M!==_;++M,v+=4)o.copy(d[M]).applyMatrix4(y,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}var bl=class extends fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Ha(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new $s(5,5,5),r=new Qi({name:"CubemapFromEquirect",uniforms:Br(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xn,blending:Dr});r.uniforms.tEquirect.value=e;let o=new xn(i,r),a=e.minFilter;return e.minFilter===Ts&&(e.minFilter=Wn),new Oo(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}},Y_=256,tT=3,eT=20,g0=256,_0=16,nT=3,iT=new k,sT=new ee,Su=class s{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Oo(1,10,null),this._boxMesh=new xn(new $s(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){let{size:o=256,position:a=iT}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let d=l.autoClear,u=l.autoClearColor,f=l.autoClearDepth,p=l.autoClearStencil,_=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,_===null&&(t.background=l.getClearColor(sT));let m=new Oo(n,i,h);return m.position.copy(a),m.update(l,t),l.autoClear=d,l.autoClearColor=u,l.autoClearDepth=f,l.autoClearStencil=p,t.background=_,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=J_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Y_,$d(t))}_fromTexture(t,e){t.mapping===Or||t.mapping===Bo?this._setSize(t.image.length===0?Y_:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){let t=this._cubeSize,e=Z_(t,!1,!1),n=Math.log2(t)-tT;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Z_(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){let i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;let o=t.width>>e;t.viewport.set(0,0,o,o),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Or||t.mapping===Bo?(this._cubemapMaterial===null&&(this._cubemapMaterial=$_()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=J_()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=rT(),this._integrationMaterial=oT());let e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/_0);for(let o=0;o<=n;o++){let a=s.lodToRoughness(o,n);if(o>n-nT)r.roughness.value=a,this._renderCube(t,o,this._integrationMaterial);else{let l=a>0?Math.log2(e)+.5*Math.log2(6/(g0*Math.pow(a,4)))+.5:0;i.roughness.value=a,i.lodBias.value=l,this._renderCube(t,o,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=aT());let n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}};function Z_(s,t,e){return new bl(s,{minFilter:Ts,generateMipmaps:t,type:Fi,colorSpace:Da,depthBuffer:e})}function Tl(s,t,e){return new Qi({name:s,uniforms:t,vertexShader:re.cube_vert,fragmentShader:e,side:Xn,blending:Dr,depthTest:!1,depthWrite:!1})}function rT(){return Tl("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${g0}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function oT(){return Tl("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:_0}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function aT(){return Tl("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${eT}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function J_(){return Tl("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function $_(){return Tl("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function lT(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Lh||f===Dh)if(t.has(u)){let p=t.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new bl(p.height);return _.fromEquirectangularTexture(s,u),t.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){let f=u.mapping,p=f===Lh||f===Dh,_=f===Or||f===Bo;if(p||_){let m=e.get(u),g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return n===null&&(n=new Su(s)),m=p?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{let y=u.image;return p&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new Su(s)),m=p?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function a(u,f){return f===Lh?u.mapping=Or:f===Dh&&(u.mapping=Bo),u}function l(u){let f=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function cT(s){let t={};function e(n){if(t[n]!==void 0)return t[n];let i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let i=e(n);return i===null&&Ca("WebGLRenderer: "+n+" extension not supported."),i}}}function hT(s,t,e,n){let i={},r=new WeakMap,o=new FinalizationRegistry(p=>delete i[p]);function a(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(let m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",a),delete i[p.id],o.unregister(p);let _=r.get(p);_&&(t.remove(_),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,_){return i[_.id]!==void 0||(_.addEventListener("dispose",a),i[_.id]=new WeakRef(_),o.register(_,_.id,_),e.memory.geometries++),_}function h(p){let _=p.attributes;for(let m in _)t.update(_[m],s.ARRAY_BUFFER)}function d(p){let _=p.index,m=p.attributes.position,g=0;if(m===void 0)return;let y=_!==null?_.array.length:m.array.length/3-1,M=m.count>=65535?Va:ka,v=new M(Math.ceil(y/3)*6,1),E=v.array;if(_!==null){let x=_.array;g=_.version;for(let S=0,P=0;S<y;S+=3){let w=x[S+0],L=x[S+1],N=x[S+2];E[P++]=w,E[P++]=L,E[P++]=L,E[P++]=N,E[P++]=N,E[P++]=w}}else{g=m.version;for(let x=0,S=0;x<y;x+=3){let P=x+0,w=x+1,L=x+2;E[S++]=P,E[S++]=w,E[S++]=w,E[S++]=L,E[S++]=L,E[S++]=P}}v.version=g;let A=r.get(p);A&&t.remove(A),r.set(p,v)}function u(p){let _=r.get(p);if(_){let m=p.index;m!==null&&_.version<m.version&&d(p)}else d(p);return r.get(p)}function f(){for(let p in i){let _=i[p].deref();_!==void 0&&l(_)}}return{get:c,update:h,getWireframeAttribute:u,dispose:f}}function uT(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){s.drawElements(n,u,r,d*o),e.update(u,n,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,d*o,f),e.update(u,n,f))}function h(d,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let _=0;for(let m=0;m<f;m++)_+=u[m];e.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function fT(s){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:Jt("WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function dT(s,t,e){let n=new WeakMap,i=new Ue;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let P=function(){x.dispose(),n.delete(a),a.removeEventListener("dispose",P)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],M=0;f===!0&&(M=1),p===!0&&(M=2),_===!0&&(M=3);let v=a.attributes.position.count*M,E=1;v>t.maxTextureSize&&(E=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let A=new Float32Array(v*E*4*d),x=new Ua(A,v,E,d);x.type=Ui,x.needsUpdate=!0;let S=M*4;for(let w=0;w<d;w++){let L=m[w],N=g[w],V=y[w],I=v*E*4*w;for(let z=0;z<L.count;z++){let G=z*S;f===!0&&(i.fromBufferAttribute(L,z),A[I+G+0]=i.x,A[I+G+1]=i.y,A[I+G+2]=i.z,A[I+G+3]=0),p===!0&&(i.fromBufferAttribute(N,z),A[I+G+4]=i.x,A[I+G+5]=i.y,A[I+G+6]=i.z,A[I+G+7]=0),_===!0&&(i.fromBufferAttribute(V,z),A[I+G+8]=i.x,A[I+G+9]=i.y,A[I+G+10]=i.z,A[I+G+11]=V.itemSize===4?i.w:1)}}u={count:d,texture:x,size:new Et(v,E)},n.set(a,u),a.addEventListener("dispose",P)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function pT(s,t,e,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,d=c.geometry,u=t.get(c,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:a}}var mT={[Pd]:"LINEAR_TONE_MAPPING",[Id]:"REINHARD_TONE_MAPPING",[Ld]:"CINEON_TONE_MAPPING",[dl]:"ACES_FILMIC_TONE_MAPPING",[Nd]:"AGX_TONE_MAPPING",[Od]:"NEUTRAL_TONE_MAPPING",[Dd]:"CUSTOM_TONE_MAPPING"};function gT(s,t,e,n,i,r){let o=new fi(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new jn;h.setAttribute("position",new Le([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Le([0,2,0,0,2,0],2));let d=new gh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new xn(h,d),f=new cl(-1,1,1,-1,0,1),p=null,_=null,m=!1,g,y=null,M=[],v=!1;this.setSize=function(E,A){o.setSize(E,A),a!==null&&a.setSize(E,A),l!==null&&l.setSize(E,A);for(let x=0;x<M.length;x++){let S=M[x];S.setSize&&S.setSize(E,A)}},this.setEffects=function(E){M=E,v=M.length>0&&M[0].isRenderPass===!0;let A=o.width,x=o.height;M.length>0&&a===null&&(a=new fi(A,x,{type:Fi,depthBuffer:!1,stencilBuffer:!1}),l=new fi(A,x,{type:Fi,depthBuffer:!1,stencilBuffer:!1}));let S=i===!0&&M.some(P=>P.needsDepthTexture===!0);S!==(o.depthTexture!==null)&&(S===!0&&c===null&&(c=new bs(A,x),r===!0&&(c.format=ws,c.type=Ur)),o.dispose(),o.depthTexture=S?c:null,o.resolveDepthBuffer=S,o.storeMultisampledDepthBuffer=S);for(let P=0;P<M.length;P++){let w=M[P];w.setSize&&w.setSize(A,x),S&&w.needsDepthTexture===!0&&w.setDepthTexture&&w.setDepthTexture(c)}},this.begin=function(E,A){if(m||E.toneMapping===ji&&M.length===0)return!1;if(y=A,A!==null){let x=A.width,S=A.height;(o.width!==x||o.height!==S)&&this.setSize(x,S)}return v===!1&&E.setRenderTarget(o),g=E.toneMapping,E.toneMapping=ji,!0},this.hasRenderPass=function(){return v},this.end=function(E,A){E.toneMapping=g,m=!0;let x=o,S=a;for(let P=0;P<M.length;P++){let w=M[P];w.enabled!==!1&&(w.render(E,S,x,A),w.needsSwap!==!1&&(x=S,S=S===a?l:a))}if(p!==E.outputColorSpace||_!==E.toneMapping){p=E.outputColorSpace,_=E.toneMapping,d.defines={},de.getTransfer(p)===Se&&(d.defines.SRGB_TRANSFER="");let P=mT[_];P&&(d.defines[P]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=x.texture,E.setRenderTarget(y),E.render(u,f),y=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),d.dispose()}}var x0=new Qn,v0=new bs(1,1),y0=new Wa(1),S0=new Ua,M0=new sh,b0=new Ha,K_=[],Q_=[],j_=new Float32Array(16),t0=new Float32Array(9),e0=new Float32Array(4);function Vo(s,t,e){let n=s[0];if(n<=0||n>0)return s;let i=t*e,r=K_[i];if(r===void 0&&(r=new Float32Array(i),K_[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function on(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function an(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function bu(s,t){let e=Q_[t];e===void 0&&(e=new Int32Array(t),Q_[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function _T(s,t){let e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function xT(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(on(e,t))return;s.uniform2fv(this.addr,t),an(e,t)}}function vT(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(on(e,t))return;s.uniform3fv(this.addr,t),an(e,t)}}function yT(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(on(e,t))return;s.uniform4fv(this.addr,t),an(e,t)}}function ST(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(on(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),an(e,t)}else{if(on(e,n))return;e0.set(n),s.uniformMatrix2fv(this.addr,!1,e0),an(e,n)}}function MT(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(on(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),an(e,t)}else{if(on(e,n))return;t0.set(n),s.uniformMatrix3fv(this.addr,!1,t0),an(e,n)}}function bT(s,t){let e=this.cache,n=t.elements;if(n===void 0){if(on(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),an(e,t)}else{if(on(e,n))return;j_.set(n),s.uniformMatrix4fv(this.addr,!1,j_),an(e,n)}}function TT(s,t){let e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function wT(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(on(e,t))return;s.uniform2iv(this.addr,t),an(e,t)}}function ET(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(on(e,t))return;s.uniform3iv(this.addr,t),an(e,t)}}function AT(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(on(e,t))return;s.uniform4iv(this.addr,t),an(e,t)}}function CT(s,t){let e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function RT(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(on(e,t))return;s.uniform2uiv(this.addr,t),an(e,t)}}function PT(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(on(e,t))return;s.uniform3uiv(this.addr,t),an(e,t)}}function IT(s,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(on(e,t))return;s.uniform4uiv(this.addr,t),an(e,t)}}function Tu(s){return s.version===0&&(s.compareFunction=qd,s.needsUpdate=!0),s}function LT(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=Tu(v0):r=x0,e.setTexture2D(t||r,i)}function DT(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||M0,i)}function NT(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=Tu(y0):r=b0,e.setTextureCube(t||r,i)}function OT(s,t,e){let n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||S0,i)}function UT(s){switch(s){case 5126:return _T;case 35664:return xT;case 35665:return vT;case 35666:return yT;case 35674:return ST;case 35675:return MT;case 35676:return bT;case 5124:case 35670:return TT;case 35667:case 35671:return wT;case 35668:case 35672:return ET;case 35669:case 35673:return AT;case 5125:return CT;case 36294:return RT;case 36295:return PT;case 36296:return IT;case 35678:case 36198:case 36298:case 36306:case 35682:return LT;case 35679:case 36299:case 36307:return DT;case 35680:case 36300:case 36308:case 36293:return NT;case 36289:case 36303:case 36311:case 36292:return OT}}function FT(s,t){s.uniform1fv(this.addr,t)}function BT(s,t){let e=Vo(t,this.size,2);s.uniform2fv(this.addr,e)}function zT(s,t){let e=Vo(t,this.size,3);s.uniform3fv(this.addr,e)}function kT(s,t){let e=Vo(t,this.size,4);s.uniform4fv(this.addr,e)}function VT(s,t){let e=Vo(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function GT(s,t){let e=Vo(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function HT(s,t){let e=Vo(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function WT(s,t){s.uniform1iv(this.addr,t)}function XT(s,t){s.uniform2iv(this.addr,t)}function qT(s,t){s.uniform3iv(this.addr,t)}function YT(s,t){s.uniform4iv(this.addr,t)}function ZT(s,t){s.uniform1uiv(this.addr,t)}function JT(s,t){s.uniform2uiv(this.addr,t)}function $T(s,t){s.uniform3uiv(this.addr,t)}function KT(s,t){s.uniform4uiv(this.addr,t)}function QT(s,t,e){let n=this.cache,i=t.length,r=bu(e,i);on(n,r)||(s.uniform1iv(this.addr,r),an(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=Tu(v0):o=x0;for(let a=0;a!==i;++a)e.setTexture2D(t[a]||o,r[a])}function jT(s,t,e){let n=this.cache,i=t.length,r=bu(e,i);on(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||M0,r[o])}function tw(s,t,e){let n=this.cache,i=t.length,r=bu(e,i);on(n,r)||(s.uniform1iv(this.addr,r),an(n,r));let o;this.type===s.SAMPLER_CUBE_SHADOW?o=Tu(y0):o=b0;for(let a=0;a!==i;++a)e.setTextureCube(t[a]||o,r[a])}function ew(s,t,e){let n=this.cache,i=t.length,r=bu(e,i);on(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||S0,r[o])}function nw(s){switch(s){case 5126:return FT;case 35664:return BT;case 35665:return zT;case 35666:return kT;case 35674:return VT;case 35675:return GT;case 35676:return HT;case 5124:case 35670:return WT;case 35667:case 35671:return XT;case 35668:case 35672:return qT;case 35669:case 35673:return YT;case 5125:return ZT;case 36294:return JT;case 36295:return $T;case 36296:return KT;case 35678:case 36198:case 36298:case 36306:case 35682:return QT;case 35679:case 36299:case 36307:return jT;case 35680:case 36300:case 36308:case 36293:return tw;case 36289:case 36303:case 36311:case 36292:return ew}}var hp=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=UT(e.type)}},up=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=nw(e.type)}},fp=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(t,e[a.id],n)}}},lp=/(\w+)(\])?(\[|\.)?/g;function n0(s,t){s.seq.push(t),s.map[t.id]=t}function iw(s,t,e){let n=s.name,i=n.length;for(lp.lastIndex=0;;){let r=lp.exec(n),o=lp.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){n0(e,c===void 0?new hp(a,s,t):new up(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new fp(a),n0(e,d)),e=d}}}var ko=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=t.getActiveUniform(e,o),l=t.getUniformLocation(e,a.name);iw(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===t.SAMPLER_2D_SHADOW||o.type===t.SAMPLER_CUBE_SHADOW||o.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){let r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){let i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){let n=[];for(let i=0,r=t.length;i!==r;++i){let o=t[i];o.id in e&&n.push(o)}return n}};function i0(s,t,e){let n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}var sw=37297,rw=0;function ow(s,t){let e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}var s0=new Qt;function aw(s){de._getMatrix(s0,de.workingColorSpace,s);let t=`mat3( ${s0.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(s)){case Na:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return Yt("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function r0(s,t,e){let n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+ow(s.getShaderSource(t),a)}else return r}function lw(s,t){let e=aw(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var cw={[Pd]:"Linear",[Id]:"Reinhard",[Ld]:"Cineon",[dl]:"ACESFilmic",[Nd]:"AgX",[Od]:"Neutral",[Dd]:"Custom"};function hw(s,t){let e=cw[t];return e===void 0?(Yt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var yu=new k;function uw(){de.getLuminanceCoefficients(yu);let s=yu.x.toFixed(4),t=yu.y.toFixed(4),e=yu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fw(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ml).join(`
`)}function dw(s){let t=[];for(let e in s){let n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function pw(s,t){let e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(t,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Ml(s){return s!==""}function o0(s,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function a0(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var mw=/^[ \t]*#include +<([\w\d./]+)>/gm;function dp(s){return s.replace(mw,gw)}function gw(s,t){let e=re[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return dp(e)}var _w=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function l0(s){return s.replace(_w,xw)}function xw(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function c0(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var vw={[fl]:"SHADOWMAP_TYPE_PCF",[Uo]:"SHADOWMAP_TYPE_VSM"};function yw(s){return vw[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Sw={[Bo]:"ENVMAP_MODE_REFRACTION"};function Mw(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Sw[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var bw={[Rd]:"ENVMAP_BLENDING_MULTIPLY",[S_]:"ENVMAP_BLENDING_MIX",[M_]:"ENVMAP_BLENDING_ADD"};function Tw(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":bw[s.combine]||"ENVMAP_BLENDING_NONE"}function ww(s,t,e,n){let i=s.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=yw(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Mw(e),d=Tw(e),u=fw(e),f=dw(r),p=i.createProgram(),_,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Ml).join(`
`),_.length>0&&(_+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f].filter(Ml).join(`
`),m.length>0&&(m+=`
`)):(_=[c0(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ml).join(`
`),m=[c0(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,f,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ji?"#define TONE_MAPPING":"",e.toneMapping!==ji?re.tonemapping_pars_fragment:"",e.toneMapping!==ji?hw("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,lw("linearToOutputTexel",e.outputColorSpace),uw(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ml).join(`
`)),o=dp(o),o=o0(o,e),o=a0(o,e),a=dp(a),a=o0(a,e),a=a0(a,e),o=l0(o),a=l0(a),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,_=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,m=["#define varying in",e.glslVersion===Yd?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Yd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let y=g+_+o,M=g+m+a,v=i0(i,i.VERTEX_SHADER,y),E=i0(i,i.FRAGMENT_SHADER,M);i.attachShader(p,v),i.attachShader(p,E),e.index0AttributeName!==void 0?i.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(p,0,"position"),i.linkProgram(p);function A(w){if(s.debug.checkShaderErrors){let L=i.getProgramInfoLog(p)||"",N=i.getShaderInfoLog(v)||"",V=i.getShaderInfoLog(E)||"",I=L.trim(),z=N.trim(),G=V.trim(),F=!0,j=!0;if(i.getProgramParameter(p,i.LINK_STATUS)===!1)if(F=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,p,v,E);else{let X=r0(i,v,"vertex"),R=r0(i,E,"fragment");Jt("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(p,i.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+I+`
`+X+`
`+R)}else I!==""?Yt("WebGLProgram: Program Info Log:",I):(z===""||G==="")&&(j=!1);j&&(w.diagnostics={runnable:F,programLog:I,vertexShader:{log:z,prefix:_},fragmentShader:{log:G,prefix:m}})}i.deleteShader(v),i.deleteShader(E),x=new ko(i,p),S=pw(i,p)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(p,sw)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=rw++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=v,this.fragmentShader=E,this}var Ew=0,pp=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new mp(t),e.set(t,n)),n}},mp=class{constructor(t){this.id=Ew++,this.code=t,this.usedTimes=0}};function Aw(s){return s===nr||s===vl||s===yl}function Cw(s,t,e,n,i,r){let o=new Fa,a=new pp,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,S,P,w,L,N){let V=w.fog,I=L.geometry,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?w.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,F=t.get(x.envMap||z,G),j=u[x.type],X=n.precision;x.precision!==null&&(X=n.getMaxPrecision(x.precision),X!==x.precision&&Yt("WebGLProgram.getParameters:",x.precision,"not supported, using",X,"instead."));let R=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,K=R!==void 0?R.length:0,Tt=0;I.morphAttributes.position!==void 0&&(Tt=1),I.morphAttributes.normal!==void 0&&(Tt=2),I.morphAttributes.color!==void 0&&(Tt=3);let Ut,Z,ut,Mt;if(j){let it=es[j];Ut=it.vertexShader,Z=it.fragmentShader}else{Ut=x.vertexShader,Z=x.fragmentShader;let it=a.getVertexShaderStage(x),Rt=a.getFragmentShaderStage(x);a.update(x,it,Rt),ut=it.id,Mt=Rt.id}let At=s.getRenderTarget(),gt=s.state.buffers.depth.getReversed(),Lt=L.isInstancedMesh===!0,ge=L.isBatchedMesh===!0,Dt=!!x.map,Wt=!!x.matcap,It=!!F,Q=It&&F.isPMREMTexture===!0,lt=!!x.aoMap,ct=!!x.lightMap,B=!!x.bumpMap&&x.wireframe===!1,dt=!!x.normalMap,Xt=!!x.displacementMap,Nt=!!x.emissiveMap,Vt=!!x.metalnessMap,Kt=!!x.roughnessMap,ie=x.anisotropy>0,U=x.clearcoat>0,oe=x.diffuseRoughness>0,$t=x.dispersion>0,Zt=x.retroreflectivity>0,pt=x.iridescence>0,pe=x.sheen>0,Bt=x.transmission>0,qt=ie&&!!x.anisotropyMap,C=U&&!!x.clearcoatMap,b=U&&!!x.clearcoatNormalMap,W=U&&!!x.clearcoatRoughnessMap,ot=oe&&!!x.diffuseRoughnessMap,st=pt&&!!x.iridescenceMap,mt=pt&&!!x.iridescenceThicknessMap,yt=pe&&!!x.sheenColorMap,q=pe&&!!x.sheenRoughnessMap,et=!!x.specularMap,ft=!!x.specularColorMap,D=!!x.specularIntensityMap,tt=Bt&&!!x.transmissionMap,$=Bt&&!!x.thicknessMap,_t=!!x.gradientMap,ht=!!x.alphaMap,xt=x.alphaTest>0,at=!!x.alphaHash,vt=!!x.extensions,rt=ji;x.toneMapped&&(At===null||At.isXRRenderTarget===!0)&&(rt=s.toneMapping);let nt=Q?F.isCompressedCubeTexture?F.image[0].mipmaps:F.mipmaps:null,St={shaderID:j,shaderType:x.type,shaderName:x.name,vertexShader:Ut,fragmentShader:Z,defines:x.defines,customVertexShaderID:ut,customFragmentShaderID:Mt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:X,batching:ge,batchingColor:ge&&L._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&L.instanceColor!==null,instancingMorph:Lt&&L.morphTexture!==null,outputColorSpace:At===null?s.outputColorSpace:At.isXRRenderTarget===!0?At.texture.colorSpace:de.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Dt,matcap:Wt,envMap:It,envMapMode:It&&F.mapping,envMapPMREM:Q,envMapMaxLod:Q?nt.length-1:null,envMapSize:Q?nt[0].width:null,aoMap:lt,lightMap:ct,bumpMap:B,normalMap:dt,displacementMap:Xt,emissiveMap:Nt,normalMapObjectSpace:dt&&x.normalMapType===w_,normalMapTangentSpace:dt&&x.normalMapType===_u,packedNormalMap:dt&&x.normalMapType===_u&&Aw(x.normalMap.format),metalnessMap:Vt,roughnessMap:Kt,anisotropy:ie,anisotropyMap:qt,clearcoat:U,clearcoatMap:C,clearcoatNormalMap:b,clearcoatRoughnessMap:W,diffuseRoughness:oe,diffuseRoughnessMap:ot,dispersion:$t,retroreflection:Zt,iridescence:pt,iridescenceMap:st,iridescenceThicknessMap:mt,sheen:pe,sheenColorMap:yt,sheenRoughnessMap:q,specularMap:et,specularColorMap:ft,specularIntensityMap:D,transmission:Bt,transmissionMap:tt,thicknessMap:$,gradientMap:_t,opaque:x.transparent===!1&&x.blending===Fo&&x.alphaToCoverage===!1,alphaMap:ht,alphaTest:xt,alphaHash:at,combine:x.combine,mapUv:Dt&&f(x.map.channel),aoMapUv:lt&&f(x.aoMap.channel),lightMapUv:ct&&f(x.lightMap.channel),bumpMapUv:B&&f(x.bumpMap.channel),normalMapUv:dt&&f(x.normalMap.channel),displacementMapUv:Xt&&f(x.displacementMap.channel),emissiveMapUv:Nt&&f(x.emissiveMap.channel),metalnessMapUv:Vt&&f(x.metalnessMap.channel),roughnessMapUv:Kt&&f(x.roughnessMap.channel),anisotropyMapUv:qt&&f(x.anisotropyMap.channel),clearcoatMapUv:C&&f(x.clearcoatMap.channel),clearcoatNormalMapUv:b&&f(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W&&f(x.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ot&&f(x.diffuseRoughnessMap.channel),iridescenceMapUv:st&&f(x.iridescenceMap.channel),iridescenceThicknessMapUv:mt&&f(x.iridescenceThicknessMap.channel),sheenColorMapUv:yt&&f(x.sheenColorMap.channel),sheenRoughnessMapUv:q&&f(x.sheenRoughnessMap.channel),specularMapUv:et&&f(x.specularMap.channel),specularColorMapUv:ft&&f(x.specularColorMap.channel),specularIntensityMapUv:D&&f(x.specularIntensityMap.channel),transmissionMapUv:tt&&f(x.transmissionMap.channel),thicknessMapUv:$&&f(x.thicknessMap.channel),alphaMapUv:ht&&f(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(dt||ie),vertexNormals:!!I.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!I.attributes.uv&&(Dt||ht),fog:!!V,useFog:x.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||I.attributes.normal===void 0&&dt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:gt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:Tt,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:N.filter(it=>it.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:rt,decodeVideoTexture:Dt&&x.map.isVideoTexture===!0&&de.getTransfer(x.map.colorSpace)===Se,decodeVideoTextureEmissive:Nt&&x.emissiveMap.isVideoTexture===!0&&de.getTransfer(x.emissiveMap.colorSpace)===Se,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ei,flipSided:x.side===Xn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:vt&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&x.extensions.multiDraw===!0||ge)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return St.vertexUv1s=l.has(1),St.vertexUv2s=l.has(2),St.vertexUv3s=l.has(3),l.clear(),St}function _(x){let S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(let P in x.defines)S.push(P),S.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(m(S,x),g(S,x),S.push(s.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function m(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapPMREM),x.push(S.envMapMaxLod),x.push(S.envMapSize),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.diffuseRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.numSunLights),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numSunLightShadows),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.numLightProbeGrids),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function g(x,S){o.disableAll(),S.instancing&&o.enable(0),S.instancingColor&&o.enable(1),S.instancingMorph&&o.enable(2),S.matcap&&o.enable(3),S.envMap&&o.enable(4),S.normalMapObjectSpace&&o.enable(5),S.normalMapTangentSpace&&o.enable(6),S.clearcoat&&o.enable(7),S.iridescence&&o.enable(8),S.alphaTest&&o.enable(9),S.vertexColors&&o.enable(10),S.vertexAlphas&&o.enable(11),S.vertexUv1s&&o.enable(12),S.vertexUv2s&&o.enable(13),S.vertexUv3s&&o.enable(14),S.vertexTangents&&o.enable(15),S.anisotropy&&o.enable(16),S.alphaHash&&o.enable(17),S.batching&&o.enable(18),S.dispersion&&o.enable(19),S.retroreflection&&o.enable(24),S.diffuseRoughness&&o.enable(25),S.batchingColor&&o.enable(20),S.gradientMap&&o.enable(21),S.packedNormalMap&&o.enable(22),S.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),S.numLightProbeGrids>0&&o.enable(22),S.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function y(x){let S=u[x.type],P;if(S){let w=es[S];P=W_.clone(w.uniforms)}else P=x.uniforms;return P}function M(x,S){let P=h.get(S);return P!==void 0?++P.usedTimes:(P=new ww(s,S,x,i),c.push(P),h.set(S,P)),P}function v(x){if(--x.usedTimes===0){let S=c.indexOf(x);c[S]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){a.remove(x)}function A(){a.dispose()}return{getParameters:p,getProgramCacheKey:_,getUniforms:y,acquireProgram:M,releaseProgram:v,releaseShaderCache:E,programs:c,dispose:A}}function Rw(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Pw(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function h0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function u0(){let s=[],t=0,e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,_,m,g){let y=s[t];return y===void 0?(y={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:m,group:g},s[t]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=p,y.materialVariant=o(u),y.groupOrder=_,y.renderOrder=u.renderOrder,y.z=m,y.group=g),t++,y}function l(u,f,p,_,m,g,y){y.reversedDepth===!0&&(m=-m);let M=a(u,f,p,_,m,g);p.transmission>0?n.push(M):p.transparent===!0?i.push(M):e.push(M)}function c(u,f,p,_,m,g){let y=a(u,f,p,_,m,g);p.transmission>0?n.unshift(y):p.transparent===!0?i.unshift(y):e.unshift(y)}function h(u,f){e.length>1&&e.sort(u||Pw),n.length>1&&n.sort(f||h0),i.length>1&&i.sort(f||h0)}function d(){for(let u=t,f=s.length;u<f;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function Iw(){let s=new WeakMap;function t(n,i){let r=s.get(n),o;return r===void 0?(o=new u0,s.set(n,[o])):i>=r.length?(o=new u0,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Lw(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new k,color:new ee};break;case"SpotLight":e={position:new k,direction:new k,color:new ee,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new ee,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new ee,groundColor:new ee};break;case"RectAreaLight":e={color:new ee,position:new k,halfWidth:new k,halfHeight:new k};break}return s[t.id]=e,e}}}function Dw(){let s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}var Nw=0;function Ow(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Uw(s){let t=new Lw,e=Dw(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new k);let i=new k,r=new Pe,o=new Pe;function a(c){let h=0,d=0,u=0;for(let N=0;N<9;N++)n.probe[N].set(0,0,0);let f=0,p=0,_=0,m=0,g=0,y=0,M=0,v=0,E=0,A=0,x=0,S=0,P=0,w=0;c.sort(Ow);for(let N=0,V=c.length;N<V;N++){let I=c[N],z=I.color,G=I.intensity,F=I.distance,j=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===nr?j=I.shadow.map.texture:j=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=z.r*G,d+=z.g*G,u+=z.b*G;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],G);w++}else if(I.isSunLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let R=I.shadow,K=e.get(I);K.shadowIntensity=R.intensity,K.shadowBias=R.bias,K.shadowNormalBias=R.normalBias,K.shadowRadius=R.radius,K.shadowMapSize.copy(R.mapSize).multiply(R.getFrameExtents()),n.sunShadow[p]=K,n.sunShadowMap[p]=j;let Tt=R.getViewportCount();for(let Ut=0;Ut<Tt;Ut++)n.sunShadowMatrix[_+Ut]=R.getMatrix(Ut),n.sunShadowCascade[_+Ut]=R._cascadeData[Ut];_+=Tt,p++}n.sun[f]=X,f++}else if(I.isDirectionalLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let R=I.shadow,K=e.get(I);K.shadowIntensity=R.intensity,K.shadowBias=R.bias,K.shadowNormalBias=R.normalBias,K.shadowRadius=R.radius,K.shadowMapSize=R.mapSize,n.directionalShadow[m]=K,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=I.shadow.matrix,E++}n.directional[m]=X,m++}else if(I.isSpotLight){let X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(z).multiplyScalar(G),X.distance=F,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[y]=X;let R=I.shadow;if(I.map&&(n.spotLightMap[S]=I.map,S++,R.updateMatrices(I),I.castShadow&&P++),n.spotLightMatrix[y]=R.matrix,I.castShadow){let K=e.get(I);K.shadowIntensity=R.intensity,K.shadowBias=R.bias,K.shadowNormalBias=R.normalBias,K.shadowRadius=R.radius,K.shadowMapSize=R.mapSize,n.spotShadow[y]=K,n.spotShadowMap[y]=j,x++}y++}else if(I.isRectAreaLight){let X=t.get(I);X.color.copy(z).multiplyScalar(G),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[M]=X,M++}else if(I.isPointLight){let X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){let R=I.shadow,K=e.get(I);K.shadowIntensity=R.intensity,K.shadowBias=R.bias,K.shadowNormalBias=R.normalBias,K.shadowRadius=R.radius,K.shadowMapSize=R.mapSize,K.shadowCameraNear=R.camera.near,K.shadowCameraFar=R.camera.far,n.pointShadow[g]=K,n.pointShadowMap[g]=j,n.pointShadowMatrix[g]=I.shadow.matrix,A++}n.point[g]=X,g++}else if(I.isHemisphereLight){let X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(G),X.groundColor.copy(I.groundColor).multiplyScalar(G),n.hemi[v]=X,v++}}M>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ct.LTC_FLOAT_1,n.rectAreaLTC2=Ct.LTC_FLOAT_2):(n.rectAreaLTC1=Ct.LTC_HALF_1,n.rectAreaLTC2=Ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let L=n.hash;(L.sunLength!==f||L.directionalLength!==m||L.pointLength!==g||L.spotLength!==y||L.rectAreaLength!==M||L.hemiLength!==v||L.numSunShadows!==p||L.numDirectionalShadows!==E||L.numPointShadows!==A||L.numSpotShadows!==x||L.numSpotMaps!==S||L.numLightProbes!==w)&&(n.sun.length=f,n.directional.length=m,n.spot.length=y,n.rectArea.length=M,n.point.length=g,n.hemi.length=v,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=A,n.pointShadowMap.length=A,n.pointShadowMatrix.length=A,n.spotShadow.length=x,n.spotShadowMap.length=x,n.spotLightMatrix.length=x+S-P,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=w,L.sunLength=f,L.directionalLength=m,L.pointLength=g,L.spotLength=y,L.rectAreaLength=M,L.hemiLength=v,L.numSunShadows=p,L.numDirectionalShadows=E,L.numPointShadows=A,L.numSpotShadows=x,L.numSpotMaps=S,L.numLightProbes=w,n.version=Nw++)}function l(c,h){let d=0,u=0,f=0,p=0,_=0,m=0,g=h.matrixWorldInverse;for(let y=0,M=c.length;y<M;y++){let v=c[y];if(v.isSunLight){let E=n.sun[d];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(g),d++}else if(v.isDirectionalLight){let E=n.directional[u];E.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(g),u++}else if(v.isSpotLight){let E=n.spot[p];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(g),p++}else if(v.isRectAreaLight){let E=n.rectArea[_];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let E=n.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let E=n.hemi[m];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(g),m++}}}return{setup:a,setupView:l,state:n}}function f0(s){let t=new Uw(s),e=[],n=[],i=[];function r(d){h.camera=d,e.length=0,n.length=0,i.length=0}function o(d){d.isLightProbeGrid?i.push(d):e.push(d)}function a(d){n.push(d)}function l(){t.setup(e),i.sort((d,u)=>d.priority-u.priority||d.id-u.id)}function c(d){t.setupView(e,d)}let h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Fw(s){let t=new WeakMap;function e(i,r=0){let o=t.get(i),a;return o===void 0?(a=new f0(s),t.set(i,[a])):r>=o.length?(a=new f0(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}var Bw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,kw=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],Vw=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],d0=new Pe,Sl=new k,cp=new k;function Gw(s,t,e){let n=new Js,i=new Et,r=new Et,o=new Ue,a=new _h,l=new xh,c={},h=e.maxTextureSize,d={[er]:Xn,[Xn]:er,[Ei]:Ei},u=new Qi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:Bw,fragmentShader:zw}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new jn;p.setAttribute("position",new Ji(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new xn(p,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fl;let g=this.type;this.render=function(A,x,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===Ih&&(Yt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fl);let P=s.getRenderTarget(),w=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),N=s.state;N.setBlending(Dr),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let V=g!==this.type;V&&x.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(z=>z.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,z=A.length;I<z;I++){let G=A[I],F=G.shadow;if(F===void 0){Yt("WebGLShadowMap:",G,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);let j=F.getFrameExtents();i.multiply(j),r.copy(F.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/j.x),i.x=r.x*j.x,F.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/j.y),i.y=r.y*j.y,F.mapSize.y=r.y));let X=s.state.buffers.depth.getReversed();if(F.camera._reversedDepth=X,F.map===null||V===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Uo){if(G.isPointLight){Yt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new fi(i.x,i.y,{format:nr,type:Fi,minFilter:Wn,magFilter:Wn,generateMipmaps:!1}),F.map.texture.name=G.name+".shadowMap",F.map.depthTexture=new bs(i.x,i.y,Ui),F.map.depthTexture.name=G.name+".shadowMapDepth",F.map.depthTexture.format=ys,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=fn,F.map.depthTexture.magFilter=fn}else G.isPointLight?(F.map=new bl(i.x),F.map.depthTexture=new Wa(i.x,Oi)):(F.map=new fi(i.x,i.y),F.map.depthTexture=new bs(i.x,i.y,Oi)),F.map.depthTexture.name=G.name+".shadowMap",F.map.depthTexture.format=ys,this.type===fl?(F.map.depthTexture.compareFunction=X?Xd:Wd,F.map.depthTexture.minFilter=Wn,F.map.depthTexture.magFilter=Wn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=fn,F.map.depthTexture.magFilter=fn);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==i.x||F.map.height!==i.y)&&F.map.setSize(i.x,i.y);let R=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();G.isPointLight!==!0&&F.updateMatrices(G,S);let K=(F.camera.layers.mask&4294967294)!==0?F.camera.layers:S.layers;for(let Tt=0;Tt<R;Tt++){let Ut=F.getCamera(Tt);if(G.isPointLight){let Z=F.camera,ut=F.matrix,Mt=G.distance||Z.far;Mt!==Z.far&&(Z.far=Mt,Z.updateProjectionMatrix()),Sl.setFromMatrixPosition(G.matrixWorld),Z.position.copy(Sl),cp.copy(Z.position),cp.add(kw[Tt]),Z.up.copy(Vw[Tt]),Z.lookAt(cp),Z.updateMatrixWorld(),ut.makeTranslation(-Sl.x,-Sl.y,-Sl.z),d0.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),F._frustum.setFromProjectionMatrix(d0,Z.coordinateSystem,Z.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)s.setRenderTarget(F.map,Tt),s.clear();else{Tt===0&&(s.setRenderTarget(F.map),s.clear());let Z=F.getViewport(Tt);o.set(r.x*Z.x,r.y*Z.y,r.x*Z.z,r.y*Z.w),N.viewport(o)}n=F.getFrustum(Tt),v(x,S,Ut,G,K,this.type)}F.isPointLightShadow!==!0&&this.type===Uo&&y(F,S),F.needsUpdate=!1}g=this.type,m.needsUpdate=!1,s.setRenderTarget(P,w,L)};function y(A,x){let S=t.update(_);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null?A.mapPass=new fi(i.x,i.y,{format:nr,type:Fi}):(A.mapPass.width!==A.map.width||A.mapPass.height!==A.map.height)&&A.mapPass.setSize(A.map.width,A.map.height),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value.set(A.map.width,A.map.height),u.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(x,null,S,u,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value.set(A.map.width,A.map.height),f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(x,null,S,f,_,null)}function M(A,x,S,P){let w=null,L=S.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(L!==void 0)w=L;else if(w=S.isPointLight===!0?l:a,s.localClippingEnabled&&x.clipShadows===!0&&Array.isArray(x.clippingPlanes)&&x.clippingPlanes.length!==0||x.displacementMap&&x.displacementScale!==0||x.alphaMap&&x.alphaTest>0||x.map&&x.alphaTest>0||x.alphaToCoverage===!0){let N=w.uuid,V=x.uuid,I=c[N];I===void 0&&(I={},c[N]=I);let z=I[V];z===void 0&&(z=w.clone(),I[V]=z,x.addEventListener("dispose",E)),w=z}if(w.visible=x.visible,w.wireframe=x.wireframe,P===Uo?w.side=x.shadowSide!==null?x.shadowSide:x.side:w.side=x.shadowSide!==null?x.shadowSide:d[x.side],w.alphaMap=x.alphaMap,w.alphaTest=x.alphaToCoverage===!0?.5:x.alphaTest,w.map=x.map,w.clipShadows=x.clipShadows,w.clippingPlanes=x.clippingPlanes,w.clipIntersection=x.clipIntersection,w.displacementMap=x.displacementMap,w.displacementScale=x.displacementScale,w.displacementBias=x.displacementBias,w.wireframeLinewidth=x.wireframeLinewidth,w.linewidth=x.linewidth,S.isPointLight===!0&&w.isMeshDistanceMaterial===!0){let N=s.properties.get(w);N.light=S}return w}function v(A,x,S,P,w,L){if(A.visible===!1)return;if(A.layers.test(w)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&L===Uo)&&(!A.frustumCulled||A.intersectsFrustum(n))){A.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,A.matrixWorld);let I=t.update(A),z=A.material;if(Array.isArray(z)){let G=I.groups;for(let F=0,j=G.length;F<j;F++){let X=G[F],R=z[X.materialIndex];if(R&&R.visible){let K=M(A,R,P,L);A.onBeforeShadow(s,A,x,S,I,K,X),s.renderBufferDirect(S,null,I,K,A,X),A.onAfterShadow(s,A,x,S,I,K,X)}}}else if(z.visible){let G=M(A,z,P,L);A.onBeforeShadow(s,A,x,S,I,G,null),s.renderBufferDirect(S,null,I,G,A,null),A.onAfterShadow(s,A,x,S,I,G,null)}}let V=A.children;for(let I=0,z=V.length;I<z;I++)v(V[I],x,S,P,w,L)}function E(A){A.target.removeEventListener("dispose",E);for(let S in c){let P=c[S],w=A.target.uuid;w in P&&(P[w].dispose(),delete P[w])}}}function Hw(s,t){function e(){let D=!1,tt=new Ue,$=null,_t=new Ue(0,0,0,0);return{setMask:function(ht){$!==ht&&!D&&(s.colorMask(ht,ht,ht,ht),$=ht)},setLocked:function(ht){D=ht},setClear:function(ht,xt,at,vt,rt){rt===!0&&(ht*=vt,xt*=vt,at*=vt),tt.set(ht,xt,at,vt),_t.equals(tt)===!1&&(s.clearColor(ht,xt,at,vt),_t.copy(tt))},reset:function(){D=!1,$=null,_t.set(-1,0,0,0)}}}function n(){let D=!1,tt=!1,$=null,_t=null,ht=null;return{setReversed:function(xt){if(tt!==xt){let at=t.get("EXT_clip_control");xt?at.clipControlEXT(at.LOWER_LEFT_EXT,at.ZERO_TO_ONE_EXT):at.clipControlEXT(at.LOWER_LEFT_EXT,at.NEGATIVE_ONE_TO_ONE_EXT),tt=xt;let vt=ht;ht=null,this.setClear(vt)}},getReversed:function(){return tt},setTest:function(xt){xt?gt(s.DEPTH_TEST):Lt(s.DEPTH_TEST)},setMask:function(xt){$!==xt&&!D&&(s.depthMask(xt),$=xt)},setFunc:function(xt){if(tt&&(xt=U_[xt]),_t!==xt){switch(xt){case qc:s.depthFunc(s.NEVER);break;case Yc:s.depthFunc(s.ALWAYS);break;case Zc:s.depthFunc(s.LESS);break;case bo:s.depthFunc(s.LEQUAL);break;case Jc:s.depthFunc(s.EQUAL);break;case $c:s.depthFunc(s.GEQUAL);break;case Kc:s.depthFunc(s.GREATER);break;case Qc:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}_t=xt}},setLocked:function(xt){D=xt},setClear:function(xt){ht!==xt&&(ht=xt,tt&&(xt=1-xt),s.clearDepth(xt))},reset:function(){D=!1,$=null,_t=null,ht=null,tt=!1}}}function i(){let D=!1,tt=null,$=null,_t=null,ht=null,xt=null,at=null,vt=null,rt=null;return{setTest:function(nt){D||(nt?gt(s.STENCIL_TEST):Lt(s.STENCIL_TEST))},setMask:function(nt){tt!==nt&&!D&&(s.stencilMask(nt),tt=nt)},setFunc:function(nt,St,it){($!==nt||_t!==St||ht!==it)&&(s.stencilFunc(nt,St,it),$=nt,_t=St,ht=it)},setOp:function(nt,St,it){(xt!==nt||at!==St||vt!==it)&&(s.stencilOp(nt,St,it),xt=nt,at=St,vt=it)},setLocked:function(nt){D=nt},setClear:function(nt){rt!==nt&&(s.clearStencil(nt),rt=nt)},reset:function(){D=!1,tt=null,$=null,_t=null,ht=null,xt=null,at=null,vt=null,rt=null}}}let r=new e,o=new n,a=new i,l={},c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],_=null,m=!1,g=null,y=null,M=null,v=null,E=null,A=null,x=null,S=new ee(0,0,0),P=0,w=!1,L=null,N=null,V=null,I=null,z=null,G=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,j=0,X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(X)[1]),F=j>=1):X.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),F=j>=2);let R=null,K={},Tt=s.getParameter(s.SCISSOR_BOX),Ut=s.getParameter(s.VIEWPORT),Z=new Ue().fromArray(Tt),ut=new Ue().fromArray(Ut);function Mt(D,tt,$,_t){let ht=new Uint8Array(4),xt=s.createTexture();s.bindTexture(D,xt),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let at=0;at<$;at++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(tt,0,s.RGBA,1,1,_t,0,s.RGBA,s.UNSIGNED_BYTE,ht):s.texImage2D(tt+at,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ht);return xt}let At={};At[s.TEXTURE_2D]=Mt(s.TEXTURE_2D,s.TEXTURE_2D,1),At[s.TEXTURE_CUBE_MAP]=Mt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[s.TEXTURE_2D_ARRAY]=Mt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),At[s.TEXTURE_3D]=Mt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),gt(s.DEPTH_TEST),o.setFunc(bo),B(!1),dt(bd),gt(s.CULL_FACE),lt(Dr);function gt(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Lt(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function ge(D,tt){return u[D]!==tt?(s.bindFramebuffer(D,tt),u[D]=tt,D===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=tt),D===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=tt),!0):!1}function Dt(D,tt){let $=p,_t=!1;if(D){$=f.get(tt),$===void 0&&($=[],f.set(tt,$));let ht=D.textures;if($.length!==ht.length||$[0]!==s.COLOR_ATTACHMENT0){for(let xt=0,at=ht.length;xt<at;xt++)$[xt]=s.COLOR_ATTACHMENT0+xt;$.length=ht.length,_t=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,_t=!0);_t&&s.drawBuffers($)}function Wt(D){return _!==D?(s.useProgram(D),_=D,!0):!1}let It={[Nr]:s.FUNC_ADD,[s_]:s.FUNC_SUBTRACT,[r_]:s.FUNC_REVERSE_SUBTRACT};It[o_]=s.MIN,It[a_]=s.MAX;let Q={[l_]:s.ZERO,[c_]:s.ONE,[h_]:s.SRC_COLOR,[Ad]:s.SRC_ALPHA,[g_]:s.SRC_ALPHA_SATURATE,[p_]:s.DST_COLOR,[f_]:s.DST_ALPHA,[u_]:s.ONE_MINUS_SRC_COLOR,[Cd]:s.ONE_MINUS_SRC_ALPHA,[m_]:s.ONE_MINUS_DST_COLOR,[d_]:s.ONE_MINUS_DST_ALPHA,[__]:s.CONSTANT_COLOR,[x_]:s.ONE_MINUS_CONSTANT_COLOR,[v_]:s.CONSTANT_ALPHA,[y_]:s.ONE_MINUS_CONSTANT_ALPHA};function lt(D,tt,$,_t,ht,xt,at,vt,rt,nt){if(D===Dr){m===!0&&(Lt(s.BLEND),m=!1);return}if(m===!1&&(gt(s.BLEND),m=!0),D!==i_){if(D!==g||nt!==w){if((y!==Nr||E!==Nr)&&(s.blendEquation(s.FUNC_ADD),y=Nr,E=Nr),nt)switch(D){case Fo:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Td:s.blendFunc(s.ONE,s.ONE);break;case wd:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ed:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Jt("WebGLState: Invalid blending: ",D);break}else switch(D){case Fo:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Td:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case wd:Jt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ed:Jt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Jt("WebGLState: Invalid blending: ",D);break}M=null,v=null,A=null,x=null,S.set(0,0,0),P=0,g=D,w=nt}return}ht=ht||tt,xt=xt||$,at=at||_t,(tt!==y||ht!==E)&&(s.blendEquationSeparate(It[tt],It[ht]),y=tt,E=ht),($!==M||_t!==v||xt!==A||at!==x)&&(s.blendFuncSeparate(Q[$],Q[_t],Q[xt],Q[at]),M=$,v=_t,A=xt,x=at),(vt.equals(S)===!1||rt!==P)&&(s.blendColor(vt.r,vt.g,vt.b,rt),S.copy(vt),P=rt),g=D,w=!1}function ct(D,tt){D.side===Ei?Lt(s.CULL_FACE):gt(s.CULL_FACE);let $=D.side===Xn;tt&&($=!$),B($),D.blending===Fo&&D.transparent===!1?lt(Dr):lt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let _t=D.stencilWrite;a.setTest(_t),_t&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Nt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?gt(s.SAMPLE_ALPHA_TO_COVERAGE):Lt(s.SAMPLE_ALPHA_TO_COVERAGE)}function B(D){L!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),L=D)}function dt(D){D!==e_?(gt(s.CULL_FACE),D!==N&&(D===bd?s.cullFace(s.BACK):D===n_?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Lt(s.CULL_FACE),N=D}function Xt(D){D!==V&&(F&&s.lineWidth(D),V=D)}function Nt(D,tt,$){D?(gt(s.POLYGON_OFFSET_FILL),(I!==tt||z!==$)&&(I=tt,z=$,o.getReversed()&&(tt=-tt,$=-$),s.polygonOffset(tt,$))):Lt(s.POLYGON_OFFSET_FILL)}function Vt(D){D?gt(s.SCISSOR_TEST):Lt(s.SCISSOR_TEST)}function Kt(D){D===void 0&&(D=s.TEXTURE0+G-1),R!==D&&(s.activeTexture(D),R=D)}function ie(D,tt,$){$===void 0&&(R===null?$=s.TEXTURE0+G-1:$=R);let _t=K[$];_t===void 0&&(_t={type:void 0,texture:void 0},K[$]=_t),(_t.type!==D||_t.texture!==tt)&&(R!==$&&(s.activeTexture($),R=$),s.bindTexture(D,tt||At[D]),_t.type=D,_t.texture=tt)}function U(){let D=K[R];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function oe(){try{s.compressedTexImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function $t(){try{s.compressedTexImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function Zt(){try{s.texSubImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function pt(){try{s.texSubImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function pe(){try{s.compressedTexSubImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function Bt(){try{s.compressedTexSubImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function qt(){try{s.texStorage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function C(){try{s.texStorage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function b(){try{s.texImage2D(...arguments)}catch(D){Jt("WebGLState:",D)}}function W(){try{s.texImage3D(...arguments)}catch(D){Jt("WebGLState:",D)}}function ot(D){return d[D]!==void 0?d[D]:s.getParameter(D)}function st(D,tt){d[D]!==tt&&(s.pixelStorei(D,tt),d[D]=tt)}function mt(D){Z.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),Z.copy(D))}function yt(D){ut.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),ut.copy(D))}function q(D,tt){let $=c.get(tt);$===void 0&&($=new WeakMap,c.set(tt,$));let _t=$.get(D);_t===void 0&&(_t=s.getUniformBlockIndex(tt,D.name),s.uniformBlockBinding(tt,_t,_t),$.set(D,_t))}function et(D,tt,$){let ht=c.get(tt).get(D);l[ht]!==$&&(s.bindBufferBase(s.UNIFORM_BUFFER,ht,$),l[ht]=$)}function ft(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},R=null,K={},u={},l={},f=new WeakMap,p=[],_=null,m=!1,g=null,y=null,M=null,v=null,E=null,A=null,x=null,S=new ee(0,0,0),P=0,w=!1,L=null,N=null,V=null,I=null,z=null,Z.set(0,0,s.canvas.width,s.canvas.height),ut.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:gt,disable:Lt,bindFramebuffer:ge,drawBuffers:Dt,useProgram:Wt,setBlending:lt,setMaterial:ct,setFlipSided:B,setCullFace:dt,setLineWidth:Xt,setPolygonOffset:Nt,setScissorTest:Vt,activeTexture:Kt,bindTexture:ie,unbindTexture:U,compressedTexImage2D:oe,compressedTexImage3D:$t,texImage2D:b,texImage3D:W,pixelStorei:st,getParameter:ot,updateUBOMapping:q,uniformBlockBinding:et,texStorage2D:qt,texStorage3D:C,texSubImage2D:Zt,texSubImage3D:pt,compressedTexSubImage2D:pe,compressedTexSubImage3D:Bt,scissor:mt,viewport:yt,reset:ft}}function Ww(s,t,e,n,i,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,h=new WeakMap,d=new Set,u,f=new WeakMap,p=new Set,_=new FinalizationRegistry(C=>p.delete(C)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,b){return m?new OffscreenCanvas(C,b):Oa("canvas")}function y(C,b,W){let ot=1,st=qt(C);if((st.width>W||st.height>W)&&(ot=W/Math.max(st.width,st.height)),ot<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let mt=Math.floor(ot*st.width),yt=Math.floor(ot*st.height);u===void 0&&(u=g(mt,yt));let q=b?g(mt,yt):u;return q.width=mt,q.height=yt,q.getContext("2d").drawImage(C,0,0,mt,yt),Yt("WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+mt+"x"+yt+")."),q}else return"data"in C&&Yt("WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),C;return C}function M(C){return C.generateMipmaps}function v(C){s.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function A(C,b,W,ot,st,mt=!1){if(C!==null){if(s[C]!==void 0)return s[C];Yt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let yt;ot&&(yt=t.get("EXT_texture_norm16"),yt||Yt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=b;if(b===s.RED&&(W===s.FLOAT&&(q=s.R32F),W===s.HALF_FLOAT&&(q=s.R16F),W===s.UNSIGNED_BYTE&&(q=s.R8),W===s.UNSIGNED_SHORT&&yt&&(q=yt.R16_EXT),W===s.SHORT&&yt&&(q=yt.R16_SNORM_EXT)),b===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(q=s.R8UI),W===s.UNSIGNED_SHORT&&(q=s.R16UI),W===s.UNSIGNED_INT&&(q=s.R32UI),W===s.BYTE&&(q=s.R8I),W===s.SHORT&&(q=s.R16I),W===s.INT&&(q=s.R32I)),b===s.RG&&(W===s.FLOAT&&(q=s.RG32F),W===s.HALF_FLOAT&&(q=s.RG16F),W===s.UNSIGNED_BYTE&&(q=s.RG8),W===s.UNSIGNED_SHORT&&yt&&(q=yt.RG16_EXT),W===s.SHORT&&yt&&(q=yt.RG16_SNORM_EXT)),b===s.RG_INTEGER&&(W===s.UNSIGNED_BYTE&&(q=s.RG8UI),W===s.UNSIGNED_SHORT&&(q=s.RG16UI),W===s.UNSIGNED_INT&&(q=s.RG32UI),W===s.BYTE&&(q=s.RG8I),W===s.SHORT&&(q=s.RG16I),W===s.INT&&(q=s.RG32I)),b===s.RGB_INTEGER&&(W===s.UNSIGNED_BYTE&&(q=s.RGB8UI),W===s.UNSIGNED_SHORT&&(q=s.RGB16UI),W===s.UNSIGNED_INT&&(q=s.RGB32UI),W===s.BYTE&&(q=s.RGB8I),W===s.SHORT&&(q=s.RGB16I),W===s.INT&&(q=s.RGB32I)),b===s.RGBA_INTEGER&&(W===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),W===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),W===s.UNSIGNED_INT&&(q=s.RGBA32UI),W===s.BYTE&&(q=s.RGBA8I),W===s.SHORT&&(q=s.RGBA16I),W===s.INT&&(q=s.RGBA32I)),b===s.RGB&&(W===s.UNSIGNED_SHORT&&yt&&(q=yt.RGB16_EXT),W===s.SHORT&&yt&&(q=yt.RGB16_SNORM_EXT),W===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),W===s.UNSIGNED_INT_10F_11F_11F_REV&&(q=s.R11F_G11F_B10F)),b===s.RGBA){let et=mt?Na:de.getTransfer(st);W===s.FLOAT&&(q=s.RGBA32F),W===s.HALF_FLOAT&&(q=s.RGBA16F),W===s.UNSIGNED_BYTE&&(q=et===Se?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT&&yt&&(q=yt.RGBA16_EXT),W===s.SHORT&&yt&&(q=yt.RGBA16_SNORM_EXT),W===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function x(C,b){let W;return C?b===null||b===Oi||b===Ur?W=s.DEPTH24_STENCIL8:b===Ui?W=s.DEPTH32F_STENCIL8:b===zo&&(W=s.DEPTH24_STENCIL8,Yt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===Oi||b===Ur?W=s.DEPTH_COMPONENT24:b===Ui?W=s.DEPTH_COMPONENT32F:b===zo&&(W=s.DEPTH_COMPONENT16),W}function S(C,b){return M(C)===!0||C.isFramebufferTexture&&C.minFilter!==fn&&C.minFilter!==Wn?Math.log2(Math.max(b.width,b.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?b.mipmaps.length:1}function P(C){let b=new WeakRef(C);n.get(C).__ref=b,p.add(b),_.register(C,b,b)}function w(C){let b=n.get(C).__ref;b!==void 0&&(p.delete(b),_.unregister(b))}function L(C){V(C.target)}function N(C){I(C.target)}function V(C){C.removeEventListener("dispose",L),w(C),G(C),C.isVideoTexture&&h.delete(C),C.isHTMLTexture&&d.delete(C)}function I(C){C.removeEventListener("dispose",N),w(C),j(C)}function z(){for(let C of p){let b=C.deref();b!==void 0&&(b.isRenderTarget===!0?I(b):V(b))}p.clear(),d.clear()}function G(C){let b=n.get(C);if(b.__webglInit===void 0)return;let W=C.source,ot=f.get(W);if(ot){let st=ot[b.__cacheKey];st.usedTimes--,st.usedTimes===0&&F(C),Object.keys(ot).length===0&&f.delete(W)}n.remove(C)}function F(C){let b=n.get(C);s.deleteTexture(b.__webglTexture);let W=C.source,ot=f.get(W);delete ot[b.__cacheKey],o.memory.textures--}function j(C){let b=n.get(C);b.__depthDisposeCallback&&b.__depthDisposeCallback();let W=C.depthTexture;if(W&&W.renderTarget===C&&V(W),C.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(b.__webglFramebuffer[st]))for(let mt=0;mt<b.__webglFramebuffer[st].length;mt++)s.deleteFramebuffer(b.__webglFramebuffer[st][mt]);else s.deleteFramebuffer(b.__webglFramebuffer[st]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[st])}else{if(Array.isArray(b.__webglFramebuffer))for(let st=0;st<b.__webglFramebuffer.length;st++)s.deleteFramebuffer(b.__webglFramebuffer[st]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let st=0;st<b.__webglColorRenderbuffer.length;st++)b.__webglColorRenderbuffer[st]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[st]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let ot=C.textures;for(let st=0,mt=ot.length;st<mt;st++){let yt=n.get(ot[st]);yt.__webglTexture&&(s.deleteTexture(yt.__webglTexture),o.memory.textures--),n.remove(ot[st])}n.remove(C)}let X=0;function R(){X=0}function K(){return X}function Tt(C){X=C}function Ut(){let C=X;return C>=i.maxTextures&&Yt("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),X+=1,C}function Z(C){let b=[];return b.push(C.wrapS),b.push(C.wrapT),b.push(C.wrapR||0),b.push(C.magFilter),b.push(C.minFilter),b.push(C.anisotropy),b.push(C.internalFormat),b.push(C.format),b.push(C.type),b.push(C.generateMipmaps),b.push(C.mipmapsAutoUpdate),b.push(C.premultiplyAlpha),b.push(C.flipY),b.push(C.unpackAlignment),b.push(C.colorSpace),b.join()}function ut(C,b){let W=n.get(C);if(C.isVideoTexture&&pe(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&W.__version!==C.version){let ot=C.image;if(ot===null)Yt("WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)Yt("WebGLRenderer: Texture marked for update but image is incomplete");else{ct(W,C,b);return}}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+b)}function Mt(C,b){let W=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){ct(W,C,b);return}else C.isExternalTexture&&(W.__webglTexture=C.sourceTexture?C.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+b)}function At(C,b){let W=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&W.__version!==C.version){ct(W,C,b);return}e.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+b)}function gt(C,b){let W=n.get(C);if(C.version>0&&W.__version!==C.version){B(W,C,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+b)}let Lt={[jc]:s.REPEAT,[Yi]:s.CLAMP_TO_EDGE,[th]:s.MIRRORED_REPEAT},ge={[fn]:s.NEAREST,[b_]:s.NEAREST_MIPMAP_NEAREST,[pl]:s.NEAREST_MIPMAP_LINEAR,[Wn]:s.LINEAR,[Nh]:s.LINEAR_MIPMAP_NEAREST,[Ts]:s.LINEAR_MIPMAP_LINEAR},Dt={[A_]:s.NEVER,[qd]:s.ALWAYS,[C_]:s.LESS,[Wd]:s.LEQUAL,[R_]:s.EQUAL,[Xd]:s.GEQUAL,[P_]:s.GREATER,[I_]:s.NOTEQUAL};function Wt(C,b){if(b.type===Ui&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===Wn||b.magFilter===Nh||b.magFilter===pl||b.magFilter===Ts||b.minFilter===Wn||b.minFilter===Nh||b.minFilter===pl||b.minFilter===Ts)&&Yt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Lt[b.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Lt[b.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Lt[b.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,ge[b.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,ge[b.minFilter]),b.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,Dt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===fn||b.minFilter!==pl&&b.minFilter!==Ts||b.type===Ui&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let W=t.get("EXT_texture_filter_anisotropic");s.texParameterf(C,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function It(C,b){let W=!1;C.__webglInit===void 0&&(C.__webglInit=!0,b.addEventListener("dispose",L),P(b));let ot=b.source,st=f.get(ot);st===void 0&&(st={},f.set(ot,st));let mt=Z(b);if(mt!==C.__cacheKey){st[mt]===void 0&&(st[mt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,W=!0),st[mt].usedTimes++;let yt=st[C.__cacheKey];yt!==void 0&&(st[C.__cacheKey].usedTimes--,yt.usedTimes===0&&F(b)),C.__cacheKey=mt,C.__webglTexture=st[mt].texture}return W}function Q(C,b,W){return Math.floor(Math.floor(C/W)/b)}function lt(C,b,W,ot){let mt=C.updateRanges;if(mt.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,W,ot,b.data);else{mt.sort((D,tt)=>D.start-tt.start);let yt=0;for(let D=1;D<mt.length;D++){let tt=mt[yt],$=mt[D],_t=tt.start+tt.count,ht=Q($.start,b.width,4),xt=Q(tt.start,b.width,4);$.start<=_t+1&&ht===xt&&Q($.start+$.count-1,b.width,4)===ht?tt.count=Math.max(tt.count,$.start+$.count-tt.start):(++yt,mt[yt]=$)}mt.length=yt+1;let q=e.getParameter(s.UNPACK_ROW_LENGTH),et=e.getParameter(s.UNPACK_SKIP_PIXELS),ft=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let D=0,tt=mt.length;D<tt;D++){let $=mt[D],_t=Math.floor($.start/4),ht=Math.ceil($.count/4),xt=_t%b.width,at=Math.floor(_t/b.width),vt=ht,rt=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,xt),e.pixelStorei(s.UNPACK_SKIP_ROWS,at),e.texSubImage2D(s.TEXTURE_2D,0,xt,at,vt,rt,W,ot,b.data)}C.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,q),e.pixelStorei(s.UNPACK_SKIP_PIXELS,et),e.pixelStorei(s.UNPACK_SKIP_ROWS,ft)}}function ct(C,b,W){let ot=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ot=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ot=s.TEXTURE_3D);let st=It(C,b),mt=b.source;e.bindTexture(ot,C.__webglTexture,s.TEXTURE0+W);let yt=n.get(mt);if(mt.version!==yt.__version||st===!0){if(e.activeTexture(s.TEXTURE0+W),(typeof ImageBitmap<"u"&&b.image instanceof ImageBitmap)===!1){let rt=de.getPrimaries(de.workingColorSpace),nt=b.colorSpace===Es?null:de.getPrimaries(b.colorSpace),St=b.colorSpace===Es||rt===nt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St)}e.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment);let et=y(b.image,!1,i.maxTextureSize);et=Bt(b,et);let ft=r.convert(b.format,b.colorSpace),D=r.convert(b.type),tt=A(b.internalFormat,ft,D,b.normalized,b.colorSpace,b.isVideoTexture);Wt(ot,b);let $,_t=b.mipmaps,ht=b.isVideoTexture!==!0,xt=yt.__version===void 0||st===!0,at=mt.dataReady,vt=S(b,et);if(b.isDepthTexture)tt=x(b.format===ws,b.type),xt&&(ht?e.texStorage2D(s.TEXTURE_2D,1,tt,et.width,et.height):e.texImage2D(s.TEXTURE_2D,0,tt,et.width,et.height,0,ft,D,null));else if(b.isDataTexture)if(_t.length>0){ht&&xt&&e.texStorage2D(s.TEXTURE_2D,vt,tt,_t[0].width,_t[0].height);for(let rt=0,nt=_t.length;rt<nt;rt++)$=_t[rt],ht?at&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,$.width,$.height,ft,D,$.data):e.texImage2D(s.TEXTURE_2D,rt,tt,$.width,$.height,0,ft,D,$.data);b.generateMipmaps=!1}else ht?(xt&&e.texStorage2D(s.TEXTURE_2D,vt,tt,et.width,et.height),at&&lt(b,et,ft,D)):e.texImage2D(s.TEXTURE_2D,0,tt,et.width,et.height,0,ft,D,et.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){ht&&xt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,vt,tt,_t[0].width,_t[0].height,et.depth);for(let rt=0,nt=_t.length;rt<nt;rt++)if($=_t[rt],b.format!==Bi)if(ft!==null)if(ht){if(at)if(b.layerUpdates.size>0){let St=np($.width,$.height,b.format,b.type);for(let it of b.layerUpdates){let Rt=$.data.subarray(it*St/$.data.BYTES_PER_ELEMENT,(it+1)*St/$.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,it,$.width,$.height,1,ft,Rt)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,0,$.width,$.height,et.depth,ft,$.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,rt,tt,$.width,$.height,et.depth,0,$.data,0,0);else Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ht?at&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,rt,0,0,0,$.width,$.height,et.depth,ft,D,$.data):e.texImage3D(s.TEXTURE_2D_ARRAY,rt,tt,$.width,$.height,et.depth,0,ft,D,$.data);b.layerUpdates.size>0&&b.clearLayerUpdates()}else{ht&&xt&&e.texStorage2D(s.TEXTURE_2D,vt,tt,_t[0].width,_t[0].height);for(let rt=0,nt=_t.length;rt<nt;rt++)$=_t[rt],b.format!==Bi?ft!==null?ht?at&&e.compressedTexSubImage2D(s.TEXTURE_2D,rt,0,0,$.width,$.height,ft,$.data):e.compressedTexImage2D(s.TEXTURE_2D,rt,tt,$.width,$.height,0,$.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ht?at&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,$.width,$.height,ft,D,$.data):e.texImage2D(s.TEXTURE_2D,rt,tt,$.width,$.height,0,ft,D,$.data)}else if(b.isDataArrayTexture)if(ht){if(xt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,vt,tt,et.width,et.height,et.depth),at)if(b.layerUpdates.size>0){let rt=np(et.width,et.height,b.format,b.type);for(let nt of b.layerUpdates){let St=et.data.subarray(nt*rt/et.data.BYTES_PER_ELEMENT,(nt+1)*rt/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,nt,et.width,et.height,1,ft,D,St)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ft,D,et.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,tt,et.width,et.height,et.depth,0,ft,D,et.data);else if(b.isData3DTexture)ht?(xt&&e.texStorage3D(s.TEXTURE_3D,vt,tt,et.width,et.height,et.depth),at&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ft,D,et.data)):e.texImage3D(s.TEXTURE_3D,0,tt,et.width,et.height,et.depth,0,ft,D,et.data);else if(b.isFramebufferTexture){if(xt)if(ht)e.texStorage2D(s.TEXTURE_2D,vt,tt,et.width,et.height);else{let rt=et.width,nt=et.height;for(let St=0;St<vt;St++)e.texImage2D(s.TEXTURE_2D,St,tt,rt,nt,0,ft,D,null),rt>>=1,nt>>=1}}else if(b.isHTMLTexture){if("texElementImage2D"in s){let rt=s.canvas;if(rt.hasAttribute("layoutsubtree")||rt.setAttribute("layoutsubtree","true"),et.parentNode!==rt){rt.appendChild(et),d.add(b),rt.onpaint=nt=>{let St=nt.changedElements;for(let it of d)St.includes(it.image)&&(it.needsUpdate=!0)},rt.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,et);else{let St=s.RGBA,it=s.RGBA,Rt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,St,it,Rt,et)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(_t.length>0){if(ht&&xt){let rt=qt(_t[0]);e.texStorage2D(s.TEXTURE_2D,vt,tt,rt.width,rt.height)}for(let rt=0,nt=_t.length;rt<nt;rt++)$=_t[rt],ht?at&&e.texSubImage2D(s.TEXTURE_2D,rt,0,0,ft,D,$):e.texImage2D(s.TEXTURE_2D,rt,tt,ft,D,$);b.generateMipmaps=!1}else if(ht){if(xt){let rt=qt(et);e.texStorage2D(s.TEXTURE_2D,vt,tt,rt.width,rt.height)}at&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ft,D,et)}else e.texImage2D(s.TEXTURE_2D,0,tt,ft,D,et);M(b)&&b.mipmapsAutoUpdate===!0&&v(ot),yt.__version=mt.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function B(C,b,W){if(b.image.length!==6)return;let ot=It(C,b),st=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+W);let mt=n.get(st);if(st.version!==mt.__version||ot===!0){e.activeTexture(s.TEXTURE0+W);let yt=de.getPrimaries(de.workingColorSpace),q=b.colorSpace===Es?null:de.getPrimaries(b.colorSpace),et=b.colorSpace===Es||yt===q?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,et);let ft=b.isCompressedTexture||b.image[0].isCompressedTexture,D=b.image[0]&&b.image[0].isDataTexture,tt=[];for(let it=0;it<6;it++)!ft&&!D?tt[it]=y(b.image[it],!0,i.maxCubemapSize):tt[it]=D?b.image[it].image:b.image[it],tt[it]=Bt(b,tt[it]);let $=tt[0],_t=r.convert(b.format,b.colorSpace),ht=r.convert(b.type),xt=A(b.internalFormat,_t,ht,b.normalized,b.colorSpace),at=b.isVideoTexture!==!0,vt=mt.__version===void 0||ot===!0,rt=st.dataReady,nt=S(b,$);Wt(s.TEXTURE_CUBE_MAP,b);let St;if(b.isDepthTexture){if(xt=x(b.format===ws,b.type),vt)if(at)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,xt,$.width,$.height);else for(let it=0;it<6;it++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,xt,$.width,$.height,0,_t,ht,null)}else if(ft){at&&vt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,nt,xt,$.width,$.height);for(let it=0;it<6;it++){St=tt[it].mipmaps;for(let Rt=0;Rt<St.length;Rt++){let he=St[Rt];b.format!==Bi?_t!==null?at?rt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt,0,0,he.width,he.height,_t,he.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt,xt,he.width,he.height,0,he.data):Yt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):at?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt,0,0,he.width,he.height,_t,ht,he.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt,xt,he.width,he.height,0,_t,ht,he.data)}}}else{if(St=b.mipmaps,at&&vt){St.length>0&&nt++;let it=qt(tt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,nt,xt,it.width,it.height)}for(let it=0;it<6;it++)if(D){at?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,tt[it].width,tt[it].height,_t,ht,tt[it].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,xt,tt[it].width,tt[it].height,0,_t,ht,tt[it].data);for(let Rt=0;Rt<St.length;Rt++){let jt=St[Rt].image[it].image;at?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt+1,0,0,jt.width,jt.height,_t,ht,jt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt+1,xt,jt.width,jt.height,0,_t,ht,jt.data)}}else{at?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,_t,ht,tt[it]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,xt,_t,ht,tt[it]);for(let Rt=0;Rt<St.length;Rt++){let he=St[Rt];at?rt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt+1,0,0,_t,ht,he.image[it]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+it,Rt+1,xt,_t,ht,he.image[it])}}}M(b)&&b.mipmapsAutoUpdate===!0&&v(s.TEXTURE_CUBE_MAP),mt.__version=st.version,b.onUpdate&&b.onUpdate(b)}C.__version=b.version}function dt(C,b,W,ot,st,mt){let yt=r.convert(W.format,W.colorSpace),q=r.convert(W.type),et=A(W.internalFormat,yt,q,W.normalized,W.colorSpace),ft=n.get(b),D=n.get(W);if(D.__renderTarget=b,!ft.__hasExternalTextures){let tt=Math.max(1,b.width>>mt),$=Math.max(1,b.height>>mt);st===s.TEXTURE_3D||st===s.TEXTURE_2D_ARRAY?e.texImage3D(st,mt,et,tt,$,b.depth,0,yt,q,null):e.texImage2D(st,mt,et,tt,$,0,yt,q,null)}e.bindFramebuffer(s.FRAMEBUFFER,C),pt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ot,st,D.__webglTexture,0,Zt(b)):(st===s.TEXTURE_2D||st>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ot,st,D.__webglTexture,mt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Xt(C,b,W){if(s.bindRenderbuffer(s.RENDERBUFFER,C),b.depthBuffer){let ot=b.depthTexture,st=ot&&ot.isDepthTexture?ot.type:null,mt=x(b.stencilBuffer,st),yt=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;pt(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Zt(b),mt,b.width,b.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,Zt(b),mt,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,mt,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,yt,s.RENDERBUFFER,C)}else{let ot=b.textures;for(let st=0;st<ot.length;st++){let mt=ot[st],yt=r.convert(mt.format,mt.colorSpace),q=r.convert(mt.type),et=A(mt.internalFormat,yt,q,mt.normalized,mt.colorSpace);pt(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Zt(b),et,b.width,b.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,Zt(b),et,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,et,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Nt(C,b,W){let ot=b.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,C),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let st=n.get(b.depthTexture);st.__renderTarget=b;let mt=ot?b.depthTexture.image[0]:b.depthTexture.image;(!st.__webglTexture||mt.width!==b.width||mt.height!==b.height)&&(mt.width=b.width,mt.height=b.height,b.depthTexture.needsUpdate=!0),ot?gt(b.depthTexture,0):ut(b.depthTexture,0);let yt=st.__webglTexture,q=Zt(b),et=ot?s.TEXTURE_CUBE_MAP_POSITIVE_X+W:s.TEXTURE_2D,ft=b.depthTexture.format===ws?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(b.depthTexture.format===ys)pt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ft,et,yt,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,ft,et,yt,0);else if(b.depthTexture.format===ws)pt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ft,et,yt,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,ft,et,yt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Vt(C){let b=n.get(C),W=C.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==C.depthTexture){let ot=C.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ot){let st=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ot.removeEventListener("dispose",st)};ot.addEventListener("dispose",st),b.__depthDisposeCallback=st}b.__boundDepthTexture=ot}if(C.depthTexture&&!b.__autoAllocateDepthBuffer)if(W)for(let ot=0;ot<6;ot++)Nt(b.__webglFramebuffer[ot],C,ot);else C.texture.mipmaps.length>0?Nt(b.__webglFramebuffer[0],C,0):Nt(b.__webglFramebuffer,C,0);else if(W){b.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[ot]),b.__webglDepthbuffer[ot]===void 0)b.__webglDepthbuffer[ot]=s.createRenderbuffer(),Xt(b.__webglDepthbuffer[ot],C,!1);else{let st=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=b.__webglDepthbuffer[ot];s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,mt)}}else if(C.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),Xt(b.__webglDepthbuffer,C,!1);else{let st=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,mt),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,mt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Kt(C,b,W){let ot=n.get(C);b!==void 0&&dt(ot.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&Vt(C)}function ie(C){let b=C.texture,W=n.get(C),ot=n.get(b);C.addEventListener("dispose",N),P(C);let st=C.textures,mt=C.isWebGLCubeRenderTarget===!0,yt=st.length>1;if(yt||(ot.__webglTexture===void 0&&(ot.__webglTexture=s.createTexture()),ot.__version=b.version,o.memory.textures++),mt){W.__webglFramebuffer=[];for(let q=0;q<6;q++)if(b.mipmaps.length>0){W.__webglFramebuffer[q]=[];for(let et=0;et<b.mipmaps.length;et++)W.__webglFramebuffer[q][et]=s.createFramebuffer()}else W.__webglFramebuffer[q]=s.createFramebuffer()}else{if(b.mipmaps.length>0){W.__webglFramebuffer=[];for(let q=0;q<b.mipmaps.length;q++)W.__webglFramebuffer[q]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(yt)for(let q=0,et=st.length;q<et;q++){let ft=n.get(st[q]);ft.__webglTexture===void 0&&(ft.__webglTexture=s.createTexture(),o.memory.textures++)}if(C.samples>0&&pt(C)===!1){W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let q=0;q<st.length;q++){let et=st[q];W.__webglColorRenderbuffer[q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[q]);let ft=r.convert(et.format,et.colorSpace),D=r.convert(et.type),tt=A(et.internalFormat,ft,D,et.normalized,et.colorSpace,C.isXRRenderTarget===!0),$=Zt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,$,tt,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+q,s.RENDERBUFFER,W.__webglColorRenderbuffer[q])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),Xt(W.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(mt){e.bindTexture(s.TEXTURE_CUBE_MAP,ot.__webglTexture),Wt(s.TEXTURE_CUBE_MAP,b);for(let q=0;q<6;q++)if(b.mipmaps.length>0)for(let et=0;et<b.mipmaps.length;et++)dt(W.__webglFramebuffer[q][et],C,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+q,et);else dt(W.__webglFramebuffer[q],C,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);M(b)?v(s.TEXTURE_CUBE_MAP):b.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}else if(yt){for(let q=0,et=st.length;q<et;q++){let ft=st[q],D=n.get(ft),tt=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(tt=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(tt,D.__webglTexture),Wt(tt,ft),dt(W.__webglFramebuffer,C,ft,s.COLOR_ATTACHMENT0+q,tt,0),M(ft)&&v(tt)}e.unbindTexture()}else{let q=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(q=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(q,ot.__webglTexture),Wt(q,b),b.mipmaps.length>0)for(let et=0;et<b.mipmaps.length;et++)dt(W.__webglFramebuffer[et],C,b,s.COLOR_ATTACHMENT0,q,et);else dt(W.__webglFramebuffer,C,b,s.COLOR_ATTACHMENT0,q,0);M(b)?v(q):b.mipmaps.length>0&&s.texParameteri(q,s.TEXTURE_MAX_LEVEL,b.mipmaps.length-1),e.unbindTexture()}C.depthBuffer&&Vt(C)}function U(C){let b=C.textures;for(let W=0,ot=b.length;W<ot;W++){let st=b[W];if(M(st)&&st.mipmapsAutoUpdate===!0){let mt=E(C),yt=n.get(st).__webglTexture;e.bindTexture(mt,yt),v(mt),e.unbindTexture()}}}let oe=[];function $t(C){if(C.samples>0){if(pt(C)===!1){let b=C.textures,W=C.width,ot=C.height,st=s.COLOR_BUFFER_BIT,mt=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=n.get(C),q=b.length>1;if(q)for(let ft=0;ft<b.length;ft++)e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let ft=0;ft<b.length;ft++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(st|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(st|=s.STENCIL_BUFFER_BIT)),q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,yt.__webglColorRenderbuffer[ft]);let D=n.get(b[ft]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,D,0)}s.blitFramebuffer(0,0,W,ot,0,0,W,ot,st,s.NEAREST),l===!0&&(oe.length=0,oe.push(s.COLOR_ATTACHMENT0+ft),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&oe.push(mt),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,oe))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),q)for(let ft=0;ft<b.length;ft++){e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.RENDERBUFFER,yt.__webglColorRenderbuffer[ft]);let D=n.get(b[ft]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ft,s.TEXTURE_2D,D,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let b=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function Zt(C){return Math.min(i.maxSamples,C.samples)}function pt(C){let b=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function pe(C){let b=o.render.frame;h.get(C)!==b&&(h.set(C,b),C.update())}function Bt(C,b){let W=C.colorSpace,ot=C.format,st=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||W!==Da&&W!==Es&&(de.getTransfer(W)===Se?(ot!==Bi||st!==ti)&&Yt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Jt("WebGLTextures: Unsupported texture color space:",W)),b}function qt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Ut,this.resetTextureUnits=R,this.getTextureUnits=K,this.setTextureUnits=Tt,this.setTexture2D=ut,this.setTexture2DArray=Mt,this.setTexture3D=At,this.setTextureCube=gt,this.rebindTextures=Kt,this.setupRenderTarget=ie,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=$t,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=dt,this.useMultisampledRTT=pt,this.dispose=z}function Xw(s,t){function e(n,i=Es){let r,o=de.getTransfer(i);if(n===ti)return s.UNSIGNED_BYTE;if(n===Uh)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Fh)return s.UNSIGNED_SHORT_5_5_5_1;if(n===zd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===kd)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fd)return s.BYTE;if(n===Bd)return s.SHORT;if(n===zo)return s.UNSIGNED_SHORT;if(n===Oh)return s.INT;if(n===Oi)return s.UNSIGNED_INT;if(n===Ui)return s.FLOAT;if(n===Fi)return s.HALF_FLOAT;if(n===Vd)return s.ALPHA;if(n===Gd)return s.RGB;if(n===Bi)return s.RGBA;if(n===ys)return s.DEPTH_COMPONENT;if(n===ws)return s.DEPTH_STENCIL;if(n===Hd)return s.RED;if(n===Bh)return s.RED_INTEGER;if(n===nr)return s.RG;if(n===zh)return s.RG_INTEGER;if(n===kh)return s.RGBA_INTEGER;if(n===ml||n===gl||n===_l||n===xl)if(o===Se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ml)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===gl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===_l)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===xl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ml)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===gl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===_l)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===xl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vh||n===Gh||n===Hh||n===Wh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Gh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Xh||n===qh||n===Yh||n===Zh||n===Jh||n===vl||n===$h)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Xh||n===qh)return o===Se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Yh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Zh)return r.COMPRESSED_R11_EAC;if(n===Jh)return r.COMPRESSED_SIGNED_R11_EAC;if(n===vl)return r.COMPRESSED_RG11_EAC;if(n===$h)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Kh||n===Qh||n===jh||n===tu||n===eu||n===nu||n===iu||n===su||n===ru||n===ou||n===au||n===lu||n===cu||n===hu)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Kh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===tu)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===eu)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===nu)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===iu)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===su)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ru)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ou)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===au)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===lu)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===cu)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hu)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===uu||n===fu||n===du)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===uu)return o===Se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fu)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===du)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pu||n===mu||n===yl||n===gu)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===pu)return r.COMPRESSED_RED_RGTC1_EXT;if(n===mu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===yl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ur?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}var qw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,gp=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Xa(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Qi({vertexShader:qw,fragmentShader:Yw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new xn(new Ks(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_p=class extends $i{constructor(t,e){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,_=typeof XRWebGLBinding<"u",m=new gp,g={},y=e.getContextAttributes(),M=null,v=null,E=[],A=[],x=new Et,S=null,P=null,w=new Ln;w.viewport=new Ue;let L=new Ln;L.viewport=new Ue;let N=[w,L],V=new Rh,I=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let ut=E[Z];return ut===void 0&&(ut=new Co,E[Z]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(Z){let ut=E[Z];return ut===void 0&&(ut=new Co,E[Z]=ut),ut.getGripSpace()},this.getHand=function(Z){let ut=E[Z];return ut===void 0&&(ut=new Co,E[Z]=ut),ut.getHandSpace()};function G(Z){let ut=A.indexOf(Z.inputSource);if(ut===-1)return;let Mt=E[ut];Mt!==void 0&&(Mt.update(Z.inputSource,Z.frame,c||o),Mt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function F(){i.removeEventListener("select",G),i.removeEventListener("selectstart",G),i.removeEventListener("selectend",G),i.removeEventListener("squeeze",G),i.removeEventListener("squeezestart",G),i.removeEventListener("squeezeend",G),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",j);for(let Z=0;Z<E.length;Z++){let ut=A[Z];ut!==null&&(A[Z]=null,E[Z].disconnect(ut))}I=null,z=null,m.reset();for(let Z in g)delete g[Z];if(t.setRenderTarget(M),f=null,u=null,d=null,i=null,v=null,Ut.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(x.width,x.height,!1),P!==null){let Z=P.camera;Z.fov=P.fov,Z.zoom=P.zoom,Z.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){r=Z,n.isPresenting===!0&&Yt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){a=Z,n.isPresenting===!0&&Yt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Z){if(i=Z,i!==null){if(M=t.getRenderTarget(),i.addEventListener("select",G),i.addEventListener("selectstart",G),i.addEventListener("selectend",G),i.addEventListener("squeeze",G),i.addEventListener("squeezestart",G),i.addEventListener("squeezeend",G),i.addEventListener("end",F),i.addEventListener("inputsourceschange",j),y.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(x),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Mt=null,At=null,gt=null;y.depth&&(gt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=y.stencil?ws:ys,At=y.stencil?Ur:Oi);let Lt={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Lt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new fi(u.textureWidth,u.textureHeight,{format:Bi,type:ti,depthTexture:new bs(u.textureWidth,u.textureHeight,At,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Mt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,Mt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new fi(f.framebufferWidth,f.framebufferHeight,{format:Bi,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Ut.setContext(i),Ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(Z){for(let ut=0;ut<Z.removed.length;ut++){let Mt=Z.removed[ut],At=A.indexOf(Mt);At>=0&&(A[At]=null,E[At].disconnect(Mt))}for(let ut=0;ut<Z.added.length;ut++){let Mt=Z.added[ut],At=A.indexOf(Mt);if(At===-1){for(let Lt=0;Lt<E.length;Lt++)if(Lt>=A.length){A.push(Mt),At=Lt;break}else if(A[Lt]===null){A[Lt]=Mt,At=Lt;break}if(At===-1)break}let gt=E[At];gt&&gt.connect(Mt)}}function X(Z,ut){ut===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(ut.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(i===null)return;let ut=Z.near,Mt=Z.far;m.texture!==null&&(m.depthNear>0&&(ut=m.depthNear),m.depthFar>0&&(Mt=m.depthFar)),V.near=L.near=w.near=ut,V.far=L.far=w.far=Mt,(I!==V.near||z!==V.far)&&(i.updateRenderState({depthNear:V.near,depthFar:V.far}),I=V.near,z=V.far),V.layers.mask=Z.layers.mask|6,w.layers.mask=V.layers.mask&-5,L.layers.mask=V.layers.mask&-3;let At=Z.parent,gt=V.cameras;X(V,At);for(let Lt=0;Lt<gt.length;Lt++)X(gt[Lt],At);V.projectionMatrix.copy(w.projectionMatrix),V.projectionMatrixInverse.copy(w.projectionMatrixInverse),P===null&&Z.isPerspectiveCamera&&(P={camera:Z,fov:Z.fov,zoom:Z.zoom}),R(Z,V,At)};function R(Z,ut,Mt){Mt===null?Z.matrix.copy(ut.matrixWorld):(Z.matrix.copy(Mt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(ut.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(ut.projectionMatrix),Z.projectionMatrixInverse.copy(ut.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Eo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Z){l=Z,u!==null&&(u.fixedFoveation=Z),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Z)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(V)},this.getCameraTexture=function(Z){return g[Z]};let K=null;function Tt(Z,ut){if(h=ut.getViewerPose(c||o),p=ut,h!==null){let Mt=h.views;f!==null&&(t.setRenderTargetFramebuffer(v,f.framebuffer),t.setRenderTarget(v));let At=!1;Mt.length!==V.cameras.length&&(V.cameras.length=0,At=!0);for(let Dt=0;Dt<Mt.length;Dt++){let Wt=Mt[Dt],It=null;if(f!==null)It=f.getViewport(Wt);else{let lt=d.getViewSubImage(u,Wt);It=lt.viewport,Dt===0&&(t.setRenderTargetTextures(v,lt.colorTexture,lt.depthStencilTexture),t.setRenderTarget(v))}let Q=N[Dt];Q===void 0&&(Q=new Ln,Q.layers.enable(Dt),Q.viewport=new Ue,N[Dt]=Q),Q.matrix.fromArray(Wt.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Wt.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(It.x,It.y,It.width,It.height),Dt===0&&(V.matrix.copy(Q.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),At===!0&&V.cameras.push(Q)}let gt=i.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let Dt=d.getDepthInformation(Mt[0]);Dt&&Dt.isValid&&Dt.texture&&m.init(Dt,i.renderState)}if(gt&&gt.includes("camera-access")&&_){t.state.unbindTexture(),d=n.getBinding();for(let Dt=0;Dt<Mt.length;Dt++){let Wt=Mt[Dt].camera;if(Wt){let It=g[Wt];It||(It=new Xa,g[Wt]=It);let Q=d.getCameraImage(Wt);It.sourceTexture=Q}}}}for(let Mt=0;Mt<E.length;Mt++){let At=A[Mt],gt=E[Mt];At!==null&&gt!==void 0&&gt.update(At,ut,c||o)}K&&K(Z,ut),ut.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ut}),p=null}let Ut=new p0;Ut.setAnimationLoop(Tt),this.setAnimationLoop=function(Z){K=Z},this.dispose=function(){}}},Zw=new Pe,T0=new Qt;T0.set(-1,0,0,0,1,0,0,0,1);function Jw(s,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,jd(s)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function i(m,g,y,M,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),d(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),u(m,g),g.isMeshPhysicalMaterial&&f(m,g,v)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),_(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(o(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,y,M):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Xn&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Xn&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);let y=t.get(g),M=y.envMap,v=y.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(Zw.makeRotationFromEuler(v)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(T0),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function o(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,y,M){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*y,m.scale.value=M*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function d(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function u(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function f(m,g,y){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Xn&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function _(m,g){let y=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function $w(s,t,e,n){let i={},r={};function o(y,M){let v=M.program;n.uniformBlockBinding(y,v,i[y.id])}function a(y,M){let v=i[y.id];v===void 0&&(p(y),v=l(y),i[y.id]=v,y.addEventListener("dispose",m));let E=M.program;n.updateUBOMapping(y,E);let A=t.render.frame;r[y.id]!==A&&(c(y),r[y.id]=A)}function l(y){let M=s.createBuffer(),v=y.__size,E=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,v,E),s.bindBuffer(s.UNIFORM_BUFFER,null),M}function c(y){let M=i[y.id],v=y.uniforms,E=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let A=0,x=v.length;A<x;A++){let S=v[A];if(Array.isArray(S))for(let P=0,w=S.length;P<w;P++)h(S[P],A,P,E);else h(S,A,0,E)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(y,M,v,E){if(u(y,M,v,E)===!0){let A=y.__offset,x=y.value;if(Array.isArray(x)){let S=0;for(let P=0;P<x.length;P++){let w=x[P],L=_(w,!0);d(w,y.__data,S),S+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else d(x,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,A,y.__data)}}function d(y,M,v){typeof y=="number"||typeof y=="boolean"?M[v]=y:y.isMatrix3?(M[v]=y.elements[0],M[v+1]=y.elements[1],M[v+2]=y.elements[2],M[v+3]=0,M[v+4]=y.elements[3],M[v+5]=y.elements[4],M[v+6]=y.elements[5],M[v+7]=0,M[v+8]=y.elements[6],M[v+9]=y.elements[7],M[v+10]=y.elements[8],M[v+11]=0):ArrayBuffer.isView(y)?M.set(y.subarray(0,M.length-v),v):y.toArray(M,v)}function u(y,M,v,E){let A=y.value,x=M+"_"+v;if(Array.isArray(A)){E[x]===void 0&&(E[x]=[]);let S=E[x],P=!1;for(let w=0;w<A.length;w++)f(A[w],S,w)===!0&&(P=!0);return P}return f(A,E,x)}function f(y,M,v){if(M[v]===void 0)return typeof y=="number"||typeof y=="boolean"?M[v]=y:ArrayBuffer.isView(y)?M[v]=y.slice():M[v]=y.clone(),!0;{let E=M[v];if(typeof y=="number"||typeof y=="boolean"){if(E!==y)return M[v]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(E.equals(y)===!1)return E.copy(y),!0}}return!1}function p(y){let M=y.uniforms,v=0,E=16;for(let x=0,S=M.length;x<S;x++){let P=Array.isArray(M[x])?M[x]:[M[x]];for(let w=0,L=P.length;w<L;w++){let N=P[w],V=Array.isArray(N.value)?N.value:[N.value],I=Array.isArray(M[x])||Array.isArray(N.value),z=v;for(let F=0,j=V.length;F<j;F++){let X=V[F],R=_(X,I),K=v%E,Tt=K%R.boundary,Ut=K+Tt;v+=Tt,Ut!==0&&E-Ut<R.storage&&(v+=E-Ut),F===0&&(z=v),v+=R.storage}let G=N.type==="int"?Int32Array:N.type==="uint"?Uint32Array:Float32Array;N.__data=new G((v-z)/Float32Array.BYTES_PER_ELEMENT),N.__offset=z}}let A=v%E;return A>0&&(v+=E-A),y.__size=v,y.__cache={},this}function _(y,M){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=16,v.storage=48):y.isMatrix4?(v.boundary=16,v.storage=64):y.isTexture?Yt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(v.boundary=16,v.storage=y.byteLength):Yt("WebGLRenderer: Unsupported uniform value type.",y),M===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function m(y){let M=y.target;M.removeEventListener("dispose",m),s.deleteBuffer(i[M.id]),delete i[M.id],delete r[M.id]}function g(){for(let y in i)s.deleteBuffer(i[y]);i={},r={}}return{bind:o,update:a,dispose:g}}var Kw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ts=null;function Qw(){return ts===null&&(ts=new rh(Kw,16,16,nr,Fi),ts.name="DFG_LUT",ts.minFilter=Wn,ts.magFilter=Wn,ts.wrapS=Yi,ts.wrapT=Yi,ts.generateMipmaps=!1,ts.needsUpdate=!0),ts}var Mu=class{constructor(t={}){let{canvas:e=D_(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=ti}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,m=new Set([kh,zh,Bh]),g=new Set([ti,Oi,zo,Ur,Uh,Fh]),y=new Uint32Array(4),M=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},E=null,A=null,x=[],S=[],P=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let w=this,L=!1,N=null,V=null,I=null,z=null;this._outputColorSpace=In;let G=0,F=0,j=null,X=-1,R=null,K=new Ue,Tt=new Ue,Ut=null,Z=new ee(0),ut=0,Mt=e.width,At=e.height,gt=1,Lt=null,ge=null,Dt=new Ue(0,0,Mt,At),Wt=new Ue(0,0,Mt,At),It=!1,Q=new Js,lt=new oh,ct=!1,B=!1,dt=new Pe,Xt=new k,Nt=new Ue,Vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Kt=!1;function ie(){return j===null?gt:1}let U=n;function oe(T,O){return e.getContext(T,O)}let $t,Zt,pt,pe,Bt,qt,C,b,W,ot,st,mt,yt,q,et,ft,D,tt,$,_t,ht,xt,at;try{let T={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",nt,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",it,!1),U===null){let O="webgl2";if(U=oe(O,T),U===null)throw oe(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}vt()}catch(T){throw e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",it,!1),Jt("WebGLRenderer: "+T.message),T}function vt(){$t=new cT(U),$t.init(),ht=new Xw(U,$t),Zt=new Qb(U,$t,t,ht),pt=new Hw(U,$t),Zt.reversedDepthBuffer&&u&&pt.buffers.depth.setReversed(!0),V=U.createFramebuffer(),I=U.createFramebuffer(),z=U.createFramebuffer(),pe=new fT(U),Bt=new Rw,qt=new Ww(U,$t,pt,Bt,Zt,ht,pe),C=new lT(w),b=new pS(U),xt=new $b(U,b),W=new hT(U,b,pe,xt),ot=new pT(U,W,b,xt,pe),tt=new dT(U,Zt,qt),et=new jb(Bt),st=new Cw(w,C,$t,Zt,xt,et),mt=new Jw(w,Bt),yt=new Iw,q=new Fw($t),D=new Jb(w,C,pt,ot,p,l),ft=new Gw(w,ot,Zt),at=new $w(U,pe,Zt,pt),$=new Kb(U,$t,pe),_t=new uT(U,$t,pe),pe.programs=st.programs,w.capabilities=Zt,w.extensions=$t,w.properties=Bt,w.renderLists=yt,w.shadowMap=ft,w.state=pt,w.info=pe}_!==ti&&(P=new gT(_,e.width,e.height,a,i,r));let rt=new _p(w,U);this.xr=rt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let T=$t.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=$t.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return gt},this.setPixelRatio=function(T){T!==void 0&&(gt=T,this.setSize(Mt,At,!1))},this.getSize=function(T){return T.set(Mt,At)},this.setSize=function(T,O,J=!0){if(rt.isPresenting){Yt("WebGLRenderer: Can't change size while VR device is presenting.");return}Mt=T,At=O,e.width=Math.floor(T*gt),e.height=Math.floor(O*gt),J===!0&&(e.style.width=T+"px",e.style.height=O+"px"),P!==null&&P.setSize(e.width,e.height),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(Mt*gt,At*gt).floor()},this.setDrawingBufferSize=function(T,O,J){Mt=T,At=O,gt=J,e.width=Math.floor(T*J),e.height=Math.floor(O*J),this.setViewport(0,0,T,O)},this.setEffects=function(T){if(_===ti){Jt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let O=0;O<T.length;O++)if(T[O].isOutputPass===!0){Yt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(K)},this.getViewport=function(T){return T.copy(Dt)},this.setViewport=function(T,O,J,H){T.isVector4?Dt.set(T.x,T.y,T.z,T.w):Dt.set(T,O,J,H),pt.viewport(K.copy(Dt).multiplyScalar(ie()).round())},this.getScissor=function(T){return T.copy(Wt)},this.setScissor=function(T,O,J,H){T.isVector4?Wt.set(T.x,T.y,T.z,T.w):Wt.set(T,O,J,H),pt.scissor(Tt.copy(Wt).multiplyScalar(ie()).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(T){pt.setScissorTest(It=T)},this.setOpaqueSort=function(T){Lt=T},this.setTransparentSort=function(T){ge=T},this.getClearColor=function(T){return T.copy(D.getClearColor())},this.setClearColor=function(){D.setClearColor(...arguments)},this.getClearAlpha=function(){return D.getClearAlpha()},this.setClearAlpha=function(){D.setClearAlpha(...arguments)},this.clear=function(T=!0,O=!0,J=!0){let H=0;if(T){let Y=!1;if(j!==null){let wt=j.texture.format;Y=m.has(wt)}if(Y){let wt=j.texture.type,Ft=g.has(wt),bt=D.getClearColor(),Pt=D.getClearAlpha(),Gt=bt.r,te=bt.g,ue=bt.b;Ft?(y[0]=Gt,y[1]=te,y[2]=ue,y[3]=Pt,U.clearBufferuiv(U.COLOR,0,y)):(M[0]=Gt,M[1]=te,M[2]=ue,M[3]=Pt,U.clearBufferiv(U.COLOR,0,M))}else H|=U.COLOR_BUFFER_BIT}O&&(H|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(H|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&U.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),N=T},this.dispose=function(){e.removeEventListener("webglcontextlost",nt,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",it,!1),D.dispose(),yt.dispose(),q.dispose(),qt.dispose(),Bt.dispose(),C.dispose(),ot.dispose(),W.dispose(),xt.dispose(),at.dispose(),st.dispose(),rt.dispose(),rt.removeEventListener("sessionstart",Te),rt.removeEventListener("sessionend",ve),tn.stop()};function nt(T){T.preventDefault(),Zd("WebGLRenderer: Context Lost."),L=!0}function St(){Zd("WebGLRenderer: Context Restored."),L=!1;let T=pe.autoReset,O=ft.enabled,J=ft.autoUpdate,H=ft.needsUpdate,Y=ft.type;vt(),pe.autoReset=T,ft.enabled=O,ft.autoUpdate=J,ft.needsUpdate=H,ft.type=Y}function it(T){Jt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Rt(T){let O=T.target;O.removeEventListener("dispose",Rt),he(O)}function he(T){jt(T),Bt.remove(T)}function jt(T){let O=Bt.get(T).programs;O!==void 0&&(O.forEach(function(J){st.releaseProgram(J)}),T.isShaderMaterial&&st.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,J,H,Y,wt){O===null&&(O=Vt);let Ft=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,bt=gi(T,O,J,H,Y);pt.setMaterial(H,Ft);let Pt=J.index,Gt=1;if(H.wireframe===!0){if(Pt=W.getWireframeAttribute(J),Pt===void 0)return;Gt=2}let te=J.drawRange,ue=J.attributes.position,zt=te.start*Gt,fe=(te.start+te.count)*Gt;wt!==null&&(zt=Math.max(zt,wt.start*Gt),fe=Math.min(fe,(wt.start+wt.count)*Gt)),Pt!==null?(zt=Math.max(zt,0),fe=Math.min(fe,Pt.count)):ue!=null&&(zt=Math.max(zt,0),fe=Math.min(fe,ue.count));let $e=fe-zt;if($e<0||$e===1/0)return;xt.setup(Y,H,bt,J,Pt);let Ce,Ee=$;if(Pt!==null&&(Ce=b.get(Pt),Ee=_t,Ee.setIndex(Ce)),Y.isMesh)H.wireframe===!0?(pt.setLineWidth(H.wireframeLinewidth*ie()),Ee.setMode(U.LINES)):Ee.setMode(U.TRIANGLES);else if(Y.isLine){let yn=H.linewidth;yn===void 0&&(yn=1),pt.setLineWidth(yn*ie()),Y.isLineSegments?Ee.setMode(U.LINES):Y.isLineLoop?Ee.setMode(U.LINE_LOOP):Ee.setMode(U.LINE_STRIP)}else Y.isPoints?Ee.setMode(U.POINTS):Y.isSprite&&Ee.setMode(U.TRIANGLES);if(Y.isBatchedMesh)if($t.get("WEBGL_multi_draw"))Ee.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let yn=Y._multiDrawStarts,kt=Y._multiDrawCounts,On=Y._multiDrawCount,xe=Pt?b.get(Pt).bytesPerElement:1,sr=Bt.get(H).currentProgram.getUniforms();for(let Sn=0;Sn<On;Sn++)sr.setValue(U,"_gl_DrawID",Sn),Ee.render(yn[Sn]/xe,kt[Sn])}else if(Y.isInstancedMesh)Ee.renderInstances(zt,$e,Y.count);else if(J.isInstancedBufferGeometry){let yn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,kt=Math.min(J.instanceCount,yn);Ee.renderInstances(zt,$e,kt)}else Ee.render(zt,$e)};function De(T,O,J,H){N!==null&&T.isNodeMaterial&&N.setObject(H,T),ct===!0&&et.setState(T,J,!1),T.transparent===!0&&T.side===Ei&&T.forceSinglePass===!1?(T.side=Xn,T.needsUpdate=!0,ni(T,O,H),T.side=er,T.needsUpdate=!0,ni(T,O,H),T.side=Ei):ni(T,O,H)}this.compile=function(T,O,J=null){J===null&&(J=T),N!==null&&N.renderStart(T,O,J),A=q.get(J),A.init(O),S.push(A),J.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),T!==J&&T.traverseVisible(function(Y){Y.isLight&&Y.layers.test(O.layers)&&(A.pushLight(Y),Y.castShadow&&A.pushShadow(Y))}),A.setupLights(),N!==null&&N.updateLights(A.state.lightsArray),B=this.localClippingEnabled,ct=et.init(this.clippingPlanes,B),ct===!0&&et.setGlobalState(this.clippingPlanes,O),N!==null&&ft.render(A.state.shadowsArray,J,O);let H=new Set;return T.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let wt=Y.material;if(wt)if(Array.isArray(wt))for(let Ft=0;Ft<wt.length;Ft++){let bt=wt[Ft];De(bt,J,O,Y),H.add(bt)}else De(wt,J,O,Y),H.add(wt)}),A=S.pop(),N!==null&&N.renderEnd(),H},this.compileAsync=function(T,O,J=null){let H=this.compile(T,O,J);return new Promise(Y=>{function wt(){if(H.forEach(function(Ft){let Pt=Bt.get(Ft).currentProgram;(Pt===void 0||Pt.isReady())&&H.delete(Ft)}),H.size===0){Y(T);return}setTimeout(wt,10)}$t.get("KHR_parallel_shader_compile")!==null?wt():setTimeout(wt,10)})};let Ze=null;function Ne(T){Ze&&Ze(T)}function Te(){tn.stop()}function ve(){tn.start()}let tn=new p0;tn.setAnimationLoop(Ne),typeof self<"u"&&tn.setContext(self),this.setAnimationLoop=function(T){Ze=T,rt.setAnimationLoop(T),T===null?tn.stop():tn.start()},rt.addEventListener("sessionstart",Te),rt.addEventListener("sessionend",ve),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){Jt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;N!==null&&N.renderStart(T,O);let J=rt.enabled===!0&&rt.isPresenting===!0,H=P!==null&&(j===null||J)&&P.begin(w,j);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),rt.enabled===!0&&rt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(rt.cameraAutoUpdate===!0&&rt.updateCamera(O),O=rt.getCamera()),T.isScene===!0&&T.onBeforeRender(w,T,O,j),A=q.get(T,S.length),A.init(O),A.state.textureUnits=qt.getTextureUnits(),S.push(A),dt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),O.isArrayCamera?lt.setFromArrayCamera(O):Q.setFromProjectionMatrix(dt,Ti,O.reversedDepth),B=this.localClippingEnabled,ct=et.init(this.clippingPlanes,B),E=yt.get(T,x.length),E.init(),x.push(E),this.info.render.frame++,rt.enabled===!0&&rt.isPresenting===!0){let Ft=w.xr.getDepthSensingMesh();Ft!==null&&we(Ft,O,-1/0,w.sortObjects)}we(T,O,0,w.sortObjects),E.finish(),N!==null&&N.updateLights(A.state.lightsArray),w.sortObjects===!0&&E.sort(Lt,ge),Kt=rt.enabled===!1||rt.isPresenting===!1||rt.hasDepthSensing()===!1,Kt&&D.addToRenderList(E,T),this.info.autoReset===!0&&this.info.reset(),ct===!0&&et.beginShadows();let Y=A.state.shadowsArray;if(ft.render(Y,T,O),ct===!0&&et.endShadows(),(H&&P.hasRenderPass())===!1){let Ft=E.opaque,bt=E.transmissive;if(A.setupLights(),O.isArrayCamera){let Pt=O.cameras;if(bt.length>0)for(let Gt=0,te=Pt.length;Gt<te;Gt++){let ue=Pt[Gt];ei(Ft,bt,T,ue)}Kt&&D.render(T);for(let Gt=0,te=Pt.length;Gt<te;Gt++){let ue=Pt[Gt];vn(E,T,ue,ue.viewport)}}else bt.length>0&&ei(Ft,bt,T,O),Kt&&D.render(T),vn(E,T,O)}j!==null&&F===0&&(qt.updateMultisampleRenderTarget(j),qt.updateRenderTargetMipmap(j)),H&&P.end(w),T.isScene===!0&&T.onAfterRender(w,T,O),xt.resetDefaultState(),X=-1,R=null,S.pop(),S.length>0?(A=S[S.length-1],qt.setTextureUnits(A.state.textureUnits),ct===!0&&et.setGlobalState(w.clippingPlanes,A.state.camera)):A=null,x.pop(),x.length>0?E=x[x.length-1]:E=null,N!==null&&N.renderEnd()};function we(T,O,J,H){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)J=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)A.pushLight(T),T.castShadow&&A.pushShadow(T);else if(T.isSprite){let Ft=O.isArrayCamera?lt:Q;if(!T.frustumCulled||T.intersectsFrustum(Ft)){H&&Nt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(dt);let bt=ot.update(T),Pt=T.material;Pt.visible&&E.push(T,bt,Pt,J,Nt.z,null,O)}}else if(T.isMesh||T.isLine||T.isPoints){let Ft=O.isArrayCamera?lt:Q;if(!T.frustumCulled||T.intersectsFrustum(Ft)){let bt=ot.update(T),Pt=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Nt.copy(T.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Nt.copy(bt.boundingSphere.center)),Nt.applyMatrix4(T.matrixWorld).applyMatrix4(dt)),Array.isArray(Pt)){let Gt=bt.groups;for(let te=0,ue=Gt.length;te<ue;te++){let zt=Gt[te],fe=Pt[zt.materialIndex];fe&&fe.visible&&E.push(T,bt,fe,J,Nt.z,zt,O)}}else Pt.visible&&E.push(T,bt,Pt,J,Nt.z,null,O)}}}let wt=T.children;for(let Ft=0,bt=wt.length;Ft<bt;Ft++)we(wt[Ft],O,J,H)}function vn(T,O,J,H){let{opaque:Y,transmissive:wt,transparent:Ft}=T;A.setupLightsView(J),ct===!0&&et.setGlobalState(w.clippingPlanes,J),H&&pt.viewport(K.copy(H)),Y.length>0&&Ge(Y,O,J),wt.length>0&&Ge(wt,O,J),Ft.length>0&&Ge(Ft,O,J),pt.buffers.depth.setTest(!0),pt.buffers.depth.setMask(!0),pt.buffers.color.setMask(!0),pt.setPolygonOffset(!1)}function ei(T,O,J,H){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[H.id]===void 0){let zt=$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[H.id]=new fi(1,1,{generateMipmaps:!0,type:zt?Fi:ti,minFilter:Ts,samples:Math.max(4,Zt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:de.workingColorSpace})}let wt=A.state.transmissionRenderTarget[H.id],Ft=H.viewport||K;wt.setSize(Ft.z*w.transmissionResolutionScale,Ft.w*w.transmissionResolutionScale);let bt=w.getRenderTarget(),Pt=w.getActiveCubeFace(),Gt=w.getActiveMipmapLevel();w.setRenderTarget(wt),w.getClearColor(Z),ut=w.getClearAlpha(),ut<1&&w.setClearColor(16777215,.5),w.clear(),Kt&&D.render(J);let te=w.toneMapping;w.toneMapping=ji;let ue=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),A.setupLightsView(H),ct===!0&&et.setGlobalState(w.clippingPlanes,H),Ge(T,J,H),qt.updateMultisampleRenderTarget(wt),qt.updateRenderTargetMipmap(wt),$t.has("WEBGL_multisampled_render_to_texture")===!1){let zt=!1;for(let fe=0,$e=O.length;fe<$e;fe++){let Ce=O[fe],{object:Ee,geometry:yn,material:kt,group:On}=Ce;if(kt.side===Ei&&Ee.layers.test(H.layers)){let xe=kt.side;kt.side=Xn,kt.needsUpdate=!0,Je(Ee,J,H,yn,kt,On),kt.side=xe,kt.needsUpdate=!0,zt=!0}}zt===!0&&(qt.updateMultisampleRenderTarget(wt),qt.updateRenderTargetMipmap(wt))}w.setRenderTarget(bt,Pt,Gt),w.setClearColor(Z,ut),ue!==void 0&&(H.viewport=ue),w.toneMapping=te}function Ge(T,O,J){let H=O.isScene===!0?O.overrideMaterial:null;for(let Y=0,wt=T.length;Y<wt;Y++){let Ft=T[Y],{object:bt,geometry:Pt,group:Gt}=Ft,te=Ft.material;te.allowOverride===!0&&H!==null&&(te=H),bt.layers.test(J.layers)&&Je(bt,O,J,Pt,te,Gt)}}function Je(T,O,J,H,Y,wt){N!==null&&Y.isNodeMaterial&&N.setObject(T,Y),T.onBeforeRender(w,O,J,H,Y,wt),T.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),Y.onBeforeRender(w,O,J,H,T,wt),Y.transparent===!0&&Y.side===Ei&&Y.forceSinglePass===!1?(Y.side=Xn,Y.needsUpdate=!0,w.renderBufferDirect(J,O,H,Y,T,wt),Y.side=er,Y.needsUpdate=!0,w.renderBufferDirect(J,O,H,Y,T,wt),Y.side=Ei):w.renderBufferDirect(J,O,H,Y,T,wt),T.onAfterRender(w,O,J,H,Y,wt)}function en(T){let O=0;for(let J of T)J.texture!==null&&O++;return O}function ni(T,O,J){O.isScene!==!0&&(O=Vt);let H=Bt.get(T),Y=A.state.lights,wt=A.state.shadowsArray,Ft=Y.state.version,bt=st.getParameters(T,Y.state,wt,O,J,A.state.lightProbeGridArray),Pt=st.getProgramCacheKey(bt),Gt=H.programs;H.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?O.environment:null,H.fog=O.fog;let te=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;H.envMap=C.get(T.envMap||H.environment,te),H.envMapRotation=H.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Gt===void 0&&(T.addEventListener("dispose",Rt),Gt=new Map,H.programs=Gt,H.programVariants=new Map);let ue=Gt.get(Pt);if(ue!==void 0){if(H.currentProgram===ue&&H.lightsStateVersion===Ft)return He(T,bt),ue}else bt.uniforms=st.getUniforms(T),N!==null&&T.isNodeMaterial&&N.build(T,J,bt),T.onBeforeCompile(bt,w),ue=st.acquireProgram(bt,Pt),Gt.set(Pt,ue),H.uniforms=bt.uniforms;let zt=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(zt.clippingPlanes=et.uniform),He(T,bt),H.needsLights=El(T),H.lightsStateVersion=Ft,H.needsLights&&(zt.ambientLightColor.value=Y.state.ambient,zt.lightProbe.value=Y.state.probe,zt.sunLights.value=Y.state.sun,zt.sunLightShadows.value=Y.state.sunShadow,zt.directionalLights.value=Y.state.directional,zt.directionalLightShadows.value=Y.state.directionalShadow,zt.spotLights.value=Y.state.spot,zt.spotLightShadows.value=Y.state.spotShadow,zt.rectAreaLights.value=Y.state.rectArea,zt.ltc_1.value=Y.state.rectAreaLTC1,zt.ltc_2.value=Y.state.rectAreaLTC2,zt.pointLights.value=Y.state.point,zt.pointLightShadows.value=Y.state.pointShadow,zt.hemisphereLights.value=Y.state.hemi,zt.sunShadowMatrix.value=Y.state.sunShadowMatrix,zt.sunShadowCascade.value=Y.state.sunShadowCascade,zt.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,zt.spotLightMatrix.value=Y.state.spotLightMatrix,zt.spotLightMap.value=Y.state.spotLightMap,zt.pointShadowMatrix.value=Y.state.pointShadowMatrix),H.numLightProbeGrids=en(A.state.lightProbeGridArray),H.currentProgram=ue,H.uniformsList=null,ue}function zr(T,O,J,H,Y){let wt=Bt.get(T),Ft=wt.currentProgram.id+","+H+","+Y,bt=wt.programVariants.get(Ft);return bt===void 0?(bt=ni(T,O,J),wt.programVariants.set(Ft,bt)):(wt.currentProgram=bt,wt.uniformsList=null,wt.outputColorSpace=H,wt.toneMapping=Y),bt}function nn(T){if(T.uniformsList===null){let O=T.currentProgram.getUniforms();T.uniformsList=ko.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function He(T,O){let J=Bt.get(T);J.outputColorSpace=O.outputColorSpace,J.batching=O.batching,J.batchingColor=O.batchingColor,J.instancing=O.instancing,J.instancingColor=O.instancingColor,J.instancingMorph=O.instancingMorph,J.skinning=O.skinning,J.morphTargets=O.morphTargets,J.morphNormals=O.morphNormals,J.morphColors=O.morphColors,J.morphTargetsCount=O.morphTargetsCount,J.numClippingPlanes=O.numClippingPlanes,J.numIntersection=O.numClipIntersection,J.vertexAlphas=O.vertexAlphas,J.vertexTangents=O.vertexTangents,J.toneMapping=O.toneMapping}function gi(T,O,J,H,Y){O.isScene!==!0&&(O=Vt),qt.resetTextureUnits();let wt=O.fog,Ft=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?O.environment:null,bt=j===null?w.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:de.workingColorSpace,Pt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,Gt=C.get(H.envMap||Ft,Pt),te=H.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,ue=!!J.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),zt=!!J.morphAttributes.position,fe=!!J.morphAttributes.normal,$e=!!J.morphAttributes.color,Ce=ji;H.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ce=w.toneMapping);let Ee=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,yn=Ee!==void 0?Ee.length:0,kt=Bt.get(H),On=A.state.lights;if(ct===!0&&(B===!0||T!==R)){let Fe=T===R&&H.id===X;et.setState(H,T,Fe)}let xe=!1,sr=!1;H.version===kt.__version?kt.needsLights&&kt.lightsStateVersion!==On.state.version||Y.isBatchedMesh&&kt.batching===!1||!Y.isBatchedMesh&&kt.batching===!0||Y.isBatchedMesh&&kt.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&kt.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&kt.instancing===!1||!Y.isInstancedMesh&&kt.instancing===!0||Y.isSkinnedMesh&&kt.skinning===!1||!Y.isSkinnedMesh&&kt.skinning===!0||Y.isInstancedMesh&&kt.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&kt.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&kt.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&kt.instancingMorph===!1&&Y.morphTexture!==null||kt.envMap!==Gt||H.fog===!0&&kt.fog!==wt||kt.numClippingPlanes!==void 0&&(kt.numClippingPlanes!==et.numPlanes||kt.numIntersection!==et.numIntersection)||kt.vertexAlphas!==te||kt.vertexTangents!==ue||kt.morphTargets!==zt||kt.morphNormals!==fe||kt.morphColors!==$e||kt.morphTargetsCount!==yn||kt.numLightProbeGrids!==en(A.state.lightProbeGridArray)?xe=!0:(kt.outputColorSpace!==bt||kt.toneMapping!==Ce)&&(sr=!0):(xe=!0,kt.__version=H.version);let Sn=kt.currentProgram;(xe===!0||sr===!0)&&(Sn=sr===!0?zr(H,O,Y,bt,Ce):ni(H,O,Y),N&&H.isNodeMaterial&&N.onUpdateProgram(H,Sn,kt));let Al=!1,Cs=!1,rr=!1,_e=Sn.getUniforms(),dn=kt.uniforms;if(pt.useProgram(Sn.program)&&(Al=!0,Cs=!0,rr=!0),H.id!==X&&(X=H.id,Cs=!0),Al||R!==T){pt.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),_e.setValue(U,"projectionMatrix",T.projectionMatrix),_e.setValue(U,"viewMatrix",T.matrixWorldInverse);let ln=_e.map.cameraPosition;ln!==void 0&&ln.setValue(U,Xt.setFromMatrixPosition(T.matrixWorld)),Zt.logarithmicDepthBuffer&&_e.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&_e.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),R!==T&&(R=T,Cs=!0,rr=!0)}if(kt.needsLights&&(On.state.sunShadowMap.length>0&&_e.setValue(U,"sunShadowMap",On.state.sunShadowMap,qt),On.state.directionalShadowMap.length>0&&_e.setValue(U,"directionalShadowMap",On.state.directionalShadowMap,qt),On.state.spotShadowMap.length>0&&_e.setValue(U,"spotShadowMap",On.state.spotShadowMap,qt),On.state.pointShadowMap.length>0&&_e.setValue(U,"pointShadowMap",On.state.pointShadowMap,qt)),Y.isSkinnedMesh){_e.setOptional(U,Y,"bindMatrix"),_e.setOptional(U,Y,"bindMatrixInverse");let Fe=Y.skeleton;Fe&&(Fe.boneTexture===null&&Fe.computeBoneTexture(),_e.setValue(U,"boneTexture",Fe.boneTexture,qt))}Y.isBatchedMesh&&(_e.setOptional(U,Y,"batchingTexture"),_e.setValue(U,"batchingTexture",Y._matricesTexture,qt),_e.setOptional(U,Y,"batchingIdTexture"),_e.setValue(U,"batchingIdTexture",Y._indirectTexture,qt),_e.setOptional(U,Y,"batchingColorTexture"),Y._colorsTexture!==null&&_e.setValue(U,"batchingColorTexture",Y._colorsTexture,qt));let Ci=J.morphAttributes;if((Ci.position!==void 0||Ci.normal!==void 0||Ci.color!==void 0)&&tt.update(Y,J,Sn),(Cs||kt.receiveShadow!==Y.receiveShadow)&&(kt.receiveShadow=Y.receiveShadow,_e.setValue(U,"receiveShadow",Y.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&O.environment!==null&&(dn.envMapIntensity.value=O.environmentIntensity),dn.dfgLUT!==void 0&&(dn.dfgLUT.value=Qw()),Cs){if(_e.setValue(U,"toneMappingExposure",w.toneMappingExposure),kt.needsLights&&Ho(dn,rr),wt&&H.fog===!0&&mt.refreshFogUniforms(dn,wt),mt.refreshMaterialUniforms(dn,H,gt,At,A.state.transmissionRenderTarget[T.id]),kt.needsLights&&kt.numLightProbeGrids>0){let Fe=v,ln=0;for(let ns of A.state.lightProbeGridArray)ns.texture!==null&&(Fe.textures[ln]=ns.texture,Fe.min[ln]=ns.boundingBox.min,Fe.max[ln]=ns.boundingBox.max,Fe.resolution[ln]=ns.resolution,ln++);for(let ns in Fe)Fe[ns].length=ln;dn.probesSH.value=Fe.textures,dn.probesMin.value=Fe.min,dn.probesMax.value=Fe.max,dn.probesResolution.value=Fe.resolution}ko.upload(U,nn(kt),dn,qt)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ko.upload(U,nn(kt),dn,qt),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&_e.setValue(U,"center",Y.center),_e.setValue(U,"modelViewMatrix",Y.modelViewMatrix),_e.setValue(U,"normalMatrix",Y.normalMatrix),_e.setValue(U,"modelMatrix",Y.matrixWorld),H.uniformsGroups!==void 0){let Fe=H.uniformsGroups;for(let ln=0,ns=Fe.length;ln<ns;ln++){let yp=Fe[ln];at.update(yp,Sn),at.bind(yp,Sn)}}return Sn}function Ho(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.sunLights.needsUpdate=O,T.sunLightShadows.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function El(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return G},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(T,O,J){let H=Bt.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),Bt.get(T.texture).__webglTexture=O,Bt.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:J,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,O){let J=Bt.get(T);J.__webglFramebuffer=O,J.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,J=0){j=T,G=O,F=J;let H=null,Y=!1,wt=!1;if(T){let bt=Bt.get(T);if(bt.__useDefaultFramebuffer!==void 0){pt.bindFramebuffer(U.FRAMEBUFFER,bt.__webglFramebuffer),K.copy(T.viewport),Tt.copy(T.scissor),Ut=T.scissorTest,pt.viewport(K),pt.scissor(Tt),pt.setScissorTest(Ut),X=-1;return}else if(bt.__webglFramebuffer===void 0)qt.setupRenderTarget(T);else if(bt.__hasExternalTextures)qt.rebindTextures(T,Bt.get(T.texture).__webglTexture,Bt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let te=T.depthTexture;if(bt.__boundDepthTexture!==te){if(te!==null&&Bt.has(te)&&(T.width!==te.image.width||T.height!==te.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");qt.setupDepthRenderbuffer(T)}}let Pt=T.texture;(Pt.isData3DTexture||Pt.isDataArrayTexture||Pt.isCompressedArrayTexture)&&(wt=!0);let Gt=Bt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Gt[O])?H=Gt[O][J]:H=Gt[O],Y=!0):T.samples>0&&qt.useMultisampledRTT(T)===!1?H=Bt.get(T).__webglMultisampledFramebuffer:Array.isArray(Gt)?H=Gt[J]:H=Gt,K.copy(T.viewport),Tt.copy(T.scissor),Ut=T.scissorTest}else K.copy(Dt).multiplyScalar(gt).floor(),Tt.copy(Wt).multiplyScalar(gt).floor(),Ut=It;if(J!==0&&(H=V),pt.bindFramebuffer(U.FRAMEBUFFER,H)&&pt.drawBuffers(T,H),pt.viewport(K),pt.scissor(Tt),pt.setScissorTest(Ut),Y){let bt=Bt.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,bt.__webglTexture,J)}else if(wt){let bt=O;for(let Pt=0;Pt<T.textures.length;Pt++){let Gt=Bt.get(T.textures[Pt]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Pt,Gt.__webglTexture,J,bt)}}else if(T!==null&&J!==0){let bt=Bt.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,bt.__webglTexture,J)}X=-1};function As(T){let O=Bt.get(T);return(O.__readFormat!==T.format||O.__readType!==T.type)&&(O.__readFormat=T.format,O.__readType=T.type,O.__formatReadable=Zt.textureFormatReadable(T.format),O.__typeReadable=Zt.textureTypeReadable(T.type)),O}this.readRenderTargetPixels=function(T,O,J,H,Y,wt,Ft,bt=0){if(!(T&&T.isWebGLRenderTarget)){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=Bt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ft!==void 0&&(Pt=Pt[Ft],Array.isArray(Pt)&&(Pt=Pt[0])),Pt){pt.bindFramebuffer(U.FRAMEBUFFER,Pt);try{let Gt=T.textures[bt],te=Gt.format,ue=Gt.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+bt);let zt=As(Gt);if(zt.__formatReadable===!1){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(zt.__typeReadable===!1){Jt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-H&&J>=0&&J<=T.height-Y&&U.readPixels(O,J,H,Y,ht.convert(te),ht.convert(ue),wt)}finally{let Gt=j!==null?Bt.get(j).__webglFramebuffer:null;pt.bindFramebuffer(U.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(T,O,J,H,Y,wt,Ft,bt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=Bt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ft!==void 0&&(Pt=Pt[Ft],Array.isArray(Pt)&&(Pt=Pt[0])),Pt)if(O>=0&&O<=T.width-H&&J>=0&&J<=T.height-Y){pt.bindFramebuffer(U.FRAMEBUFFER,Pt);let Gt=T.textures[bt],te=Gt.format,ue=Gt.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+bt);let zt=As(Gt);if(zt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(zt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let fe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,fe),U.bufferData(U.PIXEL_PACK_BUFFER,wt.byteLength,U.STREAM_READ),U.readPixels(O,J,H,Y,ht.convert(te),ht.convert(ue),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let $e=j!==null?Bt.get(j).__webglFramebuffer:null;pt.bindFramebuffer(U.FRAMEBUFFER,$e);let Ce=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await O_(U,Ce,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,fe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,wt),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(fe),U.deleteSync(Ce),wt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,O=null,J=0){let H=Math.pow(2,-J),Y=Math.floor(T.image.width*H),wt=Math.floor(T.image.height*H),Ft=O!==null?O.x:0,bt=O!==null?O.y:0;qt.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,Ft,bt,Y,wt),pt.unbindTexture()},this.copyTextureToTexture=function(T,O,J=null,H=null,Y=0,wt=0){let Ft,bt,Pt,Gt,te,ue,zt,fe,$e,Ce=T.isCompressedTexture?T.mipmaps[wt]:T.image;if(J!==null)Ft=J.max.x-J.min.x,bt=J.max.y-J.min.y,Pt=J.isBox3?J.max.z-J.min.z:1,Gt=J.min.x,te=J.min.y,ue=J.isBox3?J.min.z:0;else{let _e=Math.pow(2,-Y);Ft=Math.floor(Ce.width*_e),bt=Math.floor(Ce.height*_e),T.isDataArrayTexture?Pt=Ce.depth:T.isData3DTexture?Pt=Math.floor(Ce.depth*_e):Pt=1,Gt=0,te=0,ue=0}H!==null?(zt=H.x,fe=H.y,$e=H.z):(zt=0,fe=0,$e=0);let Ee=ht.convert(O.format),yn=ht.convert(O.type),kt;O.isData3DTexture?(qt.setTexture3D(O,0),kt=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(qt.setTexture2DArray(O,0),kt=U.TEXTURE_2D_ARRAY):(qt.setTexture2D(O,0),kt=U.TEXTURE_2D),pt.activeTexture(U.TEXTURE0),pt.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),pt.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),pt.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let On=pt.getParameter(U.UNPACK_ROW_LENGTH),xe=pt.getParameter(U.UNPACK_IMAGE_HEIGHT),sr=pt.getParameter(U.UNPACK_SKIP_PIXELS),Sn=pt.getParameter(U.UNPACK_SKIP_ROWS),Al=pt.getParameter(U.UNPACK_SKIP_IMAGES);pt.pixelStorei(U.UNPACK_ROW_LENGTH,Ce.width),pt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Ce.height),pt.pixelStorei(U.UNPACK_SKIP_PIXELS,Gt),pt.pixelStorei(U.UNPACK_SKIP_ROWS,te),pt.pixelStorei(U.UNPACK_SKIP_IMAGES,ue);let Cs=T.isDataArrayTexture||T.isData3DTexture,rr=O.isDataArrayTexture||O.isData3DTexture;if(T.isDepthTexture){let _e=Bt.get(T),dn=Bt.get(O),Ci=Bt.get(_e.__renderTarget),Fe=Bt.get(dn.__renderTarget);pt.bindFramebuffer(U.READ_FRAMEBUFFER,Ci.__webglFramebuffer),pt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Fe.__webglFramebuffer);for(let ln=0;ln<Pt;ln++)Cs&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Bt.get(T).__webglTexture,Y,ue+ln),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Bt.get(O).__webglTexture,wt,$e+ln)),U.blitFramebuffer(Gt,te,Gt+Ft,te+bt,zt,fe,zt+Ft,fe+bt,U.DEPTH_BUFFER_BIT,U.NEAREST);pt.bindFramebuffer(U.READ_FRAMEBUFFER,null),pt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(Y!==0||T.isRenderTargetTexture||Bt.has(T)){let _e=Bt.get(T),dn=Bt.get(O);pt.bindFramebuffer(U.READ_FRAMEBUFFER,I),pt.bindFramebuffer(U.DRAW_FRAMEBUFFER,z);for(let Ci=0;Ci<Pt;Ci++)Cs?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,_e.__webglTexture,Y,ue+Ci):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,_e.__webglTexture,Y),rr?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,dn.__webglTexture,wt,$e+Ci):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,dn.__webglTexture,wt),Y!==0?U.blitFramebuffer(Gt,te,Gt+Ft,te+bt,zt,fe,zt+Ft,fe+bt,U.COLOR_BUFFER_BIT,U.NEAREST):rr?U.copyTexSubImage3D(kt,wt,zt,fe,$e+Ci,Gt,te,Ft,bt):U.copyTexSubImage2D(kt,wt,zt,fe,Gt,te,Ft,bt);pt.bindFramebuffer(U.READ_FRAMEBUFFER,null),pt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else rr?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(kt,wt,zt,fe,$e,Ft,bt,Pt,Ee,yn,Ce.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(kt,wt,zt,fe,$e,Ft,bt,Pt,Ee,Ce.data):U.texSubImage3D(kt,wt,zt,fe,$e,Ft,bt,Pt,Ee,yn,Ce):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,wt,zt,fe,Ft,bt,Ee,yn,Ce.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,wt,zt,fe,Ce.width,Ce.height,Ee,Ce.data):U.texSubImage2D(U.TEXTURE_2D,wt,zt,fe,Ft,bt,Ee,yn,Ce);pt.pixelStorei(U.UNPACK_ROW_LENGTH,On),pt.pixelStorei(U.UNPACK_IMAGE_HEIGHT,xe),pt.pixelStorei(U.UNPACK_SKIP_PIXELS,sr),pt.pixelStorei(U.UNPACK_SKIP_ROWS,Sn),pt.pixelStorei(U.UNPACK_SKIP_IMAGES,Al),wt===0&&O.generateMipmaps===!0&&O.mipmapsAutoUpdate===!0&&U.generateMipmap(kt),pt.unbindTexture()},this.initRenderTarget=function(T){Bt.get(T).__webglFramebuffer===void 0&&qt.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?qt.setTextureCube(T,0):T.isData3DTexture?qt.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?qt.setTexture2DArray(T,0):qt.setTexture2D(T,0),pt.unbindTexture()},this.resetState=function(){G=0,F=0,j=null,pt.reset(),xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}};var Ai=s=>new ee(s);function t1(){return{clay:new wi({color:16052716,roughness:.85}),stone:new wi({color:12038310,roughness:1}),dark:new wi({color:2763565,roughness:.6,metalness:.2}),wood:new wi({color:10122578,roughness:.8}),glass:new wi({color:10466239,roughness:.05,metalness:.3,transparent:!0,opacity:.38,emissive:Ai(16757610),emissiveIntensity:0}),water:new wi({color:7319748,roughness:.08,metalness:.35,emissive:Ai(3126985),emissiveIntensity:0}),glow:new Ro({color:16763276,transparent:!0,opacity:0,side:Ei}),tree:new wi({color:15262940,roughness:.95})}}var e1={cantilever:[{t:"box",a:[28,.4,18,0,.2,0],m:"clay"},{t:"box",a:[6,3,7,-8.5,1.9,0],m:"clay"},{t:"box",a:[10,3,7,-.5,1.9,0],m:"glass"},{t:"glow",a:[9.6,2.6,-.5,1.9,-3.2,0]},{t:"box",a:[19,.3,8.6,2.5,3.45,-.5],m:"dark"},{t:"box",a:[18,3.1,8,3,5.15,-.5],m:"clay"},{t:"box",a:[15,1.3,.12,4,5.2,3.52],m:"glass"},{t:"glow",a:[14.6,1.1,4,5.2,3.3,0]},{t:"box",a:[18.4,.25,8.4,3,6.82,-.5],m:"clay"},{t:"box",a:[.8,7,15,-12.2,3.7,-1],m:"stone"},{t:"box",a:[.22,3,.22,11.4,1.9,3],m:"dark"},{t:"box",a:[.22,3,.22,11.4,1.9,-4],m:"dark"},{t:"box",a:[13,.06,4.6,3,.43,6.6],m:"water"},{t:"box",a:[5,.12,2.2,-6,.46,5.6],m:"wood"},{t:"tree",a:[-17,8,1.2]},{t:"tree",a:[16,-8,1.5]},{t:"tree",a:[18,4,1]},{t:"tree",a:[-18,-9,1.4]},{t:"tree",a:[-15,12,.9]}],pavilion:[{t:"box",a:[32,.4,16,0,.2,0],m:"clay"},{t:"box",a:[22,3,6,-1,1.9,0],m:"glass"},{t:"glow",a:[21.5,2.6,-1,1.9,-2.7,0]},{t:"box",a:[4,3,6,-14,1.9,0],m:"stone"},{t:"box",a:[26,.35,10,-3,3.58,0],m:"clay"},...Array.from({length:7},(s,t)=>({t:"box",a:[.16,3,.16,-14+t*3.6,1.9,4.6],m:"dark"})),...Array.from({length:10},(s,t)=>({t:"box",a:[.16,.24,8,10.4+t*.6,3.55,0],m:"wood"})),{t:"box",a:[.2,3.3,.2,15.6,1.85,3.8],m:"dark"},{t:"box",a:[.2,3.3,.2,15.6,1.85,-3.8],m:"dark"},{t:"box",a:[22,.06,4,-1,.43,6.4],m:"water"},{t:"tree",a:[-19,6,1.3]},{t:"tree",a:[19,-6,1.1]},{t:"tree",a:[20,6,1.4]}],barn:[{t:"box",a:[30,.4,20,0,.2,0],m:"clay"},{t:"gable",a:[7,3.4,6.6,16,-3,.4,-2,0],m:"dark"},{t:"gable",a:[6,3,5.6,9,8,.4,3,Math.PI/2],m:"clay"},{t:"box",a:[.1,3,5.6,5.02,1.9,-2],m:"glass"},{t:"glow",a:[5.4,2.8,4.8,1.9,-2,Math.PI/2]},{t:"box",a:[8,.12,4,-3,.46,7],m:"wood"},{t:"tree",a:[16,8,1.3]},{t:"tree",a:[14,-9,1.2]},{t:"tree",a:[-16,-8,1.1]}],stacked:[{t:"box",a:[28,.4,20,0,.2,0],m:"clay"},{t:"box",a:[11,3.2,10,0,2,0],m:"stone"},{t:"box",a:[15,3.2,8,3,5.2,-1],m:"clay"},{t:"box",a:[12,1.4,.12,4,5.2,3.02],m:"glass"},{t:"glow",a:[11.6,1.2,4,5.2,2.8,0]},{t:"box",a:[9,3.2,8,-2,8.4,.5],m:"glass"},{t:"glow",a:[8.6,2.8,-2,8.4,-3.2,0]},{t:"box",a:[9.4,.25,8.4,-2,10.12,.5],m:"clay"},{t:"box",a:[10,.06,4,2,.43,7.4],m:"water"},{t:"tree",a:[-16,-8,1.5]},{t:"tree",a:[15,-7,1.3]},{t:"tree",a:[17,7,1]}]};function n1(s,t,e,n){let i=new Lo;i.moveTo(-s/2,0),i.lineTo(s/2,0),i.lineTo(s/2,t),i.lineTo(0,e),i.lineTo(-s/2,t),i.closePath();let r=new nl(i,{depth:n,bevelEnabled:!1});return r.translate(0,0,-n/2),r.rotateY(Math.PI/2),r}function i1(s,t,e){let n=new Zi,i=[],r=[];for(let a of e1[s])if(!a.skip){if(a.t==="box"){let[l,c,h,d,u,f]=a.a,p=new xn(new $s(l,c,h),t[a.m]);p.position.set(d,u,f),p.castShadow=a.m!=="glass"&&a.m!=="water",p.receiveShadow=!0,n.add(p),i.push(p)}else if(a.t==="gable"){let[l,c,h,d,u,f,p,_]=a.a,m=new xn(n1(l,c,h,d),t[a.m]);m.position.set(u,f,p),m.rotation.y=_,m.castShadow=m.receiveShadow=!0,n.add(m),i.push(m)}else if(a.t==="glow"){let[l,c,h,d,u,f]=a.a,p=new xn(new Ks(l,c),t.glow);p.position.set(h,d,u),p.rotation.y=f,n.add(p),r.push(p)}else if(a.t==="tree"){let[l,c,h]=a.a,d=new xn(new il(1.5*h,28,18),t.tree);d.position.set(l,4.2*h,c),d.castShadow=d.receiveShadow=!0;let u=new xn(new qa(.07*h,.09*h,3*h,8),t.dark);u.position.set(l,1.5*h,c),u.castShadow=!0,n.add(d,u),i.push(d,u),d.userData.noEdges=u.userData.noEdges=!0}}let o=new Zi;for(let a of i){if(a.userData.noEdges)continue;let l=new Po(new Ya(a.geometry,20),e);l.position.copy(a.position),l.rotation.copy(a.rotation),o.add(l)}return n.add(o),{group:n,meshes:i,glows:r}}function w0(s,{variant:t="cantilever",pixelRatio:e=1.75}={}){let n=new Mu({canvas:s,antialias:!0,alpha:!0,preserveDrawingBuffer:!0});n.setPixelRatio(Math.min(window.devicePixelRatio||1,e)),n.shadowMap.enabled=!0,n.shadowMap.type=Ih,n.toneMapping=dl,n.toneMappingExposure=1.25,n.outputColorSpace=In;let i=new za,r=Ai(923430);i.fog=new Ba(r,70,190);let o=new Ln(35,1,.5,500),a=t1(),l=new Ir({color:11126015,transparent:!0,opacity:1}),c=i1(t,a,l);i.add(c.group);let h=c.glows.map(w=>{let L=new ll(16757611,0,16,1.6),N=new k(0,0,1).applyEuler(w.rotation);return L.position.copy(w.position).addScaledVector(N,3.2),i.add(L),L}),d=new wi({color:13618115,roughness:1,transparent:!0,opacity:0}),u=new xn(new Ks(600,600),d);u.rotation.x=-Math.PI/2,u.receiveShadow=!0,i.add(u);let f=new ul(120,60,7311313,2899814);f.material.transparent=!0,f.position.y=.01,i.add(f);let p=new rl(14674175,8023906,.9);i.add(p);let _=new hl(16777215,3);_.castShadow=!0,_.shadow.mapSize.set(2048,2048),Object.assign(_.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:150}),_.shadow.bias=-4e-4,_.shadow.normalBias=.03,i.add(_,_.target);let m={cx:-12,cy:64,cz:4.01,tx:-12,ty:0,tz:4,fov:35,lines:1,solid:0,sunAz:140,sunEl:60,warm:0,night:0,bg:[.055,.09,.15],sky:[.03,.05,.1]},g=JSON.parse(JSON.stringify(m)),y={x:0,y:0,sx:0,sy:0},M=Ai(16751186),v=Ai(16774890),E=Ai(9414911),A=new ee;function x(w){r.setRGB(w.bg[0],w.bg[1],w.bg[2],In),i.fog.color.copy(r);let L=y.sx*2.2*w.solid,N=y.sy*1.2*w.solid,V=o.aspect<1,I=V?12*(1-w.solid):0,z=V?Math.min(1.85,.85/o.aspect):1;o.position.set(w.cx+L+I,w.cy+N,w.cz),o.fov=w.fov*z,o.updateProjectionMatrix(),o.lookAt(w.tx+I,w.ty,w.tz),l.opacity=w.lines,l.color.lerpColors(Ai(11126015),Ai(4606028),w.solid),l.visible=w.lines>.01;for(let X of c.meshes){let R=X.material;R.transparent=!0;let K=R===a.glass?.38:1;R.opacity=K*w.solid,R.depthWrite=w.solid>.6&&R!==a.glass,X.visible=w.solid>.01}d.opacity=w.solid,u.visible=w.solid>.01,f.material.opacity=(1-w.solid)*.55,f.visible=w.solid<.99;let G=xu.degToRad(w.sunAz),F=xu.degToRad(w.sunEl),j=60;_.position.set(Math.cos(F)*Math.sin(G)*j,Math.sin(F)*j,Math.cos(F)*Math.cos(G)*j),A.lerpColors(v,M,w.warm).lerp(E,w.night),_.color.copy(A),_.intensity=(3.4-w.night*2.6)*w.solid+.2,p.intensity=1.35-w.night*.95,p.color.lerpColors(Ai(14674175),Ai(2832998),w.night),d.color.lerpColors(Ai(13618115),Ai(5591629),w.night*.7),a.glow.opacity=w.night*w.solid,a.glass.emissiveIntensity=w.night*.7,a.water.emissiveIntensity=w.night*.6;for(let X of h)X.intensity=w.night*w.solid*14;n.toneMappingExposure=1.25}function S(){let w=s.clientWidth,L=s.clientHeight;!w||!L||(n.setSize(w,L,!1),o.aspect=w/L,o.updateProjectionMatrix())}function P(w=.08){for(let L in m)Array.isArray(m[L])?m[L].forEach((N,V)=>{g[L][V]+=(N-g[L][V])*w}):g[L]+=(m[L]-g[L])*w;y.sx+=(y.x-y.sx)*.05,y.sy+=(y.y-y.sy)*.05,x(g),n.render(i,o)}return S(),{target:m,cur:g,pointer:y,resize:S,frame:P,snap(w){Object.assign(m,w),Object.assign(g,JSON.parse(JSON.stringify(m))),P(1)},renderer:n}}var xp=[{cx:-12,cy:64,cz:4.01,tx:-12,ty:0,tz:4,fov:35,lines:1,solid:0,sunAz:140,sunEl:62,warm:0,night:0,bg:[.055,.09,.15],sky:[.03,.05,.1]},{cx:-34,cy:24,cz:38,tx:0,ty:2.5,tz:0,fov:32,lines:.35,solid:1,sunAz:150,sunEl:55,warm:0,night:0,bg:[.86,.85,.82],sky:[.95,.95,.94]},{cx:30,cy:8,cz:30,tx:1,ty:3.2,tz:0,fov:34,lines:0,solid:1,sunAz:255,sunEl:9,warm:1,night:0,bg:[.96,.69,.47],sky:[.33,.42,.6]},{cx:16,cy:4.5,cz:33,tx:.5,ty:3.6,tz:0,fov:36,lines:0,solid:1,sunAz:280,sunEl:14,warm:.4,night:1,bg:[.09,.11,.19],sky:[.01,.015,.04]}];Re.registerPlugin(ne);var Nn=(s,t=document)=>t.querySelector(s),zi=(s,t=document)=>[...t.querySelectorAll(s)],ir=matchMedia("(prefers-reduced-motion: reduce)").matches,C0=matchMedia("(pointer: fine)").matches,R0=new URLSearchParams(location.search).has("static");Nn("#year").textContent=new Date().getFullYear();var wl=null;!ir&&!R0&&(wl=new Ep({lerp:.085,wheelMultiplier:.9}),wl.on("scroll",ne.update),Re.ticker.add(s=>wl.raf(s*1e3)),Re.ticker.lagSmoothing(0));zi('a[href^="#"]').forEach(s=>s.addEventListener("click",t=>{let e=s.getAttribute("href"),n=e.length>1?Nn(e):document.body;n&&(t.preventDefault(),wl?wl.scrollTo(n,{duration:1.8}):n.scrollIntoView({behavior:ir?"auto":"smooth"}))}));var wu=Nn("#story"),s1=Nn(".sky"),mi=null;try{mi=w0(Nn("#scene"),{pixelRatio:innerWidth<768?1.5:1.75})}catch{document.documentElement.classList.add("no-webgl")}var Go=[0,.34,.67,1],vp=.07,r1=s=>s*s*(3-2*s);function o1(s){for(let t=0;t<Go.length-1;t++){if(s<=Go[t]+vp)return[t,t,0];let e=Go[t]+vp,n=Go[t+1]-vp;if(s<n)return[t,t+1,r1((s-e)/(n-e))]}return[Go.length-1,Go.length-1,0]}function a1(s,t,e,n){for(let i in s)Array.isArray(s[i])?n[i]=s[i].map((r,o)=>r+(t[i][o]-r)*e):n[i]=s[i]+(t[i]-s[i])*e}var l1=zi(".chapter"),c1=zi(".rail li"),E0=0;function P0(s){if(mi){let[e,n,i]=o1(s);a1(xp[e],xp[n],i,mi.target)}let t=s<.17?0:s<.5?1:s<.83?2:3;t!==E0&&(E0=t,l1.forEach((e,n)=>e.classList.toggle("is-active",n===t)),c1.forEach((e,n)=>e.classList.toggle("is-active",n===t))),wu.classList.toggle("is-scrolled",s>.02)}ne.create({trigger:wu,start:"top top",end:"bottom bottom",onUpdate:s=>P0(s.progress)});P0(0);var h1=Nn("#hud-time"),u1=Nn("#hud-sun"),A0=s=>`rgb(${s.map(t=>Math.round(t*255)).join(",")})`,f1=(s,t,e)=>s.map((n,i)=>Math.round(n+(t[i]-n)*e)),d1=[238,235,229],p1=[20,23,28],I0=!0;new IntersectionObserver(([s])=>{I0=s.isIntersecting}).observe(wu);function m1(){if(!mi||!I0)return;mi.frame(ir?1:.075);let s=mi.cur;s1.style.background=`linear-gradient(${A0(s.sky)}, ${A0(s.bg)} 62%)`;let t=6+(s.sunAz-90)/15,e=Math.floor(t),n=Math.floor((t-e)*60);h1.textContent=`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`,u1.textContent=`${Math.round(s.sunAz)}\xB0 / ${Math.round(s.sunEl)}\xB0`;let i=.2126*s.bg[0]+.7152*s.bg[1]+.0722*s.bg[2],r=Math.min(1,Math.max(0,(i-.45)/.25));wu.style.setProperty("--fg",`rgb(${f1(d1,p1,r).join(",")})`)}Re.ticker.add(m1);addEventListener("resize",()=>mi&&mi.resize());C0&&addEventListener("pointermove",s=>{mi&&(mi.pointer.x=(s.clientX/innerWidth-.5)*2,mi.pointer.y=(s.clientY/innerHeight-.5)*-2)});function g1(){let s=Re.timeline();mi&&!ir&&(mi.cur.cy=140),s.to(".loader",{yPercent:-100,duration:1.1,ease:"expo.inOut"}).from(".hero-title .line > span",{yPercent:110,duration:1.3,stagger:.09,ease:"expo.out"},"-=.45").from([".hero-sub",".hud",".header"],{opacity:0,y:20,duration:1,stagger:.08,ease:"power3.out"},"-=1").set(".loader",{display:"none"})}if(R0||ir)Nn(".loader").style.display="none";else{let s={v:0},t=Nn("#count"),e=new Promise(i=>document.readyState==="complete"?i():addEventListener("load",i)),n=document.fonts?document.fonts.ready:Promise.resolve();Re.to(".loader-bar i",{scaleX:1,duration:1.6,ease:"power2.inOut"}),Re.to(s,{v:100,duration:1.6,ease:"power2.inOut",onUpdate:()=>{t.textContent=Math.round(s.v)},onComplete:()=>Promise.all([e,n]).then(g1)})}zi("[data-words]").forEach(s=>{s.innerHTML=s.textContent.trim().split(/\s+/).map(t=>`<span class="w">${t}</span>`).join(" "),!ir&&Re.to(zi(".w",s),{opacity:1,stagger:.12,ease:"none",scrollTrigger:{trigger:s,start:"top 80%",end:"bottom 50%",scrub:!0}})});ir||zi(".section-title, .contact-title .line > span").forEach(s=>{Re.from(s,{yPercent:60,opacity:0,duration:1.4,ease:"expo.out",scrollTrigger:{trigger:s,start:"top 88%"}})});var L0=Re.matchMedia();L0.add("(min-width: 901px)",()=>{let s=Nn(".track"),t=()=>s.scrollWidth-innerWidth,e=Re.to(s,{x:()=>-t(),ease:"none",scrollTrigger:{trigger:".projects",start:"top top",end:()=>"+="+t(),pin:!0,scrub:1,invalidateOnRefresh:!0,onUpdate:n=>Re.set(".projects-progress i",{scaleX:n.progress})}});zi(".project-media img").forEach(n=>{Re.fromTo(n,{xPercent:-6},{xPercent:6,ease:"none",scrollTrigger:{trigger:n.closest(".project"),containerAnimation:e,start:"left right",end:"right left",scrub:!0}})})});L0.add("(max-width: 900px)",()=>{zi(".project-media").forEach(s=>{Re.from(s,{clipPath:"inset(12% 8% 12% 8%)",duration:1.4,ease:"expo.out",scrollTrigger:{trigger:s,start:"top 85%"}})})});Re.to(".process-line i",{scaleY:1,ease:"none",scrollTrigger:{trigger:".process-steps",start:"top 60%",end:"bottom 70%",scrub:!0}});zi(".step").forEach(s=>ne.create({trigger:s,start:"top 62%",onEnter:()=>s.classList.add("is-on"),onLeaveBack:()=>s.classList.remove("is-on")}));if(C0&&!ir){let s=Nn(".cursor"),t=Nn(".cursor-dot"),e=Nn(".cursor-ring"),n=Nn(".cursor-label"),i=Re.quickTo(t,"x",{duration:.1}),r=Re.quickTo(t,"y",{duration:.1}),o=Re.quickTo(e,"x",{duration:.5,ease:"power3"}),a=Re.quickTo(e,"y",{duration:.5,ease:"power3"}),l=Nn(".hover-img"),c=Nn("img",l),h=Re.quickTo(l,"x",{duration:.7,ease:"power3"}),d=Re.quickTo(l,"y",{duration:.7,ease:"power3"});addEventListener("pointermove",u=>{s.classList.add("is-ready"),i(u.clientX),r(u.clientY),o(u.clientX),a(u.clientY),h(u.clientX),d(u.clientY)}),document.addEventListener("pointerover",u=>{let f=u.target.closest("[data-cursor]"),p=u.target.closest("a, button");s.classList.toggle("is-label",!!f&&f.dataset.cursor.trim()!==""),s.classList.toggle("is-link",!!p&&!(f&&f.dataset.cursor.trim())),f&&(n.textContent=f.dataset.cursor)}),zi(".service").forEach(u=>{u.addEventListener("pointerenter",()=>{c.src=u.dataset.img,l.classList.add("is-on")}),u.addEventListener("pointerleave",()=>l.classList.remove("is-on"))}),zi(".magnet").forEach(u=>{let f=Re.quickTo(u,"x",{duration:.6,ease:"power3"}),p=Re.quickTo(u,"y",{duration:.6,ease:"power3"});u.addEventListener("pointermove",_=>{let m=u.getBoundingClientRect();f((_.clientX-m.left-m.width/2)*.4),p((_.clientY-m.top-m.height/2)*.4)}),u.addEventListener("pointerleave",()=>{Re.to(u,{x:0,y:0,duration:1.2,ease:"elastic.out(1, .4)"})})})}addEventListener("load",()=>ne.refresh());
/*! Bundled license information:

gsap/gsap-core.js:
  (*!
   * GSAP 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/CSSPlugin.js:
  (*!
   * CSSPlugin 3.15.1
   * https://gsap.com
   *
   * Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/Observer.js:
  (*!
   * Observer 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

gsap/ScrollTrigger.js:
  (*!
   * ScrollTrigger 3.15.1
   * https://gsap.com
   *
   * @license Copyright 2008-2026, GreenSock. All rights reserved.
   * Subject to the terms at https://gsap.com/standard-license
   * @author: Jack Doyle, jack@greensock.com
  *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
