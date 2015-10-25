var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height : '236',
    width : '420',
    events : {
      'onReady' : onPlayerReady,
      'onStateChange' : onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
}

var seek = 0;
function onPlayerStateChange(event) {
  if (event.data == 0) {
    player.seekTo(seek);
    player.playVideo();
  }
}

// Track currently playing video so that it's not unnecessarily reloaded.
var currentId = '';
var currentStart = -1;
var currentRate = -1;

function load(id, start, end, rate) {
  if (currentId == id && currentStart == start && currentRate == rate) {
    return;
  } else {
    currentId = id;
    currentStart = start;
    currentRate = rate;
  }

  seek = start;
  player.loadVideoByUrl({
    'mediaContentUrl' : 'https://www.youtube.com/v/' + id + '?version=3',
    'startSeconds' : seek,
    'endSeconds' : end,
    'suggestedQuality' : 'default'
  });
  player.setPlaybackRate(rate);
}
