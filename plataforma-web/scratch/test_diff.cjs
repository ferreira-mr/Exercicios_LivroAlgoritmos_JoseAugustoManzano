function computeLineDiff(expectedStr, actualStr) {
  const expectedLines = expectedStr.split(/\r?\n/);
  const actualLines = actualStr.split(/\r?\n/);

  const n = expectedLines.length;
  const m = actualLines.length;

  // DP table for LCS length
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (expectedLines[i - 1].trim() === actualLines[j - 1].trim()) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack to find the diff
  const diff = [];
  let i = n;
  let j = m;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && expectedLines[i - 1].trim() === actualLines[j - 1].trim()) {
      diff.unshift({ type: 'unchanged', text: actualLines[j - 1] });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diff.unshift({ type: 'added', text: actualLines[j - 1] });
      j--;
    } else {
      diff.unshift({ type: 'removed', text: expectedLines[i - 1] });
      i--;
    }
  }

  return diff;
}

// Test case 1
const expected = "Sucessor: 6\nAntecessor: 4";
const actual = "Sucesso: 6\nAntecessor: 4";
console.log("TEST 1 DIFF:");
console.log(computeLineDiff(expected, actual));

// Test case 2
const expected2 = "Sucessor: 6\nAntecessor: 4";
const actual2 = "Sucessor: 6 Antecessor: 4";
console.log("\nTEST 2 DIFF:");
console.log(computeLineDiff(expected2, actual2));
