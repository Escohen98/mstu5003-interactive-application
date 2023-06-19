//Function to modify tv settings
//MSTU5003 Interactive Application Project
let videos = [
  {
    channel: 0,
    title: "Original",
    source: "https://ia804609.us.archive.org/4/items/rick-roll/Rick%20Roll.mp4",
    type: "video/mp4"
  },
  {
    channel: 1,
    title: "K-POP (Deep House Remix)",
    source: "https://www.youtube.com/embed/lrzKT-dFUjE",
    type: "video/mp4"
  },
  {
    channel: 2,
    title: "The Remakeboot",
    source: "https://www.youtube.com/embed/H8ZH_mkfPUY",
    type: "video/mp4"
  },
  {
    channel: 3,
    title: "Lofi Remix",
    source: "https://youfiles.herokuapp.com/665689e0-09a2-43a5-88ee-6e18b61fa004",
    type: "video/mp4"
  },
  {
    channel: 4,
    title: "But Make it Anime...",
    source: "https://www.youtube.com/embed/lpiB2wMc49g",
    type: "video/mp4"
  },
  {
    channel: 5,
    title: "Yung Gravy - Better (Get Money)",
    source: "https://www.youtube.com/embed/8oE5Z2GLhNc",
    type: "video/mp4"
  },
  {
    channel: 6,
    title: "Big Ben's Final Bell",
    source: "https://www.youtube.com/embed/MO7bRMa9bmA",
    type: "video/mp4"
  },
  {
    channel: 7,
    title: "En Español",
    source: "https://youtube.com/embed/7jjoyy7_RCk",
    type: "video.mp4"
  },
  {
    channel: 8,
    title: "Becoming Older",
    source: "https://www.youtube.com/embed/Ixy9HL8w3ik",
    type: "video.mp4"
  },
  {
    channel: 9,
    title: "Becoming Futuristic",
    source: "https://www.youtube.com/embed/SMddprKlk1w",
    type: "video.mp4"
  }
];

(function() {
  let CHANNEL = -1;
  window.addEventListener("load", initialize);

  function initialize() {
    let video = document.querySelector("iframe")
  //let video = document.querySelector("video");
    //videos.forEach(element => createSource(video, element));
    document.querySelector(".power-switch").checked = false;
    document.querySelector("input").value = 0;
    document.querySelector("#input-btn").addEventListener("click", updatePlayer);
  }

  //Changes tv settings
  //This include channel (video), volume, and power.
  function updatePlayer() {
    let video = document.querySelector("iframe");
  //  let source = video.childNodes[0];
    let settings = document.getElementsByTagName("input");
    let power = settings[0];
    let channel = settings[1].value;
    let volume = settings[2].value;

    video.volume = setVolume(volume);
    if (!power.checked) {
      CHANNEL = -1;
    }

    if (channel != CHANNEL)
      changeChannel(video, channel, power.checked);
    //video.volume = (volume+1)/100;
 }

  //Creates a source element then adds to the video element
  function createSource(video, sourceEl) {
    let source = document.createElement("SOURCE");
    source.src = sourceEl.source;
    source.type = sourceEl.type; //Starts as hidden
    source.id = `chn${sourceEl.channel}`;
    source.hidden = true;
    video.appendChild(source);
  }


  //Changes the active channel. Sets the previous channel to hidden.
  function changeChannel(video, channel, power) {
    /*video.pause();
    document.getElementById("chn0").setAttribute("src",videos[3].source);
    video.play();
    return;*/
    console.log("hit");
    if(!power) { //Turns all channels to hidden if power is not checked.
      video.src = "";
      CHANNEL = -1;
    }  else { //Otherwise, do everything
      video.src=videos[channel].source;
      document.querySelector("h2").value = videos[channel].title;
      CHANNEL = channel;
    }
  }

  //does the math to set the volume.
  //Returns result
  function setVolume(volume) {
    //Safeguard
    if(volume > 99)
      volume = 99;
    else if(volume < 0)
      volume=0;
    vol = (volume+1)/1000
    return vol.toFixed(2);
  }
})();
