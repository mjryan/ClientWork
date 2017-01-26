Type.registerNamespace("Telerik.Web.UI");
Telerik.Web.UI.ScrollerOrientation=function(){
};
Telerik.Web.UI.ScrollerOrientation.prototype={Vertical:0,Horizontal:1};
Telerik.Web.UI.ScrollerOrientation.registerEnum("Telerik.Web.UI.ScrollerOrientation");
Telerik.Web.UI.ScrollerSpeed=function(){
};
Telerik.Web.UI.ScrollerSpeed.prototype={Invalid:0,Slow:1,Medium:2,Fast:3};
Telerik.Web.UI.ScrollerSpeed.registerEnum("Telerik.Web.UI.ScrollerSpeed");
Telerik.Web.UI.ArrowPosition=function(){
};
Telerik.Web.UI.ArrowPosition.prototype={Top:0,Bottom:1,Left:2,Right:3};
Telerik.Web.UI.ArrowPosition.registerEnum("Telerik.Web.UI.ArrowPosition");
Telerik.Web.UI.Scroller=function(_1,_2,_3){
this._timerInterval=10;
this._scrolledElement=_1;
this._element=_2;
this._orientation=_3;
this._minPosition=0;
this._maxPosition=null;
this._currentPosition=0;
this._speed=Telerik.Web.UI.ScrollerSpeed.Invalid;
this._direction=0;
this._events=null;
this._timer=null;
this._onTickDelegate=null;
};
Telerik.Web.UI.Scroller.prototype={initialize:function(){
this._onTickDelegate=Function.createDelegate(this,this._onTick);
this._timer=new Telerik.Web.Timer();
this._timer.set_interval(this._timerInterval);
this._timer.add_tick(this._onTickDelegate);
},dispose:function(){
if(this._timer){
this._timer.dispose();
}
this._onTickDelegate=null;
this._events=null;
},get_element:function(){
return this._element;
},get_events:function(){
if(!this._events){
this._events=new Sys.EventHandlerList();
}
return this._events;
},add_positionChanged:function(_4){
this.get_events().addHandler("positionChanged",_4);
},remove_positionChanged:function(_5){
this.get_events().removeHandler("positionChanged",_5);
},setScrollingLimits:function(_6,_7){
this._minPosition=Math.max(0,_6);
this._maxPosition=Math.min(this._getElementSize(),_7);
},isAtMinPosition:function(){
return this._currentPosition<=this._minPosition;
},isAtMaxPosition:function(){
return this._currentPosition>=this._maxPosition;
},resetState:function(){
this._resetOverflowStyle();
this._scrollTo(0);
},startScroll:function(_8,_9){
this._speed=_8;
this._direction=_9;
this._timer.set_enabled(true);
},changeScrollSpeed:function(_a){
this._speed=_a;
},stopScroll:function(){
this._speed=Telerik.Web.UI.ScrollerSpeed.Invalid;
this._direction=0;
this._timer.set_enabled(false);
},scrollToMaxPosition:function(){
this._scrollTo(this._maxPosition);
},_onTick:function(){
var _b=this._currentPosition+(this._direction*this._speed);
_b=Math.max(_b,this._minPosition);
_b=Math.min(_b,this._maxPosition);
this._scrollTo(_b);
if(_b==this._minPosition||_b==this._maxPosition){
this.stopScroll();
}
},_scrollTo:function(_c){
var _d="left";
if(this._orientation==Telerik.Web.UI.ScrollerOrientation.Vertical){
_d="top";
}
this._currentPosition=_c;
this._scrolledElement.style[_d]=-_c+"px";
this._raiseEvent("positionChanged",Sys.EventArgs.Empty);
},_resetOverflowStyle:function(){
if($telerik.isIE){
this._element.style.overflow="visible";
if(this._orientation==Telerik.Web.UI.ItemFlow.Vertical){
this._element.style.overflowX="visible";
this._element.style.overflowY="hidden";
}else{
this._element.style.overflowX="hidden";
this._element.style.overflowY="hidden";
}
}else{
this._element.style.overflow="hidden";
}
},_getElementSize:function(){
if(this._orientation==Telerik.Web.UI.ScrollerOrientation.Vertical){
return this._scrolledElement.offsetHeight;
}else{
return this._scrolledElement.offsetWidth;
}
},_raiseEvent:function(_e,_f){
var _10=this.get_events().getHandler(_e);
if(_10){
if(!_f){
_f=Sys.EventArgs.Empty;
}
_10(this,_f);
}
}};
Telerik.Web.UI.Scroller.registerClass("Telerik.Web.UI.Scroller",null,Sys.IDisposable);


if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();