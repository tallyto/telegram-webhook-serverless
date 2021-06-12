import TaskRepository from './TaskRepository'
const taskRepository = new TaskRepository()
describe('task repository tests', () => {
  it('deve cadastarar uma tarefa', async () => {
    const task = await taskRepository.create(String(Date.now()), 'any task')
    console.log(task)
  })
})
