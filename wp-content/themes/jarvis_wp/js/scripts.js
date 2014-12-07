var testMobile,
    i = true,
    loadingError = '<p class="error">The Content cannot be loaded.</p>',
    current,
    next,
    prev,
    target,
    hash,
    url,
    page,
    title,
    wrapperHeight,
    projectIndex,
    scrollPostition,
    projectLength,
    ajaxLoading = false,
    pageRefresh = true,
    content = false,
    loader = jQuery('div#loader'),
    portfolioGrid = jQuery('div#portfolio-wrap'),
    projectContainer = jQuery('div#ajax-content-inner'),
    projectNav = jQuery('#project-navigation ul'),
    exitProject = jQuery('div#closeProject a'),
    folderName = 'portfolio-item',
    headerH = jQuery('nav.navigation').height(),
    rnrSafari = (jQuery.browser.webkit && !(/chrome/.test(navigator.userAgent.toLowerCase())));		

	 
/*----------------------------------------------------*/
/* PAGE LOADER
/*----------------------------------------------------*/
jQuery('#load').delay(600).fadeOut();   
/*----------------------------------------------------*/
// PRELOADER CALLING
/*----------------------------------------------------*/    
    jQuery("body.onepage").queryLoader2({
        barColor: "#111111",
        backgroundColor: "#ffffff",
        percentage: true,
        barHeight: 3,
        completeAnimation: "fade",
        minimumTime: 1000
    });  


/*----------------------------------------------------*/
/* HOME PARALLAX FUNCTION
/*----------------------------------------------------*/	
function rnrHomeParallax() {
	  jQuery(window).scroll(function() {
		  var yPos = -(jQuery(window).scrollTop() / 2); 
  
		  var coords = '50%'+ yPos + 'px';
		  jQuery('.home-parallax').css({ backgroundPosition: coords });
	  
	  }); 
}

/*----------------------------------------------------*/
/* SLAX TEXT FUNCTION
/*----------------------------------------------------*/	
function rnrSlabtext() {	  
	  jQuery(".home-quote h1").slabText({
			"viewportBreakpoint":300			
	  });
}


/*----------------------------------------------------*/
/* PORTFOLIO ISOTOPE
/*----------------------------------------------------*/
function rnrPortfolio(){	
		/*----------------------------------------------------*/
		/* ISOTOPE FUNCTION
		/*----------------------------------------------------*/	
			portfolioGrid.isotope({
				animationEngine : 'best-available',
				animationOptions: {
					duration: 200,
					queue: true
				},
				onLayout: function() {
                    jQuery(window).trigger("scroll");
                },
				layoutMode: 'masonry'
			});
		
		
		/*----------------------------------------------------*/
		/* INFINITE SCROLL FUNCTION
		/*----------------------------------------------------*/		
			portfolioGrid.infinitescroll({
					navSelector : '#port-pagination',
					nextSelector : '#port-pagination a',
					itemSelector : '.portfolio-item',
					errorCallback: function(){
							jQuery('#port-pagination').remove();							
						},
				},
				function(newElements) {
				  var newElems = jQuery(newElements);
				  newElems.imagesLoaded(function(){
					portfolioGrid.isotope('appended', newElems );					
					setColumns();
					rnrPortfolioLazyLoad();
					rnrPrettyPhoto();
				  });
				}
			);	
			
			jQuery(window).unbind('.infscr');	
			jQuery("#port-pagination a").click(function(){
				jQuery('#portfolio-wrap').infinitescroll('retrieve');
				jQuery('#port-pagination').show();
				return false;
			});
		
			jQuery('#filters a').click(function(){
				jQuery('#filters a').removeClass('active');
				jQuery(this).addClass('active');
				var selector = jQuery(this).attr('data-filter');
				portfolioGrid.isotope({ filter: selector });	
				return false;
			});		
		
			function setColumns() { 
				portfolioGrid.isotope('reLayout');
			}	
			setColumns();		
			
			
			portfolioGrid.waitForImages(function () { 
				setColumns();
			});
			
			
			jQuery(window).bind('resize', function () { 
				setColumns();			
			});						
 }

