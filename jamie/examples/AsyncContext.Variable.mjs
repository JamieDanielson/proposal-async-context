import { AsyncContext } from "../build/index.js";

const asyncVar = new AsyncContext.Variable();

// Sets the current value to 'top', and executes the `main` function.
asyncVar.run("top", main);

function main() {
  // AsyncContext.Variable is maintained through other platform queueing.
  setTimeout(() => {
    console.log(`first setTimeout => got '${asyncVar.get()}' expected 'top'`); // => 'top', actually got 'undefined'

    asyncVar.run("A", () => {
      console.log(`A inside setTimeout => got '${asyncVar.get()}'  expected 'A'`); // => 'A'

      setTimeout(() => {
        console.log(`setTimeout inside setTimeout => got '${asyncVar.get()}' expected 'A'`); // => 'A', actually got 'undefined'
      }, randomTimeout());
    });
  }, randomTimeout());

  // AsyncContext.Variable runs can be nested.
  asyncVar.run("B", () => {
    console.log(`B inside main => got '${asyncVar.get()}' expected 'B'`); // => 'B'

    setTimeout(() => {
      console.log(`setTimeout inside B => got '${asyncVar.get()}' expected 'B'`); // => 'B', actually got 'undefined'
    }, randomTimeout());
  });

  // AsyncContext.Variable was restored after the previous run.
  console.log(`last call in main => got '${asyncVar.get()}' expected 'top'`); // => 'top'
}

function randomTimeout() {
  return Math.random() * 1000;
}
