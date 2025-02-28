const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

router.get('/test',(req,res)=>{
        res.json({
            message: 'Todo API is working'
        })
})
router.post('/createtodos',async(req, res)=>{
    try{
        const {title,description}=req.body
        const newTodo = new Todo({
            title:title,
            description:description
            })
            await newTodo.save()
            .then((data)=>{
                res.json({data})
                })
    }catch(err){
        res.status(500).json({message: 'Error creating todo', error: err})
    }
})
router.get('/getalltodos',async(req, res)=>{
    try{
   const todos = await Todo.find()
        res.json(todos
        )
        }catch(err){
            res.status(500).json({message: 'Error fetching todos', error: err})
            }
})

router.get('/gettodo/:id', async(req, res)=>{
    try{
        const id = req.params.id
        const todo = await Todo.findById(id)
        res.json(todo)
    }
    catch(e){
        res.status(500).json({message: 'Error fetching todo', error: e})
    }
})

router.put('/gettodo/:id', async(req, res)=>{
    const {completed} = req.body
    const todo = await Todo.findByIdAndUpdate(req.params.id,{completed:completed})
    res.json(todo)
})
router.delete('/gettodo/:id', async(req, res)=>{
    try{
        const id = req.params.id
        const todo = await Todo.findByIdAndDelete(id)
        res.json(Todo)
        }
        catch(e){
            res.status(500).json({message: 'Error deleting todo', error: e})
            }
})

module.exports = router