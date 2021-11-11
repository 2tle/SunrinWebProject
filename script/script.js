jQuery(document).ready(function() {
	$('.imglist .item:gt(0)').hide();
    setInterval(function() {
        $('.imglist .item:first-child').fadeOut().next('.item').fadeIn().end().appendTo('.imglist')
    }, 3000);
});