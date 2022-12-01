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
        if (successfulTest) {
            console.log("success");
        } else {
            failedTestsCount++;
            console.log("failed");
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
    testFunction();
}

export function assert(actual, expected) {
    let isSuccessful = actual === expected;
    tests.set(currentTest, isSuccessful);
    return isSuccessful;
}

export function assertNot(actual, expected) {
    let isSuccessful = actual !== expected;
    tests.set(currentTest, isSuccessful);
    return isSuccessful;
}

