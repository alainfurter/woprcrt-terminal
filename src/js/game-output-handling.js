import { type } from "./game-io.js";

const fill_async = async (text, container, useContainer = true) => {
  await type(
    text,
    {
      wait: 0,
      initialWait: 0,
      finalWait: 0,
      stopBlinking: true,
      useContainer: useContainer,
    },
    container
  );
};

function pause(s = 1) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * Number(s)));
}
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export { fill_async, pause, delay };