/*----------------------------------------------------*/
/* LAZY LOADING
/*----------------------------------------------------*/
function rnrLazyLoad(){
        var rnrLazy = jQuery("img.rnr-lazyload");
    
        rnrLazy.lazyload({
            effect: 'fadeIn',
            event : 'scroll',
			threshold : 200,

			load : function() {
				jQuery.waypoints("refresh");
				jQuery("img.rnr-lazyload").each(function() {
					    jQuery(this).appear(function(i) {
					     jQuery(this).animate({opacity: 1 }, 5*i);
						});	
					   
				  });				
	
				  			
			},
            failure_limit: Math.max(rnrLazy.length - 1, 0)
        });		
}

/*----------------------------------------------------*/
/* PORTFOLIO LAZY LOADING
/*----------------------------------------------------*/
function rnrPortfolioLazyLoad(){
var rnrPortfolioLazy = jQuery("img.portfolio-lazyload, img.rnr-lazyLoad");
jQuery('.portfolio-lazyLoad').lazyload({
            effect: 'fadeIn',
			threshold : 50,
            event : 'scroll',
			
			appear : function() {
		
			},
			load : function() {
				jQuery.waypoints("refresh");				
					jQuery(this).appear(function() {
						 jQuery(this).animate({opacity: 1 }, 500);
					});	
				
					portfolioGrid.isotope('reLayout');	
			},
            failure_limit: Math.max(rnrPortfolioLazy.length - 1, 0)
        });	
		
}


   


/*----------------------------------------------------*/
/* FULLSCREEN IMAGE HEIGHT
/*----------------------------------------------------*/
function rnrFullScreen(){
	window_height = jQuery(window).height();
	jQuery('.fullscreen, .background-video').css({height:window_height});		  
}

/*----------------------------------------------------*/
/* FULLWIDTH SECTION
/*----------------------------------------------------*/	
function rnrFullWidth(){
		$offset_block = ((jQuery(window).width() - parseInt(jQuery('.sixteen').width())) / 2); 
		
		jQuery('.full-width').each(function(){		
				jQuery(this).css({
					'margin-left': - $offset_block,
					'padding-left': $offset_block,
					'padding-right': $offset_block
				});			
			
		});
	
		jQuery('html[dir="rtl"] .full-width').each(function(){		
				jQuery(this).css({
					'margin-right': - $offset_block,
					'padding-left': $offset_block,
					'padding-right': $offset_block
				});			
			
		});		
}	
rnrFullScreen();
 
	
/*----------------------------------------------------*/
/* FALLBACK FOR IPHONE
/*----------------------------------------------------*/   
function rnrFullVideo() { 
	var winWidth = jQuery(window).width();
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		jQuery('.home-video .rnr-video').empty();
	} 
}

 
/*----------------------------------------------------*/
/* FLEXSLIDER FUNCTION
/*----------------------------------------------------*/   
function rnrFlexSlider() {	 

		  jQuery('.flexslider').flexslider({						
				  animation: "slide",
				  direction: "horizontal", 
				  slideshow: false,
				  slideshowSpeed: 3500,
				  animationDuration: 500,
				  directionNav: true,
				  controlNav: false
					  
		   });	
			jQuery('.flexslider .flex-direction-nav li a.flex-next').html('<i class="fa fa-angle-right"></i>');
			jQuery('.flexslider .flex-direction-nav li a.flex-prev').html('<i class="fa fa-angle-left"></i>');		   	 

} 	

/*----------------------------------------------------*/
/* TEXT SLIDER FUNCTION
/*----------------------------------------------------*/   
function rnrHomeTextSlider() {	
		
		jQuery('#home-slider').flexslider({						
				animation: "slide",
				direction: "vertical", 
				slideshow: true,
				slideshowSpeed: 3500,
				animationDuration: 1000,
				directionNav: false,
				controlNav: true,
				start: function () {
				 jQuery(window).trigger('resize'); 
			   }
		 });
		 jQuery('#home-slider .home-slide-content').fitText(1.5);				   
}

	
/* ------------------------------------------------------------------------ */
/* TRANSPARENT NAV */
/* ------------------------------------------------------------------------ */ 
function rnrTransparentNav() {	
	if (jQuery(window).scrollTop() > jQuery(window).height()){
		jQuery('nav.transparent').addClass('scroll');		
	} else {
		jQuery('nav.transparent').removeClass('scroll');				
	}
	
	
	jQuery(window).on("scroll", function(){
		var winHeight = jQuery(window).height();
		var windowWidth = jQuery(window).width();
		var windowScroll = jQuery(window).scrollTop();
		var home_height =  jQuery('.home-parallax').outerHeight();

			if (jQuery(window).scrollTop() > home_height){
				jQuery('nav.transparent').addClass('scroll');										
			} else {
				jQuery('nav.transparent').removeClass('scroll');									
			}

		
	  });
}

