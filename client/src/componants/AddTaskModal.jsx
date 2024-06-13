/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { useDispatch,useSelector } from 'react-redux'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addTask } from "../redux/tasksReducer";

function AddTaskModal({ open, setOpen }) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const dispatch = useDispatch();

    const [status, setStatus] = useState('incompleted')
    const {user} = useSelector((state)=> state.user)


    const handleSubmit = (e)=>{
        e.preventDefault()
        setOpen(false) 
        console.log(title,desc,status,user)
        dispatch(addTask({title,desc,status,user}));
        
    }



    return (
        <>
            {open && (


                <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,_0,_0,_0.7)] flex justify-center items-center">
                    <div className="bg-gray-200 max-w-[500px] w-[90%] mx-[auto]  flex justify-center items-center  relative rounded shadow p-6 m-4  ">
                        <div className="absolute -top-[10px] right-0 -translate-y-full text-[1.2rem] p-2 rounded-[4px] flex items-center justify-center cursor-pointer [transition:0.3s_ease_all] hover:bg-red-600 hover:text-white"
                            onClick={() => { setOpen(false) }}


                        >
                            <MdOutlineClose />

                        </div>

                        <form className='flex flex-col w-full text-xl font-bold' onSubmit={(e)=>handleSubmit(e)} >
                            <h1 className='text-xl justify-right text-cyan-800 font-bold mb-4 '>ADD TASK</h1>
                            <label className=' font-light text-[1rem] my-2' htmlFor='title'>Title</label>
                            <input className=' font-light shadow  rounded w-full py-2 px-3  text-[1rem] ' type="text" id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}

                            />
                            <label className=' font-light text-[1rem] my-2 ' htmlFor='desc'>Description</label>
                            <input className=' font-light shadow  rounded w-full py-2 px-3  text-[1rem]    p-1 ' type="text" id="desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            />


                            <label className=' font-light text-[1rem] mt-2 ' htmlFor='status'>Status</label>
                            <select className='h-10 font-light text-[1rem] my-2 rounded' id="status" value={status} 
                            
                            onChange={(e) => setStatus(e.target.value)}
                            >
                                <option className=' font-light text-[1rem] ' value='incompleted' >Incompleted</option>
                                <option className=' font-light text-[1rem] ' value='completed' >Complete</option>
                            </select>
                            <div className='mt-4'>

                                <button type='submit' className="w-36 text-[1rem] bg-cyan-700 hover:bg-cyan-900 text-white font-light py-2 px-2 mr-2 rounded focus:outline-none focus:shadow-outline"

                                >Add</button>

                                <button className="w-36 text-[1rem] bg-gray-700 hover:bg-gray-500 text-white font-light py-2 px-2 rounded focus:outline-none focus:shadow-outline"
                                    onClick={() => { setOpen(false) }}>
                                    Cancel</button>
                            </div>



                        </form>
                    </div>


                </div>

            )}
        </>
    )
}

export default AddTaskModal