import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between px-9 py-3 bg-slate-800 text-white'>
        <div className="logo font-bold">
            TODO
        </div>
        <ul className='flex gap-4 mx-9'>
        <li className='cursor-pointer hover:font-bold text-blue-400 transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold text-blue-400 '>Your tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
