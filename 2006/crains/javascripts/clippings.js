function arraySplice (array, i) {
	if (array.splice) {
		// dataSource.selectedClippings.splice (i, 1);
		return array.splice (i, 1);
	}
	else {
		array = array.slice (0, i).concat(array.slice(i+1));
		return array;
	}
}
function arrayPop (array) {
	if (array.pop) {
		array.pop(); // split seems to return an extra element here so pop it off the array
		return array;
	}
	else {
		array = array.slice (0, array.length - 1);
		return array;
	}
}


function getEventTarget (e) {
	e = (window.event) ? window.event : e;
	var target = (e.currentTarget) ? e.currentTarget : e.srcElement;
	if (target.nodeType) {
		if (target.nodeType == 9) {
			target = target;
		}
		else if (target.nodeType != 1) {
			target = target.parentNode;
		}
	}
	return target;
}
function getEventTargetByTagName (tagName, e) {
	var target = getEventTarget (e);
	var targetNodeName = target.nodeName.toLowerCase ();
	tagName = tagName.toLowerCase ();
	while (targetNodeName != tagName) {
		target = target.parentNode;
		targetNodeName = target.nodeName.toLowerCase ();
	}
	return target;
}
function eventReturn (e, returnValue) {
	e = (window.event) ? window.event : e;
	if (returnValue == false && e.preventDefault) {
		e.preventDefault ();
	}
	else {
		e.returnValue = returnValue;
		return returnValue;
	}
}
function cancelEventBubbling (e) {
	e = (window.event) ? window.event : e;
	if (e.stopPropagation) {
		e.stopPropagation ();
	}
	e.cancelBubble = true;
}


var clipCookieValues = new Array(1);


function Clippings (args) {
	this.jsName = args.jsName; //Required. Used for Mac IE
	this.cookieName = args.cookieName; //Required
	this.cookieDomain = args.cookieDomain; //Optional
	if (!this.cookieDomain) {
		this.cookieDomain = location.hostname;	
	}
	
	this.availableClippingName = args.availableClippingName; //Required
	this.availableClippingClass = args.availableClippingClass; //Required
	this.toggleName = args.toggleName; //Required
	
	this.removeAllName = args.removeAllName;
	this.removeAllReadName = args.removeAllReadName;
	this.removeSelectedName = args.removeSelectedName;
	this.bookmarkSelectedName = args.bookmarkSelectedName;
	this.emailSelectedName = args.emailSelectedName;
	
	// User these two CSS class name to toggle tool link's label
	this.hasSelectionsClass = args.hasSelectionsClass;
	this.hasNoSelectionClass = args.hasNoSelectionClass;
	
	this.menuId = args.menuId; //Required
	this.menuObject = null;
	this.countId = args.countId;
	this.countObject = null;
	this.clippingsId = args.clippingsId; //Required
	this.clippingsObject = null;
	
	this.clippingTemplateId = args.clippingTemplateId; //Required
	this.clippingTemplateObject = null;
	this.readClippingTemplateId = args.readClippingTemplateId; //Required
	this.readClippingTemplateObject = null;
	this.clippingTitleName = args.clippingTitleName; //Required
	
	this.clippingsContainerId = args.clippingsContainerId; //Required
	this.clippingsContainerObject = null;
	this.clippingsEmailFormObject = null;

	

	this.selectedClippings = [];
	this.cv;
	this.cookieValues;
	this.maxNumOfClippings = args.maxNumOfClippings;
	if (!this.maxNumOfClippings) {
		this.maxNumOfClippings = 20;	
	}
}
new Clippings ({});

// document click handler
Clippings.prototype.documentClick = Clippings_DocumentClick;
function Clippings_DocumentClick (e) {
	if (document.clippingsCollection) {
		var c = document.clippingsCollection.length;
		for (var i=0; i<c; i++) {
			var clippings = document.clippingsCollection[i];
			if (clippings.menuObject) {
				clippings.menuObject.style.display = "none";
			}
		}
	}
}



