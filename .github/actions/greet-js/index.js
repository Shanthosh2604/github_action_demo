// index.js — the body of the "Greet (JavaScript)" action.
//
// Deliberately uses ONLY Node built-ins (no @actions/core, no npm install) so
// it runs as-is with nothing to generate. In a real action you would usually
// `const core = require('@actions/core')` and bundle it with @vercel/ncc.
//
// HOW INPUTS/OUTPUTS WORK UNDER THE HOOD (what @actions/core hides):
//   * Every `with:` input arrives as an env var  INPUT_<NAME>  (uppercased).
//   * You set an output by appending "name=value" to the file whose path is in
//     the GITHUB_OUTPUT env var — exactly like `$GITHUB_OUTPUT` in a run step.
//   * console.log lines show up in the step log.

const fs = require('fs');

// Read the `who` input (INPUT_WHO), falling back to the action's default.
const who = process.env.INPUT_WHO || 'world';

const greeting = `Hello, ${who}!`;
const time = new Date().toISOString();

// Log to the step output.
console.log(greeting);
console.log(`Ran at ${time}`);

// Emit the two outputs so the calling workflow can read
// steps.<id>.outputs.greeting / .time
const out = process.env.GITHUB_OUTPUT;
if (out) {
  fs.appendFileSync(out, `greeting=${greeting}\n`);
  fs.appendFileSync(out, `time=${time}\n`);
}

// A non-zero exit code fails the step. `core.setFailed(msg)` is the toolkit way.
// process.exit(1);
