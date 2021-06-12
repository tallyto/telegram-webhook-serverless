import ApiTelegramMessage from '../api/ApiTelegramMessage'
import { TelegramMessage } from '../interfaces'
import { Controller } from '../interfaces/controller'
import TaskRepository from '../repository/TaskRepository'

export class MessageHandlerController implements Controller {
  private readonly ApiTelegramMessage: ApiTelegramMessage
  private readonly TaskRepository: TaskRepository
  constructor (ApiTelegramMessage: ApiTelegramMessage, TaskRepository: TaskRepository) {
    this.ApiTelegramMessage = ApiTelegramMessage
    this.TaskRepository = TaskRepository
  }

  async handler (message: TelegramMessage): Promise <any> {
    if (message.edited_message != null) {
      const { chat } = message.edited_message
      await this.ApiTelegramMessage.sendToUser(chat.id, 'voce editou uma mensagem')
    } else if (message.message != null) {
      const { chat, text } = message.message
      const command = message.message.text.split(' ')
      const [action] = command
      if (action === 'task') {
        const task = command.slice(1).join(' ')
        const savedTask = await this.TaskRepository.create(String(chat.id), task.toString())
        await this.ApiTelegramMessage.sendToUser(chat.id, JSON.stringify(savedTask))
      } else if (action === 'list') {
        // #TODO: Implementar a listagem de taferas
        const tarefas = await this.TaskRepository.findAll()
        await this.ApiTelegramMessage.sendToUser(chat.id, tarefas)
      } else {
        await this.ApiTelegramMessage.sendToUser(chat.id, `você enviou a mensagem ${text}`)
      }
    }
  }
}
