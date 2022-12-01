const tests = new Map();
let currentTest = '';

export function testSuite(testSuiteName, testSuiteFunctions) {
    console.log("testing testsuite '" + testSuiteName + "':\n");
    testSuiteFunctions();
    printTestResults();
}

function printTestResults() {
    let testNumber = 1;
    let failedTestsCount = 0;
    let longestName = getLongestName();
    for (let [testName, successfulTest] of tests) {
        process.stdout.write(testNumber + ". '" + testName + "'" + ' '.repeat(longestName + 3 - testName.length));
        if (successfulTest === true) {
            console.log("success");
        } else {
            failedTestsCount++;
            console.log("failed => " + successfulTest);
        }
        testNumber++;
    }
    console.log('\n' + failedTestsCount + '/' + tests.size + ' failed');
}

function getLongestName() {
    let longestName = 0;
    for (let [name, _] of tests) {
        if (name.length > longestName) {
            longestName = name.length;
        }
    }

    return longestName;
}

export function it(testName, testFunction) {
    currentTest = testName;
    try {
        testFunction();
        tests.set(currentTest, true);
    } catch (e) {
        tests.set(currentTest, e);
    }
}

export function assert(actual, expected) {
    let isSuccessful = actual === expected;
    if (!isSuccessful) {
        throw "AssertionError for '" + currentTest + "': " + actual + ' is not equal to ' + expected;
    }
}

export function assertNot(actual, expected) {
    let isSuccessful = actual !== expected;
    if (!isSuccessful) {
        throw "AssertionError for '" + currentTest + "': " + actual + ' is equal to ' + expected;
    }
}
