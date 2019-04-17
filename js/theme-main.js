import timeline from '../timeline.json';
/*	Table OF Contents
==========================
1. Nav - Sticky
2. Nav - One Page 
3. TimeCircles Countdown
4. Magnific Popup
5. Ajax Form
6. Stellar Parallax
7. Owl Carrousel
*/

"use strict";
$(document).ready(function() {

	/*==============================
		1. Nav - Sticky
	==============================*/
	$(window).on("load", function(){
	  $("#nav-sticky-wrapper").sticky({ topSpacing: 0 });
	});
	
	/*==============================
		2. Nav - One Page 
	==============================*/
	$('#nav_list').onePageNav({
		currentClass: 'active',
	});

	/*==============================
		3. TimeCircles Countdown
	==============================*/
	/*  */
	$(".countdown").TimeCircles({
		fg_width: 0.02,
		bg_width: 0.3,
		circle_bg_color: '#7b7571',
		time: {
			Days: { color: '#990033' },
			Hours: { color: '#990033' },
			Minutes: { color: '#990033' },
			Seconds: { color: '#990033' }
		},
		count_past_zero: false
	});
	$(window).on("resize", function(){
	    $(".countdown").TimeCircles().rebuild();
	});

	/*==============================
		4. Magnific Popup
	==============================*/
	$('.gallery-popup').magnificPopup({
	  delegate: 'a', // child items selector, by clicking on it popup will open
	  gallery:{enabled:true},
	  //type: 'image', //Detecta el tipo con la clase mfp-TYPE
	  mainClass: 'mfp-with-zoom', // this class is for CSS animation below

	  zoom: {
	    enabled: true, // By default it's false, so don't forget to enable it

	    duration: 300, // duration of the effect, in milliseconds
	    easing: 'ease-in-out', // CSS transition easing function

	    // The "opener" function should return the element from which popup will be zoomed in
	    // and to which popup will be scaled down
	    // By defailt it looks for an image tag:
	    opener: function(openerElement) {
	      // openerElement is the element on which popup was initialized, in this case its <a> tag
	      // you don't need to add "opener" option if this code matches your needs, it's defailt one.
	      return openerElement.is('img') ? openerElement : openerElement.find('img');
	    }
	  },
	  markup: '<div class="mfp-figure">'+
					'<div class="mfp-close"></div>'+
					'<div class="mfp-img"></div>'+
					'<div class="mfp-bottom-bar">'+
					  '<div class="mfp-title"></div>'+
					  '<div class="mfp-counter"></div>'+
					'</div>'+
				  '</div>', // Popup HTML markup. `.mfp-img` div will be replaced with img tag, `.mfp-close` by close button
	  titleSrc: 'title'
	  // other options
	});

	/*==============================
		5. Ajax Form
	==============================*/
	$('#ajaxFormSubmit').on('click',function(){
		var Form = $('#ajaxForm');
		var hasErrors = Form.validator('validate').has('.has-error').length
		if (hasErrors){
			
		}else{
			$('#fullscreenloading').show();
			$('#boxedResult').show();
			$('#sendResult').html('<div class="uil-rolling-css"><div><div></div><div></div></div></div>');
      var data = {}
      Form.serializeArray().forEach(function(input){
        data[input.name] = input.value;
      });
			$.ajax({
				type: 'PUT',
        dataType: 'JSON',
        contentType:"application/json; charset=utf-8",
				url: 'http://localhost:4567/rsvps',
        crossDomain: true,
				data: JSON.stringify({ rsvp: data }),
				success: function(msg){
					$('#sendResult').html('Thanks!')
				},
				error: function(){
					$('#sendResult').html('<img src="img/form-icon-error.png"/><br/><span class="title error">Sorry!</span><br/>Your data has not been sent. Please try again.<br /><strong>Error: #AJ001</strong><br /><br /><button class="btn btn-default BtnCloseResult" type="button">Close</button>');
				}
			});
		}
	});
	$(document).on('click', '.BtnCloseResult', function () {
		$('#boxedResult').hide();
		$('#fullscreenloading').hide();
	});


	/*==============================
		6. Stellar Parallax
	==============================*/
	react_to_window();
        
	//only acstivate stellar for window widths above or equal to 1024
    var stellarActivated = false;
    
    $(window).on("resize", function() {
        react_to_window();
    });
    
    function react_to_window() {
        if ($(window).width() <= 1024) {
            if (stellarActivated === true) {
                $(window).data('plugin_stellar').destroy();
                stellarActivated = false;
            }
        } else {
            if (stellarActivated === false) {

                $.stellar({
                	horizontalScrolling: false,
					responsive: true,
               });
                
                $(window).data('plugin_stellar').init();
                stellarActivated = true;
            }
        }
    }

    /*==============================
		7. Owl Carrousel
	==============================*/
	$('#owl-logo').owlCarousel({
		items : 3,
		lazyLoad : true,
		navigation : false
  });
  /*==============================
		8. Timeline
	==============================*/
  function buildTimelineEntry(entry, inverted){
    var month = entry.month;
    var day = entry.day;
    var year = entry.year;
    var img = entry.img;
    var title = entry.title;
    var story = entry.description;
    var out = "";
    var liClass = inverted ? 'timeline-inverted' : '';
    out += '<li class="'+liClass+'">';
    out += '  <div class="timeline-badge"><i class="fa fa-heart" aria-hidden="true"></i></div>';
    out += '  <div class="timeline-panel">';
    out += '    <div class="timeline-heading">';
    out += '      <h2 class="timeline-title">'+month+' <span>'+day+'</span> '+year+'</h2>';
    out += '    </div>';
    out += '    <div class="timeline-body text-center">';
    out += '      <img src="'+img+'" class="img-responsive" alt="Our Story"/>';
    out += '      <h2 class="timeline-title">'+title+'</h2>';
    out += '      <p>'+story+'</p>';
    out += '    </div>';
    out += '  </div>';
    out += '</li>';
    return out;
  }
  var html = timeline.map(function (entry, idx){
    console.log(entry);
    return buildTimelineEntry(entry, idx % 2 != 0);
  });
  $(".timeline").html(html + $(".timeline").html());
});
