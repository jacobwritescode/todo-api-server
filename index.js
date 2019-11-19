const global = require('./src/helper/global')
const config = require('./src/helper/config')
const db_connection = require('./src/helper/db_connection')
const router = require('./router')


const app = global.express()

app.use(global.bodyParser.json({ limit: '50mb' }))
// parse application/x-www-form-urlencoded
app.use(global.bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(global.bodyParser({ keepExtensions: true }))

app.use(global.express.static(global.path.join(__dirname, 'public')));
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,accesstoken')
    next()
}
app.use(allowCrossDomain)

app.use('/api', router);

db_connection.ConnectDB().then(db => {
    console.log(`Connected to Database ${config.db_path}`)
    app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))
}).catch(err => {
    console.error.bind(console, "MongoDB connection error:")
})

