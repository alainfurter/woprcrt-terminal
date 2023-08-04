import { off } from "../../src/js/util/power";
import say from "../../src/js/util/speak";

const output = [" ", "GOODBYE PROFESSOR FURTER.", " "];

export default () => {
  say("GOODBYE PROFESSOR FURTER.");
  return off();
};

export { output };
