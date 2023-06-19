//Function to modify tv settings
//MSTU5003 Interactive Application Project
let videos = [
  {
    "channel": 0,
    "video": "https://ia804609.us.archive.org/4/items/rick-roll/Rick%20Roll.mp4"
  },
  {
    channel: 1,
    video: "../static/videos/RickRoll x K-POP (Deep House Remix).mp4"
  },
  {
    channel: 2,
    video: "../static/videos/Rick Roll The Remakeboot.mp4"
  },
  {
    channel: 3,
    video: "../static/videos/Never Gonna Give You Up (Lofi Remix).mp4"
  },
  {
    channel: 4,
    video: "../static/videos/RickRoll but make it Anime.mp4"
  },
  {
    channel: 5,
    video: "../static/videos/Rickroll [Remix].mp4"
  },
  {
    channel: 6,
    video: "../static/videos/Big Ben's Final Rick Roll.mp4"
  },
  {
    channel: 7,
    video: "../static/videos/rickroll cada vez mas antiguo.mp4"
  },
  {
    channel: 8,
    video: ""
  },
  {
    channel: 9,
    video: ""
  }
];

(function() {
  window.addEventListener("load", initialize);

  function initialize() {
    document.querySelector("#input-btn").addEventListener("click", updatePlayer);
  }

  //Changes tv settings
  //This include channel (video), volume, and power.
  function updatePlayer() {
    let video = document.querySelector("video");
    let source = video.childNodes[0];
    let settings = document.getElementsByTagName("input");
    let power = settings[0];
    let channel = settings[1];
    let volume = settings[2];
    console.log(power.checked);
    if (!power.checked) {
      source.src = "";
    } else {
    source.src = videos[channel.value].video;
    video.load();
    video.play();
    console.log(document.querySelector("source").getAttribute("src"));
    //video.volume = (volume+1)/100;
    }
  }
})();
