import { strict as assert } from "assert";

function program() {
  const value = { key: 123 };

  // Explicitly pass the value to function via parameters.
  // The value is available for the full execution of the function.
  explicit(value);

  // Explicitly captured by the closure.
  // The value is available for as long as the closure exists.
  const closure = () => {
    console.log(`in closure => value.key: ${value.key}`);
    assert.equal(value.key, 123);
  };
  closure();

  // Implicitly propagated via shared reference to an external variable.
  // The value is available as long as the shared reference is set.
  // In this case, for as long as the synchronous execution of the
  // try-finally code.
  try {
    shared = value;
    console.log(`in try block => shared.key: ${shared.key}`);
    implicit();
  } finally {
    shared = undefined;
  }
}

function explicit(value) {
  console.log(`explicit function => value.key: ${value.key}`);
  assert.equal(value.key, 123);
}

let shared;
function implicit() {
  console.log(`implicit function => shared.key: ${shared.key}`);
  assert.equal(shared.key, 123);
}

program();
