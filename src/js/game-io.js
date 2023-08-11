/** Types the given text on the screen */

let interval = 0;

async function type(
  text,
  {
    wait = 50,
    initialWait = 1000,
    finalWait = 500,
    typerClass = "",
    useContainer = false,
    stopBlinking = true,
    processChars = true,
    clearContainer = false,
    speak = false,
  } = {},
  container = document.querySelector(".game-container")
) {
  return new Promise(async (resolve) => {
    //console.log("Type");
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    // Create a div where all the characters can be appended to (or use the given container)
    let typer = useContainer ? container : document.createElement("div");
    typer.classList.add("typer", "active");

    if (typerClass) {
      typer.classList.add(typerClass);
    }
    // Handy if reusing the same container
    if (clearContainer) {
      container.innerHTML = "&nbsp;";
    }

    if (!useContainer) {
      container.appendChild(typer);
    }

    if (initialWait) {
      await pause(initialWait / 1000);
    }

    let queue = text;
    if (processChars) {
      if (Array.isArray(text)) {
        text = text.join("\n");
      }
      queue = text.split("");
    }

    let prev;

    if (speak) {
      //say(text);
    }

    // Use an interval to repeatedly pop a character from the queue and type it on screen
    interval = setInterval(async () => {
      if (queue.length) {
        let char = queue.shift();

        // This is an optimisation for typing a large number of characters on the screen.
        // It seems the performance degrades when trying to add 500+ DOM elements rapidly on the screen.
        // So the content of the previous element is moved to the typer container and removed, which
        // reduces the amount of DOM elements.
        // This may cause issues when the element is removed while the character is still animating (red screen)
        if (processChars && prev) {
          prev.remove();
          if (prev.firstChild && prev.firstChild.nodeType === Node.TEXT_NODE) {
            typer.innerText += prev.innerText;
          } else {
            typer.appendChild(prev);
          }
        }
        let element = processChars ? getChar(char) : char;
        if (element) {
          typer.appendChild(element);

          if (element.nodeName === "BR") {
            scroll(container);
          }
        }
        prev = element;
      } else {
        // When the queue is empty, clean up the interval
        clearInterval(interval);
        await pause(finalWait / 1000);
        if (stopBlinking) {
          typer.classList.remove("active");
        }
        resolve();
      }
    }, wait);
  });
}

/**
 * Convert a character that needs to be typed into something that can be shown on the screen.
 * Newlines becomes <br>
 * Tabs become three spaces.
 * Spaces become &nbsp;
 * */
function getChar(char) {
  let result;
  if (typeof char === "string") {
    if (char === "\n") {
      result = document.createElement("br");
    } else if (char === "\t") {
      let tab = document.createElement("span");
      tab.innerHTML = "&nbsp;&nbsp;&nbsp;";
      result = tab;
    } else if (char === " ") {
      let space = document.createElement("span");
      space.innerHTML = "&nbsp;";
      space.classList.add("char");
      result = space;
    } else {
      let span = document.createElement("span");
      span.classList.add("char");
      span.textContent = char;
      result = span;
    }
  }
  return result;
}

function pause(s = 1) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * Number(s)));
}

export { type };
