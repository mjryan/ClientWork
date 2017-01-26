




/*
     FILE ARCHIVED ON 1:37:24 Jul 13, 2010 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 20:28:54 Aug 8, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
//  Javascript function:  setDefaultView - Sets the Default view on section home pages
//
//  Arguments:
//		sectionName - String object containing section name
//    divId - String object containing the div tag name which will need to be hidden
//      
//  Usage Example: 
//    setDefaultView("Personal","divHomePage");
//		

function setDefaultView(sectionName,ChkState) {
			//check for the browser version
			var ns4 = (document.layers) ? true : false;
			var ie4 = (document.all && !document.getElementById) ? true : false;
			var ie5 = (document.all && document.getElementById) ? true : false;
			var ns6 = (!document.all && document.getElementById) ? true : false;
			
			if(ChkState==true)
			{
				//set cookie and hide the link
				var dtExpire
				dtExpire = new Date(); 
				dtExpire.setFullYear(dtExpire.getFullYear() + 100); 

  				document.cookie = "DefaultPage" + "=" + escape(sectionName)+ ";path=/;expires=" + dtExpire.toGMTString() + ";"
  				//if(ns4) obj.visibility = "hidden";
				//	else obj.style.visibility = "hidden";

				//alert("Your default view is now set to " + sectionName)
			}
			else
			{
				document.cookie = "DefaultPage" + "=" + escape(sectionName)+ ";path=/;expires=Thu, 01-Jan-2000 00:00:01 GMT";	
			}
}	


		