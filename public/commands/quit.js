import { type } from "/utils/io.js";
import say, { stopSpeaking } from "/utils/speak.js";

const output = [" ", "GOODBYE PROFESSOR FURTER.", " "];

function togglePower() {
  let isOff = document
    .getElementById("screen-on-off-container")
    .classList.contains("off");
  if (isOff) {
    document
      .getElementById("screen-on-off-container")
      .classList.toggle("on", true);
    // document
    //   .getElementById("screen-on-off-container")
    //   .classList.toggle("off", false);
  } else {
    // document
    //   .getElementById("screen-on-off-container")
    //   .classList.toggle("on", false);
    document
      .getElementById("screen-on-off-container")
      .classList.toggle("off", true);
  }
}

const processOutput = async () => {
  await type(output, { speak: true });
};

export default () => {
  say("GOODBYE");
  //processOutput();
  stopSpeaking();
  const event = new CustomEvent("stopwoprsound");
  window.dispatchEvent(event);
  return togglePower();
};

//export { output };
