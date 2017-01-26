//Maxwell House Drops of Good
;
jQuery.noConflict();
(function($){

	if($.browser.msie){
		// usage: log('inside coolFunc', this, arguments);
		// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
		window.log = function(){
			log.history = log.history || [];   // store logs to an array for reference
			log.history.push(arguments);
			arguments.callee = arguments.callee.caller;
			if(this.console) console.log( Array.prototype.slice.call(arguments) );
		};
		// make it safe to use console.log always
		(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();)b[a]=b[a]||c})(window.console=window.console||{});
	}

	// perform font replacement immediately
	if (typeof(Cufon) != 'undefined') {
		try {
			Cufon.replace('#facebookBug', {fontFamily:'GothamBold', textShadow:'1px 1px 4px #464545', hover:true})
				.replace('#content h1', {fontFamily:'GothamBold', textShadow:'1px 2px 8px #464545'})
				.replace('#meetTheHouses h3, #winningHouses, #promoFacebook, #houseInfo h2, #header .state, #our-partners h3',{fontFamily:'GothamBold'})
				.replace('#content h2, #tabContent h2, #houseInfo h3, #houseInfo h4', {fontFamily:'GothamMedium'})
				.replace('#tabNav a, #content a.cta, #houseNav a, #sidebar .nav a, .mediaContent a span, #infopanel h4', {fontFamily:'GothamBold', hover:true})
				.replace('#houseInfo a, #our-partners a.cta-sml', {fontFamily:'GothamMedium', hover:true});
		}catch(err){}
	}

	$.extend({
		/**
		 * jQuery plugin similar to JSON.stringify()
		 *
		 * serializes a simple object to a JSON formatted string.
		 * Note: stringify() is different from jQuery.serialize() which URLEncodes form elements
		 * CREDITS: /web/20110811121554/http://blogs.sitepointstatic.com/examples/tech/json-serialization/json-serialization.js
		 *
		 * @update Added a fix to skip over Object.prototype members added by the prototype.js library
		 * @usage:
		 *  jQuery.ajax({
		 *	    data : {serialized_object : jQuery.stringify (JSON_Object)},
		 *		success : function (data) {
		 *
		 *		}
		 *   });
		 *
		 * @param object obj	valid json object
		 * @return string
		 */
		stringify: function stringify(obj) {
	        var t = typeof (obj);
	        //verify JSON data
	        //var my_JSON_object = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(obj.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + obj + ')');
	        if (t != "object" || obj === null) {
	            // simple data type
	            if (t == "string") obj = '"' + obj + '"';
	            return String(obj);
	        } else {
	            // recurse array or object
	            var n, v, json = [], arr = (obj && obj.constructor == Array);

	            for (n in obj) {
	                v = obj[n];
	                t = typeof(v);
	                if (obj.hasOwnProperty(n)) {
	                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
	                    json.push((arr ? "" : '"' + n + '":') + String(v));
	                }
	            }
	            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	        }
        },
	   	/**
		 * return data pairs in a querystring as an object ready for dot-notation
		 *
		 * ///web/20110811121554/https://developer.mozilla.org/en/DOM/window.location
		 *
		 * @param void		retrieve information from window.location
		 * @return object	?q=lifetheuniverseandeverything&a=42 => {q:"lifetheuniverseandeverything", a:42}
		 */
		parseQuerystring: function(obj){
			var objNVPair = {};
			var qs = window.location.search.replace('?', '');
			var pairs = qs.split('&');
			for(var i = 0; i < pairs.length; i++){
				var pair = pairs[i].split('=');
				objNVPair[pair[0]] = pair[1];
			}
			return objNVPair;
		},
		/**
		 * Given a set of choices for the background, return a random one at the current page's index
		 *
		 * @param object obj	object that contains arrays of possible background choices
		 * @return string
		 */
		randomBg: function(obj){
			var pathname = window.location.pathname;
			var page = pathname.substring(pathname.lastIndexOf('/')+1, pathname.indexOf('.'));
			if(!(page in obj)) page = "default";
			var randomIndex = Math.floor(Math.random() * obj[page].length);
			return obj[page][randomIndex];
		}
	});

	/**
	 * Maxwell House Drops of Good Application object
	 *
	 * 1) on initial load, performs Ajax:JSONP request for relevant data.
	 * 	! also checks potential status of the vote cookie
	 * 2) stores retrieved data in a cookie with an expiration date (today + 1)
	 * 3) on subsequent loads, checks against cookie date. if expired, make new data request
	 * 4) on successful vote response, make new data request and create/update vote cookie
	 * 5) update DOM elements with pertinent data from request
	 * 	! if vote cookie indicates, disable the vote button (p.com will also have measures in place
	 * 	  on their system to prevent vote fraud)
	 *
	 * @author	Paul Gueller <paul.gueller@razorfish.com>
	 * @version 2011.0314
	 */
	var DropsOfGood = function(options){
		//console.log('construct');
		//use local context for closure reference
		var context = this; //private variable
		//define public attributes
		this.data = {};
		this.dataCookieName = 'MH_promostatus';
		this.votedToday = false;
		this.voteCookieName = 'MH_votestatus';
		this.settings = {
			url: "/web/20110811121554/http://kraft.promotions.com/maxwnational/votes.do"
			,jsonpCallback: 'votesFeedCallback'
		};
		//integrate user-passed options;
		$.extend(true, this.settings, options);
		/**
		 * Use to initialize object once it has been instantiated
		 *
		 * @param string action 		modify default behaviors
		 * @param function callback		to be called after initialization is complete
		 * @return void
		 */
		this.init = function(action, callback){
			//console.log('init');
			//TODO: write more thorough detection for jQuery.cookie
			switch(action){
				case "success":
					//console.log('vote success');
					//this.setVoteCookie();
					this.loadJSON();
					break;
				default:
					if(typeof(jQuery.cookie) == 'function'){
						/*
						if($.cookie(this.voteCookieName) != null){
							this.loadVoteCookie();
						}
						*/
						if($.cookie(this.dataCookieName) != null){
							this.loadDataCookie();
						} else {
							this.loadJSON();
						}
					} else {
						alert('Cookie plugin not loaded.');
						this.loadJSON();
					}
			}
			if(arguments.length > 1 && typeof(callback) == 'function'){
				callback();
			}
		};
		/**
		 * Perform data request, store retrieved data locally
		 *
		 * /web/20110811121554/http://api.jquery.com/jQuery.ajax/
		 *
		 * @return void
		 */
		this.loadJSON = function(){
			//console.log('loadJSON');
			$.ajax({
				url: context.settings.url
				,type: 'GET'
				,cache: false
				,dataType: "jsonp"
				,jsonp: false
				,jsonpCallback: context.settings.jsonpCallback
				,complete: function(){
					//do stuff when the request is complete
				}
				,error: function(jqXHR, textStatus, errorThrown){
					//TODO: sophisticate error handling of voting mechanism
					console.log('Vote data could not be loaded.');
				}
				,success: function(data){
					//console.log("json success");
					context.data = data;
					context.setDataCookie();
					context.updateContent();
				}
			});
		};
		/**
		 * create data cookie from loaded data
		 *
		 * @
		 * @return void
		 */
		this.setDataCookie = function(){
			//console.log('setDataCookie');
			$.cookie(this.dataCookieName, $.stringify(this.data), {expires: 1, json:true});
		};
		/**
		 * load data from data cookie, with check against expiration date
		 *
		 * @return void
		 */
		this.loadDataCookie = function(){
			//console.log('loadDataCookie');
			this.data = $.parseJSON($.cookie(this.dataCookieName));
			//compare date, load if old
			var cookieDate = parseDate(this.data.expiresDate);
			var now = new Date();
			if(cookieDate < now){
				//cookie is present but expired, load new data
				this.loadJSON();
			} else{
				this.updateContent();
			}
		};
		/**
		 * create cookie to store vote status
		 *
		 * @return void
		 */
		this.setVoteCookie = function(){
			//console.log('setVoteCookie');
			var voteDate = new Date();
			$.cookie(this.voteCookieName, voteDate.getFullYear() + '-' + (voteDate.getMonth()+1) + '-' + (voteDate.getDate()+1), {expires: 1}); //set expiration date
			this.votedToday = true;
		};
		/**
		 * load vote cookie, with check against set date
		 *
		 * @return void
		 */
		this.loadVoteCookie = function(){
			//console.log('loadVoteCookie');
			var cookieDate = parseDate($.cookie(this.voteCookieName));
			var now = new Date();
			this.votedToday = (now < cookieDate);
		};
		/**
		 * nullify named cookie if specified, all cookies if none specified
		 *
		 * @param string cookieName		identifier of cookie to be nullified
		 * @return void
		 */
		this.clearCookie = function(cookieName){
			//console.log('clearCookie:');
			if(!cookieName){
				//console.log("ALL");
				$.cookie(this.dataCookieName,  null);
				$.cookie(this.voteCookieName, null);
			} else {
				//console.log(cookieName);
				$.cookie(cookieName, null);
			}
		};
		/**
		 * Using stored data, insert attributes into page DOM
		 *
		 * This function is specific to the Maxwell House Drops of Good DOM structure,
		 * and should be modified for
		 *
		 * @return void
		 */
		this.updateContent = function(){
			//console.log('updateContent');
			//update statusbar
			$('#currentvotes').text(addCommas(this.data.totalvotes));
			//$('#currentdays').text(this.data.daysremaining);
			//$('#hdrcountdown').text(this.data.daysremaining);
			//populate home page #meetTheHouses
			$('#meetTheHouses a.ir .votes').each(function(){
				$this = $(this);
				var key = $this.parent('a.ir').attr('rel');
				if(context.verifyKey(key)) $this.text(addCommas(context.data[key].votes));
			});
			//populate data on all houses page
			$('#allHouses h4 span').each(function(){
				$this = $(this);
				var key = $this.closest('li[id]').attr('id');
				if(context.verifyKey(key)) $this.text(addCommas(context.data[key].votes));
			});
			//populate details page contents, based on custom attribute to header
			$('#header.houseDetail .col').each(function(){
				var $this = $(this),
					$houseVotes = $('#houseVotes', $this),
					$houseRank = $('#houseRank', $this),
					houseKey = $this.attr('id');
				if($houseVotes.length > 0 && context.verifyKey(houseKey)) $houseVotes.text(addCommas(context.data[houseKey].votes));
				if($houseRank.length > 0 && context.verifyKey(houseKey)) $houseRank.text(context.data[houseKey].currentRank);
			});
			//enable/disable vote button
			//if(this.votedToday){ $('#voteButton').addClass('disabled').attr({title: "Sorry, you can only vote once a day. Come back tomorrow and everyday till 6/17/2011 to vote again."}).bind('click', function(){ return false; }); }
		};
		/**
		 * check to see if the specified key is a valid index/property of the request data
		 *
		 * @param string key
		 * @return bool
		 */
		this.verifyKey = function(key){
			var test = (key in this.data);
			if(!test) console.log('request data has no value for ' + key);
			return test;
		}
		/**
		 * given YYYY-MM-DD string, convert to JavaScript date object. private helper function
		 *
		 * @param string strDate	string to be converted to date
		 * @return date
		 */
		function parseDate(strDate){
			var dateArray = strDate.split('-');
			return new Date(dateArray[0], dateArray[1]-1, dateArray[2]);
		}
		/**
		 * given a long number, add commas for legibility. private helper function
		 *
		 * @param string nStr	floating number to be treated as string
		 * @return string		3141592.68 => 3,141,592.68
		 */
		function addCommas(nStr){
			var x = new String(nStr);
			x = x.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while(rgx.test(x1)){
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}

		return this;
	};
/** !END DropsOfGood **/

	/**
	 * jQuery Plugin: MediaViewer
	 *
	 * usage: $('a.gallery').mediaViewer();
	 *
	 * @addon jQuery
	 * @param object options	[width | height | top | left | transitionRate]
	 * @return object			chainable instance of jQuery
	 */
	$.fn.mediaViewer = function(options){
		var $gallery = false,
		$frame,
		library,
		settings = {
			width: 640
			,height: 480
			,top:  100
			,left: 100
			,transitionRate: 200
		};
		//merge user supplied options with presets
		$.extend(true, settings, options);
		//define methods to interact with mediaViewer
		var methods = {
			/**
			 * initialize functionality, construct DOM elements
			 */
			init : function($ref){
				//console.log('init');
				//store gallery jQuery object in context for reference by other methods
				$gallery = $('<div>', {
					id: 'mediaViewerGallery'
					,width:settings.width
					,height:settings.height
				}).css({top: settings.top+'px', left: settings.left+'px'}).appendTo('body');
			}
			/**
			 * create videoViewer elements
			 * requires jQuery.flash plugin
			 */
			,populateVideo: function(src){
				//console.log('populateVideo');
				if($gallery.data('src') != src || $gallery.data('type') != 'video'){
					//gallery has been used by another method. reset and populate
					$gallery.empty().data({type:'video', "src": src}).flash({
						id:		'mediaViewerVideo'
						,name:	'mediaViewerVideo'
						,"src":	src
						,width: settings.width
						,height:settings.height
						,scale:	'noscale'
						,salign:'lt'
						,wmode:	'transparent'
					},{version:8}).fadeIn(settings.transitionRate, function(){
						methods.addClose();
						methods.updateSelected(src);
					});
				}
			}
			/**
			 * create photoViewer elements
			 */
			,populatePhoto: function(src){
				//console.log('populatePhoto');
				if($gallery.data('type') != 'photo'){
					$frame = $('<div>', {
						id:'mediaViewerFrame'
						,width:settings.width
						,height:settings.height
					}).append($('<img>', {
						'src': src
						,"class":'detail'
					}));

					$gallery.empty().data({type: 'photo', position: $.inArray(src, library)}).append($frame).fadeIn(settings.transitionRate, function(){
						if(library.length > 1) methods.addControls();
						methods.addClose();
					});
				} else {
					$frame.empty().append($('<img>', {
						'src': src
						,"class":'detail'
						,width:settings.width
						,height:settings.height
					}));
					$gallery.data({position:$.inArray(src, library)});
				}
				methods.updateSelected(src);
			}
			/**
			 * advance photoViewer to next item in library
			 */
			,advance: function(){
				//console.log('advance');
				var currentPos = $gallery.data('position');
				var nextPos = (currentPos == (library.length-1)) ? 0  : currentPos + 1 ;
				//append "next" photo to frame
				$img = $('<img>', {
					"src": library[nextPos]
					,"class": "detail"
					,width:settings.width
					,height:settings.height
				}).css({left: settings.width + 'px'}).appendTo($frame);
				$('img.detail', $frame).each(function(){
					$(this).animate({left: parseInt($(this).css('left')) - settings.width + 'px'}, settings.transitionRate, function(){
						//remove old image from dom
						$img.siblings('img.detail').remove();
						//set new data position
						$gallery.data({position: nextPos});
						//re-enable button
						$('.mediaViewerControl.active').removeClass('active');
					});
				});
				methods.updateSelected(library[nextPos]);
			}
			/**
			 * rewind photoViewer to previous item in library
			 */
			,rewind: function(){
				//console.log('rewind');
				var currentPos = $gallery.data('position');
				var prevPos = (currentPos == 0) ? (library.length-1)  : currentPos - 1 ;
				//prepend "next" photo to frame
				$img = $('<img>', {
					"src": library[prevPos]
					,"class": "detail"
					,width:settings.width
					,height:settings.height
				}).css({left: (0 - settings.width) + 'px'}).prependTo($frame);
				$('img.detail', $frame).each(function(){
					//animate slide for both img.detail
					$(this).animate({left: parseInt($(this).css('left')) + settings.width + 'px'}, settings.transitionRate, function(){
						//remove old image from dom
						$img.siblings('img.detail').remove();
						//set new data position
						$gallery.data({position: prevPos});
						//re-enable button
						$('.mediaViewerControl.active').removeClass('active');
					});
				});
				methods.updateSelected(library[prevPos]);
			}
			/**
			 * append forward/back controls to gallery
			 * used only by photoViewer
			 */
			,addControls: function(type){
				//console.log('addControls');
				$gallery.append($('<a>', {
					id: 'mediaViewerBack'
					,href: '#back'
					,text: '<'
					,"class": 'ir mediaViewerControl'
					,click: function(e){
						e.preventDefault();
						if(!$(this).hasClass('active')){
							$(this).addClass('active');
							methods.rewind();
						}
						return false;
					}
				})).append($('<a>', {
					id: 'mediaViewerNext'
					,href: '#next'
					,text: '>'
					,"class": 'ir mediaViewerControl'
					,click: function(e){
						e.preventDefault();
						if(!$(this).hasClass('active')){
							$(this).addClass('active');
							methods.advance();
						}
						return false;
					}
				}));
			}
			/**
			 * append close controls to gallery
			 * necessary because of flash embed
			 */
			,addClose: function(){
				//console.log('addClose');
				$gallery.append($('<a>', {
					id: 'mediaViewerClose'
					,"class": "ir mediaViewerControl"
					,click: function(){
						methods.destroy();
					}
					,text: 'close'
				}));
			}
			/**
			 * scours DOM for links with specified attribute, adding indicator classs
			 */
			,updateSelected : function(attrHref){
				//console.log('updateSelected');
				$('.inViewer').removeClass('inViewer');
				$('[href*="'+attrHref+'"]').addClass('inViewer');
			}
			/**
			 * removes the gallery and its children from the DOM
			 */
			,destroy : function(){
				//console.log('destroy');
				$gallery.fadeOut(settings.transitionRate, function(){
					//eliminate galley from dom
					$gallery.remove();
					//reset gallery
					$gallery = false;
					//reset library
					library = {};
					$('.inViewer').removeClass('inViewer');
				});
			}
		};

		return this.each(function(){
			$(this).bind('click', function(e){
				e.preventDefault();
				//use $this to prevent additional calls to jQuery()
				$this = $(this);
				if(!$this.hasClass('inViewer')){
					if(!$gallery) methods.init($this);
					//build library of \href\ values based on elements with matching \rev\ value
					library = new Array();
					$('[rev="'+$this.attr('rev')+'"]').each(function(i,v){
						library.push($(v).attr('href'));
					});
					//use \a\ element's \href\ value as target of initial viewer content
					target = $this.attr('href');
					switch($this.attr('rel')){
						case "photo":
							methods.populatePhoto(target);
							break;
						case "video":
							methods.populateVideo(target);
						default:
					}
				}
				return false;
			});
		});
	};
/** !END jQuery.fn.mediaViewer **/

	/**
	 * jQuery Plugin: houseInfo
	 *
	 * usage: $('#infoList a').houseInfo({parent: $(this).parent());
	 *
	 * @addon jQuery
	 * @param object options	[!parent | transitionRate]
	 * @return object			chainable instance of jQuery
	 */
	$.fn.houseInfo = function(options){
		var $container = null,
		content = { //control the markup of the container contents here
			wrapper:		$('<div>')
			,carat:			$('<span>',{id:'carat', 'class': "ir"})
			,name: 			$('<h2>')
			,state: 		$('<h3>')
			//,voteContainer:	$('<h4>',{text:"Votes: "})
			,voteContainer:	$('<h4>',{text:" "})
			,votes:			$('<span>')
			,description: 	$('<p>')
			,link:			$('<a>',{text:"Learn more about this house & vote>"})
		},
		data,
		position,
		timeout = false,
		settings = {
			parent: null
			//,transitionRate: 50
		};
		//merge user supplied options with presets
		$.extend(true, settings, options);
		if(settings.parent.length > 0) settings.parentWidth = settings.parent.width();

		var methods = {
			/**
			 * Creates the container object, its contents, and appends it to the DOM
			 */
			init: function(){
				//console.log('init');
				$container = $('<div>', {
					id: 'houseInfo'
				}).hover(function(e){
					//e == mouseover
					methods.cancelHide();
				},function(e){
					//e == mouseout
					methods.hide();
				})
				.append(content.state)
				.append(content.wrapper.append(content.name)
				.append(content.voteContainer.append(content.votes))
				)
				.append(content.description)
				.append(content.link)
				.append(content.carat)
				.appendTo(settings.parent).data({active:false});
				//store width measurements for future use
				settings.containerWidth = $container.width() + parseInt($container.css('padding-left')) + parseInt($container.css('padding-right'));
				settings.caratWidth = content.carat.width();
			}
			/**
			 * animate the container element: fadeIn
			 */
			,show: function(){
				//console.log('show');
				$container.data({active:true}).stop(true, true).show();
			}
			/**
			 * animate the container element: fadeOut as a timeout to accommodate mousing into the container
			 */
			,hide: function(){
				//console.log('hide');
				timeout = window.setTimeout(function(){
					$container.data({active:false}).stop(true, true).hide();
				}, 10);
			}
			/**
			 * cancel the hide action
			 */
			,cancelHide: function(){
				//console.log('cancelHide');
				clearTimeout(timeout);
			}
			,reposition: function(){
				//console.log('reposition');
				var sumOffset = Math.floor(position.left + (settings.refWidth / 2) - (settings.containerWidth / 2) - 5);
				//limit the container's offset to the maximum width of the parent
				var moveLeft = ((sumOffset + settings.containerWidth) <= settings.parentWidth) ? sumOffset : (settings.parentWidth - settings.containerWidth) + 10 ;
				//reposition carat, using difference of offset to actual move measure
				var diff = Math.floor(7 - (settings.caratWidth/2) + ((sumOffset - moveLeft)));
				content.carat.css({marginLeft: diff + 'px'});
				//reposition the container based on trigger element
				$container.css({left: moveLeft + 'px'});
			}
			/**
			 * currently unused. unset all container information, remove from dom
			 */
			,reset: function(){
				//console.log('reset');
				$container.remove();
				$container = null;
			}
			/**
			 * update container element and affect its display properties
			 */
			,update: function(){
				//console.log('update');
				methods.cancelHide();
				//initialize container if it is not already
				if($container == null) methods.init();
				//content[\index\] is each an instance of jQuery
				content.name.text(data.name);
				content.state.text(data.state);
				content.description.text(data.description);
				content.votes.text(data.votes);
				content.link.attr('href',data.link);
				//show the container if it is inactive
				if(!$container.data('active')) methods.show();
				//reposition
				methods.reposition();
				//refresh Cufon display
				if(typeof(Cufon) != 'undefined') try { Cufon.refresh(); } catch(err) {}
			}
		};
		return this.each(function(){
			$(this).hover(function(e){
				//console.log('mouseover');
				//collect information from trigger element
				$this = $(this);
				data = {
					name:			$this.find('.housename').text()
					,state: 		$this.find('.state').text()
					,description:	$this.find('.description').text()
					,votes:			$this.find('.votes').text()
					,link:			$this.attr('href')
				};
				position = $this.position();
				settings.refWidth = $this.width();
				//update houseInfo container
				methods.update();
			}, function(e){
				//console.log('mouseout');
				//hide houseInfo container
				methods.hide();
			});
		});
	};
/** !END jQuery.fn.houseInfo **/

	/** jQuery().modal();
	 *
	 * @name modal
	 * @param Object usrOptions Options for the modal overlay and content window. Details listed in 'options' declaration
	 * @param Function callback Called after #modalContent is appended to <body> and .fadeIn() animation completes
	 * @type jQuery
	 * @cat plugins/"windows and overlays"
	 *
	 **/
    jQuery.fn.modal = function(usrOptions, callback){
        return this.each(function(){
            $this = $(this);
            $this.bind('click', function(e){
                e.preventDefault;

				//establish basic options
				var options = {
					target:			false	//accept jQuery selected element as alternate target
					//,event:		'click'
					,iframe:		false	//load the target in an iframe instead
					,width:			false	//if unspecified will use width of target element
					,height:		false	//if unspecified will use height of target element
					,opacity:		.85		//accept float 0.00-1.00: % opacity of overlay, color determined in .css
					,transitionRate:250		//accept integer 1-1000 || "fast" || "slow"
					,padding: {				//specify offset (px) target element to modalContent wrapper
						top:        25
						,right:     25
						,bottom:    25
						,left:      25
					}
					,closeBtn:		true	//boolean display close button [x]
					,setup:			null	//chain constructors of an object: /web/20110811121554/https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/call
				};

				//recursively merge usrOptions into options
				$.extend(true,options,usrOptions);

                //perform setup function if specified
                $.isFunction(options.setup) && options.setup();

				//gather information about element target
				options.iframe = (options.iframe) ? options.iframe : ($this.attr('rel')=='iframe');

				//TODO: consider images?
				if(options.iframe){
					options.target = (options.target) ? options.target : $this.attr('href');
					options.height = (options.height) ?  options.height : 600;
					options.width = (options.width) ? options.width : 800;
					$content = $('<iframe>', {
						id: 'modalContentIframe'
						,name: 'modalContentIframe'
						,frameborder:0
						,height: options.height
						,width: options.width
						,scrolling: 'auto'
						,src: options.target
						,onload: function(){
							//console.log('content loaded');
						}
					});
				}else{
					options.target = (options.target) ? options.target : $($this.attr('href'));
					options.width = (options.width) ? options.width : options.target.width();
					options.height = (options.height) ? options.height : options.target.height();
					$content = options.target.clone().css({display:'block'});
				}

				//construct and append overlay
                var $modalOverlay = $('<div>', {
                    id:'modalOverlay'
                    ,'class':'modalRemove'
                    }).css({opacity:options.opacity}).appendTo('body').fadeIn(options.transitionRate);

				//construct and append modal content
                var $modalContent = $('<div>', {id:'modalContent'})
					.height(options.height)
					.width(options.width)
					.css({
						marginTop: -((options.height + options.padding.top + options.padding.bottom) / 2) + 'px'
						,marginLeft: -((options.width + options.padding.left + options.padding.right) /2) + 'px'
						,padding: options.padding.top + "px " + options.padding.right + "px " + options.padding.bottom + "px " + options.padding.left + "px"
					})//wrapper
                    .append($content)//cloned content
                    .appendTo('body').fadeIn(options.transitionRate, function(){
						//create closeBtn
						if(options.closeBtn) {
		                    $modalContent.append($('<a>', {
		                        id:'modalClose'
		                        ,'class':'ir modalRemove'
		                        ,title:'close'
		                        ,text:"close"
		                        ,href:'#modalRemove'
		                        }))//close button
		                }
                   		if($.isFunction(callback)){ callback(); }
                    });

				// destroy modal window
				// bind onclick event to selector
				$('.modalRemove').live('click', function(e){
					e.preventDefault;
					$('#modalClose').remove();
					$('#modalOverlay, #modalContent').fadeOut(options.transitionRate, function(){
						$('#modalOverlay, #modalContent').remove();
					});
					return false;
				});
                return false;
            });
        });
    };

	/* DEFINE backgronudOptions FOR EACH PAGE */
	/* "default": new Array("images/dropsofgood/page-bg/home-blue.jpg") */
	/* "default": new Array("images/dropsofgood/page-bg/home1.jpg","images/dropsofgood/page-bg/home2.jpg","images/dropsofgood/page-bg/home3.jpg","images/dropsofgood/page-bg/home4.jpg","images/dropsofgood/page-bg/home5.jpg","images/dropsofgood/page-bg/home6.jpg")*/

	var backgroundOptions = {
	    "default": new Array("images/dropsofgood/page-bg/home1.jpg","images/dropsofgood/page-bg/home2.jpg","images/dropsofgood/page-bg/home3.jpg","images/dropsofgood/page-bg/home4.jpg","images/dropsofgood/page-bg/home5.jpg","images/dropsofgood/page-bg/home6.jpg")
		,"communityhouses": new Array("images/dropsofgood/page-bg/communityhouses.jpg")
		,"localgrants": new Array("images/dropsofgood/page-bg/localgrants.jpg")
		,"volunteer": new Array("images/dropsofgood/page-bg/volunteer.jpg")
		,"about": new Array("images/dropsofgood/page-bg/about.jpg")
		,"adamsville-recreation-center": new Array("images/dropsofgood/page-bg/adamsville.jpg")
		,"the-advisory-committee-of-liberty-city-youth": new Array("images/dropsofgood/page-bg/tacolcy.jpg")
		,"austin-town-hall-park": new Array("images/dropsofgood/page-bg/austintownhall.jpg")
		,"brightwood-community-center": new Array("images/dropsofgood/page-bg/brightwood.jpg")
		,"ce-mcgruder-family-resource-center": new Array("images/dropsofgood/page-bg/mcgruder.jpg")
		,"community-education-center": new Array("images/dropsofgood/page-bg/cec.jpg")
		,"the-grow-haus": new Array("images/dropsofgood/page-bg/growhaus.jpg")
		,"mill-brook-community-center": new Array("images/dropsofgood/page-bg/millbrook.jpg")
		,"sabathani-community-center": new Array("images/dropsofgood/page-bg/sabathani.jpg")
		,"wlcac-howard-bingham-institute": new Array("images/dropsofgood/page-bg/wlcac.jpg")
	};

	var winnersPhotos = {
	    "default": new Array("images/dropsofgood/winner-wlcac.png","images/dropsofgood/winner-grow-haus.png","images/dropsofgood/winner-arc.png","images/dropsofgood/winner-millbrook.png","images/dropsofgood/winner-cec.png")
	};

	/*
	 * DOCUMENT.READY
	 */
	$(document).ready(function(){
		//load random background image
		$('body').css({'backgroundImage': 'url('+$.randomBg(backgroundOptions)+')'});

		$('#winningHouses').css({'backgroundImage': 'url('+$.randomBg(winnersPhotos)+')'});


		//INITIALIZE DropsOfGood object
		var dropsofgood = new DropsOfGood();
		dropsofgood.init($.parseQuerystring().votestatus);

		//home page houseInfo
		$('#meetTheHouses a.ir').houseInfo({parent:$('#meetTheHouses')});

		//mediaviewer
		$('#heroPlayVideo, .mediaContent a').mediaViewer({width:638, height:390, top:63, left:270});

		//TODO: modal content
		//$('#logo').modal({iframe:true, target:'/web/20110811121554/http://maxwellhouse.com', opacity:0});

		//tab navigation
		$('.tabContent').each(function(){
			$this = $(this);
			if(!$this.hasClass('current')){
				$this.hide();
			}
		});
		$('#tabNav a').each(function(){
			$(this).bind('click', function(e){
				$this = $(this);
				e.preventDefault();
				if(!$this.hasClass('current')){
					$this.addClass('current').siblings('.current').removeClass('current');
					$($this.attr('href')).addClass('current').show().siblings('.current').removeClass('current').hide();
					if (typeof(Cufon) != 'undefined') try { Cufon.refresh(); } catch(err) {}
				} //else do nothing
				return false;
			});
		});

		//load "external" links in new window
		$('a[rel*="external"]').attr({target: "_blank"});
	});
/** !END DOCUMENT.READY **/

})(jQuery);


