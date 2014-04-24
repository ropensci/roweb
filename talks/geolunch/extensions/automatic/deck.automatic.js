/*!
Deck JS - deck.navigation
Copyright (c) 2012 Romain Champourlier
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds automatic control of the deck.
*/
(function($, deck, undefined) {
	var $d = $(document);
	var running = false;
	
	clearAutomaticTimeout = function() {
		if ($[deck].automatic && $[deck].automatic.timeout) {
			window.clearTimeout($[deck].automatic.timeout);
		}
	};
	
	// from and to are set with the values of the slide event calling
	// this method, not the changes this method should trigger.
	setTimeoutIfNeeded = function(e, from, to) {
		// Clear previous timeout (necessary in cases the user generates deck's change
		// events, for example by changing slides manually).
		clearAutomaticTimeout();
		
		var opts = $[deck]('getOptions');

		if (running) {
			// Slideshow running.

			var elem = $[deck]('getSlide', to);
			
			var duration = opts.automatic.slideDuration;

      // Iterate over element's classes to
      // match against classdata
      $.each(elem.attr('class').split(/\s+/), function(idx, cls){
        $.each(opts.classdata, function(feat_cls, features){
          if(cls == feat_cls && features.duration){
            duration = features.duration;
          }
        });
      });

			var customDuration = elem.attr('data-duration');
			if(customDuration){
			  duration = customDuration;
			}

      // If duration is negative, don't set a timeout
			if(duration >= 0){
			  if (to == $[deck]('getSlides').length-1) {
				  // setTimeout... called when going to last slide. 
				  // If cycling, set a timeout to go to first slide, else don't set a timeout, and set
				  // state to stopped.
				  if (opts.automatic.cycle) {
					  $[deck].automatic = {
						  timeout: window.setTimeout(function() {
							  $[deck]('go', 0);
							  if (e) e.preventDefault();
						  }, duration)
					  };
				  }
				  else {
					  $(opts.selectors.automaticLink).removeClass(opts.classes.automaticRunning);
					  $(opts.selectors.automaticLink).addClass(opts.classes.automaticStopped);
				  }
			  }
			  else {
				  // Running, not yet on last slide.
				  $[deck].automatic = {
					  timeout: window.setTimeout(function() {
						  $[deck]('next');
						  if (e) e.preventDefault();
					  }, duration)
				  };
			  }
      }
		}
	};
	
	/*
	Extends defaults/options.
	
	options.classes.automaticRunning
		This class is added to the automatic link when the deck is currently in running
		state.
		
	options.classes.automaticStopped
		This class is added to the automatic link when the deck is currently in stopped
		state.
		
	options.selectors.automaticLink
		The elements that match this selector will toggle automatic run of the deck
		when clicked.
	*/
	$.extend(true, $[deck].defaults, {
		classes: {
			automaticRunning: 'deck-automatic-running',
			automaticStopped: 'deck-automatic-stopped'
		},
		
		selectors: {
			automaticLink: '.deck-automatic-link'
		},
		
		classdata: {
		/* // Example duration class-feature
		 * // Sets the duration of all elements with
		 * // bullet-point-timing class to 500ms.
		 * 'bullet-point-timing': {
		 *   duration: 500
	   * }
	   */
		},
		
		automatic: {
			startRunning: true,
			cycle: true,
			slideDuration: 3000
		}
	});

  // Lets others detect when slideshow is running automatically
  $[deck]('extend', 'isRunning', function(){
    return running;
  });

	$d.bind('deck.init', function() {
		var opts = $[deck]('getOptions'),
		slides = $[deck]('getSlides'),
		$current = $[deck]('getSlide'),
		ndx;
		
		// Extension function to play the slideshow
		$[deck]('extend', 'play', function(){
      var slides = $[deck]('getSlides');
		  if (slides[slides.length-1] == $[deck]('getSlide')) {
			  // Stopped on last slide. Clicking to play/pause will rewind to first slide, and play.
			  $.deck('go', 0);
		  }
		  running = true;
		  $(opts.selectors.automaticLink).addClass(opts.classes.automaticRunning);
		  $(opts.selectors.automaticLink).removeClass(opts.classes.automaticStopped);
      $d.trigger('deck.onPlayToggle', true);
		  $d.trigger('deck.onPlay');
		  setTimeoutIfNeeded(null, slides.length, 0);
    });
    
    // Extension function to pause the slideshow
    $[deck]('extend', 'pause', function(){
      running = false;
		  $(opts.selectors.automaticLink).addClass(opts.classes.automaticStopped);
      $(opts.selectors.automaticLink).removeClass(opts.classes.automaticRunning);
      $d.trigger('deck.onPlayToggle', true);
      $d.trigger('deck.onPause');
		  clearAutomaticTimeout();
    });
		
		// Setup initial state
		if (opts.automatic.startRunning) {
      $[deck]('play');
		}
		else {
		  $[deck]('pause');
		}
		setTimeoutIfNeeded(null, ndx, 0);
		
		// Setup automatic link toggle events
		$(opts.selectors.automaticLink)
		.unbind('click.deckautomatic')
		.bind('click.deckautomatic', function(e) {
			if (!running) {
				$[deck]('play');
			}
			else {
				$[deck]('pause');
			}
		});
	})
	.bind('deck.change', setTimeoutIfNeeded);
})(jQuery, 'deck');
