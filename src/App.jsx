import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      settodos(todos)
    }
  }, [])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    settodos([...todos, {id:uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS()
  };

  
  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    settodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    settodos(newTodos) 
    saveToLS()
  }
  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item=>{
      return item.id!=id
    });
    settodos(newTodos)
    saveToLS()
  };

  const handelChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item=>{
      return item.id === id;
    }) 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-purple-300 rounded-xl my-4 px-2 py-4 min-h-screen w-1/2">
        <h2 className="text-lg font-bold text-center">ToDo List</h2>
        <div className="input flex justify-center gap-2">
          <input
            onChange={handelChange}
            value={todo}
            className="rounded-lg w-1/2 my-3"
            type="text"
          />
          <button
            onClick={handleAdd} disabled={todo.length<=3}
            className="my-3 text-white bg-purple-900 hover:bg-purple-950 rounded-md py-2 px-3"
          >
            Add
          </button>
        </div>
        <div className="container mx-auto">
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
         <label className='mx-2 font-bold' htmlFor="show">Show Finished</label> 
  
        <h2 className="text-lg font-bold text-center">Your Todos</h2>
        <div className="Todos justify-center">
          {todos.length==0 && <div className="m-5 font-bold">No ToDos Added</div> }
          {todos.map(item => {
            return  (showFinished || !item.isCompleted) && <div key={item.id} className="todos flex w-1/2 justify-between my-3">
               <input name={item.id} onChange={handleCheckbox} type="checkBox" value={todo.isCompleted} />
               <div className={item.isCompleted? "line-through flex":""}>{item.todo}</div>
              <div className="buttons">
                <button
                  onClick={(e)=>handleEdit(e,item.id)}
                  className="text-white bg-purple-900 hover:bg-purple-950 rounded-md py-2 px-3  mx-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e)=>{handleDelete(e,item.id)}}
                  className="text-white bg-purple-900 hover:bg-purple-950 rounded-md py-2 px-3 mx-2"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          })}
        </div>
        </div>
      </div>
    </>
  );
}

export default App;
