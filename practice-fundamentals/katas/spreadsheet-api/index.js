/* 

  Develop an API to manage a simple spreadsheet. The API should allow creating a new spreadsheet, setting values in cells,
  and retrieving values from cells. These cells can hold strings, numbers or formulas (i.e. "=A1+B1").

  const spreadsheet = new Spreadsheet()
  spreadsheet.set("A1", 1);
  spreadsheet.set("B1", 2);
  spreadsheet.get("A1") // 1

  spreadsheet.set("C1", "=A1+B2")
  spreadsheet.get("C1") // 3

  Notes:

  JavaScript Library of managing spreadsheet, pretend their the functions being called

  Library must use formula to get back appropriate value

  Assume spreadsheet is 10 x 10

  Anything that's not a number can be treated as a string (assume users will only input strings and numbers)

  Can be implemented in any way

  Only worry about getting and setting numbers

  Formula is only addition operations

  Process:

  1. Initialize implementation for now
  2. Define parsing function (Select proper cell)
  3. Define set
  4. Define get

*/

class Spreadsheet {
  constructor() {
    this.spreadsheetArray = Array(10)
      .fill(null)
      .map((x) => Array(10).fill(null));
    this.previous = [{}];
    this.isDequeuing = true;
    this.isTopLevel = 0;
  }

  parseLocation(cellLocation) {
    let [letter, num] = [cellLocation.slice(0, 1), cellLocation.slice(1)];
    letter = letter.toUpperCase();

    const lookupTable = "ABCDEFGHIJKLMNO";

    const letterTranslation = lookupTable.indexOf(letter);

    return {
      spreadSheetX: letterTranslation,
      spreadSheetY: parseInt(num),
    };
  }

  parseGetResult(cellValue) {
    if (cellValue && cellValue.toString()[0] === "=") {
      const formulaString = cellValue.slice(1);
      const locationArray = formulaString.split("+");
      let result = 0;
      let addToPrev = {};
      this.isTopLevel++;

      for (let location of locationArray) {
        if (this.previous[0].hasOwnProperty(location)) {
          this.isTopLevel = 0;
          this.previous = [{}];
          this.isDequeuing = true;

          throw new Error("Cyclical references detected.");
        }

        addToPrev[location] = true;
        result = result + this.get(location);
      }

      if (this.isDequeuing) this.previous.shift();
      this.isDequeuing = !this.isDequeuing;
      this.previous.push(addToPrev);
      this.isTopLevel--;
      return result;
    } else {
      return cellValue;
    }
  }

  get(cellLocationString) {
    const { spreadSheetX, spreadSheetY } =
      this.parseLocation(cellLocationString);
    const result = this.parseGetResult(
      this.spreadsheetArray[spreadSheetX][spreadSheetY]
    );
    if (this.isTopLevel) this.previous = [{}];
    return result;
  }

  set(cellLocationString, userValue) {
    const { spreadSheetX, spreadSheetY } =
      this.parseLocation(cellLocationString);
    this.spreadsheetArray[spreadSheetX][spreadSheetY] = userValue;
    return;
  }
}

const spreadsheet = new Spreadsheet();
spreadsheet.set("A1", 1);
spreadsheet.set("B1", 2);
console.log(spreadsheet.get("A1"));
console.log(spreadsheet.get("B1"));

spreadsheet.set("C1", "=A1+B1+B1");

console.log(spreadsheet.get("C1")); // 3

spreadsheet.set("A1", 1);
spreadsheet.set("A2", 2);
spreadsheet.set("A3", "=A1+A4");
spreadsheet.set("A4", "=A3+A1");
console.log(spreadsheet.get("A4"));
