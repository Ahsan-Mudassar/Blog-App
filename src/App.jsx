
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './App.css'
import authServices from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import {Outlet} from  'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()


  useEffect(() => {
    authServices.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen text-white'>
      <div className='flex flex-wrap justify-center items-center'>
        <Header />
        <Outlet/>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App
