import {assert, assertNot, it, testSuite} from './javashit.js';

testSuite('allTheTests.js', () => {

    it('shouldWork', () => {
        let value = 1;

        assert(value, 1);
    });

    it('shouldNotWork', () => {
        let value = 1;

        assertNot(value, 1);
    });

    it('shouldNotWorkAgain', () => {
        let value = 0;

        assertNot(value, 1);
    });
});
