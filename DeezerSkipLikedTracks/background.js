class Song {
  constructor(name, isLiked) {
    this.name = name;
    this.isLiked = isLiked;
  }
}

function switchSong() {
  if (isCurrentSongLiked()) {
    button.click();
  }
}

function isCurrentSongLiked() {
  var song = document.getElementsByClassName("song active")[0];

  for (var i = 0; i < song.childNodes.length; i++) {
    if (song.childNodes[i].classList.contains("cell-love")) {
      loveCell = song.childNodes[i];
      break;
    }
  }

  if (loveCell.firstChild.firstChild.classList.contains("is-active")) {
    return true;
  }
  return false;
}

function getCurrentSong() {
  let name = document.getElementsByClassName("queuelist-cover-title")[0]
    .childNodes[0].innerHTML;
  let author = document.getElementsByClassName("queuelist-cover-subtitle")[0]
    .childNodes[0].innerHTML;
  let song = new Song(name + " " + author, isCurrentSongLiked());
  return song;
}

function checkCurrentSong() {
  if (!isExtensionOn) {
    console.log("Выключено");
    return;
  }
  let newSong = getCurrentSong();
  if (currentSong != null) {
    if (currentSong.name != newSong.name && newSong.isLiked === true) {
      switchSong();
    }
  } else {
    if (newSong.isLiked === true) {
      switchSong();
    }
  }
  currentSong = newSong;
  setTimeout(checkCurrentSong, 2000);
}

console.log("Deezer extension loaded!");
let currentSong = null;
var isExtensionOn = true;
var button;

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  if (request.cmd == "setOnOffState") {
    isExtensionOn = request.data.value;
  }

  if (request.cmd == "getOnOffState") {
    sendResponse(isExtensionOn);
  }
});

interval = setInterval(() => {
  button = document.getElementsByClassName("svg-icon-next")[0].parentNode;
  checkCurrentSong();
}, 5000);
