/*---- Functions for Dropdown Navigation ----*/
var currTimeout;
var amt=5;
var newx=0;

function makeName(layerID)
	{	
		if (navigator.appName=="Netscape"){
			if(parseFloat(navigator.appVersion) >= 1) {			
				zname = eval("document.getElementById('" + layerID + "').style")			
			} else {
				zname = eval("document." + layerID)
			}
		} else {
			zname = eval("document.all." + layerID + ".style")
		}
		return zname
	}

window.clearTimeout(currTimeout);
			
function showLayer(layername)
	{					
		nameLayer = makeName(layername);	
		nameLayer.visibility="visible";
	}

function hideLayer(layername)
	{	
		nameLayer = makeName(layername);	
		nameLayer.visibility="hidden";
	}

function deactivateMenu(id) {
	currTimeout = window.setTimeout("activateMenu(amt);",400);
}

function mvsiMenu(id) {
	window.clearTimeout(currTimeout);
	showLayer("menu" + id);
}

function activateMenu(menuNumber)
	{
		if (navigator.appName=="Netscape"){
			if(currTimeout != undefined) {
				window.clearTimeout(currTimeout);
			}
		} else {
			window.clearTimeout(currTimeout);
		}
		showLayer('menuoff');
		for (i=1; i<=amt; i=i+1)
	   		{	
	   			hideLayer("menu" + i);
	   		}
		showLayer("menu" + menuNumber);
	}
	
function closeMenus()
	{	
			hideLayer('menuoff');		
		for (i=1; i<=amt; i=i+1)
	   		{
				hideLayer("menu" + i);
	   		}
	}
	
function navgo(theURL)
	{
		document.location.href = theURL;
	}
/*---- Functions for Dropdown Navigation ----*/


/*---------------------------
Function for Image swaps within Navigation
--------------------------------*/
function hover(obj, name)
{
	obj.src="images/nav/" + name + "_hvr.gif";
}

function restore(obj, name)
{
	obj.src="images/nav/" + name + ".gif";
}

/*---------------------------
Function for Image swaps within Compassion Section Navigation
--------------------------------*/
function hover2(obj, name)
{
	obj.src ="../images/nav/" + name + "_hvr.gif";
}

function restore2(obj, name)
{
	obj.src ="../images/nav/" + name + ".gif";
}

/*----------------------------
Function for Dynamic Scrollbar
------------------------------*/
function startList() {
	if (document.all&&document.getElementById) {
		navRoot = document.getElementById("nav");
		for (i=0; i<navRoot.childNodes.length; i++) {
			node = navRoot.childNodes[i];
			if (node.nodeName=="LI") {
				node.onmouseover=function() {
					this.className+=" over";
				}
				node.onmouseout=function() {
					this.className=this.className.replace(" over", "");
				}
			}
		}
	}
}

function graphicsb_data0()
{
    /*---------------------------------------------
    Scroll Bar Images
    ---------------------------------------------*/

	this.up_button = "images/scrollbar/up.gif";                                          //image path and name only
	this.up_button_roll = "images/scrollbar/up_roll.gif";                                //image path and name only
	this.down_button = "images/scrollbar/down.gif";                                      //image path and name only
	this.down_button_roll = "images/scrollbar/down_roll.gif";                            //image path and name only

	this.slider_tile_bg_style = "background-image:url(images/scrollbar/bg.gif);"  //image defined as CSS style

	this.bubble_top_cap = "images/scrollbar/bubble_topcap.gif,2";                        //image path and name, height - (width is automatically set to scroll bar width)
	this.bubble_bottom_cap = "images/scrollbar/bubble_bottomcap.gif,2";                  //image path and name, height - ""
	this.bubble_center = "images/scrollbar/bubble_center.gif,8";                         //image path and name, height - ""
	this.bubble_tile_bg_style = "images/scrollbar/bubble_bg.gif";                        //image path and name only

    /*---------------------------------------------
    Scroll Bar Container and Content
    ---------------------------------------------*/

	this.container_width = 376
	this.container_height = 210
	this.container_bg_color = "";
	this.content_padding = 0
	this.content_styles = "font-family:Arial;font-weight:normal;font-size:12px;";
	this.content_class_name = "";

    /*---------------------------------------------
    Scroll Bar Behaviour and Width
    ---------------------------------------------*/

	this.scroll_bar_width = 12                     //The width of the bar in pixels.
	this.scroll_increment = 10                     //The distance to scroll when clicking the up or down buttons.
	this.allow_hover_scroll = true;                //Auto scroll while hovering over top and bottom buttons.
	this.hover_scroll_delay = 50;                   //Milliseconds (1/1000 second)
	this.use_hand_cursor = true;
}