/* ------------------------------------------------------------------------ */
/* DROP DOWN SUPERFISH MENU */
/* ------------------------------------------------------------------------ */ 
function rnrDropDownMenu() {	
	jQuery("#nav").superfish({
		delay:       500,
		animation:   {opacity:'show',height:'show'},
		speed:       300,
		autoArrows:  false, 
		dropShadows: false,
	});
}

/* ------------------------------------------------------------------------ */
/* BACK TO TOP 
/* ------------------------------------------------------------------------ */
function rnrBackToTop() {	
	jQuery(window).scroll(function(){
		if(jQuery(window).scrollTop() > 800){
			jQuery("#back-to-top").fadeIn(200);
		} else{
			jQuery("#back-to-top").fadeOut(200);
		}
	});
	
	jQuery('#back-to-top, .back-to-top').click(function() {
		  jQuery('html, body').animate({ scrollTop:0 }, '800');
		  return false;
	});
}

isAnimating = true;

/* ------------------------------------------------------------------------ */
/* MENU SCROLL FUNCTION
/* ------------------------------------------------------------------------ */ 
function rnrMenuScroll() {	
	jQuery('.main-menu a, .logo a, .home-logo-text a, .home-logo a, .scroll-to').click( function(event) { 		
			  var home_height =  jQuery('.home-parallax').outerHeight();
			   if ((jQuery(window).scrollTop() <= home_height) && i){
				 headerH = jQuery('nav.navigation').height();
				 headerH = headerH-headerH/5 - 5 ;  					 
			  }
			  i=false;
	
					
		if(this.hash) {			
				jQuery.scrollTo( jQuery(jQuery(this).attr("href")), 1300, { easing: "easeInOutExpo" , offset:  -headerH + headerH/6, 'axis':'y' } );	
				event.preventDefault();									
			}			
				
     	headerH = jQuery('nav.navigation').height(); 
    });
 
	
	
	  if( window.location.hash ) {				
		  setTimeout ( function () {		
		  headerH = jQuery('nav.navigation').height(); 															
			  jQuery.scrollTo( window.location.hash , 10 , { easing: "easeInOutExpo" , offset:  -headerH , "axis":"y" } );																		
		  }, 200 );								
	  }
	  
	jQuery('.rnr-offset').each(function() {        	
		jQuery(this).waypoint( function( direction ) {				
			if( direction === 'down' ) {					
				var rnrSection = jQuery(this).attr('id');
				
				if( jQuery(this).data('parent') ) {
					rnrSection = jQuery(this).data('parent');
				}
				
				jQuery('.navigation li').removeClass('active');
				jQuery('.navigation a[href*=#'+rnrSection+']').parent().addClass('active');
								
			}
						
		} , { offset: 2.5*headerH });			  	  
	});
	
	jQuery('.rnr-scroll-up').each(function() {        	
		jQuery(this).waypoint( function( direction ) {				
			if( direction === 'up' ) {					
				var rnrSection = jQuery(this).data('section');					
				if( jQuery(this).data('parent') ) {
					rnrSection = jQuery(this).data('parent');
				}
				jQuery('.navigation li').removeClass('active');
				jQuery('.navigation a[href*=#'+rnrSection+']').parent().addClass('active');									
			}
						
		} , { offset: 0 });			  	  
	});	
	  
}


