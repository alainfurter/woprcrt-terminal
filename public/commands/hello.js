import { type } from "/utils/io.js";

const output = [" ", "GREETINGS PROFESSOR FURTER.", " "];

const processOutput = async () => {
  await type(output, { speak: true });
};

export default () => {
  return processOutput();
};
