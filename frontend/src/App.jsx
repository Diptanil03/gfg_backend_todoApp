import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import axios from 'axios'
import 'dotenv'

function App() {
  const api_url = import.meta.env.VITE_REACT_APP_API
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
  })
  const getAllTodos = async()=>{
    try{
      const response = await fetch(`${api_url}/getalltodos`)
      const data = await response.json()
      console.log(data)
      setTodos(data)
      // console.log(import.meta.env);

    }
    catch(err){
      console.log(err)
    }
  }
  const deleteTodo = async(id)=>{
    const response = await fetch(`${api_url}/gettodo/${id}`,{
      method: 'DELETE'
    })
    const data = await response.json()
    console.log(data)
  }
  const createTodo = async()=>{
    const response = await fetch(`${api_url}/createttodos`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body:
      JSON.stringify(
        newTodo
        ),
    })
  }

  useEffect(()=>{
    getAllTodos()
  },[])
  return (
    <>
      {
        todos.map((todo)=>{
          return (
            <div key={todo._id}>
              <h1>{todo.title}</h1>
              <p>{todo.description}</p>
              <p>{todo.completed?"completed":"not completed"}</p>
              <button onClick={()=>deleteTodo(todo._id)}>Delete</button>
              <br />
            </div>
          )
        })
      }
      <h1>Create todo</h1>
      <form>
        <input onChange={
          (e)=>{ setNewTodo({
            ...setNewTodo,
            title:e.target.value})
          }} type="text" name="title" placeholder="title" />
        <br />
        <input onChange={
          (e)=>{ setNewTodo({
            ...setNewTodo,
            description:e.target.value})}
        } type="text" name="description" placeholder="description" />
        <br />
        <button onClick={createTodo}>Create todo</button>
      </form>
    </>
  )
}

export default App