/*----------------------------------------------------*/
// ADD PRETTYPHOTO
/*----------------------------------------------------*/
function rnrPrettyPhoto() {	
		//add galleries to portfolios
		jQuery('.portfolio-item').each(function(){
			var $unique_id = Math.floor(Math.random()*10000);
			jQuery(this).find('.portfolio-gallery-image').attr('data-rel','prettyPhoto['+$unique_id+'_gal]');
		});



		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({
			theme: 'dark_rounded',
			allow_resize: true,
			default_width: 690,
			opacity: 0.85, 
			animation_speed: 'normal',
			deeplinking: false,
			default_height: 388,
			social_tools: '',
			markup: '<div class="pp_pic_holder"> \
						   <div class="ppt">&nbsp;</div> \
							<div class="pp_details"> \
								<div class="pp_nav"> \
								    <a href="#" class="pp_arrow_previous"> <i class="fa-angle-left fa icon-default-style"></i> </a> \
									<a href="#" class="pp_arrow_next"> <i class="fa-angle-right fa icon-default-style"></i> </a> \
									<p class="currentTextHolder">0/0</p> \
								</div> \
								<a class="pp_close" href="#"><span class="fa fa-times icon-default-style"></span></a> \
							</div> \
							<div class="pp_content_container"> \
								<div class="pp_left"> \
								<div class="pp_right"> \
									<div class="pp_content"> \
										<div class="pp_fade"> \
											<div class="pp_hoverContainer"> \
											</div> \
											<div id="pp_full_res"></div> \
										</div> \
									</div> \
								</div> \
								</div> \
							</div> \
						</div> \
						<div class="pp_loaderIcon"></div> \
						<div class="pp_overlay"></div>'
		});
		
}

rnrPrettyPhoto();



/*----------------------------------------------------*/
// MILESTONE COUNTER
/*----------------------------------------------------*/  
 (function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return jQuery(this).delay(1000).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                jQuery(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
	
})(jQuery);

       


		
jQuery(window).load(function(){   
  rnrAjaxPortfolio(); 
  setTimeout(rnrSlabtext, 5);
		
  jQuery(document).ready(function(){ 	
		jQuery(window).trigger( 'resize' );	
		jQuery(window).trigger( 'hashchange' );	
        rnrHomeTextSlider();
		rnrMenuScroll();
		rnrHomeParallax();
		rnrFullWidth();
		rnrPortfolio();
		rnrFlexSlider();	
		rnrTransparentNav();
		rnrDropDownMenu();
		rnrSlabtext(); 
        rnrLazyLoad();
        rnrShortcodes();
		rnrBackToTop();
		rnrPortfolioLazyLoad();	
		rnrFullVideo();

     });	

if ( !rnrSafari ) {
	jQuery('.home3').children('.container').addClass('no-safari');
}

		  



/* ------------------------------------------------------------------------ */
/* CAROUSEL */
/* ------------------------------------------------------------------------ */
jQuery('.rnr-carousel').each(function(){
	if( jQuery(this).length > 0 ){
		
		var nav_class = jQuery(this).data('carousel-id')
	
		jQuery(this).carouFredSel({
			width: '100%',
			height: '100%',
			prev: '#' + nav_class + 'prev',
			next: '#' +nav_class + 'next',
			align: "center",
			scroll : {
				items           : 1,
				easing          : "easeInOutExpo",
				duration        : 1000,                         
				pauseOnHover    : true
			},
			auto: false,
			visible: {
				min: 1,
				max: 5
			},
			circular: false
		});
	
	}	
});




/* ------------------------------------------------------------------------ */
/* TEAM POP UP FIX */
/* ------------------------------------------------------------------------ */
jQuery('.team-member').parents('.section').css('z-index','inherit');
 
/* ------------------------------------------------------------------------ */
/* STICKY NAVIGATION */
/* ------------------------------------------------------------------------ */ 
jQuery("nav.sticky-nav").sticky({ topSpacing: 0, className: 'sticky', wrapperClassName: 'main-menu-wrapper' }); 
	  

/* ------------------------------------------------------------------------ */
/* SELECTNAV - A DROPDOWN NAVIGATION FOR SMALL SCREENS */
/* ------------------------------------------------------------------------ */ 
selectnav('nav', {
	nested: true,
	indent: '-'
});  
	
	
/*----------------------------------------------------*/
// ADD VIDEOS TO FIT ANY SCREEN
/*----------------------------------------------------*/
jQuery(".container").fitVids();	
  
});
//END OF DOCUMENT LOAD FUNCTION

 jQuery(window).bind('resize',function() {	  
	rnrFullScreen();	
	rnrFullWidth(); 	
    rnrHomeTextSlider();	 
});	