//facebook open graphic tag
// /web/20110811121554/http://developers.facebook.com/docs/reference/plugins/like/
//document.write('<meta property="og:tag name" content="tag value"/>');
//var docHead = document.getElementsByTagName('head')[0];
//var fbOgImgMeta = document.createElement('meta');
//fbOgImgMeta.setAttribute('property','og:image');
//fbOgImgMeta.setAttribute('content','/web/20110811121554/http://www.kraftbrands.comimages/dropsofgood/logo-mh-50x50.jpg');
//docHead.appendChild(fbOgImgMeta);
//document.write('<meta property="og:image" content="/web/20110811121554/http://www.kraftbrands.comimages/dropsofgood/logo-mh-50x50.jpg">');

//var fbmeta = document.createElement('meta');
//fbmeta.setAttribute('property','fb:app_id');
//fbmeta.setAttribute('content',119720481437413);
//docHead.appendChild(fbmeta);
//document.write('<meta property="fb:app_id" content="119720481437413">');

/* END: facebook open graphic tag */


/* Doubleclick tracking tag scripts */
var TrackTag = "/web/20110811121554/http://fls.doubleclick.net/activityi;";

function GetTrackingTag(URL){
	var axel = Math.random()+"";
	var a = axel * 10000000000000;
	src = TrackTag + URL + 'ord=1;num='+ a + '?';

	if(GetTrackingTag){
		document.getElementById("tracking_tag").src = src;
		// alert(src);
	}
}

