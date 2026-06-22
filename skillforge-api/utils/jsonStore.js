

const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');


async function readData(filename) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}


async function writeData(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}


function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

module.exports = { readData, writeData, generateId };
