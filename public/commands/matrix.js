// import say from "./speak";
//const say = await import("./speak.js");
import say from "./speak.js";

const output = [" ", "THERE IS NO SPOON.", " "];

export default () => {
  return say("THERE IS NO SPOON.");
};

export { output };
