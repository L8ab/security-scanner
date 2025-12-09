const fs = require('fs');
const path = require('path');

class SecurityScanner {
  async scanDirectory(dirPath) {
    const vulnerabilities = [];
    
    // Scan for common security issues
    await this.scanForSecrets(dirPath, vulnerabilities);
    await this.scanForSQLInjection(dirPath, vulnerabilities);
    await this.scanForXSS(dirPath, vulnerabilities);
    
    return {
      total: vulnerabilities.length,
      vulnerabilities,
      timestamp: new Date().toISOString()
    };
  }
  
  async scanForSecrets(dirPath, vulnerabilities) {
    const secretPatterns = [
      /password\s*=\s*['"](.*?)['"]/gi,
      /api[_-]?key\s*=\s*['"](.*?)['"]/gi,
      /secret\s*=\s*['"](.*?)['"]/gi
    ];
    
    const files = this.getAllFiles(dirPath);
    for (const file of files) {
      if (file.endsWith('.env') || file.includes('config')) {
        const content = fs.readFileSync(file, 'utf8');
        for (const pattern of secretPatterns) {
          if (pattern.test(content)) {
            vulnerabilities.push({
              type: 'secret_exposure',
              file,
              severity: 'high',
              message: 'Potential secret found in file'
            });
          }
        }
      }
    }
  }
  
  async scanForSQLInjection(dirPath, vulnerabilities) {
    const sqlPattern = /(\$\{.*?\}|\+.*?\+).*?(SELECT|INSERT|UPDATE|DELETE)/gi;
    const files = this.getAllFiles(dirPath, ['.js', '.py', '.java']);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      if (sqlPattern.test(content)) {
        vulnerabilities.push({
          type: 'sql_injection',
          file,
          severity: 'high',
          message: 'Potential SQL injection vulnerability'
        });
      }
    }
  }
  
  async scanForXSS(dirPath, vulnerabilities) {
    const xssPattern = /innerHTML\s*=\s*.*?\$\{/gi;
    const files = this.getAllFiles(dirPath, ['.js', '.jsx', '.ts', '.tsx']);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      if (xssPattern.test(content)) {
        vulnerabilities.push({
          type: 'xss',
          file,
          severity: 'medium',
          message: 'Potential XSS vulnerability'
        });
      }
    }
  }
  
  getAllFiles(dirPath, extensions = []) {
    const files = [];
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        files.push(...this.getAllFiles(fullPath, extensions));
      } else if (stat.isFile()) {
        if (extensions.length === 0 || extensions.some(ext => item.endsWith(ext))) {
          files.push(fullPath);
        }
      }
    }
    
    return files;
  }
}

module.exports = new SecurityScanner();
