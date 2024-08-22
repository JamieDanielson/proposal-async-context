import { AsyncContext } from "../build/index.js";

const asyncVar = new AsyncContext.Variable();

let snapshot
asyncVar.run("A", () => {
  // Captures the state of all AsyncContext.Variable's at this moment.
  snapshot = new AsyncContext.Snapshot();
});

asyncVar.run("B", () => {
  console.log(asyncVar.get()); // => 'B'

  // The snapshot will restore all AsyncContext.Variable to their snapshot
  // state and invoke the wrapped function. We pass a function which it will
  // invoke.
  snapshot.run(() => {
    // Despite being lexically nested inside 'B', the snapshot restored us to
    // to the snapshot 'A' state.
    console.log(asyncVar.get()); // => 'A'
  });
});
