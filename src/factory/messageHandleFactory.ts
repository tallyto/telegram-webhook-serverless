import ApiTelegramMessage from '../api/ApiTelegramMessage'
import { MessageHandlerController } from '../controllers/messageHandler'
import TaskRepository from '../repository/TaskRepository'

export const messageHandlerFactory = (): MessageHandlerController => {
  const taskRepository = new TaskRepository()
  const apiTelegramMessage = new ApiTelegramMessage()
  return new MessageHandlerController(apiTelegramMessage, taskRepository)
}
