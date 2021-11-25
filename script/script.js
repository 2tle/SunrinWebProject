jQuery(document).ready(function() {
	$('.imglist .item:gt(0)').hide();
    setInterval(function() {
        $('.imglist .item:first-child').fadeOut().next('.item').fadeIn().end().appendTo('.imglist')
    }, 3000);
});

function newsCrowl() {
	fetch("https://sunrinjbtsbackend.2tle.repl.co/news").then(function(response) {
		console.log(response)
	})
}