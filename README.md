![GitHub repo size](https://img.shields.io/github/repo-size/Ivo-Evans/transparent-commitizen)
![Version](https://img.shields.io/npm/v/transparent-commitizen)
![License](https://img.shields.io/npm/l/transparent-commitizen)

# transparent-commitizen.

A stripped-down, simple commitizen adapter that exposes its logic. This lets you check project-specific configs into source control. 

Be a transparent commitizen.

Forked from [cz-jira-smart-commit](https://www.npmjs.com/package/cz-jira-smart-commit).

## Installation

If you don't already have commitizen, install it with `npm install -g commitizen`. Install this adapter with `npm i -D transparent-commitizen`. Copy the relevant files up to your root by entering `transparent-commitizen`. This will create a `.commitconfig` folder in your project, with your commit configuration. Finally reference the commit config in your package.json: 
   ```
     "config": {
       "commitizen": {
         "path": "./.commitconfig"
       }
     }
   ```

## Writing your own questions and format

I recommend you look at index.js, which is extremely simple, but here are some instructions anyway.

To add a question, you need ask it by adding to the the array passed to inquirer.prompt, and handle the answer by adding to the function formatAnswers.

Questions in the array passed to inquirer.prompt are a series of objects. Each one should have a type property (`type: 'input'` is a good place to start), a name for the question, and a message that the user will see as a prompt.

Question objects take a function called validate as an optional property. I've included a helper validate function called exists. If you want to make an answer required you can add `validate: validate.exists`. You can also look at exists() for the expected input and output of validate functions. If you're curious about input types or validate functions, head over to the [inquirer.js docs](https://www.npmjs.com/package/inquirer).

Adding questions to the array of objects makes them available in the answers object. Each answer is a value keyed to the name you gave the question. So, to put to the answers to questions in your commit message, access them by their names in the formatCommit function.

## Day to day work

instead of `git commit`, use `git cz`:

```
$ git add .
$ git cz
```
