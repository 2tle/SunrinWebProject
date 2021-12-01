jQuery(document).ready(function() {
	$('.imglist .item:gt(0)').hide();
    setInterval(function() {
        $('.imglist .item:first-child').fadeOut().next('.item').fadeIn().end().appendTo('.imglist')
    }, 3000);
});

function newsCrowl() {
	var xmlHttp = new XMLHttpRequest();   
	xmlHttp.onreadystatechange = function() {
    if(this.status == 200 && this.readyState == this.DONE) {
		var htmld ="";
		var json = JSON.parse(xmlHttp.responseText);
		var len = (json.news.length < 5) ? json.news.length : 5;
        for(var i = 0; i< len; i++) {
			var text = "<li><a href='"+json.news[i].link+"'>"+json.news[i].title+"</a></li><hr>";
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


function getLocAndCurDt() {
	navigator.geolocation.getCurrentPosition(
		function(position) {
			console.log("위도 : " + position.coords.latitude);
			console.log("경도 : " + position.coords.longitude);
			let lat =position.coords.latitude;
			let lng =position.coords.longitude;
			var xmlHttpReq = new XMLHttpRequest();
			xmlHttpReq.onreadystatechange = function () {
				var htmldt = "";
				
				let dtk = JSON.parse(xmlHttpReq.responseText);
				var o3 = dtk.current.o3.v / 1000;
				console.log(o3)
				o3 = Math.round(o3 * 100000)/100000;
				console.log(o3)

				htmldt += `<li>미세먼지: ${dtk.current.pm10.v}</li>`
				htmldt += `<li>초미세먼지: ${dtk.current.pm25.v}</li>`
				htmldt += `<li>오존: ${o3}</li>`
				htmldt += `<li>일산화탄소: ${dtk.current.co.v}</li>`
				//console.log(xmlHttpReq.responseText)
			

				document.getElementById('air-dt').innerHTML = htmldt;
			}
			xmlHttpReq.open("GET",`https://sunrinjbtsbackend.2tle.repl.co/air?lat=${lat}&lng=${lng}`,true);
			xmlHttpReq.send();
		}, 
	);
}





function getMoreAIR() {
	navigator.geolocation.getCurrentPosition(
		function(position) {
			console.log("위도 : " + position.coords.latitude);
			console.log("경도 : " + position.coords.longitude);
			let lat =position.coords.latitude;
			let lng =position.coords.longitude;
			var xmlHttpReq = new XMLHttpRequest();
			xmlHttpReq.onreadystatechange = function () {
				var htmldt = "";
				var htmlpost = "";
				let dtk = JSON.parse(xmlHttpReq.responseText);
				console.log(dtk)
				var pm10Color;
				var pm25Color;
				var o3Color;
				var coColor;

				var postPm10Color;
				var postPm25Color;
				var postO3Color;
				var postPm10 = dtk.forecast.daily.pm10[2].avg;
				var postPm25 = dtk.forecast.daily.pm25[2].avg;
				var postO3 = dtk.forecast.daily.o3[3].avg / 1000;

				if(postPm10 <= 30) postPm10Color = "bcir.png"
				else if(postPm10 <= 80) postPm10Color = "gcir.png"
				else if(postPm10 <= 150) postPm10Color = "ycir.png"
				else postPm10Color = "rcir.png"

				if(postPm25<= 15) postPm25Color = "bcir.png"
				else if(postPm25 <= 35) postPm25Color = "gcir.png"
				else if(postPm25 <= 75) postPm25Color = "ycir.png"
				else postPm25Color = "rcir.png"

				if(postO3 <= 0.03) postO3Color= "bcir.png"
				else if(postO3 <= 0.09) postO3Color = "gcir.png"
				else if(postO3 <= 0.15) postO3Color = "ycir.png"
				else postO3Color = "rcir.png"


				if(dtk.current.pm10.v <= 30) pm10Color = "bcir.png"
				else if(dtk.current.pm10.v <= 80) pm10Color = "gcir.png"
				else if(dtk.current.pm10.v <= 150) pm10Color = "ycir.png"
				else pm10Color = "rcir.png"

				if(dtk.current.pm25.v <= 15) pm25Color = "bcir.png"
				else if(dtk.current.pm25.v <= 35) pm25Color = "gcir.png"
				else if(dtk.current.pm25.v <= 75) pm25Color = "ycir.png"
				else pm25Color = "rcir.png"

				var o3 = dtk.current.o3.v / 1000
				if(o3 <= 0.03) o3Color= "bcir.png"
				else if(o3 <= 0.09) o3Color = "gcir.png"
				else if(o3 <= 0.15) o3Color = "ycir.png"
				else o3Color = "rcir.png"

				var co = dtk.current.co.v;
				if(co <= 2) coColor= "bcir.png"
				else if(co <= 9) coColor = "gcir.png"
				else if(co <= 15) coColor = "ycir.png"
				else coColor = "rcir.png"



				
				htmldt += `<div>미세먼지: ${dtk.current.pm10.v}&nbsp;<img width=30 src="images/${pm10Color}"></div><br>`
				htmldt += `<div>초미세먼지: ${dtk.current.pm25.v}&nbsp;<img width=30 src="images/${pm25Color}"></div><br>`
				htmldt += `<div>오존: ${Math.round(o3 * 100000)/100000}&nbsp;<img width=30 src="images/${o3Color}"></div><br>`
				htmldt += `<div>일산화탄소: ${co}&nbsp;<img width=30 src="images/${coColor}"></div><br>`
				

				htmlpost = `<div>미세먼지: ${postPm10}&nbsp;<img width=30 src="images/${postPm10Color}"></div><br><div>초미세먼지: ${postPm25}&nbsp;<img width=30 src="images/${postPm25Color}"></div><br><div>오존: ${Math.round(postO3 * 100000)/100000}&nbsp;<img width=30 src="images/${postO3Color}"></div><br>`



				document.getElementById('air-more').innerHTML = htmldt;
				document.querySelector("#air-more-post").innerHTML = htmlpost;
			}
			xmlHttpReq.open("GET",`https://sunrinjbtsbackend.2tle.repl.co/air?lat=${lat}&lng=${lng}`,true);
			xmlHttpReq.send();
		}, 
	);
}