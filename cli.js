#!/usr/bin/env node
const fs = require("fs");
const readPackage = require("read-pkg");
const writePackage = require("write-pkg");

const filepaths = [".cz.json", "index.js", "validate.js"];
const destinationFolder = "./.commitconfig/";
const forceFlags = process.argv.filter(
  (variable) => variable === "-f" || variable === "-F" || variable === "--force"
);
let endMessage = "All good";

function makeFile(filepath) {
  try {
    const fileContent = fs.readFileSync(
      `node_modules/transparent-commitizen/.commitconfig/${filepath}`
    );
    fs.writeFileSync(`.commitconfig/${filepath}`, fileContent);
  } catch {
    console.log(
      `Could not copy over ${filepath}, try copying it from node_modules/transparent-commitizen/.commitconfig/ to ${destinationFolder} manually`
    );
  }
}

function moveFiles() {
  try {
    if (fs.existsSync(destinationFolder)) {
      console.log(
        "Did not create" + destinationFolder + "because it already exists"
      );
    } else {
      fs.mkdirSync(destinationFolder);
    }
  } catch (err) {
    console.error(err);
  }

  filepaths.forEach((filepath) => {
    try {
      if (fs.existsSync(`${destinationFolder + filepath}`)) {
        if (forceFlags.length > 0) {
          makeFile(filepath);
        } else {
          console.log(`Did not edit ${filepath} because it already exists.`);
          endMessage =
          "\nTo perform a fresh install use the -F flag, or copy and edit files manually";
        }
      } else {
        makeFile(filepath);
      }
    } catch (err) {
      console.error(err);
    }
  });
}

function editPackageJson() {
  const packageJson = readPackage.sync();
  if (
    forceFlags.length === 0 &&
    packageJson.config &&
    packageJson.config.commitizen
  ) {
    console.log(
      `Did not edit package.json because there seems to already be a commitizen config.`
    );
    endMessage =
      "\nTo perform a fresh install use the -F flag, or copy and edit files manually";
    return;
  }
  writePackage.sync(`${destinationFolder}backup`, packageJson)
  packageJson.config
    ? (packageJson.config.commitizen = { path: destinationFolder })
    : (packageJson.config = { commitizen: { path: destinationFolder } });
    
  writePackage.sync(packageJson);
}

moveFiles();
editPackageJson();
console.log(endMessage);

// editPackage doesn't edit if there's already a config and no force flag
// the value of destination folder is derived from -n --name flag
