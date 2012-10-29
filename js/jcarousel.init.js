/*
 * Add pager buttons along bottom of scroller
 */
function mycarousel_initCallback(carousel) {
	// Create HTML for pagers based on number of list elements from mycarousel
	var controlHTML = '<div class="jcarousel-control"><ul>';
	var total = $('ul#mycarousel li').size();
	
	for (var i=0; i<total; i++) {
		controlHTML += '<li><a href="#">' + (i+1) + '</a></li>';
	}
	controlHTML += '</ul></div>';
    carousel.container.after(controlHTML);
    
    // now bind the controls
    jQuery('.jcarousel-control a').bind('click', function() {
        carousel.scroll(jQuery.jcarousel.intval(jQuery(this).text()));
        return false;
    });
};

/*
 * Highlight proper pager
 */
function mycarousel_highlightPager(carousel, item, idx, state) {
	// Mod by total size so index never exceeds total number of items
	var i = (idx-1) % $('.jcarousel-control li').size();	
	
	// If negative index, add total size to loop it back around (since index cannot be negative)
	if (i<0) {
		i += $('.jcarousel-control li').size();
	}
	
	// Add .selected class to highlighted pager
	var query = ".jcarousel-control li:eq(" + i + ")";
	$(query).addClass('selected');
	
	// Deselect other pager items
	query = ".jcarousel-control li:not(:eq(" + i + "))";
	$(query).removeClass('selected');
}

$(document).ready(function(){
	$('#mycarousel').jcarousel({
        // Configuration goes here
        visible: 1,
        scroll: 1,
        auto: 50,	// # of seconds between auto-scrolling
        animation: "slow", 	// "fast", "slow", or milliseconds as integer
        wrap: 'circular',
        initCallback: mycarousel_initCallback,
        itemVisibleInCallback: {
            onBeforeAnimation: mycarousel_highlightPager  
        }
    });
});
			