// @ts-check
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');

const log = require('./log');
const util = require('./util');

const read = promisify(fs.readFile);

const report = async (name, tests) => {
    log.trace(`Reporting for test suite "${name}".`);
    const successes = [];
    const failures = [];

    for (const [name, results] of tests.entries()) {
        log.trace(`Checking for failures in test "${name}".`);
        const hasFailure = results.some((result) => !result.success);

        if (hasFailure) {
            log.trace(`Test "${name}" has failures.`);
            failures.push({
                name,
                results,
            });
        } else {
            log.trace(`Test "${name}" does not have failures.`);
            successes.push({
                name,
                results,
            });
        }
    }

    const total = successes.length + failures.length;

    console.log(chalk`\n{white.underline ${name}}\n`);
    console.log(
        chalk`{${failures.length > 0 ? 'red' : 'green'}.bold ${
            successes.length
        }/${total} tests passing.} \n`,
    );

    for (const test of successes) {
        console.log(chalk`✅  {green ${test.name}}`);
    }

    for (const test of failures) {
        console.log(chalk`❌  {red ${test.name}}`);

        for (const result of test.results) {
            if (!result.success) {
                let code = '';

                try {
                    const regex = /(?:\s+)?(.+):(\d+):(\d+)$/;
                    const [, file, line, column] = regex.exec(result.location);
                    const text = (await read(file)).toString();

                    let currentLine = 0;
                    for (
                        let i = 0;
                        i < text.length && currentLine <= Number(line);
                        i++
                    ) {
                        if (text[i] === '\n' || text[i] === '\r\n') {
                            currentLine++;
                            continue;
                        }

                        if (currentLine === Number(line) - 1) {
                            code += text[i];
                        }
                    }
                } catch (error) {
                    // Couldn't read the file, what a shame :(
                }

                console.log(
                    chalk`     Received {red ${util.pretty(
                        result.received,
                    )}}, but expected {green ${util.pretty(result.expected)}}.`,
                );
                console.log(chalk`     ➡️ ${result.location}`);
                if (code) {
                    console.log(
                        chalk`\n     📝  {white ${code.replace(/^\s+/, '')}}\n`,
                    );
                }
            }
        }
    }
};

module.exports = report;
