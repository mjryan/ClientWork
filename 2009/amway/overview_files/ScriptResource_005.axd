Type.registerNamespace("Telerik.Web.Animation");
var $TWA=Telerik.Web.Animation;
$TWA.registerAnimation=function(_1,_2){
if(_2&&((_2===$TWA.Animation)||(_2.inheritsFrom&&_2.inheritsFrom($TWA.Animation)))){
if(!$TWA.__animations){
$TWA.__animations={};
}
$TWA.__animations[_1.toLowerCase()]=_2;
_2.play=function(){
var _3=new _2();
_2.apply(_3,arguments);
_3.initialize();
var _4=Function.createDelegate(_3,function(){
_3.remove_ended(_4);
_4=null;
_3.dispose();
});
_3.add_ended(_4);
_3.play();
};
}else{
throw Error.argumentType("type",_2,$TWA.Animation,"Telerik.Web.Animation.registerAnimation can only register types that inherit from Telerik.Web.Animation.Animation");
}
};
$TWA.Animation=function(_5,_6,_7){
$TWA.Animation.initializeBase(this);
this._duration=1;
this._fps=25;
this._target=null;
this._tickHandler=null;
this._timer=null;
this._percentComplete=0;
this._percentDelta=null;
this._owner=null;
this._parentAnimation=null;
this.DynamicProperties={};
if(_5){
this.set_target(_5);
}
if(_6){
this.set_duration(_6);
}
if(_7){
this.set_fps(_7);
}
};
$TWA.Animation.prototype={dispose:function(){
if(this._timer){
this._timer.dispose();
this._timer=null;
}
this._tickHandler=null;
this._target=null;
$TWA.Animation.callBaseMethod(this,"dispose");
},play:function(){
if(!this._owner){
var _8=true;
if(!this._timer){
_8=false;
if(!this._tickHandler){
this._tickHandler=Function.createDelegate(this,this._onTimerTick);
}
this._timer=new Telerik.Web.Timer();
this._timer.add_tick(this._tickHandler);
this.onStart();
this._timer.set_interval(1000/this._fps);
this._percentDelta=100/(this._duration*this._fps);
this._updatePercentComplete(0,true);
}
this._timer.set_enabled(true);
this.raisePropertyChanged("isPlaying");
if(!_8){
this.raisePropertyChanged("isActive");
}
}
},pause:function(){
if(!this._owner){
if(this._timer){
this._timer.set_enabled(false);
this.raisePropertyChanged("isPlaying");
}
}
},stop:function(_9){
if(!this._owner){
var t=this._timer;
this._timer=null;
if(t){
t.dispose();
if(this._percentComplete!==100){
this._percentComplete=100;
this.raisePropertyChanged("percentComplete");
if(_9||_9===undefined){
this.onStep(100);
}
}
this.onEnd();
this.raisePropertyChanged("isPlaying");
this.raisePropertyChanged("isActive");
}
}
},onStart:function(){
this.raiseStarted();
for(var _b in this.DynamicProperties){
try{
this[_b](eval(this.DynamicProperties[_b]));
}
catch(ex){
if(Sys.Debug.isDebug){
throw ex;
}
}
}
},onStep:function(_c){
this.setValue(this.getAnimatedValue(_c));
},onEnd:function(){
this.raiseEnded();
},getAnimatedValue:function(_d){
throw Error.notImplemented();
},setValue:function(_e){
throw Error.notImplemented();
},interpolate:function(_f,end,_11){
return _f+(end-_f)*(_11/100);
},_onTimerTick:function(){
this._updatePercentComplete(this._percentComplete+this._percentDelta,true);
this.raise_onTick();
},_updatePercentComplete:function(_12,_13){
if(_12>100){
_12=100;
}
this._percentComplete=_12;
this.raisePropertyChanged("percentComplete");
if(_13){
this.onStep(_12);
}
if(_12===100){
this.stop(false);
}
},setOwner:function(_14){
this._owner=_14;
},raiseStarted:function(){
var _15=this.get_events().getHandler("started");
if(_15){
_15(this,Sys.EventArgs.Empty);
}
},add_started:function(_16){
this.get_events().addHandler("started",_16);
},remove_started:function(_17){
this.get_events().removeHandler("started",_17);
},raiseEnded:function(){
var _18=this.get_events().getHandler("ended");
if(_18){
_18(this,Sys.EventArgs.Empty);
}
},add_ended:function(_19){
this.get_events().addHandler("ended",_19);
},remove_ended:function(_1a){
this.get_events().removeHandler("ended",_1a);
},raise_onTick:function(){
var _1b=this.get_events().getHandler("onTick");
if(_1b){
_1b(this,Sys.EventArgs.Empty);
}
},add_onTick:function(_1c){
this.get_events().addHandler("onTick",_1c);
},remove_onTick:function(_1d){
this.get_events().removeHandler("onTick",_1d);
},get_target:function(){
if(!this._target&&this._parentAnimation){
return this._parentAnimation.get_target();
}
return this._target;
},set_target:function(_1e){
if(this._target!=_1e){
this._target=_1e;
this.raisePropertyChanged("target");
}
},set_animationTarget:function(id){
var _20=null;
var _21=$get(id);
if(_21){
_20=_21;
}else{
var _22=$find(id);
if(_22){
_21=_22.get_element();
if(_21){
_20=_21;
}
}
}
if(_20){
this.set_target(_20);
}else{
throw Error.argument("id",String.format("Telerik.Web.Animation.Animation.set_animationTarget requires the ID of a Sys.UI.DomElement or Sys.UI.Control.  No element or control could be found corresponding to \"{0}\"",id));
}
},get_duration:function(){
return this._duration;
},set_duration:function(_23){
_23=this._getFloat(_23);
if(this._duration!=_23){
this._duration=_23;
this.raisePropertyChanged("duration");
}
},get_fps:function(){
return this._fps;
},set_fps:function(_24){
_24=this._getInteger(_24);
if(this.fps!=_24){
this._fps=_24;
this.raisePropertyChanged("fps");
}
},get_isActive:function(){
return (this._timer!==null);
},get_isPlaying:function(){
return (this._timer!==null)&&this._timer.get_enabled();
},get_percentComplete:function(){
return this._percentComplete;
},_getBoolean:function(_25){
if(String.isInstanceOfType(_25)){
return Boolean.parse(_25);
}
return _25;
},_getInteger:function(_26){
if(String.isInstanceOfType(_26)){
return parseInt(_26);
}
return _26;
},_getFloat:function(_27){
if(String.isInstanceOfType(_27)){
return parseFloat(_27);
}
return _27;
},_getEnum:function(_28,_29){
if(String.isInstanceOfType(_28)&&_29&&_29.parse){
return _29.parse(_28);
}
return _28;
}};
$TWA.Animation.registerClass("Telerik.Web.Animation.Animation",Sys.Component);
$TWA.registerAnimation("animation",$TWA.Animation);
$TWA.ParentAnimation=function(_2a,_2b,fps,_2d){
$TWA.ParentAnimation.initializeBase(this,[_2a,_2b,fps]);
this._animations=[];
if(_2d&&_2d.length){
for(var i=0;i<_2d.length;i++){
this.add(_2d[i]);
}
}
};
$TWA.ParentAnimation.prototype={initialize:function(){
$TWA.ParentAnimation.callBaseMethod(this,"initialize");
if(this._animations){
for(var i=0;i<this._animations.length;i++){
var _30=this._animations[i];
if(_30&&!_30.get_isInitialized){
_30.initialize();
}
}
}
},dispose:function(){
this.clear();
this._animations=null;
$TWA.ParentAnimation.callBaseMethod(this,"dispose");
},get_animations:function(){
return this._animations;
},add:function(_31){
if(this._animations){
if(_31){
_31._parentAnimation=this;
}
Array.add(this._animations,_31);
this.raisePropertyChanged("animations");
}
},remove:function(_32){
if(this._animations){
if(_32){
_32.dispose();
}
Array.remove(this._animations,_32);
this.raisePropertyChanged("animations");
}
},removeAt:function(_33){
if(this._animations){
var _34=this._animations[_33];
if(_34){
_34.dispose();
}
Array.removeAt(this._animations,_33);
this.raisePropertyChanged("animations");
}
},clear:function(){
if(this._animations){
for(var i=this._animations.length-1;i>=0;i--){
this._animations[i].dispose();
this._animations[i]=null;
}
Array.clear(this._animations);
this._animations=[];
this.raisePropertyChanged("animations");
}
}};
$TWA.ParentAnimation.registerClass("Telerik.Web.Animation.ParentAnimation",$TWA.Animation);
$TWA.registerAnimation("parent",$TWA.ParentAnimation);
$TWA.ParallelAnimation=function(_36,_37,fps,_39){
$TWA.ParallelAnimation.initializeBase(this,[_36,_37,fps,_39]);
};
$TWA.ParallelAnimation.prototype={add:function(_3a){
$TWA.ParallelAnimation.callBaseMethod(this,"add",[_3a]);
_3a.setOwner(this);
},onStart:function(){
$TWA.ParallelAnimation.callBaseMethod(this,"onStart");
var _3b=this.get_animations();
for(var i=0;i<_3b.length;i++){
_3b[i].onStart();
}
},onStep:function(_3d){
var _3e=this.get_animations();
for(var i=0;i<_3e.length;i++){
_3e[i].onStep(_3d);
}
},onEnd:function(){
var _40=this.get_animations();
for(var i=0;i<_40.length;i++){
_40[i].onEnd();
}
$TWA.ParallelAnimation.callBaseMethod(this,"onEnd");
}};
$TWA.ParallelAnimation.registerClass("Telerik.Web.Animation.ParallelAnimation",$TWA.ParentAnimation);
$TWA.registerAnimation("parallel",$TWA.ParallelAnimation);
$TWA.FadeEffect=function(){
throw Error.invalidOperation();
};
$TWA.FadeEffect.prototype={FadeIn:0,FadeOut:1};
$TWA.FadeEffect.registerEnum("Telerik.Web.Animation.FadeEffect",false);
$TWA.FadeAnimation=function(_42,_43,fps,_45,_46,_47,_48){
$TWA.FadeAnimation.initializeBase(this,[_42,_43,fps]);
this._effect=(_45!==undefined)?_45:$TWA.FadeEffect.FadeIn;
this._max=(_47!==undefined)?_47:1;
this._min=(_46!==undefined)?_46:0;
this._start=this._min;
this._end=this._max;
this._layoutCreated=false;
this._forceLayoutInIE=(_48===undefined||_48===null)?true:_48;
this._currentTarget=null;
this._resetOpacities();
};
$TWA.FadeAnimation.prototype={_resetOpacities:function(){
if(this._effect==$TWA.FadeEffect.FadeIn){
this._start=this._min;
this._end=this._max;
}else{
this._start=this._max;
this._end=this._min;
}
},_createLayout:function(){
var _49=this._currentTarget;
if(_49){
var _4a=$telerik.getCurrentStyle(_49,"width");
var _4b=$telerik.getCurrentStyle(_49,"height");
var _4c=$telerik.getCurrentStyle(_49,"backgroundColor");
if((!_4a||_4a==""||_4a=="auto")&&(!_4b||_4b==""||_4b=="auto")){
_49.style.width=_49.offsetWidth+"px";
}
if(!_4c||_4c==""||_4c=="transparent"||_4c=="rgba(0, 0, 0, 0)"){
_49.style.backgroundColor=$telerik.getInheritedBackgroundColor(_49);
}
this._layoutCreated=true;
}
},onStart:function(){
$TWA.FadeAnimation.callBaseMethod(this,"onStart");
this._currentTarget=this.get_target();
this.setValue(this._start);
if(this._forceLayoutInIE&&!this._layoutCreated&&Sys.Browser.agent==Sys.Browser.InternetExplorer){
this._createLayout();
}
},getAnimatedValue:function(_4d){
return this.interpolate(this._start,this._end,_4d);
},setValue:function(_4e){
if(this._currentTarget){
$telerik.setOpacity(this._currentTarget,_4e);
}
},get_effect:function(){
return this._effect;
},set_effect:function(_4f){
_4f=this._getEnum(_4f,$TWA.FadeEffect);
if(this._effect!=_4f){
this._effect=_4f;
this._resetOpacities();
this.raisePropertyChanged("effect");
}
},get_minimumOpacity:function(){
return this._min;
},set_minimumOpacity:function(_50){
_50=this._getFloat(_50);
if(this._min!=_50){
this._min=_50;
this._resetOpacities();
this.raisePropertyChanged("minimumOpacity");
}
},get_maximumOpacity:function(){
return this._max;
},set_maximumOpacity:function(_51){
_51=this._getFloat(_51);
if(this._max!=_51){
this._max=_51;
this._resetOpacities();
this.raisePropertyChanged("maximumOpacity");
}
},get_forceLayoutInIE:function(){
return this._forceLayoutInIE;
},set_forceLayoutInIE:function(_52){
_52=this._getBoolean(_52);
if(this._forceLayoutInIE!=_52){
this._forceLayoutInIE=_52;
this.raisePropertyChanged("forceLayoutInIE");
}
},set_startValue:function(_53){
_53=this._getFloat(_53);
this._start=_53;
}};
$TWA.FadeAnimation.registerClass("Telerik.Web.Animation.FadeAnimation",$TWA.Animation);
$TWA.registerAnimation("fade",$TWA.FadeAnimation);
$TWA.FadeInAnimation=function(_54,_55,fps,_57,_58,_59){
$TWA.FadeInAnimation.initializeBase(this,[_54,_55,fps,$TWA.FadeEffect.FadeIn,_57,_58,_59]);
};
$TWA.FadeInAnimation.prototype={onStart:function(){
$TWA.FadeInAnimation.callBaseMethod(this,"onStart");
if(this._currentTarget){
this.set_startValue($telerik.getOpacity(this._currentTarget));
}
}};
$TWA.FadeInAnimation.registerClass("Telerik.Web.Animation.FadeInAnimation",$TWA.FadeAnimation);
$TWA.registerAnimation("fadeIn",$TWA.FadeInAnimation);
$TWA.FadeOutAnimation=function(_5a,_5b,fps,_5d,_5e,_5f){
$TWA.FadeOutAnimation.initializeBase(this,[_5a,_5b,fps,$TWA.FadeEffect.FadeOut,_5d,_5e,_5f]);
};
$TWA.FadeOutAnimation.prototype={onStart:function(){
$TWA.FadeOutAnimation.callBaseMethod(this,"onStart");
if(this._currentTarget){
this.set_startValue($telerik.getOpacity(this._currentTarget));
}
}};
$TWA.FadeOutAnimation.registerClass("Telerik.Web.Animation.FadeOutAnimation",$TWA.FadeAnimation);
$TWA.registerAnimation("fadeOut",$TWA.FadeOutAnimation);
$TWA.PropertyAnimation=function(_60,_61,fps,_63,_64){
$TWA.PropertyAnimation.initializeBase(this,[_60,_61,fps]);
this._property=_63;
this._propertyKey=_64;
this._currentTarget=null;
};
$TWA.PropertyAnimation.prototype={onStart:function(){
$TWA.PropertyAnimation.callBaseMethod(this,"onStart");
this._currentTarget=this.get_target();
},setValue:function(_65){
var _66=this._currentTarget;
if(_66&&this._property&&this._property.length>0){
if(this._propertyKey&&this._propertyKey.length>0&&_66[this._property]){
_66[this._property][this._propertyKey]=_65;
}else{
_66[this._property]=_65;
}
}
},getValue:function(){
var _67=this.get_target();
if(_67&&this._property&&this._property.length>0){
var _68=_67[this._property];
if(_68){
if(this._propertyKey&&this._propertyKey.length>0){
return _68[this._propertyKey];
}
return _68;
}
}
return null;
},get_property:function(){
return this._property;
},set_property:function(_69){
if(this._property!=_69){
this._property=_69;
this.raisePropertyChanged("property");
}
},get_propertyKey:function(){
return this._propertyKey;
},set_propertyKey:function(_6a){
if(this._propertyKey!=_6a){
this._propertyKey=_6a;
this.raisePropertyChanged("propertyKey");
}
}};
$TWA.PropertyAnimation.registerClass("Telerik.Web.Animation.PropertyAnimation",$TWA.Animation);
$TWA.registerAnimation("property",$TWA.PropertyAnimation);
$TWA.DiscreteAnimation=function(_6b,_6c,fps,_6e,_6f,_70){
$TWA.DiscreteAnimation.initializeBase(this,[_6b,_6c,fps,_6e,_6f]);
this._values=(_70&&_70.length)?_70:[];
};
$TWA.DiscreteAnimation.prototype={getAnimatedValue:function(_71){
var _72=Math.floor(this.interpolate(0,this._values.length-1,_71));
return this._values[_72];
},get_values:function(){
return this._values;
},set_values:function(_73){
if(this._values!=_73){
this._values=_73;
this.raisePropertyChanged("values");
}
}};
$TWA.DiscreteAnimation.registerClass("Telerik.Web.Animation.DiscreteAnimation",$TWA.PropertyAnimation);
$TWA.registerAnimation("discrete",$TWA.DiscreteAnimation);
$TWA.InterpolatedAnimation=function(_74,_75,fps,_77,_78,_79,_7a){
$TWA.InterpolatedAnimation.initializeBase(this,[_74,_75,fps,((_77!==undefined)?_77:"style"),_78]);
this._startValue=_79;
this._endValue=_7a;
};
$TWA.InterpolatedAnimation.prototype={get_startValue:function(){
return this._startValue;
},set_startValue:function(_7b){
_7b=this._getFloat(_7b);
if(this._startValue!=_7b){
this._startValue=_7b;
this.raisePropertyChanged("startValue");
}
},get_endValue:function(){
return this._endValue;
},set_endValue:function(_7c){
_7c=this._getFloat(_7c);
if(this._endValue!=_7c){
this._endValue=_7c;
this.raisePropertyChanged("endValue");
}
}};
$TWA.InterpolatedAnimation.registerClass("Telerik.Web.Animation.InterpolatedAnimation",$TWA.PropertyAnimation);
$TWA.registerAnimation("interpolated",$TWA.InterpolatedAnimation);
$TWA.ColorAnimation=function(_7d,_7e,fps,_80,_81,_82,_83){
$TWA.ColorAnimation.initializeBase(this,[_7d,_7e,fps,_80,_81,_82,_83]);
this._start=null;
this._end=null;
this._interpolateRed=false;
this._interpolateGreen=false;
this._interpolateBlue=false;
};
$TWA.ColorAnimation.prototype={onStart:function(){
$TWA.ColorAnimation.callBaseMethod(this,"onStart");
this._start=$TWA.ColorAnimation.getRGB(this.get_startValue());
this._end=$TWA.ColorAnimation.getRGB(this.get_endValue());
this._interpolateRed=(this._start.Red!=this._end.Red);
this._interpolateGreen=(this._start.Green!=this._end.Green);
this._interpolateBlue=(this._start.Blue!=this._end.Blue);
},getAnimatedValue:function(_84){
var r=this._start.Red;
var g=this._start.Green;
var b=this._start.Blue;
if(this._interpolateRed){
r=Math.round(this.interpolate(r,this._end.Red,_84));
}
if(this._interpolateGreen){
g=Math.round(this.interpolate(g,this._end.Green,_84));
}
if(this._interpolateBlue){
b=Math.round(this.interpolate(b,this._end.Blue,_84));
}
return $TWA.ColorAnimation.toColor(r,g,b);
},set_startValue:function(_88){
if(this._startValue!=_88){
this._startValue=_88;
this.raisePropertyChanged("startValue");
}
},set_endValue:function(_89){
if(this._endValue!=_89){
this._endValue=_89;
this.raisePropertyChanged("endValue");
}
}};
$TWA.ColorAnimation.getRGB=function(_8a){
if(!_8a||_8a.length!=7){
throw String.format("Color must be a 7-character hex representation (e.g. #246ACF), not \"{0}\"",_8a);
}
return {"Red":parseInt(_8a.substr(1,2),16),"Green":parseInt(_8a.substr(3,2),16),"Blue":parseInt(_8a.substr(5,2),16)};
};
$TWA.ColorAnimation.toColor=function(red,_8c,_8d){
var r=red.toString(16);
var g=_8c.toString(16);
var b=_8d.toString(16);
if(r.length==1){
r="0"+r;
}
if(g.length==1){
g="0"+g;
}
if(b.length==1){
b="0"+b;
}
return "#"+r+g+b;
};
$TWA.ColorAnimation.registerClass("Telerik.Web.Animation.ColorAnimation",$TWA.InterpolatedAnimation);
$TWA.registerAnimation("color",$TWA.ColorAnimation);
$TWA.LengthAnimation=function(_91,_92,fps,_94,_95,_96,_97,_98){
$TWA.LengthAnimation.initializeBase(this,[_91,_92,fps,_94,_95,_96,_97]);
this._unit=(_98!=null)?_98:"px";
};
$TWA.LengthAnimation.prototype={getAnimatedValue:function(_99){
var _9a=this.interpolate(this.get_startValue(),this.get_endValue(),_99);
return Math.round(_9a)+this._unit;
},get_unit:function(){
return this._unit;
},set_unit:function(_9b){
if(this._unit!=_9b){
this._unit=_9b;
this.raisePropertyChanged("unit");
}
}};
$TWA.LengthAnimation.registerClass("Telerik.Web.Animation.LengthAnimation",$TWA.InterpolatedAnimation);
$TWA.registerAnimation("length",$TWA.LengthAnimation);
$TWA.MoveAnimation=function(_9c,_9d,fps,_9f,_a0,_a1,_a2){
$TWA.MoveAnimation.initializeBase(this,[_9c,_9d,fps,null]);
this._horizontal=_9f?_9f:0;
this._vertical=_a0?_a0:0;
this._relative=(_a1===undefined)?true:_a1;
this._horizontalAnimation=new $TWA.LengthAnimation(_9c,_9d,fps,"style","left",null,null,_a2);
this._verticalAnimation=new $TWA.LengthAnimation(_9c,_9d,fps,"style","top",null,null,_a2);
this.add(this._verticalAnimation);
this.add(this._horizontalAnimation);
};
$TWA.MoveAnimation.prototype={onStart:function(){
$TWA.MoveAnimation.callBaseMethod(this,"onStart");
var _a3=this.get_target();
this._horizontalAnimation.set_startValue(_a3.offsetLeft);
this._horizontalAnimation.set_endValue(this._relative?_a3.offsetLeft+this._horizontal:this._horizontal);
this._verticalAnimation.set_startValue(_a3.offsetTop);
this._verticalAnimation.set_endValue(this._relative?_a3.offsetTop+this._vertical:this._vertical);
},get_horizontal:function(){
return this._horizontal;
},set_horizontal:function(_a4){
_a4=this._getFloat(_a4);
if(this._horizontal!=_a4){
this._horizontal=_a4;
this.raisePropertyChanged("horizontal");
}
},get_vertical:function(){
return this._vertical;
},set_vertical:function(_a5){
_a5=this._getFloat(_a5);
if(this._vertical!=_a5){
this._vertical=_a5;
this.raisePropertyChanged("vertical");
}
},get_relative:function(){
return this._relative;
},set_relative:function(_a6){
_a6=this._getBoolean(_a6);
if(this._relative!=_a6){
this._relative=_a6;
this.raisePropertyChanged("relative");
}
},get_unit:function(){
this._horizontalAnimation.get_unit();
},set_unit:function(_a7){
var _a8=this._horizontalAnimation.get_unit();
if(_a8!=_a7){
this._horizontalAnimation.set_unit(_a7);
this._verticalAnimation.set_unit(_a7);
this.raisePropertyChanged("unit");
}
}};
$TWA.MoveAnimation.registerClass("Telerik.Web.Animation.MoveAnimation",$TWA.ParallelAnimation);
$TWA.registerAnimation("move",$TWA.MoveAnimation);
$TWA.ResizeAnimation=function(_a9,_aa,fps,_ac,_ad,_ae){
$TWA.ResizeAnimation.initializeBase(this,[_a9,_aa,fps,null]);
this._width=_ac;
this._height=_ad;
this._horizontalAnimation=new $TWA.LengthAnimation(_a9,_aa,fps,"style","width",null,null,_ae);
this._verticalAnimation=new $TWA.LengthAnimation(_a9,_aa,fps,"style","height",null,null,_ae);
this.add(this._horizontalAnimation);
this.add(this._verticalAnimation);
};
$TWA.ResizeAnimation.prototype={onStart:function(){
$TWA.ResizeAnimation.callBaseMethod(this,"onStart");
var _af=this.get_target();
this._horizontalAnimation.set_startValue(_af.offsetWidth);
this._verticalAnimation.set_startValue(_af.offsetHeight);
this._horizontalAnimation.set_endValue((this._width!==null&&this._width!==undefined)?this._width:_af.offsetWidth);
this._verticalAnimation.set_endValue((this._height!==null&&this._height!==undefined)?this._height:_af.offsetHeight);
},get_width:function(){
return this._width;
},set_width:function(_b0){
_b0=this._getFloat(_b0);
if(this._width!=_b0){
this._width=_b0;
this.raisePropertyChanged("width");
}
},get_height:function(){
return this._height;
},set_height:function(_b1){
_b1=this._getFloat(_b1);
if(this._height!=_b1){
this._height=_b1;
this.raisePropertyChanged("height");
}
},get_unit:function(){
this._horizontalAnimation.get_unit();
},set_unit:function(_b2){
var _b3=this._horizontalAnimation.get_unit();
if(_b3!=_b2){
this._horizontalAnimation.set_unit(_b2);
this._verticalAnimation.set_unit(_b2);
this.raisePropertyChanged("unit");
}
}};
$TWA.ResizeAnimation.registerClass("Telerik.Web.Animation.ResizeAnimation",$TWA.ParallelAnimation);
$TWA.registerAnimation("resize",$TWA.ResizeAnimation);
$TWA.SequenceAnimation=function(_b4,_b5,fps,_b7,_b8){
$TWA.SequenceAnimation.initializeBase(this,[_b4,_b5,fps,_b7]);
this._handler=null;
this._paused=false;
this._playing=false;
this._index=0;
this._remainingIterations=0;
this._iterations=(_b8!==undefined)?_b8:1;
};
$TWA.SequenceAnimation.prototype={dispose:function(){
this._handler=null;
$TWA.SequenceAnimation.callBaseMethod(this,"dispose");
},stop:function(){
if(this._playing){
var _b9=this.get_animations();
if(this._index<_b9.length){
_b9[this._index].remove_ended(this._handler);
for(var i=this._index;i<_b9.length;i++){
_b9[i].stop();
}
}
this._playing=false;
this._paused=false;
this.raisePropertyChanged("isPlaying");
this.onEnd();
}
},pause:function(){
if(this.get_isPlaying()){
var _bb=this.get_animations()[this._index];
if(_bb!=null){
_bb.pause();
}
this._paused=true;
this.raisePropertyChanged("isPlaying");
}
},play:function(){
var _bc=this.get_animations();
if(!this._playing){
this._playing=true;
if(this._paused){
this._paused=false;
var _bd=_bc[this._index];
if(_bd!=null){
_bd.play();
this.raisePropertyChanged("isPlaying");
}
}else{
this.onStart();
this._index=0;
var _be=_bc[this._index];
if(_be){
_be.add_ended(this._handler);
_be.play();
this.raisePropertyChanged("isPlaying");
}else{
this.stop();
}
}
}
},onStart:function(){
$TWA.SequenceAnimation.callBaseMethod(this,"onStart");
this._remainingIterations=this._iterations-1;
if(!this._handler){
this._handler=Function.createDelegate(this,this._onEndAnimation);
}
},_onEndAnimation:function(){
var _bf=this.get_animations();
var _c0=_bf[this._index++];
if(_c0){
_c0.remove_ended(this._handler);
}
if(this._index<_bf.length){
var _c1=_bf[this._index];
_c1.add_ended(this._handler);
_c1.play();
}else{
if(this._remainingIterations>=1||this._iterations<=0){
this._remainingIterations--;
this._index=0;
var _c2=_bf[0];
_c2.add_ended(this._handler);
_c2.play();
}else{
this.stop();
}
}
},onStep:function(_c3){
throw Error.invalidOperation("CANNOT NEST");
},onEnd:function(){
this._remainingIterations=0;
$TWA.SequenceAnimation.callBaseMethod(this,"onEnd");
},get_isActive:function(){
return true;
},get_isPlaying:function(){
return this._playing&&!this._paused;
},get_iterations:function(){
return this._iterations;
},set_iterations:function(_c4){
_c4=this._getInteger(_c4);
if(this._iterations!=_c4){
this._iterations=_c4;
this.raisePropertyChanged("iterations");
}
},get_isInfinite:function(){
return this._iterations<=0;
}};
$TWA.SequenceAnimation.registerClass("Telerik.Web.Animation.SequenceAnimation",$TWA.ParentAnimation);
$TWA.registerAnimation("sequence",$TWA.SequenceAnimation);
$TWA.PulseAnimation=function(_c5,_c6,fps,_c8,_c9,_ca,_cb){
$TWA.PulseAnimation.initializeBase(this,[_c5,_c6,fps,null,((_c8!==undefined)?_c8:3)]);
this._out=new $TWA.FadeOutAnimation(_c5,_c6,fps,_c9,_ca,_cb);
this.add(this._out);
this._in=new $TWA.FadeInAnimation(_c5,_c6,fps,_c9,_ca,_cb);
this.add(this._in);
};
$TWA.PulseAnimation.prototype={get_minimumOpacity:function(){
return this._out.get_minimumOpacity();
},set_minimumOpacity:function(_cc){
_cc=this._getFloat(_cc);
this._out.set_minimumOpacity(_cc);
this._in.set_minimumOpacity(_cc);
this.raisePropertyChanged("minimumOpacity");
},get_maximumOpacity:function(){
return this._out.get_maximumOpacity();
},set_maximumOpacity:function(_cd){
_cd=this._getFloat(_cd);
this._out.set_maximumOpacity(_cd);
this._in.set_maximumOpacity(_cd);
this.raisePropertyChanged("maximumOpacity");
},get_forceLayoutInIE:function(){
return this._out.get_forceLayoutInIE();
},set_forceLayoutInIE:function(_ce){
_ce=this._getBoolean(_ce);
this._out.set_forceLayoutInIE(_ce);
this._in.set_forceLayoutInIE(_ce);
this.raisePropertyChanged("forceLayoutInIE");
},set_duration:function(_cf){
_cf=this._getFloat(_cf);
$TWA.PulseAnimation.callBaseMethod(this,"set_duration",[_cf]);
this._in.set_duration(_cf);
this._out.set_duration(_cf);
},set_fps:function(_d0){
_d0=this._getInteger(_d0);
$TWA.PulseAnimation.callBaseMethod(this,"set_fps",[_d0]);
this._in.set_fps(_d0);
this._out.set_fps(_d0);
}};
$TWA.PulseAnimation.registerClass("Telerik.Web.Animation.PulseAnimation",$TWA.SequenceAnimation);
$TWA.registerAnimation("pulse",$TWA.PulseAnimation);
Type.registerNamespace("Telerik.Web.UI.Animations");
Telerik.Web.UI.Animations.ShowHideAnimation=function(_d1,_d2,fps,_d4,_d5,_d6){
this.controller=_d1;
this._duration=(_d2!=null)?_d2:0.3;
this._fps=(fps!=null)?fps:50;
this._frames=_d2*fps;
this._position=null!=_d5?_d5:32;
this._animatedElement=_d4;
this._sourceElement=_d6;
this._startBounds=null;
this._endBounds=null;
this._showAnimation=null;
this._hideAnimation=null;
};
Telerik.Web.UI.Animations.ShowHideAnimation.prototype={_getHorizontalPosition:function(){
return parseInt((this._position+"").charAt(1));
},_getVerticalPosition:function(){
return parseInt((this._position+"").charAt(0));
},_onBeforeShow:function(){
},_onBeforeHide:function(){
},_onAfterShow:function(){
},_onAfterHide:function(){
},onShowStart:function(){
},onHideStart:function(){
},onShowEnd:function(){
},onHideEnd:function(){
},play:function(_d7){
var _d8=(true==_d7)?this._hideAnimation:this._showAnimation;
if(_d8){
if(!_d8.__isTelerikModified){
_d8.__isTelerikModified=true;
var _d9=_d8.onStart;
_d8.add_started(Function.createDelegate(this,function(){
if(_d7){
this.onHideStart();
}else{
this.onShowStart();
}
if(true==_d7){
this._onBeforeHide();
}else{
this._onBeforeShow();
}
}));
var _da=_d8.onEnd;
_d8.add_ended(Function.createDelegate(this,function(){
if(this.onEnd){
this.onEnd(_d7);
}
if(true==_d7){
this._onAfterHide();
}else{
this._onAfterShow();
}
if(_d7){
this.onHideEnd();
}else{
this.onShowEnd();
}
}));
}
_d8.set_duration(this._duration);
_d8.play();
}
this._runningAnimation=_d8;
},set_startBounds:function(_db){
this._startBounds=_db;
},set_endBounds:function(_dc){
this._endBounds=_dc;
},dispose:function(){
this.stop();
if(this._showAnimation){
this._showAnimation.dispose();
}
if(this._hideAnimation){
this._hideAnimation.dispose();
}
},stop:function(){
if(this._runningAnimation){
this._runningAnimation.stop();
this._runningAnimation=null;
}
},pause:function(){
if(this._runningAnimation){
this._runningAnimation.pause();
}
},resume:function(){
if(this._runningAnimation){
this._runningAnimation.play();
}
},set_position:function(_dd){
this._position=_dd;
},set_duration:function(_de){
this._duration=_de;
if(this._showAnimation){
this._showAnimation.set_duration(this._duration);
}
if(this._hideAnimation){
this._hideAnimation.set_duration(this._duration);
}
},get_startBounds:function(){
return this._startBounds;
},get_endBounds:function(){
return this._endBounds;
}};
Telerik.Web.UI.Animations.ShowHideAnimation.registerClass("Telerik.Web.UI.Animations.ShowHideAnimation",null);
Telerik.Web.UI.Animations.ResizeAnimation=function(_df,_e0,fps,_e2,_e3,_e4){
Telerik.Web.UI.Animations.ResizeAnimation.initializeBase(this,[_df,_e0,fps,_e2,_e3,_e4]);
var _e0=this._duration;
var fps=this._fps;
var _e5=this._animatedElement;
var _e6,_e7,_e8,_e9,_ea,_eb;
var _ec=new Telerik.Web.Animation.ResizeAnimation(_e5,_e0,fps,_e6,_e7,"px");
var _ed=new Telerik.Web.Animation.LengthAnimation(_e5,_e0,fps,"style","left",_ea,_eb,"px");
var _ee=new Telerik.Web.Animation.LengthAnimation(_e5,_e0,fps,"style","top",_e8,_e9,"px");
var _ef=new Telerik.Web.Animation.FadeInAnimation(_e5,_e0,fps,0.3,1,false);
this._showAnimation=new Telerik.Web.Animation.ParallelAnimation(_e5,_e0,fps,[_ec,_ed,_ee,_ef]);
this._hideAnimation=new Telerik.Web.Animation.FadeInAnimation(this._animatedElement,this._duration,this._fps,1,0,false);
};
Telerik.Web.UI.Animations.ResizeAnimation.prototype={_configureAnimatedElement:function(){
var _f0=this._animatedElement;
_f0.style.overflow="hidden";
_f0.style.display="";
_f0.style.visibility="visible";
_f0.style.width="1px";
_f0.style.height="1px";
},_configureAnimation:function(_f1){
var _f2=this._showAnimation.get_animations();
var _f3=_f2[0];
_f3.set_width(_f1.width);
_f3.set_height(_f1.height);
var _f4=_f2[1];
_f4.set_startValue(_f1.startX);
_f4.set_endValue(_f1.endX);
var _f5=_f2[2];
_f5.set_startValue(_f1.startY);
_f5.set_endValue(_f1.endY);
},_getStartBounds:function(){
var _f6=null;
if(this._startBounds){
_f6=this._startBounds;
}else{
if(this._sourceElement){
_f6=$telerik.getBounds(this._sourceElement);
}else{
_f6=new Sys.UI.Bounds(1,1,1,1);
}
}
return _f6;
},_getEndBounds:function(){
return this._endBounds;
},_modifyAnimationValues:function(_f7){
var _f8=this._animatedElement;
var _f9=this._getStartBounds();
if(_f9.width<_f7.width){
_f7.startX=_f9.x;
_f8.style.width=_f9.width;
}
if(_f9.height<_f7.height){
_f7.startY=_f9.y;
_f8.style.height=_f9.height;
}
},_setHorizontalValues:function(_fa){
var _fb=this._getHorizontalPosition();
var _fc=this._getEndBounds();
switch(_fb){
case 2:
_fa.startX=_fc.x+Math.floor(_fc.width/2);
_fa.endX=_fc.x;
break;
case 3:
_fa.startX=_fc.x;
_fa.endX=_fc.x;
break;
case 1:
_fa.startX=_fc.x+_fc.width;
_fa.endX=_fc.x;
}
},_setVerticalValues:function(_fd){
var _fe=this._getVerticalPosition();
var _ff=this._getEndBounds();
switch(_fe){
case 2:
_fd.startY=_ff.y+Math.floor(_ff.height/2);
_fd.endY=_ff.y;
break;
case 1:
_fd.startY=_ff.y+_ff.height;
_fd.endY=_ff.y;
break;
case 3:
_fd.startY=_ff.y;
_fd.endY=_ff.y;
}
},_setSizeValues:function(_100){
var _101=this._endBounds;
_100["width"]=_101.width;
_100["height"]=_101.height;
},_onBeforeShow:function(){
var _102={};
this._setHorizontalValues(_102);
this._setVerticalValues(_102);
this._setSizeValues(_102);
this._configureAnimatedElement();
this._modifyAnimationValues(_102);
this._configureAnimation(_102);
},_onAfterShow:function(){
this._animatedElement.style.overflow="";
this._animatedElement.style.filter="";
}};
Telerik.Web.UI.Animations.ResizeAnimation.registerClass("Telerik.Web.UI.Animations.ResizeAnimation",Telerik.Web.UI.Animations.ShowHideAnimation);
Telerik.Web.UI.Animations.SlideAnimation=function(_103,_104,fps,_106,_107,_108){
Telerik.Web.UI.Animations.SlideAnimation.initializeBase(this,[_103,_104,fps,_106,_107,_108]);
};
Telerik.Web.UI.Animations.SlideAnimation.prototype={_modifyAnimationValues:function(_109){
},_configureAnimatedElement:function(){
var _10a=this._animatedElement;
_10a.style.overflow="hidden";
_10a.style.display="";
_10a.style.visibility="visible";
var _10b=this._getVerticalPosition();
if(_10b==2){
_10a.style.width="1px";
}else{
_10a.style.height="1px";
}
},_setHorizontalValues:function(_10c){
var _10d=this._getHorizontalPosition();
var _10e=this._getEndBounds();
switch(_10d){
case 2:
_10c.startX=_10e.x;
_10c.endX=_10e.x;
break;
case 3:
_10c.startX=_10e.x;
_10c.endX=_10e.x;
break;
case 1:
var _10f=_10e.x;
if(2==this._getVerticalPosition()){
_10f+=_10e.width;
}
_10c.startX=_10f;
_10c.endX=_10e.x;
}
},_setVerticalValues:function(_110){
var _111=this._getVerticalPosition();
var _112=this._getEndBounds();
switch(_111){
case 2:
_110.startY=_112.y;
_110.endY=_112.y;
break;
case 1:
_110.startY=_112.y+_112.height;
_110.endY=_112.y;
break;
case 3:
_110.startY=_112.y;
_110.endY=_112.y;
}
}};
Telerik.Web.UI.Animations.SlideAnimation.registerClass("Telerik.Web.UI.Animations.SlideAnimation",Telerik.Web.UI.Animations.ResizeAnimation);
Telerik.Web.UI.Animations.FlyInAnimation=function(_113,_114,fps,_116,_117,_118){
Telerik.Web.UI.Animations.FlyInAnimation.initializeBase(this,[_113,_114,fps,_116,_117,_118]);
};
Telerik.Web.UI.Animations.FlyInAnimation.prototype={_modifyAnimationValues:function(_119){
},_setHorizontalValues:function(_11a){
var _11b=this._getHorizontalPosition();
var _11c=this._getEndBounds();
var _11d=$telerik.getClientBounds();
switch(_11b){
case 2:
_11a.startX=_11c.x;
_11a.endX=_11c.x;
break;
case 3:
_11a.startX=_11d.width;
_11a.endX=_11c.x;
break;
case 1:
_11a.startX=_11d.x;
_11a.endX=_11c.x;
}
},_setVerticalValues:function(_11e){
var _11f=this._getVerticalPosition();
var _120=this._getEndBounds();
var _121=$telerik.getClientBounds();
switch(_11f){
case 2:
_11e.startY=_120.y;
_11e.endY=_120.y;
break;
case 1:
_11e.startY=_121.y-_120.height;
_11e.endY=_120.y;
break;
case 3:
_11e.startY=_121.height;
_11e.endY=_120.y;
}
}};
Telerik.Web.UI.Animations.FlyInAnimation.registerClass("Telerik.Web.UI.Animations.FlyInAnimation",Telerik.Web.UI.Animations.ResizeAnimation);
Telerik.Web.UI.Animations.FadeAnimation=function(_122,_123,fps,_125){
Telerik.Web.UI.Animations.FadeAnimation.initializeBase(this,[_122,_123,fps,_125]);
this._showAnimation=new Telerik.Web.Animation.FadeInAnimation(this._animatedElement,this._duration,this._fps,0.5,1,false);
this._hideAnimation=new Telerik.Web.Animation.FadeInAnimation(this._animatedElement,this._duration,this._fps,0.9,0,false);
};
Telerik.Web.UI.Animations.FadeAnimation.prototype={_onAfterShow:function(){
this._animatedElement.style.filter="";
}};
Telerik.Web.UI.Animations.FadeAnimation.registerClass("Telerik.Web.UI.Animations.FadeAnimation",Telerik.Web.UI.Animations.ShowHideAnimation);
Telerik.Web.UI.Animations.SimpleResizeAnimation=function(_126,_127,fps,_129,_12a,_12b){
Telerik.Web.UI.Animations.SimpleResizeAnimation.initializeBase(this,[_126,_127,fps,_129,_12a,_12b]);
};
Telerik.Web.UI.Animations.SimpleResizeAnimation.prototype={_modifyAnimationValues:function(_12c){
},_configureAnimation:function(_12d){
Telerik.Web.UI.Animations.SimpleResizeAnimation.callBaseMethod(this,"_configureAnimation",[_12d]);
var _12e=this._showAnimation.get_animations();
var _12f=_12e[0];
var _130=this._getStartBounds();
_12f.onStart=function(){
$TWA.ResizeAnimation.callBaseMethod(this,"onStart");
var _131=this.get_target();
this._horizontalAnimation.set_startValue(_130.width);
this._verticalAnimation.set_startValue(_130.height);
this._horizontalAnimation.set_endValue((this._width!==null&&this._width!==undefined)?this._width:_131.offsetWidth);
this._verticalAnimation.set_endValue((this._height!==null&&this._height!==undefined)?this._height:_131.offsetHeight);
};
},_configureAnimatedElement:function(){
var _132=this._animatedElement;
_132.style.overflow="hidden";
_132.style.display="";
_132.style.visibility="visible";
},_setHorizontalValues:function(_133){
var _134=this._getHorizontalPosition();
var _135=this._getStartBounds();
var _136=this._getEndBounds();
_133.startX=_135.x;
_133.endX=_136.x;
},_setVerticalValues:function(_137){
var _138=this._getVerticalPosition();
var _139=this._getStartBounds();
var _13a=this._getEndBounds();
_137.startY=_139.y;
_137.endY=_13a.y;
}};
Telerik.Web.UI.Animations.SimpleResizeAnimation.registerClass("Telerik.Web.UI.Animations.SimpleResizeAnimation",Telerik.Web.UI.Animations.ResizeAnimation);
Telerik.Web.UI.Animations.ScrollAnimation=function(_13b,_13c,fps,_13e,_13f,_140){
Telerik.Web.UI.Animations.ScrollAnimation.initializeBase(this,[_13b,_13c,fps,_13e,_13f,_140]);
var _141=this._showAnimation.get_animations();
if(_141[3]){
this._showAnimation.remove(_141[3]);
}
};
Telerik.Web.UI.Animations.ScrollAnimation.prototype={_modifyAnimationValues:function(_142){
},_configureAnimatedElement:function(){
},_setHorizontalValues:function(_143){
var _144=this._getStartBounds();
var _145=this._getEndBounds();
var _146=this._getHorizontalPosition();
switch(_146){
case 2:
_143.startX=_144.x;
_143.endX=_144.x;
break;
case 3:
_143.startX=_144.x;
_143.endX=_144.x+_145.x;
break;
case 1:
_143.startX=_144.x;
_143.endX=_144.x-_145.x;
}
},_setVerticalValues:function(_147){
var _148=this._getVerticalPosition();
var _149=this._getStartBounds();
var _14a=this._getEndBounds();
switch(_148){
case 2:
_147.startY=_14a.y;
_147.endY=_14a.y;
break;
case 1:
_147.startY=_149.y;
_147.endY=_149.y-_14a.y;
break;
case 3:
_147.startY=_149.y;
_147.endY=_149.y+_14a.y;
}
}};
Telerik.Web.UI.Animations.ScrollAnimation.registerClass("Telerik.Web.UI.Animations.ScrollAnimation",Telerik.Web.UI.Animations.ResizeAnimation);


if(typeof(Sys)!=='undefined')Sys.Application.notifyScriptLoaded();