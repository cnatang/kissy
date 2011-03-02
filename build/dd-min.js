/*
Copyright 2011, KISSY UI Library v1.20dev
MIT Licensed
build time: ${build.time}
*/
KISSY.add("dd/ddm",function(e,j,h,l,k){function g(){g.superclass.constructor.apply(this,arguments);this._init()}function i(b,d,f){f=f||150;if(f===-1)return function(){b.apply(d,arguments)};var m=e.now();return function(){var n=e.now();if(n-m>f){m=n;b.apply(d,arguments)}}}var a=document,c=e.require("node/node");g.ATTRS={bufferTime:{value:200},activeDrag:{}};e.extend(g,k,{_init:function(){this._showShimMove=i(this._move,this,30)},_move:function(b){var d=this.get("activeDrag");if(d){b.preventDefault();
d._move(b)}},_start:function(b){var d=this,f=d.get("bufferTime")||0;d._registerEvent();if(f)d._bufferTimer=setTimeout(function(){d._bufferStart(b)},f);else d._bufferStart(b)},_bufferStart:function(b){this.set("activeDrag",b);b.get("shim")&&this._activeShim();b._start()},_end:function(b){var d=this.get("activeDrag");this._unregisterEvent();if(this._bufferTimer){clearTimeout(this._bufferTimer);this._bufferTimer=null}this._shim&&this._shim.css({display:"none"});if(d){d._end(b);this.set("activeDrag",
null)}},_activeShim:function(){var b=document;this._shim=(new c("<div style='background-color:red;position:absolute;left:0;width:100%;top:0;z-index:999999;'></div>")).appendTo(b.body);this._shim.css("opacity",0);this._activeShim=this._showShim;this._showShim()},_showShim:function(){this._shim.css({display:"",height:j.docHeight()})},_registerEvent:function(){h.on(a,"mouseup",this._end,this);h.on(a,"mousemove",this._showShimMove,this)},_unregisterEvent:function(){h.remove(a,"mousemove",this._showShimMove,
this);h.remove(a,"mouseup",this._end,this)}});return new g},{requires:["dom","event","node","base"]});
KISSY.add("dd/draggable",function(e,j,h,l,k){function g(){g.superclass.constructor.apply(this,arguments);this._init()}var i=e.require("node/node");g.ATTRS={node:{setter:function(a){return i.one(a)}},shim:{value:true},handlers:{value:[],setter:function(a){if(a)for(var c=0;c<a.length;c++){a[c]=i.one(a[c]);a[c].unselectable()}}}};e.extend(g,l,{_init:function(){var a=this.get("node"),c=this.get("handlers");if(c.length==0)c[0]=a;for(var b=0;b<c.length;b++){var d=c[b],f=d.css("cursor");if(d[0]!=a[0])if(!f||
f==="auto")d.css("cursor","move")}a.on("mousedown",this._handleMouseDown,this)},destroy:function(){for(var a=this.get("node"),c=this.get("handlers"),b=0;b<c.length;b++){var d=c[b];d.css("cursor")=="move"&&d.css("cursor","auto")}a.detach("mousedown",this._handleMouseDown,this);this.detach()},_check:function(a){for(var c=this.get("handlers"),b=0;b<c.length;b++){var d=c[b];if(d.contains(a)||d[0]==a[0])return true}return false},_handleMouseDown:function(a){if(this._check(new i(a.target))){a.preventDefault();
k._start(this);var c=this.get("node"),b=a.pageX;a=a.pageY;c=c.offset();this.startMousePos={left:b,top:a};this.startNodePos=c;this._diff={left:b-c.left,top:a-c.top};this.set("diff",this._diff)}},_move:function(a){var c=this.get("diff");this.fire("drag",{left:a.pageX-c.left,top:a.pageY-c.top})},_end:function(){this.fire("dragend")},_start:function(){this.fire("dragstart")}});return g},{requires:["ua","node","base","dd/ddm"]});KISSY.add("dd",function(e,j){var h={Draggable:j};e.mix(e,h);return h},{requires:["dd/draggable"]});
