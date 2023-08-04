import { click } from "./sounds.js";
//import { boot } from "./screens.js";
import { stopSpeaking } from "./speak.js";
import { woprsound } from "./screens.js";

/** Turn on the terminal */
async function on() {
  click();
  await power();
  //boot();
}

/** Turn off the terminal */
function off() {
  click();
  stopSpeaking();

  const event = new Event("stopwoprsound");
  woprsound.dispatchEvent(event);

  power(false);
}

async function power(on = true) {
  document.getElementById("on-off-container").classList.toggle("on", !on);
  document.getElementById("on-off-container").classList.toggle("off", !on);
  return;
}

export { power, on, off };
