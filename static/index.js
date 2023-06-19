//Function to modify tv settings
//MSTU5003 Interactive Application Project
let videos = [
  {
    "channel": 0,
    "video": "https://ia804609.us.archive.org/4/items/rick-roll/Rick%20Roll.mp4"
  },
  {
    channel: 1,
    video: "https://ufile.io/vzoxiszb"
  },
  {
    channel: 2,
    video: "https://ufile.io/yp11ofl9"
  },
  {
    channel: 3,
    video: ""
  },
  {
    channel: 4,
    video: ""
  },
  {
    channel: 5,
    video: ""
  },
  {
    channel: 6,
    video: ""
  },
  {
    channel: 7,
    video: ""
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
    let power = document.querySelector("#power-switch");
    let channel = document.querySelector("#channel-input");
    let volume = document.querySelector("#volume-input");
    console.log(channel.value);
    video.firstElementChild.setAttribute("src", videos[channel.value].video);
    console.log(document.querySelector("source").getAttribute("src"));
    //video.volume = (volume+1)/100;
  }
})();
