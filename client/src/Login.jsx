

import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from './redux/userReducer';






export default function Signup() {

    const state = useSelector((state)=> state.user)
    console.log(state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const dispatch = useDispatch();

    axios.defaults.withCredentials = true


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
               
                 if (result.data.msg === 'Success') {
                    dispatch(changeUser(result.data.email))
                    navigate('/home');
                }
                
                })
      .catch (err=> console.log(err))
}

return (
    <div className="w-[600px] bg-slate-50   mx-auto font-sans mt-28 p-2">
        <h1 className="text-cyan-700 text-[60px] font-medium text-center  capitalize p-2">Task manager</h1>






        <h1 className="w-full max-w-xs mx-auto font-sans text-cyan-700 text-[26px] font-medium   capitalize p-2">login</h1>
        <div className="w-full max-w-xs mx-auto font-sans">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={handleSubmit}
            >

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="shadow  rounded w-full py-2 px-3  text-[1rem]  "
                        id="email"
                        type="email"
                        placeholder="email"
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-light mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="password"
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-rose-500 text-xs italic hidden">password required</p>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-cyan-700 hover:bg-cyan-900 text-white font-light py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                    <Link className="inline-block align-baseline font-light text-sm text-cyan-700 hover:text-cyan-900" to='/register'>
                        Register
                    </Link>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy; Mouhcine ait labyad task app
            </p>
        </div>
    </div>
)
}
