import { strict as assert } from "assert";

function program() {
  const value = { key: 123 };

  // Implicitly propagated via shared reference to an external variable.
  // The value is only available only for the _synchronous execution_ of
  // the try-finally code.
  try {
    shared = value;
    console.log(`in try block => shared.key: ${shared.key}`);
    implicit();
  } finally {
    shared = undefined;
  }
}

let shared;
async function implicit() {
  // The shared reference is still set to the correct value.
  console.log(`implicit function => shared.key: ${shared.key}`);
  assert.equal(shared.key, 123);

  await 1;
  console.log(`implicit function awaiting`);

  // After awaiting, the shared reference has been reset to `undefined`.
  // We've lost access to our original value.

  assert.throws(() => {
    console.log(`implicit after awaiting => shared.key is undefined`);
    assert.equal(shared.key, 123);
  });
}

program();
