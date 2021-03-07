var selector = document.querySelector('select');
var dogBreed = selector.value;
var timer = setInterval(requestHttp, 5000);

var selectChange = function(e) {
	if (timer) {
		clearInterval(timer);
	}
	dogBreed = e.target.value;
	requestHttp();
	timer = setInterval(requestHttp, 5000);
}

var changeImage = function (imageSrc) {
	var imgElement = document.querySelector('img');
	if (imgElement) {
		imgElement.setAttribute('src', imageSrc);
	} else {
		var imgElem = document.createElement('img');
		imgElem.setAttribute('src', imageSrc);
		document.querySelector('.image-container').appendChild(imgElem);
	}
}

function requestHttp() {
  var req = new XMLHttpRequest();
  req.open("GET", "https://dog.ceo/api/breed/" + dogBreed + "/images/random");
	req.onload = function () {
		var imageJson= JSON.parse(req.responseText);
		changeImage(imageJson.message);
	}
  req.send();
}

requestHttp();
selector.addEventListener('change', selectChange);
