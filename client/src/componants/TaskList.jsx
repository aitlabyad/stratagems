/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */


import { useEffect, useState, } from "react";
import Task from "./Task";
import AddTaskModal from "./AddTaskModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../redux/tasksReducer";
import { isEqual } from 'lodash';

const areStatesEqual = (prev, next) => {
    return isEqual(prev, next);
};



function TaskList(user) {

    
    const dispatch = useDispatch()


    let tasks = useSelector((state) => state.tasks.tasks, areStatesEqual);
    const [var1, setVar1] = useState("all");
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)


    useEffect(() => {
      
        dispatch(getAllTasks({ username: user.user, isCompleted: var1 })); 
        
      }, [dispatch, user.user, var1]); 

      const handleChange = (event) => {
        setVar1(event.target.value);
      };
      
   
   
    return (
        <div>
            <div className="w-[800px] bg-slate-50   mx-auto font-sans mt-28 p-2">
                <h1 className="text-cyan-700 text-[60px] font-medium text-center  capitalize p-2">Task manager</h1>
                <h1 className=" max-w-s mx-auto font-sans text-cyan-700 text-[26px] font-medium   capitalize p-2"></h1>
                <div className="  mx-auto font-sans">
                    <div className=" w-full flex  justify-center bg-teal-lightest font-sans" >
                        <div className=" bg-white rounded shadow p-6 m-4  w-[600px]">
                            <div className="flex  justify-between flex-row  p-2">
                                <div>
                                    <button className=" bg-cyan-700 hover:bg-cyan-900 text-white font-light py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={() => { setOpen(true) }}
                                    >Add new task</button>
                                </div>
                                <AddTaskModal open={open} setOpen={setOpen} />
                               
                                <div >
                                    <select id="var1" 
                                    value={var1} onChange={handleChange}
                                    className=" bg-gray-200 hover:bg-gray-400 text-gray-900 font-light py-2 px-4 rounded focus:outline-none focus:shadow-outline"><option value="all">All</option><option value="incompleted">Incomplete</option><option value="completed">Completed</option></select>
                                </div>
                            </div>
                            {/* task lists   */}
                            {tasks.length > 0 ? (
                                <>
                                    {tasks.map(task => (
                                        <Task key={task._id} task={task} /> 
                                    ))}
                                </>
                            ) : (
                                <p>No tasks found.</p>
                            )}

                        </div>



                    </div>


                </div>
                <p className="text-center text-gray-500 text-xs">
                    &copy; Mouhcine ait labyad task app
                </p>
            </div>
        </div>
    )
}

export default TaskList