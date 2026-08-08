const bedrock = require('bedrock-protocol');
const dns = require('dns');
const config = require('./config.json');

function connectBot() {
  console.log(`جاري تحليل عنوان السيرفر: ${config.serverHost}...`);
  
  dns.lookup(config.serverHost, (err, address) => {
    if (err) {
      console.log('خطأ في العثور على IP السيرفر، إعادة المحاولة بعد 10 ثواني...', err);
      setTimeout(connectBot, 10000);
      return;
    }

    console.log(`تم العثور على الـ IP: ${address}, جاري الاتصال...`);

    const client = bedrock.createClient({
      host: address,
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
  });
}

connectBot();
