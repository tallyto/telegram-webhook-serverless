const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const rp = require('request-promise');

export default class ApiTelegramMessage{

  async  sendToUser(chat_id:  number, text: string) {

    const options = {
      method: 'GET',
      uri: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
      qs: {
        chat_id,
        text
      }
    };
  
    return rp(options);
  }
  
}



