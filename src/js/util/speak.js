const synth = window.speechSynthesis;
let volume = 20;

function say(text, pitch = 0.6, rate = 0.6) {
  if (volume === 0) return;
  if (synth.speaking) {
    synth.pause();
    synth.cancel();
  }
  let spokenText = text;
  if (Array.isArray(spokenText)) {
    spokenText = spokenText.join(".");
  }

  function setSpeech() {
    return new Promise(function (resolve, reject) {
      let synth = window.speechSynthesis;
      let id;

      id = setInterval(() => {
        if (synth.getVoices().length !== 0) {
          resolve(synth.getVoices());
          clearInterval(id);
        }
      }, 10);
    });
  }
  const voices = setSpeech();
  voices.then((voices) => {
    let speech = new SpeechSynthesisUtterance(spokenText);
    console.log(voices);
    console.log("voice: ", voices[140]);
    speech.voice = voices[140];
    speech.pitch = pitch;
    speech.rate = rate;
    speech.volume = volume;
    speech.lang = "en-US";
    synth.speak(speech);
  });
}

function stopSpeaking() {
  if (synth) {
    synth.pause();
    synth.cancel();
  }
}

function setVolume(value) {
  volume = value;
}
export { stopSpeaking, setVolume };
export default say;
