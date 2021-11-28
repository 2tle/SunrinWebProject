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
	

	
	}
	xmlHttp.open("GET", "https://sunrinjbtsbackend.2tle.repl.co/news", true);

	xmlHttp.send();
}



function newsCrowlAll() {
	var xmlHttp1 = new XMLHttpRequest();   
	xmlHttp1.onreadystatechange = function() {
    if(this.status == 200 && this.readyState == this.DONE) {
		var htmld ="";
		var json = JSON.parse(xmlHttp1.responseText);
        for(var i = 0; i< json.news.length; i++) {
			var text = `<tr onclick="location.href='${json.news[i].link}'" style="cursor:hand"><th scope="row">${i+1}</th>`;
			text += `<td>${json.news[i].title}</td>`;
			text += `<td>${json.news[i].writer}</td>`;
			text += `<td>${json.news[i].date}</td></tr></a>`;
			htmld += text;
		}
		document.getElementById('tb_news').innerHTML = htmld;

    }
	
	

	}
	xmlHttp1.open("GET", "https://sunrinjbtsbackend.2tle.repl.co/news/all", true);

	xmlHttp1.send();
}


