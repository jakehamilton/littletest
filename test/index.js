// @ts-check
const { describe } = require('../src');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

try {
    describe('My Test Suite', it => {
        it('Should run.', expect => {
            expect(true).to.equal(true);
        });

        it('Should run async.', async (expect) => {
            await sleep(0);
            expect(true).to.equal(true);
            expect([1, 2, 3]).to.deep.equal([1, 2, 3]);
        });

        it('Should support deep equal on objects.', expect => {
            const x = {
                key: {
                    otherKey: 'value',
                },
            };

            const y = {
                key: {
                    otherKey: 'value',
                },
            };
            expect(x).to.deep.equal(y);
        });

        it('Should support deep equal on arrays.', expect => {
            const x = [[1], 2, 3];
            const y = [[1], 2, 3];
            expect(x).to.deep.equal(y);
        });

        it('Should support negation.', expect => {
            expect(true).to.not.equal(false);
        });
    });
} catch (error) {
    console.log(`An unexpected error occurred.`);
    console.log(error);
}
