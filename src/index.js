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



import chalk from "chalk";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import inquirer from "inquirer";
import { v4 as uuidv4 } from "uuid";

const sleep = (ms = 1200) => new Promise((r) => setTimeout(r, ms));
const user_id = uuidv4();
var startingMsg = "Hi...\n";

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


async function chat_with_me() {
  await welcome();
  await sleep(1000);
  await chat();
}

chat_with_me();
