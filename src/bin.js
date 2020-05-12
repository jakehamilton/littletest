#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const { promisify } = require('util');
const glob = promisify(require('glob'));

const log = require('./log');

const main = async () => {
    const patterns = process.argv.slice(2);

    const files = new Set();

    for (const pattern of patterns) {
        log.trace(`Running glob for pattern "${pattern}".`);
        for (const file of await glob(pattern)) {
            files.add(file);
        }
    }

    for (const file of files) {
        const fullPath = path.isAbsolute(file)
            ? file
            : path.resolve(process.cwd(), file);

        try {
            log.trace(`Requiring file ${fullPath}`);
            require(fullPath);
        } catch (error) {
            console.log(chalk`{red Error requiring file:} ${file}`);
            console.log(error);
        }
    }
};

main().catch((error) => {
    console.log('Encountered an unexpected error.');
    console.log(error);
});
