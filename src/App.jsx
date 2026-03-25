import { useState } from "react";
import NavBar from "./components/NavBar";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos);
  }

  const handleDelete=(e, id)=>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos);
  }

  const handleAdd=()=>{
    setTodos([...todos, {id:uuidv4(), todo, isComplete: false}]);
    setTodo("");
    
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    
    let newTodos = [...todos]
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos);
  }
  

  return (
    <>
      <NavBar />

      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add a Todos</h2>
          <input onChange={handleChange} value={todo} type="text" className="bg-white w-1/2 border-2" />
          <button onClick={handleAdd} className="bg-violet-800 hover:bg-violet-950 duration-500 p-2 py-1 text-sm font-bold text-white rounded-md 
          mx-6">Save</button>
        </div>
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
        { (todos.length ===0) ? "No Todo To Display":""}
        {todos.map(item=>{

          return <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
            <input onChange={handleCheckbox} name={item.id} type="checkbox" value={item.isComplete} />
          <div className={item.isComplete ? "line-through": ""}>{item.todo}</div>
            <div className="button">
              <button onClick={(e)=>handleEdit(e, item.id)} className="bg-violet-800 hover:bg-violet-950 duration-500 p-2 py-1 text-sm font-bold text-white rounded-md mx-1">Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-violet-800 hover:bg-violet-950 duration-500 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"> Delete</button>
            </div>
          </div>
        })}

        </div>
      </div>
    </>
  );
}

export default App;
