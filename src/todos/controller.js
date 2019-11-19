const { TodoModel } = require('./model')

exports.create=(req,res)=>{
    console.log("received add request")
    console.log(req)
   if(!req.body.text){
       return res.status(400).send({
           message:"Todo text cannot be empty"
       })
   }
 
   const todo = new TodoModel({
     completed: req.body.completed,
     text: req.body.text || "Untitled Note", 
   });
    
   todo.save()
   .then(data=>{
         res.send(data)
   }).catch(err=>{
       res.status(500).send({
           message:err.message ||  "Something went wrong"
       })
   }
   )
 }
 exports.findAll=(req,res)=>{
    TodoModel.find()
     .then(todo=>{
         res.send(todo)
     }).catch(err=>{
         res.status(500).send({
             message:err.message ||  "Something went wrong"
         })
     })
 }
 exports.todoUpdate=(req,res)=>{
      // Validate Request
      if(!req.body.text) {
         return res.status(400).send({
             message: "Todo text can not be empty"
         });
     }
 
     // Find note and update it with the request body
     TodoModel.findByIdAndUpdate(req.params.todoId, {
         completed: req.body.completed, 
         text: req.body.text
     }, {new: true})
     .then(todo => {
         if(!todo) {
             return res.status(404).send({
                 message: "Todo not found with id " + req.params.noteId
             });
         }
         res.send(todo);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).send({
                 message: "Todo not found with id " + req.params.noteId
             });                
         }
         return res.status(500).send({
             message: "Error updating note with id " + req.params.noteId
         });
     });
 }
 exports.todoDelete=(req,res)=>{
     console.log("received delete request-->",req.params)
    TodoModel.findByIdAndRemove(req.params.todoId)
     .then(todo => {
         if(!todo) {
             return res.status(404).send({
                 message: "Todo not found with id " + req.params.todoId
             });
         }
         res.send({message: "Todo deleted successfully!"});
     }).catch(err => {
         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
             return res.status(404).send({
                 message: "Todo not found with id " + req.params.todoId
             });                
         }
         return res.status(500).send({
             message: "Could not delete todo with id " + req.params.todoId
         });
     });
 }