$(function(){
/*  Animate the Choose One picker hand 
 * #photo1 - left side
 * #photo2 - right side 
 */
    $('#photo1 a')
        .css('background-position','0 0')
        .mouseover(function(){
            $('#pointer').css('background-position','-36px 0')
            $('#photo1 div.this-one-wrapper').css('background-position', '0px -352px')
        })
        .mouseout(function(){
            $('#photo1 div.this-one-wrapper').css('background-position', '0px 26px')
            $('#pointer').css('background-position','-340px 0')
        })
        
    $('#photo2 a')
        .css('background-position', '0 0')
        .mouseover(function () {
            $('#pointer').css('background-position','-682px 0')
            $('#photo2 div.this-one-wrapper').css('background-position','0px -352px')
        })
        .mouseout(function(){
            $('#photo2 div.this-one-wrapper').css('background-position','0px 26px')
            $('#pointer').css('background-position','-340px 0')
        })
});


// perform JavaScript after the document is scriptable.
// Toggles the Mano-A-Mano and Gallery Panels
$(function() {
    // setup ul.tabs to work as tabs for each div directly under div.panes
    $("ul.tabs").tabs("div.panes > div");
});


// Scrollable
$(function() {
  // initialize scrollable
  $(".scrollable").scrollable();
});


// Testing Json Call script.
$(document).ready(function () {
    if ($('#gallery').length) {
        var photoEntries = [];
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  {
      tags: "jquery",
      tagmode: "any",
      format: "json"
  }, function (data) {

      _getGalleryRange(data.items.length);

      $("<ul>").appendTo(".entries");
      $.each(data.items, function (i, item) {
          //console.log(item);
          var elLi = $("<li>").appendTo(".entries ul");
          $("<img/>").attr("src", item.media.m).attr("rel", "lightbox").attr("title", item.title).appendTo(elLi);
          galleryImageOverlay(item.media.m);
          if (i == 15) return false;
      });

  });
    }

    // Send vote back from FaceOff
    function getFaceOff() {
        $.ajax({
            type: 'GET',
            url: url,
            data: data,
            success: success,
            dataType: dataType
        });
    }

    // Send vote back from FaceOff
    function sendFaceOffVote() {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: success,
            dataType: dataType
        });
    }


    // Script triggering the modal Overlays for the Images Within the Gallery section
    function galleryImageOverlay(response) {
        // thumbnail scrollable
        $("#thumbnails").find("img").each(function (index) {
            // thumbnail images trigger the overlay
            $(this).overlay({

                effect: 'apple',
                target: '#box',
                mask: '#666',

                onBeforeLoad: function () {
                    $("div.items div img").attr("src", "");
                },
                onLoad: function () {
                    $("div.items div img").attr("src", response);
                }
            });
        });
    }

    //<div class="fb-like" data-href="http://www.facebook.com/cheezit?v=app_349187041785132" data-send="false" data-layout="button_count" data-width="450" data-show-faces="false" data-font="arial"></div>


    function _getGalleryRange(number) {
        $('.range .dynLength').text(number);
    }

    /*
    function getFaceOff() { 
    
    }
    
    function postFaceOff() {
    
    }
    
    function faceOffWinInfo() {

    }

    function getGalleryRange() {
        
    }
    
    function galleryListingItem() {
        
    }
    
    function galleryPrevious() {
    
    }
    
    function galleryNext() {
    
    }
    
    function sortGallery() { 
    
    }
    
    function sortGalleryByDate() {
    
    }

    function sortGalleryByWins() {
    
    }

    function createGalleryOverlay() {
    
    }

    function likeGalleryItem() {
    
    }

    function closeItem() {
    
    }

    function newFaceOffChallengers() {
    
    }

    function faceOffCongradCard() {
    
    }

    function continuePlayingFaceOff() {
    
    }

    function postToFacebookWall(){
    
    }

    function facebookID() {
    
    }
    */

    //json call
    //if ($('#gallery').length) {
    //   var photoEntries = [];
    //   $.ajax({
    //       url: 'http://cheezit.razorfishtc.com/home/gallery?jsoncallback=photoGallery&PageNo=1&SortBy'
    //          , type: 'GET'
    //          , dataType: "jsonp"
    //          , jsonp: false
    //          , jsonpCallback: 'photoGallery'
    //          , success: function (data) {
    //photoEntry = data;
    //              $.each(data, function (key, value) {
    //console.log(key);
    //console.log(value.URL);
    //              });
    //$('.title .dynTxt').text(photoEntry.EntryData);
    //console.log(photoEntry.EntryData);
    //              //$('.userID .dynTxt').text(photoEntry.UserID);
    //console.log(photoEntry.UserID);
    //          }
    //    });
    //}


    //json call FaceOff Placeholder call for getting the two images to vote on.
    //if ($('#mano-a-mano').length) {
    //    var photoEntry = [];
    //    $.ajax({
    //        url: 'http://cheezit.razorfishtc.com/home/faceOff?jsoncallback=faceOff'
    //              , type: 'GET'
    //              , dataType: "jsonp"
    //              , jsonp: false
    //              , jsonpCallback: 'FaceOff'
    //              , success: function (data) {
    //photoEntry = data;
    //                  $.each(data, function (key, value) {
    //  console.log(key);
    // console.log(value.URL);
    //                  });
    //$('.title .dynTxt').text(photoEntry.EntryData);
    //console.log(photoEntry.EntryData);
    //$('.userID .dynTxt').text(photoEntry.UserID);
    //console.log(photoEntry.UserID);
    //              }
    //    });
    //}
});

// ajax Post  to the Services.VoteService POST Create(PromotionEntryID, FacebookID))
// PoromotionEntryID and facebookID will need to be post back. 
// fires with user votes on an image.
// FacebookID here is the user who voted on the Image.
//Return value of success or failure true/false 0/1 will be returned if service is dow.
//

  

// Overlay Function
$(function() {     
    // if the function argument is given to overlay,    
    // it is assumed to be the onBeforeLoad event listener    
    $("a[rel]").overlay({
        mask: '#333',
        effect: 'apple'//,
        
        //onBeforeLoad: function() {
            

        //}     
    });


    // Good Choices Overlay
    // if the function argument is given to overlay,    
    // it is assumed to be the onBeforeLoad event listener    
    $(".choicesPop[rel]").overlay({
        mask: '#333',
        effect: 'apple'//,
        
        //onBeforeLoad: function() {
            // grab wrapper element inside content
            //var wrap = this.getOverlay().find(".contentWrap");
            
            // load the page specified in the trigger
        //  wrap.load(this.getTrigger().attr("href"));
        //}     
    });
});







