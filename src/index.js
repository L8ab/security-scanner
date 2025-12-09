const SecurityScanner = require('./scanner');
const express = require('express');

const app = express();
const scanner = new SecurityScanner();

app.post('/scan', async (req, res) => {
  try {
    const result = await scanner.scanDirectory(req.body.path || './');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Security Scanner running on port ${PORT}`);
});
