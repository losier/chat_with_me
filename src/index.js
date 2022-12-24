/* A workaround for a bug in node.js. */
"use strict";

const { emitWarning } = process;

process.emitWarning = (warning, ...args) => {
  if (args[0] === "ExperimentalWarning") {
    return;
  }

  if (
    args[0] &&
    typeof args[0] === "object" &&
    args[0].type === "ExperimentalWarning"
  ) {
    return;
  }

  return emitWarning(warning, ...args);
};
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  // Application specific logging, throwing an error, or other logic here
})



/* Importing all the required modules. */
import chalk from "chalk";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";

/**
 * It generates a random user id.
 * @param [ms=1200] - The amount of time to wait before sending the next message.
 */
const sleep = (ms = 1200) => new Promise((r) => setTimeout(r, ms));
const user_id = uuidv4();
var startingMsg = "Hi...\n";

/* An array of strings. */
const welcomeTxt = [
  "Hello 👋",
  "Namaste 🙏",
  "Hola 👋",
  "Hey",
  "Welcome",
  "Say hi!",
  "Glad you're here",
  "Good to see you",
  "Yay you made it",
  "Cheers!!!",
  "👋",
];

/**
 * It takes a random string from an array, and then uses the figlet module to convert it to ASCII art.
 * If the figlet module fails, it uses the chalkAnimation module to display the string in a rainbow
 * animation.
 */
async function welcome() {
  const title = welcomeTxt[Math.floor(Math.random() * welcomeTxt.length)];
  console.clear();
  figlet(title, async (err, data) => {
    if (err) {
      console.log("Something went wrong...");
      console.clear();
      const newTitle = chalkAnimation.rainbow(title);
      await sleep();
      newTitle.stop();
      return;
    }
    console.log(gradient.mind(data));
  });
}

/**
 * It asks a question, waits for the user to type in an answer, sends the answer to an API, gets a
 * response from the API, and then repeats the process.
 * </code>
 * @returns A string.
 */
async function chat() {
  const question = await inquirer.prompt({
    name: "question",
    type: "input",
    message: `${startingMsg}`,
  });

  var qsn = question.question;
  if (qsn == "") return;
  const spinner = createSpinner();


  spinner.start();
  await fetch(
    `http://api.brainshop.ai/get?bid=171368&key=Csf9rns7uWZFQ0dj&uid=${user_id}&msg=${qsn}`
  ).then((response) => response.json()).then(res => {
    const reply = res.cnt;
    if (reply == "") return;
    startingMsg = reply+"\n";
  }).catch(err => {
    console.clear();
    console.log(chalk.bold.redBright("Something went wrong..."));
    console.log(chalk.bold.redBright("Please try again later..."));
    console.log(chalk.bold.redBright("Exiting..."));
    process.exit();
  });
  spinner.stop();
  await chat();
}


/**
 * It waits for the welcome function to finish, then waits for 1 second, then waits for the chat
 * function to finish.
 */
async function chat_with_me() {
  await welcome();
  await sleep(1000);
  await chat();
}

chat_with_me();
