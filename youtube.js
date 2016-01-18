var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  console.log('youtube API ready');
  player = new YT.Player('player', {
    height : '236',
    width : '420',
    events : {
      'onReady' : onPlayerReady,
      'onStateChange' : onPlayerStateChange,
      'onPlaybackRateChange' : onPlayerRateChange,
      'onPlaybackQualityChange' : onPlayerQualityChange
    }
  });
}

function onPlayerReady(event) {
  console.log('player ready');
}

var seek = 0;
function onPlayerStateChange(event) {
  console.log('player state change: ' + event.data);
  if (event.data == YT.PlayerState.ENDED) {
    player.seekTo(seek);
    player.playVideo();
  }
}

function onPlayerRateChange(event) {
  console.log('player rate change: ' + event.data);
}

function onPlayerQualityChange(event) {
  console.log('player quality change: ' + event.data);
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

  // Possible YouTube API bug. Need to wait a bit for the playback rates to be available.
  setTimeout(function() {
    console.log('available rates: ' + player.getAvailablePlaybackRates());
     player.setPlaybackRate(currentRate);
  }, 1000);
  // Temporarily set rate to something different so that a change is triggered.
  player.setPlaybackRate(1.5);
}
