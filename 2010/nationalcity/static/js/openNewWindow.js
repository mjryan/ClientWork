




/*
     FILE ARCHIVED ON 1:37:19 Jul 13, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:28:54 Aug 8, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
function openNewWindow(URL,name,top,left,width,height,options){
var sOptions
if (navigator.appName.indexOf("Microsoft") != -1){
sOptions = options + ",left=" + left + ",top=" + top + ",width=" + width + ",height=" + height;	}
else{sOptions = options + ",screenX=" + left + ",screenY=" + top + ",outerWidth=" + width + ",outerHeight=" + height;}
var w = window.open(URL, name, sOptions);}	