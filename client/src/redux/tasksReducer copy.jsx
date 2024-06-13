import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



  export const addTask = createAsyncThunk(
    "task/addTask",
    async (task, {rejectWithValue}) => {
      try {
        const res = await axios.post("http://localhost:3001/add", task);
        return res.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.res.data);
      }
    }
  );

  export const getTasks = createAsyncThunk(

    "tasks",
    async (owner , { rejectWithValue }) => {
      try {
        const res = await axios.get("http://localhost:3001/tasks",owner);
        return res.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error.res.data);
      }
    }
  );



  const taskSlice = createSlice({
    
    name: "task",
    initialState:[],
    reducers: {

        addTask : (state,action)=>{
            
            console.log(...action.payload )
            const newTask = {...action.payload   };
            state.push(newTask)
        },
        getTasks : (state,action)=>{
            
          return { tasks: JSON.parse(action.payload)  };
      },
       
    },
  
    

    }
    
      ,)




  export default taskSlice.reducer;