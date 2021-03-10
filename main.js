var key = 'AIzaSyAT6WSNhSQJKRzniDCqOP18xKG615o_w5k';
var videoList = document.querySelector('.video-list');
var search = document.querySelector('.search input');
var searchBtn = document.querySelector('.search button');
var videoView = document.querySelector('iframe');

function getData() {
	var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=' + search.value + '&key=' + key;
	var req = new XMLHttpRequest();
	search.value = '';
	req.open('GET', url);
	req.onload = function() {
		listVideos(JSON.parse(req.responseText));
	}
	req.send();
}

function listVideos(arr) {
	videoList.innerHTML = '';
	arr.items.forEach(function(item) {
		createVideo(item);
	})
}

function makeElement(parent, type, attrib) {
	var tempElement = document.createElement(type);
	tempElement.textContent = attrib;
	parent.appendChild(tempElement);
}

function createVideo(source) {
	var elementContainer = document.createElement('div');
	var textContainer = document.createElement('div');
	
	var thumb = document.createElement('img');
	thumb.setAttribute('src', source.snippet.thumbnails.default.url)
	elementContainer.appendChild(thumb);

	makeElement(textContainer, 'h3', source.snippet.title);
	makeElement(textContainer, 'p', source.snippet.description);

	elementContainer.appendChild(textContainer);
	elementContainer.addEventListener('click', function(){
		videoView.setAttribute('src', 'https://www.youtube.com/embed/' + source.id.videoId);
		videoView.classList.add('visible'); 
	})
	videoList.appendChild(elementContainer);
}

searchBtn.addEventListener('click', getData);
search.addEventListener('keypress', function(e) {
	if (e.keyCode === 13) {getData()}
});