// adds a clipping to the cookie, prevents the addition of duplicates
Clippings.prototype.addClipping = Clippings_AddClipping;
function Clippings_AddClipping (e)
{
	var target = getEventTargetByTagName ("a", e);
	if (!target || !target.dataSource) {
		return true;
	}
	var dataSource = target.dataSource;
	
	var url = target.href.replace (/http[s]*:\/\/[^\/]+/, "");
	var headline = target.title;
	var obj = target;
    if (headline.indexOf("|039|") != -1) 
    {
		headline = headline.replace(/\|039\|/g, "&#039;");
    }
	
	var cv1 = dataSource.readClipCookie ();
	dataSource.cookieValues = dataSource.parseClipCookie (cv1);
	var newclippingstring = dataSource.cookieValues[0];
	var clippings = dataSource.cookieValues[0].split("~");
	if (clippings.length > dataSource.maxNumOfClippings) {
		alert ("You cannot store more than " + dataSource.maxNumOfClippings + " clippings.");
		cancelEventBubbling (e);
		return eventReturn (e, false);
	}
	
    for (var i = 0; i < (clippings.length - 1); i++)
    {
		var clippingsVals = clippings[i].split("^");
		if (clippingsVals[0] == url)
		{
			return eventReturn (e, true);
		}
    }		
		
    var newclipping = url + "^" + escape(headline) + "^" + "0~";
    newclippingstring = newclippingstring + newclipping;
    dataSource.cv = "clippings:" + newclippingstring;
    dataSource.createClipCookie (7);

	dataSource.redrawClippings ();
	
	cancelEventBubbling (e);
	return eventReturn (e, false);
}


// displays the clippings from the cookie
Clippings.prototype.displayClippings = Clippings_DisplayClippings;
function Clippings_DisplayClippings (e) {
	var target = getEventTargetByTagName ("a", e);
	if (!target || !target.dataSource) {
		return true;
	}
	var dataSource = target.dataSource;

	var cv1 = dataSource.readClipCookie ();
    dataSource.cookieValues = dataSource.parseClipCookie(cv1);
    var clippings = dataSource.cookieValues[0].split("~");

	if (dataSource.menuObject) {
		if (dataSource.menuObject.style.display == "none") {
			dataSource.menuObject.style.display = "block";
		}
		else {
			dataSource.menuObject.style.display = "none";
		}
	}

	cancelEventBubbling (e);
	return eventReturn (e, false);
}


