/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("event/base",function(i,f,k,l){function m(a,b,e,h,j){if(i.isString(b))b=f.query(b);if(i.isArray(b)){i.each(b,function(n){d[a](n,e,h,j)});return true}if((e=i.trim(e))&&e.indexOf(u)>0){i.each(e.split(u),function(n){d[a](b,n,h,j)});return true}return l}function c(a){return a&&a.nodeType!==3&&a.nodeType!==8?f.data(a,v):-1}function g(a,b){a&&a.nodeType!==3&&a.nodeType!==8&&f.data(a,v,b)}var o=document,p=o.addEventListener?function(a,b,e,h){a.addEventListener&&a.addEventListener(b,e,!!h)}:function(a,
b,e){a.attachEvent&&a.attachEvent("on"+b,e)},B=o.removeEventListener?function(a,b,e,h){a.removeEventListener&&a.removeEventListener(b,e,!!h)}:function(a,b,e){a.detachEvent&&a.detachEvent("on"+b,e)},v="ksEventTargetId",u=" ",w=i.now(),x={},d={EVENT_GUID:v,special:{},add:function(a,b,e,h){if(!m("add",a,b,e,h)){var j=c(a),n,r,s,y,t;if(!(j===-1||!b||!i.isFunction(e))){if(!j){g(a,j=w++);x[j]={target:a,events:{}}}r=x[j].events;if(!r[b]){n=((j=!a.isCustomEventTarget)||a._supportSpecialEvent)&&d.special[b]||
{};s=function(q,z){if(!q||!q.fixed)q=new k(a,q,b);if(i.isPlainObject(z)){var A=q.type;i.mix(q,z);q.type=A}n.setup&&n.setup(q);return(n.handle||d._handle)(a,q)};r[b]={handle:s,listeners:[]};y=n.fix||b;t=n.capture;n.init&&n.init.apply(null,i.makeArray(arguments));j&&n.fix!==false&&p(a,y,s,t)}r[b].listeners.push({fn:e,scope:h||a})}}},__getListeners:function(a,b){var e,h=[];if(e=(d.__getEvents(a)||{})[b])h=e.listeners;return h},__getEvents:function(a){var b=c(a),e;if(b!==-1)if(b&&(e=x[b]))if(e.target===
a)return e.events||{}},remove:function(a,b,e,h){if(!m("remove",a,b,e,h)){var j=d.__getEvents(a),n=c(a),r,s,y,t,q,z,A=(!a.isCustomEventTarget||a._supportSpecialEvent)&&d.special[b]||{};if(j!==l){h=h||a;if(r=j[b]){s=r.listeners;y=s.length;if(i.isFunction(e)&&y){q=t=0;for(z=[];t<y;++t)if(e!==s[t].fn||h!==s[t].scope)z[q++]=s[t];r.listeners=z;y=z.length}if(e===l||y===0){if(!a.isCustomEventTarget){A=d.special[b]||{};if(A.fix!==false)B(a,A.fix||b,r.handle)}delete j[b]}}A.destroy&&A.destroy.apply(null,i.makeArray(arguments));
if(b===l||i.isEmptyObject(j)){for(b in j)d.remove(a,b);delete x[n];f.removeData(a,v)}}}},_handle:function(a,b){var e=d.__getListeners(a,b.type);e=e.slice(0);for(var h,j=0,n=e.length;j<n;++j){h=e[j];h=h.fn.call(h.scope,b);if(h!==l){b.result=h;h===false&&b.halt()}if(b.isImmediatePropagationStopped)break}return h},_getCache:function(a){return x[a]},__getID:c,_simpleAdd:p,_simpleRemove:B};d.on=d.add;return d},{requires:["dom","event/object"]});
KISSY.add("event/focusin",function(i,f){document.addEventListener&&i.each([{name:"focusin",fix:"focus"},{name:"focusout",fix:"blur"}],function(k){f.special[k.name]={fix:k.fix,capture:true,setup:function(l){l.type=k.name}}})},{requires:["event/base"]});
KISSY.add("event/mouseenter",function(i,f,k,l){l.ie||i.each([{name:"mouseenter",fix:"mouseover"},{name:"mouseleave",fix:"mouseout"}],function(m){f.special[m.name]={fix:m.fix,setup:function(c){c.type=m.name},handle:function(c,g){if(k._isKSNode(c))c=c[0];var o=g.relatedTarget;try{for(;o&&o!==c;)o=o.parentNode;o!==c&&f._handle(c,g)}catch(p){}}}})},{requires:["event/base","dom","ua"]});
KISSY.add("event/object",function(i,f){function k(c,g,o){this.currentTarget=c;this.originalEvent=g||{};if(g){this.type=g.type;this._fix()}else{this.type=o;this.target=c}this.currentTarget=c;this.fixed=true}var l=document,m="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" ");
i.augment(k,{_fix:function(){var c=this.originalEvent,g=m.length,o,p=this.currentTarget;for(p=p.nodeType===9?p:p.ownerDocument||l;g;){o=m[--g];this[o]=c[o]}if(!this.target)this.target=this.srcElement||l;if(this.target.nodeType===3)this.target=this.target.parentNode;if(!this.relatedTarget&&this.fromElement)this.relatedTarget=this.fromElement===this.target?this.toElement:this.fromElement;if(this.pageX===f&&this.clientX!==f){c=p.documentElement;g=p.body;this.pageX=this.clientX+(c&&c.scrollLeft||g&&g.scrollLeft||
0)-(c&&c.clientLeft||g&&g.clientLeft||0);this.pageY=this.clientY+(c&&c.scrollTop||g&&g.scrollTop||0)-(c&&c.clientTop||g&&g.clientTop||0)}if(this.which===f)this.which=this.charCode!==f?this.charCode:this.keyCode;if(this.metaKey===f)this.metaKey=this.ctrlKey;if(!this.which&&this.button!==f)this.which=this.button&1?1:this.button&2?3:this.button&4?2:0},preventDefault:function(){var c=this.originalEvent;if(c.preventDefault)c.preventDefault();else c.returnValue=false;this.isDefaultPrevented=true},stopPropagation:function(){var c=
this.originalEvent;if(c.stopPropagation)c.stopPropagation();else c.cancelBubble=true;this.isPropagationStopped=true},stopImmediatePropagation:function(){var c=this.originalEvent;c.stopImmediatePropagation?c.stopImmediatePropagation():this.stopPropagation();this.isImmediatePropagationStopped=true},halt:function(c){c?this.stopImmediatePropagation():this.stopPropagation();this.preventDefault()}});return k});
KISSY.add("event/target",function(i,f,k,l){return{isCustomEventTarget:true,fire:function(m,c){var g=k.data(this,f.EVENT_GUID)||-1;if((g=((f._getCache(g)||{}).events||{})[m])&&i.isFunction(g.handle))return g.handle(l,c)},on:function(m,c,g){f.add(this,m,c,g);return this},detach:function(m,c,g){f.remove(this,m,c,g);return this}}},{requires:["event/base","dom"]});
KISSY.add("event/valuechange",function(i,f,k){function l(d){var a=k.data(d,v);if(!a){a=+new Date;k.data(d,v,a)}return a}function m(d){d=l(d);delete u[d];if(w[d]){clearTimeout(w[d]);delete w[d]}}function c(d){m(d.target)}function g(d){var a=l(d);w[a]||(w[a]=setTimeout(function(){var b=d.value;if(b!==u[a]){f._handle(d,{type:B,preVal:u[a],newVal:b});u[a]=b}w[a]=setTimeout(arguments.callee,x)},x))}function o(d){var a=d.target;if(d.type=="focus"){d=l(a);u[d]=a.value}g(a)}function p(d){m(d);f.remove(d,
"blur",c);f.remove(d,"mousedown keyup keydown focus",o);k.removeData(d,v)}var B="valueChange",v="event/valuechange",u={},w={},x=50;f.special[B]={fix:false,init:function(d){var a=d.nodeName.toLowerCase();if("input"==a||"textarea"==a){p(d);f.on(d,"blur",c);f.on(d,"mousedown keyup keydown focus",o)}},destroy:function(d,a){f.__getEvents(d)[a]||p(d)}}},{requires:["event/base","dom"]});
KISSY.add("event",function(i,f,k){f.Target=k;return f},{requires:["event/base","event/target","event/object","event/focusin","event/mouseenter"]});