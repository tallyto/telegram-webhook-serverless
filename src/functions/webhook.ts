import 'source-map-support/register';
import { TelegramMessage } from '../interfaces';
import { messageHandlerFactory } from '../factory'
const messageHandle = messageHandlerFactory()

export const handler = async (event) => {
 try {
   console.log('event', event)
  const body: TelegramMessage = JSON.parse(event.body);
  await messageHandle.handler(body)

  return {
    statusCode: 200,
  }
 } catch (error) {
   console.error('webhook',error)
 }
}

