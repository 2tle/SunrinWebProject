jQuery(document).ready(function() {
	$('.imglist .item:gt(0)').hide();
    setInterval(function() {
        $('.imglist .item:first-child').fadeOut().next('.item').fadeIn().end().appendTo('.imglist')
    }, 6000);
});

function newsCrowl() {
	var xmlHttp = new XMLHttpRequest();   
	xmlHttp.onreadystatechange = function() {
    if(this.status == 200 && this.readyState == this.DONE) {
		var htmld ="";
		var json = JSON.parse(xmlHttp.responseText);
		var len = (json.news.length < 5) ? json.news.length : 5;
        for(var i = 0; i< len; i++) {
			var text = "<li><a href='"+json.news[i].link+"'>"+json.news[i].title+"</a></li>";
			htmld += text;
		}
		document.getElementById('news-cro').innerHTML = htmld;

    }

};

xmlHttp.open("GET", "https://sunrinjbtsbackend.2tle.repl.co/news", true);

xmlHttp.send();
}