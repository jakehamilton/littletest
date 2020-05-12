// @ts-check
const chalk = require('chalk');
const { Expect } = require('./expect');

class Suite {
    constructor ({ name, run }) {
        this.name = name;
        this.run = run;

        this.tests = new Map();
        this.results = new Map();
    }

    async test() {
        this.run((name, callback) => {
            if (this.tests.has(name)) {
                console.log(chalk`{red A test already exists with the name "${name}".}`)
                return;
            }

            this.tests.set(name, callback);
            this.results.set(name, []);
        });

        const tests = [...this.tests.entries()];

        for (let i = 0; i < tests.length; i++) {
            const [name, callback] = tests[i];

            const results = [];

            await callback(received => {
                const { stack } = new Error();
                const [, location] = /\s+at \(?(.+)\)?/.exec(
                    stack.split('\n')[2],
                );

                return new Expect({
                    received,
                    submit: result => {
                        results.push({
                            ...result,
                            location
                        });
                    },
                });
            });

            this.results.set(name, results);
        }

        return this.results;
    }
}

module.exports = Suite;
