const bedrock = require('bedrock-protocol');
const config = require('./config.json');

function connectBot() {
  console.log('البوت يحاول الاتصال بسيرفر البدروك...');
  
  const client = bedrock.createClient({
    host: config.serverHost,
    port: config.serverPort,
    username: config.botUsername,
    offline: true,
    skipPing: true
  });

  client.on('connect', () => {
    console.log('تم الاتصال الأولي بالسيرفر!');
  });

  client.on('spawn', () => {
    console.log('تم الاتصال! البوت الآن موجود داخل السيرفر.');
  });

  client.on('error', (err) => {
    console.log('خطأ في الاتصال:', err);
  });

  client.on('close', () => {
    console.log('انقطع الاتصال، سيتم اعادة المحاولة بعد 10 ثواني...');
    setTimeout(connectBot, 10000);
  });
}

connectBot();
