// @ts-check
const util = require('./util');

class Expect {
    constructor({ received, submit }) {
        this.received = received;
        this.submit = submit;
        this.location = null;

        this.flags = {
            not: false,
            deep: false,
            weak: false,
        }
    }

    get to() {
        return this;
    }

    get not() {
        this.flags.not = !this.flags.not;
        return this;
    }

    get deep() {
        this.flags.deep = true;
        return this;
    }

    equal(expected) {
        const { received } = this;

        let success;

        if (this.flags.deep) {
            success = util.deepEqual(expected, received);
        } else if (this.flags.weak) {
            success = received == expected
        } else {
            success = received === expected;
        }

        if (this.flags.not) {
            success = !success;
        }

        this.submit({
            success,
            expected,
            received,
        });
    }
}

module.exports = {
    Expect
};
