import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-lg font-bold" >
          Home
        </a>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Button className="text-white" variant='link' onClick={() => navigate('/chat')}>
                Chat
              </Button>
            </li>
            <li>
              <Button className="text-white" variant='link' onClick={() => navigate('/save_document')}>
                Upload Documents
              </Button>
            </li>
            <li>
              <Button className="text-white" variant='link' onClick={() => navigate('/documents')}>
                View Documents
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
