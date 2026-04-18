import React from 'react'
import logo from '../assets/logo.png'

function Logo() {
  return (
    <div className='text-3xl font-semibold flex'>
      <img className='h-10' src={logo} alt="logo" />
      Blog 
      <span className='text-indigo-900 text-2xl font-bold'>App</span>
    </div>
  )
}

export default Logo