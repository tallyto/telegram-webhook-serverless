import { TelegramMessage } from './index'

export interface Controller {
  handler: (message: TelegramMessage) => Promise <any>
}
