// @ts-check
const chalk = require('chalk');

const util = require('./util');

const report = (name, tests) => {
    const successes = [];
    const failures = [];

    for (const [name, results] of tests.entries()) {
        const hasFailure = results.some(result => !result.success);

        if (hasFailure) {
            failures.push({
                name,
                results
            })
        } else {
            successes.push({
                name,
                results,
            })
        }
    }

    console.log(chalk`\n{white.underline ${name}}\n`);

    for (const test of successes) {
        console.log(chalk`✅ {green ${test.name}}`);
    }

    for (const test of failures) {
        console.log(chalk`❌ {red ${test.name}}`);

        for (const result of test.results) {
            if (!result.success) {
                console.log(chalk`Received {red ${util.pretty(result.received)}}, but expected {green ${util.pretty(result.expected)}}.`)
            }
        }
    }
};

module.exports = report;
