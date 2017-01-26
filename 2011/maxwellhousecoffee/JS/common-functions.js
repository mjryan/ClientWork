// main site .js

	window.addEvent('domready', function() {


		if ( $('navigation')!=null) {
		// find all the navigation items and use this fix to keep parent active while on sub ul //
			$('navigation').getElements('li').each(function(el){
			// set a class on all sub li elements //
				el.className="ienot";
			// set events on all sub li elements //
				el.addEvents({
					'mouseenter': function(){
						this.className = "iehover";
					},
					'mouseleave': function(){
						this.className = "ienot";
					}
				});
			});
		}

		if ( $('intl-look')!=null) {
		// find all the navigation items and use this fix to keep parent active while on sub ul //
			$('intl-look').getElements('li').each(function(el){
			// set a class on all sub li elements //
				el.className="ienot";
			// set events on all sub li elements //
				el.addEvents({
					'mouseenter': function(){
						this.className = "iehover";
					},
					'mouseleave': function(){
						this.className = "ienot";
					}
				});
			});
		}

		if ( $('final-votes-msg')!=null) {
		// find all the navigation items and use this fix to keep parent active while on sub ul //
			$('final-votes-msg').getElements('a').each(function(el){
			// set a class on all sub li elements //
				el.className="ienot";
			// set events on all sub li elements //
				el.addEvents({
					'mouseenter': function(){
						this.className = "iehover";
					},
					'mouseleave': function(){
						this.className = "ienot";
					}
				});
			});
		}

		if ( $('allHouses')!=null) {
		// find all the navigation items and use this fix to keep parent active while on sub ul //
			$('main_wrapper').getElements('span.final-votes-msg a').each(function(el){
			// set a class on all sub li elements //
				el.className="ienot";
			// set events on all sub li elements //
				el.addEvents({
					'mouseenter': function(){
						this.className = "iehover";
					},
					'mouseleave': function(){
						this.className = "ienot";
					}
				});
			});
		}


		if ( $('category-navigation')!=null){
		// find all the navigation items and use this fix to keep parent active while on sub ul //
			$('category-navigation').getElements('li').each(function(de){
			// set a class on all sub li elements //
				de.className = "ienot";
			// set events on all sub li elements //
				de.addEvents({
					'mouseenter': function(){
						this.className = "opensub";
					},
					'mouseleave': function(){
						this.className = "ienot";
					}
				});
			});
		}


		if ( $('coffee-bin')!=null){
		// find if roast meter is active and in place //
			$('coffee-bin').getElements('a').each(function(ds){
				// set events on all sub li elements //
				myBin = $('coffee-bin').className;
				ds.addEvents({
					'mouseenter': function(){
						document.getElementById(myBin).innerHTML="&nbsp;"+this.innerHTML;
					},
					'mouseleave': function(){
						document.getElementById(myBin).innerHTML="";
					}
				});
			});
		}


		if ( $('coffee-bin-short')!=null){
		// find if second roast meter is active and in place //
			$('coffee-bin-short').getElements('a').each(function(fs){
			// set events on all sub li elements //
				myBinShort = $('coffee-bin-short').className;
				fs.addEvents({
					'mouseenter': function(){
						document.getElementById(myBinShort).innerHTML="&nbsp;"+this.innerHTML;
					},
					'mouseleave': function(){
						document.getElementById(myBinShort).innerHTML="";
					}
				});
			});
		}


		if ( $('sendToAFriend')!=null){
		//example of a single element onto which an overlay event is being added.
			$('sendToAFriend').addEvent('click',function(e){
				e.preventDefault();
				var link = this.get('href');
				window.open (link , 'TellAFriend', 'height=420,width=568,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no');
			});
		}


	});


	var moreLess = function(divId,aId){
		var myState = $(divId).style.display;
		if(myState!="block"){
			$(divId).style.display ="block";
			$(aId).innerHTML="Close >";
			}else{
			$(divId).style.display ="none";
			$(aId).innerHTML="More >";
		}
	}


	var toggle_visibility = function(divId,aId){
		var myState = $(divId).style.display;
		if(myState!="block"){
			$(divId).style.display ="block";
			$(aId).style.backgroundPosition="right -84px";
			}else{
			$(divId).style.display ="none";
			$(aId).style.backgroundPosition="right 0px";
		}
	}


// spotlight tagging additions

		// map of all urls on site and their tagging
			var spotlightTagMap =
				{
					'/maxwellhousecoffee/Pages/default.aspx' : [
						'/activity;src=2070517;type=maxwell;cat=mh_ho498;ord=1;num='
					],
					'/maxwellhousecoffee/our-brews/Pages/Default.aspx' : [
						'/activity;src=2070517;type=maxwell;cat=our_b822;ord='
					],
					'/maxwellhousecoffee/recipes/Pages/Default.aspx' : [
						'/activity;src=2070517;type=maxwell;cat=recip741;ord='
					],
					'/maxwellhousecoffee/inside-scoop/Pages/Default.aspx' : [
						'/activity;src=2070517;type=maxwell;cat=insid255;ord='
					]
				};
		// perform tracking switch
			window.addEvent('domready', function() {
				// UTILITY method: perfoms an individual spotlight tag track
					var doSpotlightTag = function (tagUrlStr) {
					// do actual tracking of url.
						var newImage = document.createElement('img');
							newImage.style.width      = '1px';
							newImage.style.height     = '1px';
							newImage.style.visibility = 'hidden';
							newImage.src              = '/web/20110811123935/http://ad.doubleclick.net' + tagUrlStr + Math.random() * 10000000000000 + '?';
							newImage                  = document.getElementsByTagName('body')[0].appendChild(newImage);
					}
				// get our base path and any page tracking strings associated with it.
					var pagePath = document.location.href.split(document.domain)[1].split('#')[0].split('?')[0];
					var pageTags = spotlightTagMap[pagePath];
				// determine if this is a thank-you page load
					var isThankYouMsgLoad = (
						document.getElementById('SuccessContent') &&
						(
							(
								document.getElementById('long-form') &&
								document.getElementById('long-form').className.indexOf('SuccessContent') != -1
							) || (
								document.getElementById('side-form') &&
								document.getElementById('side-form').className.indexOf('SuccessContent') != -1
							)
						)
					);
				// determine how to track this page given the circumstances we are provided
					if (isThankYouMsgLoad) {
						var trackStrings = ['/activity;src=2070517;type=maxwell;cat=mh_si070;ord='];
					} else if (pageTags && pageTags.length > 0) {
						var trackStrings = pageTags;
					}
					if (typeof(trackStrings) != 'undefined' && trackStrings) {
					// track each string in the trackstrings array
						for (var i=0; i<trackStrings.length; i++) {
							doSpotlightTag(trackStrings[i]);
						}
					}
			});

		// this tracking event gets called from flash
			var trackingEventFindBrew = function() {
				var newImage = document.createElement('img');
					newImage.style.width      = '1px';
					newImage.style.height     = '1px';
					newImage.style.visibility = 'hidden';
					newImage.src              = '/web/20110811123935/http://ad.doubleclick.net/activity;src=2070517;type=maxwell;cat=find_956;ord=' + Math.random() * 10000000000000 + '?';
					newImage                  = document.getElementsByTagName('body')[0].appendChild(newImage);
			};
