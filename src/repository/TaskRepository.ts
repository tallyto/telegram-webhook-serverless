import { v4 } from 'uuid'
import TarefasModel from '../model/Tarefas'

export default class TaskRepository {
  async create (chatId: string, task: string): Promise<any> {
    const id = v4()
    const tarefa = TarefasModel.create({ id, chat_id: chatId, task })
    return await tarefa
  }

  async findAll (): Promise<any> {
    const tarefas = await TarefasModel.scan().exec()
    return tarefas.map(item => `tarefa: ${item.task}`).join('\r\n')
  }
}
