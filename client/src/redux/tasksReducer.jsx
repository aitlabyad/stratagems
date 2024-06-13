import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";




export const addTask = createAsyncThunk(
  "addTask",
  async (task, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:3001/add", task);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.res.data);
    }
  }
);


// Get all user action
export const getAllTasks = createAsyncThunk(
  "getTasks",
  async ({ username, isCompleted }, { rejectWithValue }) => {
    try {

      const res = await fetch("http://localhost:3001/tasks", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, isCompleted })
      });

      if (!res.ok) {
        return rejectWithValue(await res.json());
      }

      const result = await res.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletTask = createAsyncThunk(
  "deleteTask",
  async (id, { rejectWithValue }) => {
    try {

      const res = await fetch("http://localhost:3001/delete", {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id }),
      });
      const result = await res.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.res.data);
    }
  }
);


export const updateTask = createAsyncThunk(
  "updateTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const { id, ...updatedFields } = taskData;
      const res = await axios.put(`http://localhost:3001/update/${id}`, updatedFields);
      return res.data;
    } catch (error) {
      console.error("Error updating task:", error);
      return rejectWithValue(error.response?.data || { message: "Failed to update task." });
    }
  }
);




export const taskSlice = createSlice({
  name: "tasksReducer",
  initialState: {
    tasks: []

  },
  reducers: {
    addTask(state, action) {
      state.tasks = action.payload
    },
    getAllTasks(state, action) {

      state.tasks = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        console.log('add')
        console.log(action.payload.response)
        state.tasks.push(action.payload.response);
      })
      .addCase(addTask.rejected, (state) => {
        state.loading = false;

      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(getAllTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTasks.rejected, (state) => {
        state.loading = false;

      })
      .addCase(deletTask.fulfilled, (state, action) => {

        const deletedTaskId = action.payload.id;
        state.tasks = state.tasks.filter(task => task._id !== deletedTaskId);

      })
      .addCase(deletTask.pending, (state) => {
        state.loading = false;

      })
      .addCase(deletTask.rejected, (state) => {
        state.loading = false;

      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;

       
        const updatedTask = action.payload.response;
        const taskId = action.payload.taskid
        console.log(updatedTask)
        // Find and update the task in the state
        const taskIndex = state.tasks.findIndex(task => task._id === taskId);
        if (taskIndex !== -1) {
          const updatedTaskWithNewId = {
            ...updatedTask,
            _id: taskId,
          }
          state.tasks[taskIndex] = updatedTaskWithNewId;
        } else {

          console.error("Task not found in state for update:", taskId);
        }
      })
      .addCase(updateTask.rejected, (state,action) => {
        state.loading = false;
          
        console.error("Error updating task:", action.error.message);
      });




  },
});



export default taskSlice.reducer;