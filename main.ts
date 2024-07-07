#! /usr/bin/env node

import inquirer from 'inquirer';
import { addSeconds, format } from 'date-fns';

function countdown(seconds: number, endTime: Date): void {
  const interval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(interval);
      console.log('Time is up!');
    } else {
      console.log(
        `Time remaining: ${Math.floor(seconds / 60)}m ${seconds % 60}s (Ends at: ${format(endTime, 'HH:mm:ss')})`
      );
      seconds--;
    }
  }, 1000);
}

async function startCountdown(): Promise<void> {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'minutes',
      message: 'Enter the number of minutes for the countdown:',
      validate: (value: string) => {
        const num = Number(value.trim());
        if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
          return 'Please enter a valid positive integer.';
        }
        return true;
      },
    },
  ]);

  const minutes = Number(answer.minutes.trim());
  const seconds = minutes * 60;
  const endTime = addSeconds(new Date(), seconds);
  countdown(seconds, endTime);
}

startCountdown();
