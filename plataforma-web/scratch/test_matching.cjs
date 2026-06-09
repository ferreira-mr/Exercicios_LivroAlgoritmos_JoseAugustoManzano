const formatDecimals = (text) => text; // dummy

function checkMatch(testOutput, expectedOutput) {
  // 1. Collapse all whitespace for basic validation
  const cleanActual = formatDecimals(testOutput.toLowerCase().replace(/\s+/g, ' '));
  const cleanExpected = formatDecimals(expectedOutput.toLowerCase().replace(/\s+/g, ' ').trim());
  
  const passed = cleanActual.includes(cleanExpected);
  
  let isExact = false;
  if (passed) {
    const cleanActualLines = testOutput.toLowerCase().split(/\r?\n/).map(l => l.trim()).filter(Boolean).join('\n');
    const cleanExpectedLines = expectedOutput.toLowerCase().split(/\r?\n/).map(l => l.trim()).filter(Boolean).join('\n');
    isExact = cleanActualLines === cleanExpectedLines;
  }
  
  return { passed, isExact };
}

// Test cases
const expected = "Sucessor: 6\nAntecessor: 4";

console.log("Actual: 'Sucessor: 6\\nAntecessor: 4'");
console.log(checkMatch("Sucessor: 6\nAntecessor: 4", expected));

console.log("Actual: 'Sucessor: 6 Antecessor: 4'");
console.log(checkMatch("Sucessor: 6 Antecessor: 4", expected));

console.log("Actual: 'Sucessor: 5 Antecessor: 3'");
console.log(checkMatch("Sucessor: 5 Antecessor: 3", expected));
