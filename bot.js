const bedrock = require('bedrock-protocol');
const config = require('./config.json');

const client = bedrock.createClient({
  host: config.serverHost,
  port: config.serverPort,
  username: config.botUsername,
  offline: true
});

client.on('connect', () => {
  console.log('البوت يحاول الاتصال بسيرفر البدروك...');
});

client.on('spawn', () => {
  console.log('تم الاتصال! البوت الآن موجود داخل السيرفر.');
});

client.on('error', (err) => {
  console.log('خطأ في الاتصال:', err);
});
