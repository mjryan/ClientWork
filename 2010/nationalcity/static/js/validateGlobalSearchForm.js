




/*
     FILE ARCHIVED ON 1:37:14 Jul 13, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:28:55 Aug 8, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
function validateGlobalSearchForm(formName){
switch(formName)
{
case "frmSearch":
if (isEmpty(document.frmSearch.qt.value)){
alert("Please enter a search keyword or phrase.");
frmSearch.qt.style.color = "red";
frmSearch.qt.focus();}
else{document.frmSearch.submit();}
break;
case "frmSearchAgain":
if (isEmpty(document.frmSearchAgain.qt.value)){
	alert("Please enter a search keyword or phrase.");
	frmSearchAgain.qt.style.color = "red";
	frmSearchAgain.qt.focus();}
else{document.frmSearchAgain.submit();}
break; }}
	
