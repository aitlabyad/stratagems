import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userReducer'
import tasksReducer from './tasksReducer'

export const store = configureStore({
    reducer:{
        user : userReducer,
        tasks : tasksReducer
    }
})


