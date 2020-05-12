// @ts-check
const chalk = require('chalk');

const log = require('./log');
const Suite = require('./suite');
const report = require('./reporter');

const KNOWN_SUITES = new Map();

const describe = async (name, run) => {
    if (KNOWN_SUITES.has(name)) {
        console.log(chalk`{red A test suite already exists with the name "${name}".}`)
        return;
    }

    const suite = new Suite({ name, run });
    KNOWN_SUITES.set(name, suite);

    const tests = await suite.test();
    await report(name, tests);
};

module.exports = {
    describe,
    KNOWN_SUITES,
}
