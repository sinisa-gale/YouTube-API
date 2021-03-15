var key = 'AIzaSyAT6WSNhSQJKRzniDCqOP18xKG615o_w5k';
var videoList = document.querySelector('.video-list');
var search = document.querySelector('.search input');
var searchBtn = document.querySelector('.search button');
var videoView = document.querySelector('iframe');
var videoId;

function getData(relatedVideo) {
	var url;
	if (relatedVideo) {
		url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&relatedToVideoId=' + videoId + '&type=video&key=' + key;
	} else {
		url = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=' + search.value + '&key=' + key;
	}
	var req = new XMLHttpRequest();
	search.value = '';
	req.open('GET', url, true);
	req.onload = function() {
		switch (req.status) {
			case 200: 
				listVideos(JSON.parse(req.responseText));
				break;
			case 403:
				alert('Quota excedeed. Try again later.');
		}		
	}
	req.send();
}

function listVideos(arr) {
	videoList.innerHTML = '';
	arr.items.forEach(function(item) {
		if (item.snippet) {createVideo(item);}
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
		videoId = source.id.videoId;
		getData(true);
	})
	videoList.appendChild(elementContainer);
}

searchBtn.addEventListener('click', function() {getData(false)});
search.addEventListener('keypress', function(e) {
	if (e.keyCode === 13) {getData(false)}
});

