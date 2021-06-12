import * as dynamoose from 'dynamoose'
const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true
  },
  task: String,
  chat_id: String,
  timestamp: {
    type: Number,
    default: Date.now()
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  saveUnknown: true,
  timestamps: true
})

const Tarefas = dynamoose.model(process.env.DYNAMODB_TABLE, schema, { create: false })

export default Tarefas