// redraw the clippings area
Clippings.prototype.redrawClippings = Clippings_RedrawClippings;
function Clippings_RedrawClippings () {
    this.countClippings();
	if (this.clippingsObject) {
		var cv1 = this.readClipCookie ();
		var cookieValues = this.parseClipCookie(cv1);
		var clippings = cookieValues[0].split("~");
		var html = "";
		
		var clippingsChildren = this.clippingsObject.childNodes;
		while (clippingsChildren.length > 0) {
			this.clippingsObject.removeChild (clippingsChildren[0]);
			clippingsChildren = this.clippingsObject.childNodes;
		}
		
		var newHTML = ""; // For Mac IE;
		
		for (var i = 0; i < (clippings.length - 1); i++)
		{
			var clippingsVals = clippings[i].split("^");
			var clippingTemplate = null;
			if (clippingsVals[2] == 1)
			{
				// this link has been marked as read
				if (this.readClippingTemplateObject) {
					clippingTemplate = this.readClippingTemplateObject;
				}
				else if (this.clippingTemplateObject) {
					// cannot find a read clipping template, use the regular template instead
					clippingTemplate = this.clippingTemplateObject;
				}
			} 
			else 
			{
				if (this.clippingTemplateObject) {
					clippingTemplate = this.clippingTemplateObject;
				}
			}
			if (clippingTemplate) {
				if (navigator.userAgent.indexOf ("MSIE") > -1 && navigator.userAgent.indexOf ("Mac") > -1) {
					var div = document.createElement ("div");
					var rowHtml  = '<table cellpadding="0" cellspacing="0" border="0"><tbody>';
					rowHtml += '<tr valign="middle">';
					rowHtml += '<td width="20"><input type="checkbox" onclick="this.dataSource = ' + this.jsName + '; ' + this.jsName + '.selectClipping(window.event);" title="' + unescape(clippingsVals[1]) + '" value="' + clippingsVals[0] + '" /></td>';
					rowHtml += '<td><a href="' + clippingsVals[0] + '" name="ClippingTitle" onclick="this.dataSource = ' + this.jsName + '; ' + this.jsName + '.markAsRead (window.event);">' + unescape(clippingsVals[1]) + '</a></td>';
					rowHtml += '</tr>';
					rowHtml += '</tbody></table>';
					div = this.clippingsObject.appendChild (div);
					div.innerHTML = rowHtml
				}
				else {
					clippingTemplate = clippingTemplate.cloneNode (true);
					clippingTemplate = this.clippingsObject.appendChild (clippingTemplate);
					clippingTemplate.removeAttribute ("id");
					var anchors = clippingTemplate.getElementsByTagName ("a");
					var c2 = anchors.length;
					for (var j=0; j<c2; j++) {
						anchors[j].href = clippingsVals[0];
						if (anchors[j].name && anchors[j].name == this.clippingTitleName) {
							anchors[j].innerHTML = unescape(clippingsVals[1]);
						}
						anchors[j].onclick = this.markAsRead;
						anchors[j].dataSource = this;
					}
					var inputs = clippingTemplate.getElementsByTagName ("input");
					c2 = inputs.length;
					for (var j=0; j<c2; j++) {
						if (inputs[j].type == "checkbox") {
							inputs[j].value = clippingsVals[0];
							inputs[j].title = unescape(clippingsVals[1]);
							inputs[j].dataSource = this;
							inputs[j].onclick = this.selectClipping;
							if (this.selectedClippings) {
								var c3 = this.selectedClippings.length;
								for (var k=0; k<c3; k++) {
									if (this.selectedClippings[k].href == inputs[j].value) {
										inputs[j].checked = true;
										break;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	
	this.hideClippedStories ();
}



Clippings.prototype.toggleToolLabel = Clippings_ToggleToolLabel;
function Clippings_ToggleToolLabel (toolName)
{
	if (!this.hasNoSelectionClass || !this.hasSelectionsClass) {
		return;
	}
	
	var c = this.selectedClippings.length;
	var nodes = document.getElementsByName (this[toolName]);
	var c2 = nodes.length;
	if (c > 0) {
		for (var i=0; i<c2; i++) {
			var innerNodes = nodes[i].getElementsByTagName ("*");
			var c3 = innerNodes.length;
			for (var j=0; j<c3; j++) {
				if (innerNodes[j].className == this.hasSelectionsClass) {
					innerNodes[j].style.display = "inline";
				}
				else if (innerNodes[j].className == this.hasNoSelectionClass) {
					innerNodes[j].style.display = "none";
				}
			}
		}
	}
	else {
		for (var i=0; i<c2; i++) {
			var innerNodes = nodes[i].getElementsByTagName ("*");
			var c3 = innerNodes.length;
			for (var j=0; j<c3; j++) {
				if (innerNodes[j].className == this.hasSelectionsClass) {
					innerNodes[j].style.display = "none";
				}
				else if (innerNodes[j].className == this.hasNoSelectionClass) {
					innerNodes[j].style.display = "inline";
				}
			}
		}
	}
}






// select a clipping
Clippings.prototype.selectClipping = Clippings_SelectClipping;
function Clippings_SelectClipping (e) {
	var target = null;
	if (navigator.userAgent.indexOf ("MSIE") > -1 && navigator.userAgent.indexOf ("Mac") > -1) {
		// Mac IE needs this line to get the input object, but doesn't need it for the anchor object
		target = e.srcElement;
	}
	else {
		target = getEventTargetByTagName ("input", e);
	}
	if (!target || !target.dataSource) {
		return true;
	}
	
	var dataSource = target.dataSource;
	if (dataSource.selectedClippings) {
		var c = dataSource.selectedClippings.length;
		var clippingFound = false;
		for (var i=0; i<c; i++) {
			if (dataSource.selectedClippings[i].href == target.value) {
				if (target.checked == false) {
					arraySplice (dataSource.selectedClippings, i);
				}
				clippingFound = true;
				break;
			}
		}
		if (clippingFound == false) {
			dataSource.selectedClippings[c] = new Object ();
			dataSource.selectedClippings[c].href = target.value;
			dataSource.selectedClippings[c].title = target.title;
		}
		
		dataSource.toggleToolLabel ("removeAllName");
		dataSource.toggleToolLabel ("removeAllReadName");
		dataSource.toggleToolLabel ("removeSelectedName");
		dataSource.toggleToolLabel ("bookmarkSelectedName");
		dataSource.toggleToolLabel ("emailSelectedName");
	}
	
	cancelEventBubbling (e);
	return eventReturn (e, true);
}
// checks the clippings in the cookie and compares that
// to the clippings on the page. If they match it hides 
// the clippings icon from the user.
Clippings.prototype.hideClippedStories = Clippings_HideClippedStories;
function Clippings_HideClippedStories ()
{
	if (!this.availableClippingClass || !this.availableClippingName) {
		return;
	}
	if (navigator.userAgent.indexOf ("MSIE") > -1 && navigator.userAgent.indexOf ("Mac") > -1) {
		return;
	}
	var availableClippings = document.getElementsByName (this.availableClippingName);

	var cookieValues = this.parseClipCookie(this.cv);
	var clippings = cookieValues[0].split("~");
	var re = new RegExp ("\b*" + this.availableClippingClass + "\b*", "g");
	for (var j = 0; j < availableClippings.length; j++)
	{
		var availableClipping = availableClippings[j];
		var url = availableClipping.href.replace (/http[s]*:\/\/[^\/]+/, "");
		var newClassName = availableClipping.className;
		for (var i = 0; i < clippings.length; i++)
		{
			var clippingsVals = clippings[i].split("^");
			if (url == clippingsVals[0]) {
				newClassName = newClassName.replace (re, "");
				break;
			}
			else {
				if (newClassName.search (re) < 0) {
					newClassName += (" " + this.availableClippingClass);
				}
			}
		}
		if (newClassName != availableClipping.className) {
			// Changing class name is an expensive operation.
			// Normally, it's not a big issue, but when the CSS class 
			// contains a background image/list image, we should keep 
			// class changing to the minimum
			availableClipping.className = newClassName;
		}
	}
}



// marks a clipping as "read"
Clippings.prototype.markAsRead = Clippings_MarkAsRead;
function Clippings_MarkAsRead (e)
{
	var target = getEventTargetByTagName ("a", e);
	if (target) {
		var dataSource = target.dataSource;
		if (dataSource) {
			var url = target.href.replace (/http[s]*:\/\/[^\/]+/, "");
			var newclippingstring = "";
			var cv1 = dataSource.readClipCookie ();
			dataSource.cookieValues = dataSource.parseClipCookie(cv1);
			var clippings = dataSource.cookieValues[0].split("~");
			for (var i = 0; i < (clippings.length - 1); i++)
			{
				var clippingsVals = clippings[i].split("^");
				var newclipping = "";
				if (url == clippingsVals[0])
				{
					newclipping = clippingsVals[0] + "^" + clippingsVals[1] + "^" + "1~";
				} 
				else 
				{
					newclipping = clippingsVals[0] + "^" + clippingsVals[1] + "^" + clippingsVals[2] + "~";
				}
				newclippingstring = newclippingstring + newclipping;
			}
			dataSource.cv = "clippings:" + newclippingstring;
			dataSource.createClipCookie (7);
			return eventReturn (e, true);
		}
	}
	return true;
}


// removes all clippings from the cookie
Clippings.prototype.removeAllClippings = Clippings_RemoveAllClippings;
function Clippings_RemoveAllClippings (e)
{
	var target = getEventTargetByTagName ("a", e);
	if (!target || !target.dataSource) {
		return true;
	}
	var dataSource = target.dataSource;

    // put empty clippings into the cookie
    dataSource.cv = "clippings:";
    dataSource.createClipCookie (7);
    dataSource.redrawClippings();
	dataSource.selectedClippings = [];

	if (dataSource.menuObject) {
		dataSource.menuObject.style.display = "none";
	}

	return eventReturn (e, false);
}


// removes clippings that are marked as "read"
Clippings.prototype.removeAllReadClippings = Clippings_RemoveAllReadClippings;
function Clippings_RemoveAllReadClippings (e)
{
	var target = getEventTargetByTagName ("a", e);
	if (!target || !target.dataSource) {
		return true;
	}
	var dataSource = target.dataSource;

	var newclippingstring = "";
	var cv1 = dataSource.readClipCookie ();
	dataSource.cookieValues = dataSource.parseClipCookie(cv1);
	var clippings = dataSource.cookieValues[0].split("~");
	for (var i = 0; i < (clippings.length - 1); i++){
		var clippingsVals = clippings[i].split("^");
		var newclipping = "";
		if (clippingsVals[2] == 0){
			newclipping = clippingsVals[0] + "^" + clippingsVals[1] + "^" + "0~";
		} 
		newclippingstring = newclippingstring + newclipping;
	}
	dataSource.cv = "clippings:" + newclippingstring;
	dataSource.createClipCookie (7);
	
	dataSource.redrawClippings();
	if (dataSource.menuObject) {
		dataSource.menuObject.style.display = "none";
	}

	return eventReturn (e, false);
}


// removes selected clippings
Clippings.prototype.removeSelectedClippings = Clippings_RemoveSelectedClippings;
function Clippings_RemoveSelectedClippings (e)
{
	var target = getEventTargetByTagName ("a", e);
	if (!target || !target.dataSource) {
		return true;
	}
	var dataSource = target.dataSource;


	var selectedClippings = dataSource.selectedClippings;
	var c = selectedClippings.length;

	var newclippingstring = "";
	var cv1 = dataSource.readClipCookie ();
	dataSource.cookieValues = dataSource.parseClipCookie(cv1);
	var clippings = dataSource.cookieValues[0].split("~");
	for (var i = 0; i < (clippings.length - 1); i++){
		var clippingsVals = clippings[i].split("^");
		var newclipping = "";
		
		var clippingFound = false;
		for (var j=0; j<c; j++) {
			if (selectedClippings[j].href == clippingsVals[0]) {
				clippingFound = true;
				break;
			}
		}
		if (clippingFound == false){
			newclipping = clippingsVals[0] + "^" + clippingsVals[1] + "^" + "0~";
		}
		newclippingstring = newclippingstring + newclipping;
	}
	dataSource.cv = "clippings:" + newclippingstring;
	dataSource.createClipCookie (7);
	
	dataSource.selectedClippings = [];
	dataSource.redrawClippings();
	if (dataSource.menuObject) {
		dataSource.menuObject.style.display = "none";
	}
	
	return eventReturn (e, false);
}


// removes clippings that are marked as "read"
Clippings.prototype.emailSelectedClippings = Clippings_EmailSelectedClippings;
function Clippings_EmailSelectedClippings (e)
{
	var target = getEventTargetByTagName ("a", e);
	if (!target || !target.dataSource) {
		return true;
	}
	var dataSource = target.dataSource;

	if (dataSource.clippingsEmailFormObject) {
		var newsLinks = "";
		var articleLinks = "";
		var otherLinks = "";
		var selectedClippings = dataSource.selectedClippings;
		var c = selectedClippings.length;
		for (var i=0; i<c; i++) {
			if (selectedClippings[i].href.indexOf ("news.pl") > -1) {
				newsLinks += selectedClippings[i].href + "^";
			}
			else if (selectedClippings[i].href.indexOf ("article.pl") > -1) {
				articleLinks += selectedClippings[i].href + "^";
			}
			else {
				otherLinks += selectedClippings[i].href + "^";
			}
		}
		dataSource.clippingsEmailFormObject.elements["newsLinks"].value = newsLinks;
		dataSource.clippingsEmailFormObject.elements["articleLinks"].value = articleLinks;
		dataSource.clippingsEmailFormObject.elements["otherLinks"].value = otherLinks;
		dataSource.clippingsEmailFormObject.submit ();
		
	}

	return eventReturn (e, false);
}





// removes clippings that are marked as "read"
Clippings.prototype.bookmarkSelectedClippings = Clippings_BookmarkSelectedClippings;
function Clippings_BookmarkSelectedClippings (e)
{
	var target = getEventTargetByTagName ("a", e);
	if (!target || !target.dataSource) {
		return true;
	}
	var dataSource = target.dataSource;

	if (dataSource.clippingsEmailFormObject) {
		var newsLinks = "";
		var articleLinks = "";
		var otherLinks = "";
		var selectedClippings = dataSource.selectedClippings;
		var c = selectedClippings.length;
		if( document.all )
		{
			for (var i=0; i<c; i++) {
				var href = location.protocol + "//" + location.hostname + selectedClippings[i].href;
				var title = selectedClippings[i].title;
				window.external.AddFavorite( href, title );
			}
		}
		else
		{
			alert ("Your browser does not support this feature.");
		}
	}
	

	return eventReturn (e, false);
}




// counts the total number of clippings
Clippings.prototype.countClippings = Clippings_CountClippings;
function Clippings_CountClippings ()
{
    var cv1 = this.readClipCookie ();
    this.cookieValues = this.parseClipCookie(cv1);
    var totalclippings = 0;
    if (this.cookieValues[0] == "")
    {
		totalclippings = 0;
    }
    else 
    {
		var clippings = this.cookieValues[0].split("~");
		clippings = arrayPop (clippings);
		totalclippings = clippings.length;
    }
    this.countObject.innerHTML = "(" + totalclippings + ")";
}


// creates a cookie with the given parameters
Clippings.prototype.createClipCookie = Clippings_CreateClipCookie;
function Clippings_CreateClipCookie (days)
{
	var expires = "";
	var domain = "; domain=" + this.cookieDomain;
    if (days)
    {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
    } 
    document.cookie = this.cookieName + "=" + this.cv + domain + expires + "; path=/";
}

// locates and reads the value of a cookie with a specified name
Clippings.prototype.readClipCookie = Clippings_ReadClipCookie;
function Clippings_ReadClipCookie ()
{
    var nameEQ = this.cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i=0;i < ca.length;i++)	
    {
    	var c = ca[i];
    	while (c.charAt(0)==' ') 
		{
			c = c.substring(1,c.length);
		}
		if (c.indexOf(nameEQ) == 0) 
		{
			return unescape(c.substring(nameEQ.length,c.length));
		}
    }
    return null;
}

// parses the value of the cookie
// returns an array of the different values
Clippings.prototype.parseClipCookie = Clippings_ParseClipCookie;
function Clippings_ParseClipCookie(cookieValues)
{
	if (cookieValues.length > 0)
	{
		var cookieValuesArray = new Array(1);
		var CookiesArray = cookieValues.split("&");
		for (var i = 0; i < CookiesArray.length; i++)
		{
			var v = CookiesArray[i].split(":");
			cookieValuesArray[i] = v[1];
		}
		return cookieValuesArray;
	} 
	else 
	{
		return null;
	}
}

// deletes a cookie with a specified name
Clippings.prototype.eraseClipCookie = Clippings_EraseClipCookie;
function Clippings_EraseClipCookie (name)
{
	this.cv = "";
    this.createClipCookie (-1);
}


// Initialize the clippings object
Clippings.prototype.init = Clippings_Init;
function Clippings_Init () {
	this.cv = this.readClipCookie ();
	if (this.cv)
	{
		this.cookieValues = this.parseClipCookie (this.cv);
	} 
	else 
	{
		this.cv = "clippings:";
		this.createClipCookie (7);
		this.cv = this.readClipCookie ();
		if (this.cv)
		{
			this.cookieValues = this.parseClipCookie (this.cv);
		} 
		else 
		{
			this.cookieValues[0] = ""; // clippings (leave it empty)
		}
	}


	// Initialize the clippingTemplates
	if (this.clippingTemplateId) {
		this.clippingTemplateObject = document.getElementById (this.clippingTemplateId);
		this.clippingTemplateObject = this.clippingTemplateObject.parentNode.removeChild (this.clippingTemplateObject);
	}
	if (this.readClippingTemplateId) {
		this.readClippingTemplateObject = document.getElementById (this.readClippingTemplateId);
		this.readClippingTemplateObject = this.readClippingTemplateObject.parentNode.removeChild (this.readClippingTemplateObject);
	}
	if (this.clippingsContainerId) {
		this.clippingsContainerObject = document.getElementById (this.clippingsContainerId);
		var forms = this.clippingsContainerObject.getElementsByTagName ("form");
		var c = forms.length;
		for (var i=0; i<c; i++) {
			switch (forms[i].name) {
				case "EmailClippings":
					this.clippingsEmailFormObject = forms[i];
					break;
			}
		}
	}



	// Initialize the "add to clippings" links
	var nodes = document.getElementsByName (this.availableClippingName);
	var c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = this.addClipping;
		nodes[i].dataSource = this;
	}
	
	// Initialize the "clippings switch" links
	nodes = document.getElementsByName (this.toggleName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = this.displayClippings;
		nodes[i].dataSource = this;
	}

	nodes = document.getElementsByName (this.removeAllName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = this.removeAllClippings;
		nodes[i].dataSource = this;
	}

	nodes = document.getElementsByName (this.emailSelectedName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = this.emailSelectedClippings;
		nodes[i].dataSource = this;
	}

	nodes = document.getElementsByName (this.bookmarkSelectedName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = this.bookmarkSelectedClippings;
		nodes[i].dataSource = this;
	}
	
	nodes = document.getElementsByName (this.removeAllReadName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = this.removeAllReadClippings;
		nodes[i].dataSource = this;
	}

	nodes = document.getElementsByName (this.removeSelectedName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = this.removeSelectedClippings;
		nodes[i].dataSource = this;
	}

	this.menuObject = document.getElementById (this.menuId);
	if (this.menuObject) {
		this.menuObject.dataSource = this;
		this.menuObject.onclick = function (e) {
			cancelEventBubbling (e);
		}
	}

	this.countObject = document.getElementById (this.countId);
	
	this.clippingsObject = document.getElementById (this.clippingsId);
	if (this.clippingsObject) {
		this.clippingsObject.dataSource = this;
	}
	
	if (!document.clippingsCollection) {
		document.clippingsCollection = [];
	}
	document.clippingsCollection[document.clippingsCollection.length] = this;

	windowUnload = function (e) {
		// this event handler dispose all clippings in the window
		// to free up all references, especially circular references
		if (document.clippingsCollection) {
			var c = document.clippingsCollection.length;
			while (c > 0) {
				document.clippingsCollection[0].dispose ();
				c = document.clippingsCollection.length;
			}
		}
	}
	
	if (window.addEventListener) {
		window.addEventListener ("unload", windowUnload, false);
		document.addEventListener ("click", this.documentClick, false);
	}
	else if (window.attachEvent) {
		window.attachEvent ("onunload", windowUnload);
		document.attachEvent ("onclick", this.documentClick);
	}
	else {
		window.onunload = windowUnload;
		document.onclick = this.documentClick;
	}

	this.redrawClippings ();
}




// Initialize the clippings object
Clippings.prototype.dispose = Clippings_Dispose;
function Clippings_Dispose () {
	// Initialize the "add to clippings" links
	var nodes = document.getElementsByName (this.availableClippingName);
	var c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = null;
		nodes[i].dataSource = null;
	}
	
	// Initialize the "clippings switch" links
	nodes = document.getElementsByName (this.toggleName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = null;
		nodes[i].dataSource = null;
	}

	nodes = document.getElementsByName (this.removeAllName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = null;
		nodes[i].dataSource = null;
	}
	
	nodes = document.getElementsByName (this.removeAllReadName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = null;
		nodes[i].dataSource = null;
	}
	
	nodes = document.getElementsByName (this.removeSelectedName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = null;
		nodes[i].dataSource = null;
	}
	
	nodes = document.getElementsByName (this.bookmarkSelectedName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = null;
		nodes[i].dataSource = null;
	}
	
	nodes = document.getElementsByName (this.emailSelectedName);
	c = nodes.length;
	for (var i=0; i<c; i++) {
		nodes[i].onclick = null;
		nodes[i].dataSource = null;
	}

	this.menuObject = document.getElementById (this.menuId);
	if (this.menuObject) {
		this.menuObject.dataSource = null;
		this.menuObject.onclick = null
	}
	
	this.clippingsObject = document.getElementById (this.clippingsId);
	if (this.clippingsObject) {
		this.clippingsObject.dataSource = null;
	}
	
	if (document.clippingsCollection) {
		document.clippingsCollection = [];
	}
	document.onclick = null;

	this.cookieName = null;
	this.availableClippingName = null;
	this.availableClippingClass = null;
	this.toggleName = null;
	this.removeAllName = null;
	this.removeAllReadName = null;
	this.menuId = null;
	this.menuObject = null;
	this.countId = null;
	this.countObject = null;
	this.clippingsId = null;
	this.clippingsObject = null;
	this.clippingTemplateId = null;
	this.clippingTemplateObject = null;
	this.readClippingTemplateId = null;
	this.readClippingTemplateObject = null;
	this.clippingsEmailFormObject = null;
	this.cv = null;
	this.cookieValues = null;
}

