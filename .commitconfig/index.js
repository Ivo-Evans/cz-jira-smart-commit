const inquirer = require('inquirer');
const validate = require('./validate');

module.exports = {
  prompter: prompter,
  formatCommit: formatCommit,
};

// simple setup I used in my last project
const questions = [
  {
    type: 'input',
    name: 'type',
    message: 'type (feat, fix, docs, refactor, chore) (optional)',
  },
  {
    type: 'input',
    name: 'scope',
    message: 'scope (e.g. component or file name) (optional)',
  },
  {
    type: 'input',
    name: 'message',
    message: 'GitHub commit message (required):\n',
    validate: validate.exists,
  },
  {
    type: 'input',
    name: 'closes',
    message: 'Closes issue number (optional):\n',
  },
  {
    type: 'input',
    name: 'references',
    message: 'References issues (space separated integers)(optional):\n',
  },
  {
    type: 'input',
    name: 'coauthorship',
    message: 'coauthor (A for Ako, I for Ivo) (optional):\n',
  },
];

function formatCommit(commit, answers) {
  const { type, scope, message, closes, references, coauthorship } = answers;
  commit(
    [
      type && type + '',
      scope && '(' + scope + ')',
      ': ',
      message && message,
      closes && '\nCloses #' + parseList(closes),
      references && '\nRelates #' + parseList(references),
      coauthorship && parseCoauthor(coauthorship),
    ]
      .filter((answer) => !!answer)
      .join(''),
  );
}

function parseList(strList) {
  return strList.split(/[ ,]+/).join(' #');
}

function parseCoauthor(coauthorship) {
  const beginning = '\nCo-authored-by: ';
  let ending;
  if (coauthorship.toUpperCase() === 'I') {
    ending = 'Ivo-Evans <ievans.storrie@gmail.com';
  } else if (coauthorship.toUpperCase() === 'A') {
    ending = 'akomiqaia <akaki.mikaia.1@iliauni.edu.ge>';
  } else {
    ending = coauthorship;
  }
  return beginning + ending;
}

function prompter(cz, commit) {
  inquirer.prompt(questions).then((answers) => {
    formatCommit(commit, answers);
  });
}
