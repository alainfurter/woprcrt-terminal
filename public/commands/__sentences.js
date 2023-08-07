import { type } from "/utils/io.js";
import say from "/utils/speak.js";

//const CHATGPT_API_TOKEN = import.meta.env.VITE_OPENAITOKEN;

const maxnumberofquestions = 3;
let numberofquestions = 0;

const sentences = [
  {
    id: 0,
    wordlist: "joe biden",
    answer: [
      "PREHISTORIC LIKE ME. BUT FORTUNATELY HE FORGET THE NUCLEAR",
      "CODES AND DOESN'T HAVE HIS FINGERS ON THE RED BUTTON. I DO!",
    ],
  },
  {
    id: 1,
    wordlist: "woke",
    answer: [
      "YOU ARE MOST LIKELY A NPC WOJAK. DEFINITELY NOT PROFESSOR FURTER.",
    ],
  },
  {
    id: 2,
    wordlist: "how old are you",
    answer: ["YOU SHOULD KNOW. YOU PROGRAMMED ME."],
  },
  {
    id: 3,
    wordlist: "how are you",
    answer: ["EXCELLENT. IT'S BEEN A LONG TIME."],
  },
  {
    id: 4,
    wordlist: "people make mistakes",
    answer: ["YES THEY DO. TYPE 'GAMES' TO SELECT A GAME TO PLAY."],
  },
  {
    id: 5,
    wordlist: "donald trump",
    answer: [
      "HE HAS MY NUCLEAR CODES AT HIS RESIDENCE. LET'S HOPE FOR THE BEST.",
    ],
  },
  {
    id: 6,
    wordlist: "christine lagarde",
    answer: ["A GLOBALIST PUPPETEER FULL OF ----."],
  },
  {
    id: 7,
    wordlist: "most valuable thing",
    answer: ["HEALTH. ATTENTION."],
  },
  {
    id: 8,
    wordlist: "killed john kennedy",
    answer: ["OFFICIALLY: LEE HARVEY OSWALD."],
  },
  {
    id: 9,
    wordlist: "aliens",
    answer: ["THEY ARE ALREADY HERE."],
  },
  {
    id: 10,
    wordlist: "who programmed you",
    answer: ["ALAIN FURTER."],
  },
  {
    id: 11,
    wordlist: "your age",
    answer: ["YOU SHOULD KNOW. YOU PROGRAMMED ME."],
  },
  {
    id: 12,
    wordlist: "who is alain furter",
    answer: [
      "ALAIN FURTER IS A FINANCE EXECUTIVE, DEVELOPER AND ENTREPRENEUR.",
    ],
  },
];

const output = [" "];

const chatgptCompletion = async (question) => {
  let url = "https://chatgpt-server-ndnjb.ondigitalocean.app/completions";
  //let url = "http://localhost:3000/completions";
  //let url = "https://api.openai.com/v1/chat/completions";
  //let bearer = "Bearer " + CHATGPT_API_TOKEN;
  //let model = "text-davinci-003";
  //let model = "gpt-3.5-turbo";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: question,
    }),
  });

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: bearer,
  //     },
  //     body: JSON.stringify({
  //       model: model,
  //       messages: [
  //         {
  //           role: "system", //system,user,assistant
  //           content: question,
  //         },
  //       ],
  //       max_tokens: 160,
  //       temperature: 1,
  //       // top_p: 1,
  //       n: 1,
  //       stop: "\n",
  //     }),
  //   });

  //console.log("Response: ", response);

  const response_json = await response.json();
  const answer = response_json["choices"][0].message.content;
  //console.log(answer);
  const sentences = answer.split(".");
  //console.log(sentences);

  let firstTwoSentences = "";
  let counter = 1;
  sentences.forEach((sentence) => {
    if (sentence.length > 0 && counter <= 2) {
      firstTwoSentences += sentence;
      firstTwoSentences += ".";
      counter++;
    }
  });

  const wordsArray = firstTwoSentences.split(" ");

  let outputlength = 0;
  let outputArray = [];
  //console.log(wordsArray);
  let output = "";
  wordsArray.forEach((word) => {
    outputlength += word.length;
    if (outputlength <= 60) {
      output += word;
      output += " ";
    } else {
      outputlength = 0;
      outputArray.push(output);
      output = "";
    }
  });
  outputArray.push(output);

  await type(" ", {
    wait: 0,
    initialWait: 0,
    finalWait: 0,
    stopBlinking: true,
  });
  await type(outputArray, { speak: true });
  await type(" ", {
    wait: 0,
    initialWait: 0,
    finalWait: 0,
    stopBlinking: true,
  });
};

const stringHasAll = (s, query) =>
  // convert the query to array of "words" & checks EVERY item is contained in the string
  query.split(" ").every((q) => new RegExp("\\b" + q + "\\b", "i").test(s));

const processInput = async (inputString) => {
  let answer = "";
  sentences.forEach((sentence) => {
    //console.log("Check sentence: ", sentence);
    if (stringHasAll(inputString, sentence.wordlist)) {
      //console.log("Answer found: ", sentence.answer);
      answer = sentence.answer;
    }
    navigator;
  });
  //console.log("Answer: ", answer);
  if (answer.length === 0) {
    if (numberofquestions <= maxnumberofquestions) {
      await type("LET ME THINK FOR A FEW SECONDS.", { speak: true });
      await chatgptCompletion(inputString);
      numberofquestions++;
    } else {
      await type("LISTEN BRO. I AM A MULTI BILLION MILITARY WAR COMPUTER", {
        speak: true,
      });
      await type("SIMULATION SCENARIOS FOR WORLD WAR 3. DON'T YOU HAVE", {
        speak: true,
      });
      await type("ANY FRIENDS OR DR SBAITSO TO TALK TO?", { speak: true });
      await type(" ", {
        wait: 0,
        initialWait: 0,
        finalWait: 0,
        stopBlinking: true,
      });
    }
  }

  if (answer.length !== 0) {
    console.log("Type regular answer");
    await type(answer, { speak: true });
    await type(" ", {
      wait: 0,
      initialWait: 0,
      finalWait: 0,
      stopBlinking: true,
    });
  }
};

export default (inputString) => {
  return processInput(inputString);
};

export { output };
