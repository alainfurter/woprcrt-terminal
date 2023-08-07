import { type } from "/utils/io.js";

const output = [" ", "HERE IS NO SPOON.", " "];

const processOutput = async () => {
  await type(output, { speak: true });
};

export default () => {
  return processOutput();
};
