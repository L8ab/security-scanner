// Security Scanner Usage Example

const SecurityScanner = require('../src/scanner');

async function scanProject() {
  const scanner = new SecurityScanner();
  
  // Scan current directory
  const results = await scanner.scanDirectory('./');
  
  console.log('Security Scan Results:');
  console.log(`Total Issues: ${results.total}`);
  console.log('\nVulnerabilities:');
  
  results.vulnerabilities.forEach(vuln => {
    console.log(`\n[${vuln.severity.toUpperCase()}] ${vuln.type}`);
    console.log(`  File: ${vuln.file}`);
    console.log(`  Message: ${vuln.message}`);
  });
}

scanProject();
