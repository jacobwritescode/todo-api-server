const global = require('./src/helper/global')
const { todoRoutes } = require('./src/todos')

const router = global.express.Router()

router.use('/todo', todoRoutes)

module.exports = router;