import './index.css'
import Login from './Login'
import Signup from "./Signup"
import Home from './Home'

import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {


  return (
    <>

    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>


    
    </>
  )
}

export default App
