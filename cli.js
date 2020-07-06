#!/usr/bin/env node
const fs = require("fs");
const forceFlags = process.argv.filter(
  (variable) => variable === "-f" || variable === "-F" || variable === "--force"
);
const filepaths = [".cz.json", "index.js", "validate.js"];
let endMessage = ""

function makeFile(filepath) {
    try {
        const fileContent = fs.readFileSync(
          `node_modules/transparent-commitizen/.commitconfig/${filepath}`
        );
        fs.writeFileSync(`.commitconfig/${filepath}`, fileContent);
      } catch {
        console.log(
          `Could not copy over ${filepath}, try copying it from node_modules/transparent-commitizen/.commitconfig/ to ./commitconfig/ manually`
        );
      }
}


function moveFiles() {
    try {
        if (fs.existsSync("./.commitconfig/")) {
          console.log("Did not create ./.commitconfig/ because it already exists");
        } else {
          fs.mkdirSync("./.commitconfig");
        }
      } catch (err) {
        console.error(err);
      }
      
      filepaths.forEach((filepath) => {
        try {
          if (fs.existsSync(`.commitconfig/${filepath}`)) {
              if (forceFlags.length > 0) {
                  makeFile(filepath)
              } else {
                  console.log(`Did not edit ${filepath} because it already exists.`);
                    endMessage = "\nTo overwrite existing files use the -f, -F or --force flags"
              }
          } else {
              makeFile(filepath)
      }
      } catch(err) {
          console.error(err)
        }});      
}

moveFiles()
console.log(endMessage)
