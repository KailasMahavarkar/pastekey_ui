const { performance } = require('perf_hooks');

const testString = "This is a Test String with some symbols!@#$%^&*()1234567890 and it's quite long to test the performance of the tag handler in components/forms/paste.create.form.tsx. Let's make it even longer by repeating it: " +
  "This is a Test String with some symbols!@#$%^&*()1234567890 and it's quite long to test the performance of the tag handler in components/forms/paste.create.form.tsx. ".repeat(50);

function oldVersion(targetValue) {
    const validChars = [];
    for (let i = 0; i < targetValue.length; i++) {
        const charset =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYX1234567890";

        if (charset.includes(targetValue[i])) {
            validChars.push(targetValue[i]);
        }
    }
    return validChars.toString().replaceAll(",", "");
}

// Just doing what the instruction said: moving the allocation outside the loop.
const charsetGlobal =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWZYX1234567890";

function proposedVersion(targetValue) {
    const validChars = [];
    for (let i = 0; i < targetValue.length; i++) {
        if (charsetGlobal.includes(targetValue[i])) {
            validChars.push(targetValue[i]);
        }
    }
    return validChars.toString().replaceAll(",", "");
}

const ITERATIONS = 100000;

console.log("Warming up...");
for (let i = 0; i < 1000; i++) {
  oldVersion(testString);
  proposedVersion(testString);
}

console.log("Running old version...");
const startOld = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    oldVersion(testString);
}
const endOld = performance.now();
console.log(`Old version: ${endOld - startOld} ms`);

console.log("Running proposed version...");
const startNew = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    proposedVersion(testString);
}
const endNew = performance.now();
console.log(`Proposed version: ${endNew - startNew} ms`);
