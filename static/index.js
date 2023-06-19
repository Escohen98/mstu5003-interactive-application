//Function to modify tv settings
//MSTU5003 Interactive Application Project
let videos = [
  [
    channel: 0,
    video: ""
  ],
  [
    channel: 1,
    video: ""
  ],
  [
    channel: 2,
    video: ""
  ],
  [
    channel: 3,
    video: ""
  ],
  [
    channel: 4,
    video: ""
  ],
  [
    channel: 5,
    video: ""
  ],
  [
    channel: 6,
    video: ""
  ],
  [
    channel: 7,
    video: ""
  ],
  [
    channel: 8,
    video: ""
  ],
  [
    channel: 9,
    video: ""
  ],
];

(function() {
  window.addEventListener("load", initialize);

  function initialize() {
    document.selectQuery("#input-btn").addEventListener("click", updatePlayer);
  }

  //Changes tv settings
  //This include channel (video), volume, and power.
  function updatePlayer() {
    let settings = document.getSelectQuery("input");
    let power = settings[0];
    let channel = settings[1];
    let volume = settings[2];
    console.log("Clicked.");
  }
})();
