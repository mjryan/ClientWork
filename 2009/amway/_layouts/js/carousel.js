$(function(){
	$('.carousel').each(function(){
		var $carousel = this;
		var $ul = $('ul:first', $carousel);
		var $items = $('li', $ul);
		var $prevButton, $nextButton, iCurrentIndex, iColumns, iColumnWidth;
		// events
		$prevButton = $("a.carousel-move-left", $carousel).click(movePrev);
		$nextButton = $("a.carousel-move-right", $carousel).click(moveNext);
		$('a',$items).each(function(){
			$(this).mousedown(function(){
				$(this).addClass('down');
			}).mouseup(function(){
				$(this).removeClass('down');
			});
		});
		// carousel logic
		$prevButton.addClass('button-disabled');
		iColumns = $items.length;
		if(iColumns <= 5) {
			// disable the buttons and return, since there 
			// aren't enough columns for a carousel
			$prevButton.addClass('button-disabled');
			$nextButton.addClass('button-disabled');
			return; 
		}
		iColumnWidth = 163; // $($items[0]).outerWidth()
		var iCurrentIndex = 0;
		var iMinIndex = 0;
		var iMaxIndex = iColumns - 5; // There are 5 visible columns
		// keyboard events
		$ul.attr('tabindex','0')
			.find('li').attr('tabindex','-1')
			.end()
			.focus(function(){
				// set up the LI elements and focus first LI
				if($('li.focus',this).length == 0){
					$(this).find('li:first')
					.addClass('focus')
					.attr('tabindex','0')
					.siblings()
					.attr('tabindex','-1');
				} 
			})
			.keydown(function(e){
				if(e.which == 39){
					var $current = getCurrentItem();
					moveToNextItem($current);
				}
				if(e.which == 37){
					var $current = getCurrentItem();
					moveToPrevItem($current);
				}
			});
		// internal functions
		function moveNext() {
			if((iCurrentIndex + 1) <= iMaxIndex) {
				iCurrentIndex++;
				updateView();
				updateButtons(iCurrentIndex);
			}
		}		
		function movePrev() {
			if((iCurrentIndex - 1) >= iMinIndex) {
				iCurrentIndex--;
				updateView();
				updateButtons(iCurrentIndex);
			}
		}
		function getCurrentItem() {
			return $('li.focus', $ul);
		}		
		function moveToNextItem($current) {
			if($($current).next().is('li')) {
				$($current).removeClass('focus')
					.attr('tabindex', '-1')
						.find('a').blur()
					.end().next()
					.attr('tabindex', '0')
					.addClass('focus')
					.find('a').focus();
			}
		}
		function moveToPrevItem($current) {
			if($($current).prev().is('li')) {
				$($current).removeClass('focus')
					.attr('tabindex', '-1')
					.prev()
					.attr('tabindex', '0')
					.addClass('focus')
					.find('a').focus();
				}
		}
		function updateView() {
			$($ul).stop();
			$($ul).animate({ 
					left: (iColumnWidth * -iCurrentIndex) + "px"
				}, 500);	
		}	
		function updateButtons(iCurrentIndex){
			if(iCurrentIndex == iMinIndex) {
				$prevButton.addClass('button-disabled');
				return;
			}
			if((iCurrentIndex) == iMaxIndex) {
				$nextButton.addClass('button-disabled');
				return;
			}
			$prevButton.removeClass('button-disabled');
			$nextButton.removeClass('button-disabled');
			return;
		}
	});
});