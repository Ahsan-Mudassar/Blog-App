import React from 'react'

function Logo({width}) {
  return (
    <div className='text-3xl font-semibold flex'>
      <img className='h-10' src='src/assets/logo.png'alt="logo" />
      Blog 
      <span className='text-indigo-900 text-2xl font-bold'>App</span>
    </div>
  )
}

export default Logo