var TrackTagAD = "/web/20110811121554/http://ad.doubleclick.net/activity;";

function GetTrackingTagAD(URL, link){

	var axel = Math.random()+"";
	var a = axel * 10000000000000;
	src = TrackTagAD + URL + 'ord=1;num='+ a + '?';
	if(GetTrackingTagAD){
		document.getElementById("tracking_tagAD").src = src;
	}
}


/*-------------- LOOK HERE : NEW TAGGING ------------*/
/* This is for Tracking both the SpotLightTags and FloodLight tags from doubleclick random Number */
/* for URL pass everything up to the random value to be generated */
/* ex1: /web/20110811121554/http://fls.doubleclick.net/activityi;src=1649160;type=ritzzz;cat=recprnt;ord= (ord is the random element) */
/* ex2: /web/20110811121554/http://fls.doubleclick.net/activityi;src=1649160;type=ritzzz;cat=tlfrnd;ord=1;num= (num is the random element) */
/* for tagID pass the id of the iframe or image element (defaults to "doubleclick_tag" if no tagID is passed in) */
/*-------------------------------------------------*/
function getdoubleclicktag(URL,tagID){
	getDoubleClickTag(URL,tagID);
}

function getDoubleClickTag(URL,tagID){
	var axel = Math.random()+"";
	var a = axel * 10000000000000;
	src = URL + a + '?';

	if (!tagID || tagID == ""){
		tagID = "doubleclick_tag";
	};

	if(getDoubleClickTag){
		document.getElementById(tagID).src = src;
		// alert(src);
	}
}

