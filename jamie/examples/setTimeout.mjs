import { strict as assert } from "assert";

function program() {
  const value = { key: 123 };

  // Implicitly propagated via shared reference to an external variable.
  // The value is only available only for the _synchronous execution_ of
  // the try-finally code.
  try {
    shared = value;
    console.log(`in try block => shared.key: ${shared.key}`);
    console.log(`in try block set a timeout`);
    assert.throws(() => {
      console.log(`in try block => implicit func is now undefined`);
      setTimeout(implicit(), 0);
    })
  } finally {
    shared = undefined;
  }
}

let shared;
function implicit() {
  // By the time this code is executed, the shared reference has already
  // been reset. There is no way for `implicit` to solve this because
  // because the bug is caused (accidentally) by the `program` function.
  assert.throws(() => {
    console.log(`implicit after setTimeout finishes => shared.key is undefined`);
    assert.equal(shared.key, 123);
  });
}

program();
