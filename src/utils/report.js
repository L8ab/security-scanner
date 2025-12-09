class ReportGenerator {
  generateReport(scanResults) {
    const report = {
      summary: {
        total: scanResults.total,
        high: scanResults.vulnerabilities.filter(v => v.severity === 'high').length,
        medium: scanResults.vulnerabilities.filter(v => v.severity === 'medium').length,
        low: scanResults.vulnerabilities.filter(v => v.severity === 'low').length
      },
      vulnerabilities: scanResults.vulnerabilities,
      timestamp: scanResults.timestamp
    };
    
    return report;
  }
  
  generateMarkdown(report) {
    let md = `# Security Scan Report\n\n`;
    md += `**Total Issues:** ${report.summary.total}\n`;
    md += `**High:** ${report.summary.high} | **Medium:** ${report.summary.medium} | **Low:** ${report.summary.low}\n\n`;
    
    md += `## Vulnerabilities\n\n`;
    for (const vuln of report.vulnerabilities) {
      md += `### ${vuln.type}\n`;
      md += `- **File:** ${vuln.file}\n`;
      md += `- **Severity:** ${vuln.severity}\n`;
      md += `- **Message:** ${vuln.message}\n\n`;
    }
    
    return md;
  }
}

module.exports = new ReportGenerator();
