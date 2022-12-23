import welcomeTxt from '../assets/welcomeTxt.json' assert { type: 'json', filename: 'welcomeTxt.json' };

import chalk from 'chalk';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';
import { v4 as uuidv4 } from 'uuid';

const sleep = (ms = 1200) => new Promise((r) => setTimeout(r, ms));
const user_id = uuidv4();
var startingMsg = 'Hi...\n';

async function welcome() {
  const title = welcomeTxt[Math.floor(Math.random() * welcomeTxt.length)];
  console.clear();
  figlet(title, async (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.clear();
      const newTitle = chalkAnimation.rainbow(title);
      await sleep();
      newTitle.stop();
      return;
    }
  });
}

async function chat() {
  const question = await inquirer.prompt({
    name: 'question',
    type: 'input',
    message: `${startingMsg}`,
  });
  const res = await fetch(
    `http://api.brainshop.ai/get?bid=171368&key=Csf9rns7uWZFQ0dj&uid=${user_id}&msg=${question}`,
  ).then((response) => response.json());

  const reply = res.cnt;
  if (reply == '') return;
  startingMsg = reply;
  await chat();
}

async function chat_with_me() {
  await welcome();
  await chat();
}

chat_with_me();
