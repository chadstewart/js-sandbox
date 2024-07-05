import { EventEmitter } from "events";
import { readFile } from "fs";

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }
  addFile(file) {
    this.files.push(file);
    return this;
  }
  find() {
    for (const file of this.files) {
      this.emit("startfind", this.files);
      readFile(file, "utf8", (err, content) => {
        if (err) {
          return this.emit("error", err);
        }
        this.emit("fileread", file);
        const match = content.match(this.regex);
        if (match) {
          match.forEach((elem) => this.emit("found", file, elem));
        }
      });
    }
    return this;
  }
}

/* const findRegexInstance = new FindRegex(/hello/g);
findRegexInstance
  .addFile("fileA.txt")
  .addFile("fileB.json")
  .find()
  .on("found", (file, match) => console.log(`Matched "${match}" in file ${file}`))
  .on("error", (err) => console.error(`Error emitted ${err.message}`)); */

const ticker = (timeInMs, callback) => {
  const emitter = new EventEmitter();
  let tickerCount = 0;
  const INTERVAL_TIME_IN_MS = 50;

  emitter.emit("tick");
  tickerCount++;

  const tickerInterval = setInterval(() => {
    if(Date.now() % 4) emitter.emit("error");
    emitter.emit("tick");
    tickerCount++;
  }, INTERVAL_TIME_IN_MS);

  setTimeout(() => {
    clearInterval(tickerInterval);
    callback(tickerCount);
  }, timeInMs);

  return emitter;
};

ticker(1000, (totalTicks) => console.log(`Number of ticks passed: ${totalTicks}`))
  .on("tick", () => console.log("tick"))
  .on("error", () => console.log("Oh Fuck!!!"));
