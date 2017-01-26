if (window.createPopup && document.compatMode && document.compatMode=="CSS1Compat"){
  document.onreadystatechange = onresize = function fixIE6AbsPos(){
    if (!document.body) return;
    if (document.body.style.margin != "0px") document.body.style.margin = 0;
    onresize = null;
    document.body.style.height = 0;
    setTimeout(function(){ document.body.style.height = document.documentElement.scrollHeight+"px"; }, 1);
    setTimeout(function(){ onresize = fixIE6AbsPos; }, 100);
  }
}

function setCookie(name, value, expires, path, domain, secure) 
{
  document.cookie = name + "=" + escape(value) +  ((expires == null) ? "" : "; expires=" + expires.toGMTString()) +  ((path == null) ? "" : "; path=" + path) +  ((domain == null) ? "" : "; domain=" + domain) +  ((secure == null) ? "" : "; secure");
}

function urlJump (thisSelect) 
{
    if (thisSelect.options[thisSelect.selectedIndex] != "") 
    { 
	location.href = thisSelect.options[thisSelect.selectedIndex].value;
    }
}

function getName() 
{
    var fn = getCookie('first_name');
    var ln = getCookie('last_name');
    if (fn)
    {
        if ((fn.length>0) || (ln.length>0))
        {
            return (fn +  " " + ln);
        }
    }
}

function getHBSegment()
{
    var cname = "hbSeg=";
    var dc = document.cookie;
    if (dc.length > 0)
    {
        begin = dc.indexOf(cname);
        if (begin != -1)
        {
            begin += cname.length;
            end = dc.indexOf(";", begin);
            if (end == -1)
            {
                end = dc.length;
            }
            return unescape(dc.substring(begin, end));
        }
    }
    return "11";
}

function getCookie(name)
{
    var cname = name + "=";
    var dc = document.cookie;
    if (dc.length > 0) 
    {
        begin = dc.indexOf(cname);
        if (begin != -1) 
        {
            begin += cname.length;
            end = dc.indexOf(";", begin);
            if (end == -1) end = dc.length;
            return unescape(dc.substring(begin, end));
        }
    }
    return null;
}

function SetHomePage () 
{    
    var HomePageUrl="http://www.chicagobusiness.com";
    var agree=confirm("Would you like to set your homepage to ChicagoBusiness.com?");
    if (agree)
    {	
    	if (document.all) 

    	{
            if (document.body.addBehavior) 
            {
    	    	document.body.addBehavior ("#default#homePage");
       	    	document.body.setHomePage(HomePageUrl);
      	    }
   	    else 
	    {
    	    	window.external.AddFavorite(HomePageUrl, "ChicagoBusiness.com");
   	    }
    	}
    	else if (netscape.security && navigator.preference) 
    	{
   	    netscape.security.PrivilegeManager.enablePrivilege("UniversalPreferencesWrite");
   	    navigator.preference("browser.startup.page", "1");
   	    navigator.preference("browser.startup.homepage", HomePageUrl);
    	}
        else 
    	{
   	    alert ("This feature is not supported in your browser.");
     	}
    }   
}

function registerPop() 
{
	var fn = getCookie('first_name');
	var ln = getCookie('last_name');
	var st = getCookie('subType');
	var expiration = new Date();
	expiration.setTime (expiration.getTime() + (1000 * 60 * 60 * 24 * 1));
	// This is a cookied person
	if (fn)
	{	
            return;
	}
	else	
	{
		var now = new Date();
		//set to expire in one day
		var rp = getCookie('regpop');
		
		if (rp == "yuppa") 
		{
		} 
		else 
		{
		    if (!st)
		    {
//window.open('http://oas-central.realmedia.com/RealMedia/ads/Creatives/crain/CBO_INTERSTITIAL_LOCKDOWN/ccb_pop.html','subpop',config='toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,height=50,width=50');
//setCookie('regpop', 'yuppa', expiration, '/', '.chicagobusiness.com'); 
				
      		    }
	        }
	}
}

