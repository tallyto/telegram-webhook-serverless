/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'axios'
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
export default class ApiTelegramMessage {
  async sendToUser (chat_id: number, text: string): Promise <any> {
    const baseURL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`

    const result = await axios.get(baseURL, {
      params: {
        chat_id,
        text
      }
    })

    return result.data
  }
}
