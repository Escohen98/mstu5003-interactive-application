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
    source: "https://www.youtube.com/embed/K4DKVAT2-x8?autoplay=1&amp;controls=0",
    type: "video/mp4"
  },
  {
    channel: 2,
    title: "Spooder Man",
    source: "https://www.youtube.com/embed/uKYV2qjYIS0?autoplay=1&amp;controls=0",
    type: "video/mp4"
  },
  {
    channel: 3,
    title: "Ultimate Showdown",
    source: "https://www.youtube.com/embed/-WlNIQSXRlM?autoplay=1&amp;controls=0",
    type: "video/mp4"
  },
  {
    channel: 4,
    title: "But Make it Anime...",
    source: "https://www.youtube.com/embed/5a54TPGz9bI?autoplay=1&amp;controls=0",
    type: "video/mp4"
  },
  {
    channel: 5,
    title: "Italian Doge who went to Malta",
    source: "https://www.youtube.com/embed/FcS-fWdtD8k?controls=0&amp;autoplay=1",
    type: "video/mp4"
  },
  {
    channel: 6,
    title: "5:00am at Freddy's",
    source: "https://www.youtube.com/embed/v2IqiOWbDsE?autoplay=1&amp;controls=0",
    type: "video/mp4"
  },
  {
    channel: 7,
    title: "Dumbest School in America",
    source: "https://www.youtube.com/embed/YoHqB3BKJxQ?autoplay=1&amp;controls=0",
    type: "video.mp4"
  },
  {
    channel: 8,
    title: "Dumb Ways to Die",
    source: "https://www.youtube.com/embed/IJNR2EpS0jw?autoplay=1&amp;controls=0",
    type: "video.mp4"
  },
  {
    channel: 9,
    title: "The Simpsons Get Rolled...",
    source: "https://www.youtube.com/embed/2S2IMl0wyaA?controls=0&amp;autoplay=1",
    type: "video.mp4"
  }
];

(function() {
  let CHANNEL = 0;
  window.addEventListener("load", initialize);

  function initialize() {
    let video = document.querySelector("iframe")
  //let video = document.querySelector("video");
    //videos.forEach(element => createSource(video, element));
    document.querySelector(".power-switch").checked = false;
    document.querySelector("input").value = 0;
    document.querySelector("#input-btn").addEventListener("click", updatePlayer);
    //TO-DO: Give the powerbutton its own event listener.
    document.querySelector(".power-switch").addEventListener("change", power);
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

    video.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "mute" }),
      "*"
    );
    video.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "setVolume",
        args: [volume]
      }),
      "*"
    );

    video.volume = setVolume(volume);
    if (!power.checked) {
      CHANNEL = -1;
    }

    if (channel != CHANNEL)
      changeChannel(video, channel, power.checked);
    //video.volume = (volume+1)/100;
 }

  function power() {
    console.log("go");
    let frame = document.querySelector("iframe");
    let header = document.querySelector("h2").textContent;
    if (document.querySelector(".power-switch").checked) {
      frame.src = videos[CHANNEL].source;
      header = videos[CHANNEL].title;
    } else {
      frame.src = "";
      header = "";
    }
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
    }  else { //Otherwise, do everything
      video.src=videos[channel].source;
      document.querySelector("h2").textContent = videos[channel].title;
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

  /** Remote control **/

  const socket = io.connect('http://0.0.0.0:5000')

  function sendRemoteControlEvent(event, value) {
    socket.emit('remote-control', {event: event, value: value});
  }


  //New event listeners for remote control
  document.querySelector(".power-switch").addEventListener("change", powerSwitch);
  document.querySelector("input-btn").addEventListener("click", channelSelector);
  document.querySelector("input[name='volume']").addEventListener("input", setVolume);

  //Turns power on and off -> boolean
  function powerSwitch() {
    let power = this.checked;
    sendRemoteControlEvent("power", power);
    if (!power) {
      document.querySelector("iframe").src = "";
    } else {
      let channel = document.querySelector("input[name='channel']").value;
      sendRemoteControlEvent("channel", channel);
    }
  }

  //Change channel -> int from 0-9
  function channelSelector() {
    let channel = document.querySelector("input[name='volume']").value;
    sendRemoteControlEvent("channel", channel);
  }

  //Set volume -> int from 0-100
  function setVolume() {
    let volume = this.value;
    sendRemoteControlEvent("volume", volume);
  }
})();