function clickTag(href,dtag){
	var axel = Math.random() + "";
	var a = axel * 1000000000000000000;

	document.url = href;
	var doPing = new Image();
	// the URL below is a spotlight tag for page1
	doPing.src = dtag + a + '?';
	doPing.onLoad = passed;
	return false;
}

function passed(){
	document.location = document.url;
}

/* END: Doubleclick tracking tag scripts */


/*! jQuery Countdown Plugin
* Copyright 2011 Tom Ellis /web/20110811121554/http://www.webmuse.co.uk
* Licensed under MIT License
* See /web/20110811121554/http://www.webmuse.co.uk/license/
*/
(function($) {

	jQuery.fn.countdown = function( options ) {

		var defaults = {
				date: (new Date()),
				updateTime: 1000,
				htmlTemplate: "%{d}",
				minus: false
			},
			opts = {},
			rDate = /(%{d}|%{h}|%{m}|%{s})/g,
			rDays = /%{d}/,
			rHours = /%{h}/,
			rMins = /%{m}/,
			rSecs = /%{s}/,
			rDays = /%{d}/,
			cancel = false,
			template;

		$.extend( opts, defaults, options );

		template = opts.htmlTemplate;

		return this.each(function() {

			var $this = $(this),
				intval;

			intval = window.setInterval(function(){

				var TodaysDate = new Date(),
					CountdownDate = new Date( opts.date ),
					msPerDay = 24 * 60 * 60 * 1000,
					timeLeft = (CountdownDate.getTime() - TodaysDate.getTime()),
					e_daysLeft = timeLeft / msPerDay,
					daysLeft = Math.floor(e_daysLeft),
					e_hrsLeft = (e_daysLeft - daysLeft)*24, //Gets remainder and * 24
					hrsLeft = Math.floor(e_hrsLeft),
					minsLeft = Math.floor((e_hrsLeft - hrsLeft)*60),
					e_minsleft = (e_hrsLeft - hrsLeft)*60, //Gets remainder and * 60
					secLeft = Math.floor((e_minsleft - minsLeft)*60),
					time = "";

				if ( TodaysDate <= CountdownDate || opts.minus ) {
					time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
				} else {
					time = template.replace( rDate, "0");
					cancel = true;
				}

				$this.html( time );

				if ( cancel ){
					cancel = false;
					clearInterval( intval );
				}

			}, opts.updateTime);

		});
	};

//$(document).ready(function(){

	//$("#time").countdown({date:"may 1, 2011"});

	//$("#hdrcountdown").countdown({date:"june 27, 2011 23:40"});
	//$("#currentdays").countdown({date:"june 27, 2011 23:40"});

	//$("#time").countdown({date:"april 15, 2011"});
//});

})(jQuery);
