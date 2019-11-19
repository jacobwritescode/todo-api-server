const global = require('../helper/global')
const schema = global.mongoose.Schema;

const TodoSchema = new schema({
    completed: Boolean,
    text: String
}, {
    timestamps: true
});
const TodoModel = global.mongoose.model('Todo', TodoSchema);
module.exports = { TodoModel };