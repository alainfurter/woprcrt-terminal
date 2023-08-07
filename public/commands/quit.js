import { type } from "/utils/io.js";
import say, { stopSpeaking } from "/utils/speak.js";
import { woprsound } from "/utils/screens.js";

const output = [" ", "GOODBYE PROFESSOR FURTER.", " "];

function togglePower() {
  let isOff = document.getElementById("crt").classList.contains("off");
  if (isOff) {
    document.getElementById("on-off-container").classList.toggle("on", true);
    document.getElementById("on-off-container").classList.toggle("off", false);
  } else {
    document.getElementById("on-off-container").classList.toggle("on", false);
    document.getElementById("on-off-container").classList.toggle("off", true);
  }
}

const processOutput = async () => {
  await type(output, { speak: true });
};

export default () => {
  //say("GOODBYE");
  processOutput();
  stopSpeaking();
  const event = new Event("stopwoprsound");
  woprsound.dispatchEvent(event);
  return togglePower();
};

//export { output };
