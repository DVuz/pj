// ...existing code...
const fs = require('fs').promises;
const path = require('path');

async function writeDebugFile(filename, content) {
  try {
    const dir = path.join(__dirname, '..', 'logs');
    await fs.mkdir(dir, { recursive: true });
    const filePath = path.join(dir, filename);
    const time = new Date().toISOString();
    // append để giữ lịch sử; nếu muốn ghi đè dùng writeFile
    await fs.appendFile(filePath, `\n--- ${time} ---\n${content}\n`);
  } catch (err) {
    // không ném lỗi ra ngoài để không ảnh hưởng flow
    // bạn vẫn có thể console.error nếu muốn
    console.error('writeDebugFile error:', err);
  }
}

module.exports = { writeDebugFile };
// ...existing code...
