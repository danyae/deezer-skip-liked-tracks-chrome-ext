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
interval = setInterval(() => {
  button = document.getElementsByClassName("svg-icon-next")[0].parentNode;
  // button.addEventListener("click", main, false);
  checkCurrentSong();
}, 5000);


// function getNextInterval() {
//   var inputMax = document.getElementsByClassName("slider-counter-max")[0]
//     .innerHTML;
//   var partsMax = inputMax.split(":");
//   var secondsMax = +partsMax[0] * 60 + +partsMax[1];

//   var inputCurrent = document.getElementsByClassName(
//     "slider-counter-current"
//   )[0].innerHTML;
//   var partsCurrent = inputCurrent.split(":");
//   var secondsCurrent = +partsCurrent[0] * 60 + +partsCurrent[1];
//   return (secondsMax - secondsCurrent) * 1000;
// }

// function main() {
//   console.log("In click event!");
//   clearInterval(interval);
//   interval = setInterval(() => {
//     switchSong();
//   }, getNextInterval());
// }
