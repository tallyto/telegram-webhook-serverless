/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import 'source-map-support/register'
import { TelegramMessage } from '../interfaces'
import { messageHandlerFactory } from '../factory'
import { APIGatewayProxyHandler } from 'aws-lambda'
import { badRequest, serverError, sucess } from '../helpers/httpResponse'
const messageHandle = messageHandlerFactory()

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    console.log('event', event)
    if (!event.body) {
      return badRequest('body not found')
    }
    const body: TelegramMessage = JSON.parse(event.body)
    await messageHandle.handler(body)

    return sucess('')
  } catch (error) {
    console.error('webhook', error)
    return serverError(error)
  }
}
