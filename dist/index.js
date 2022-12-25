#!/usr/bin/env node

import inquirer from 'inquirer';
let userAccount = {
  account_type: 'Current',
  balance: 1000,
  full_name: 'Noor Muhammad',
};
async function getUserDetails() {
  const userAnswers = await inquirer.prompt([
    {
      type: 'input',
      name: 'userId',
      message: 'Enter your user Id: ',
    },
    {
      type: 'number',
      name: 'userPin',
      message: 'Enter your Pin Code: ',
    },
  ]);
  return userAnswers;
}
async function transactionInput() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'transactionType',
      message: 'Choose an option: ',
      choices: ['Deposit', 'Withdrawal'],
    },
    {
      type: 'number',
      name: 'deposit_amount',
      message: 'Enter amount you want to deposit: ',
      when(answers) {
        return answers.transactionType === 'Deposit';
      },
    },
    {
      type: 'number',
      name: 'withdraw_amount',
      message: 'Enter amount you want to withdraw: ',
      when(answers) {
        return answers.transactionType === 'Withdrawal';
      },
    },
  ]);
  return answers;
}
async function transactionAction(trxdetails) {
  switch (trxdetails.transactionType) {
    case 'Deposit':
      if (userAccount.balance <= 5000) {
        userAccount.balance += trxdetails.deposit_amount;
        return 'Deposit Successful';
      } else {
        return 'Sorry. Account balance has already reached the limit of 5000';
      }
      break;
    case 'Withdrawal':
      if (userAccount.balance >= trxdetails.withdraw_amount) {
        userAccount.balance -= trxdetails.deposit_amount;
        return 'Withdrawal Successful';
      } else {
        return 'Sorry. Account balance has less amount than asked';
      }
      break;
  }
}
await getUserDetails();
console.log('YOURE SUCCESSFULLY LOGGED IN');
const transactionDetails = await transactionInput();
const resp = await transactionAction(transactionDetails);
console.log(resp);
