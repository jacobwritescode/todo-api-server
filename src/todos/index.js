const global = require('../helper/global')
const todoController = require('./controller')
const router = global.express.Router();


router.post('/add', todoController.create)
router.get('/list', todoController.findAll)
router.put('/todos/:todoId',todoController.todoUpdate)
router.delete('/todos/:todoId',todoController.todoDelete)

module.exports = {
    todoRoutes:router,
    todoController
}
