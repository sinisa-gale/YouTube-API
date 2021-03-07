var key = 'AIzaSyAT6WSNhSQJKRzniDCqOP18xKG615o_w5k';
var videoList = document.querySelector('.video-list');
var search = document.querySelector('.search input');
var searchBtn = document.querySelector('.search button');

function getData() {
	var url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=' + search.value + '&key=' + key;
	var req = new XMLHttpRequest();
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

function createVideo(source) {
	var elementContainer = document.createElement('div');
	var textContainer = document.createElement('div');
	
	var thumb = document.createElement('img');
	thumb.setAttribute('src', source.snippet.thumbnails.default.url)
	elementContainer.appendChild(thumb);

	var title = document.createElement('h3');
	title.textContent = source.snippet.title;
	textContainer.appendChild(title);

	var description = document.createElement('p')
	description.textContent = source.snippet.description;
	textContainer.appendChild(description);
	elementContainer.appendChild(textContainer);

	videoList.appendChild(elementContainer);
}

searchBtn.addEventListener('click', getData);
search.addEventListener('keypress', function(e) {
	if (e.keyCode === 13) {getData()}
});