import React from 'react'
import { useDispatch } from 'react-redux'
import authServices from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    authServices.logout().then(() => {
      dispatch(logout())
    })
  }


  return (
    <button onClick={logoutHandler} className='inline-block font-semibold px-6 py-2 duration-200 hover:bg-red-500 rounded-3xl cursor-pointer '>Logout</button>
  )
}

export default LogoutBtn