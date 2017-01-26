
	<!--
	 function getCookie(name) {
	  var dc = document.cookie;
	  var prefix = name + "=";
	  var begin = dc.indexOf("; " + prefix);
	  if (begin == -1) {
	    begin = dc.indexOf(prefix);
	    if (begin != 0) return null;
	  } else
	    begin += 2;
	  var end = document.cookie.indexOf(";", begin);
	  if (end == -1)
	    end = dc.length;
	  return unescape(dc.substring(begin + prefix.length, end));
	}

	function setCookie(name, value, expires, path, domain, secure) {
		var curCookie = name + "=" + escape(value) +
		((expires) ? "; expires=" + expires.toGMTString() : "") +
		((path) ? "; path=" + path : "") +
		((domain) ? "; domain=" + domain : "") +
		((secure) ? "; secure" : "");
		document.cookie = curCookie;
	}

	// This function set up, and creates the cookie,
	function bakeCookie() {
		// Set the Name
		var cookieName = "billboards";

		// Creating and Setting a weighted cookieData value
		var banners = ["euc", "star", "sea"];
		var bannerweight = [3, 3, 3]; // weight of each element above
		var totalweight = eval(bannerweight.join("+")); // get total weight (in this case, 10)
		var weighedbanners = new Array(); // new array to hold "weighted" banners
		var currentbanner = 0;

		while (currentbanner<banners.length){ //step through each banners[] element
		for (i=0; i<bannerweight[currentbanner]; i++)
		weighedbanners[weighedbanners.length]=banners[currentbanner]
		currentbanner++
		}

		var randomnumber = Math.floor(Math.random()*totalweight);
		var cookieData = weighedbanners[randomnumber]; // filled with a value from banners


		// Time expires
		exprs = "";
		// Make the cookie
	  	setCookie(cookieName, cookieData, exprs);
		// alert("Value of cookieData is: " + cookieData + "!");  // debug shows the value of cookieData
	}
	//-->

	<!--
		// Checks for cookie on first visit
		// if the cookie wasn't found, sets cookie
		// and adds the random value to variable bbs
		if (!document.cookie) {
			bakeCookie();
			var bbs = getCookie("billboards");
		  }
			var bbs = getCookie("billboards");

		// alert("Value of bbs is: " + bbs + "!");  // debug shows the value of bbs
	//-->

		<!--
		 // BILLBOARDSWAP:
		function swap() {
		  switch (bbs){
			 case "euc" :
					var sText = ("<div><img src='images/home/euc_pattern.gif' width='118' height='519' alt='' border='0'></div>")
					sText += ("<div><img src='images/home/euc_anim.gif' width='178' height='130' alt='' border='0'><img ")
					sText += ("src='images/home/euc_img_top.jpg' width='192' height='130' alt='' border='0'><br><img ")
					sText += ("src='images/home/euc_img_btm.jpg' width='370' height='389' alt='' border='0'></div>")
					document.write(sText);
					bakeCookie();
		  	break;
			 case "star" :
					var sText = ("<div><img src='images/home/starling_pattern.gif' width='118' height='519' alt='' border='0'></div>")
					sText += ("<div><img src='images/home/starling_img_top.jpg' alt='' border='0'><br><img ")
					sText += ("src='images/home/starling_anim.gif' alt='' border='0'></div>")
					document.write(sText);
					bakeCookie();
		  	break;
			 case "sea" :
					var sText = ("<div><img src='images/home/seaweed_pattern.gif' width='118' height='519' alt='' border='0'></div>")
					sText += ("<div><img src='images/home/seaweed_anim.gif' width='370' height='45' alt='' border='0'><br><img ")
					sText += ("src='images/home/seaweed_img_btm.jpg' width='370' height='474' alt='' border='0'></div>")
					document.write(sText);
					bakeCookie();
		 	 break;
			default :
					var sText = ("<div><img src='images/home/euc_pattern.gif' width='118' height='519' alt='' border='0'></div>")
					sText += ("<div><img src='images/home/euc_anim.gif' width='178' height='130' alt='' border='0'><img ")
					sText += ("src='images/home/euc_img_top.jpg' width='192' height='130' alt='' border='0'><br><img ")
					sText += ("src='images/home/euc_img_btm.jpg' width='370' height='389' alt='' border='0'></div>")
					document.write(sText);
				break;
		 }
		}
		//-->
