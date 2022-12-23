import welcomeTxt from '../assets/welcomeTxt.json' assert { type: 'json', filename: 'welcomeTxt.json' };

import chalk from 'chalk';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';
import inquirer from 'inquirer';

const sleep = (ms = 1200) => new Promise((r) => setTimeout(r, ms));

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

async function chat_with_me() {}

chat_with_me();
