import React from 'react'

function Navbar() {
  return (
    <header className="bg-black text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-lg font-bold" >
          Home
        </a>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/chat" className="hover:text-gray-300" >
                Chat
              </a>
            </li>
            <li>
              <a href="/save_document" className="hover:text-gray-300" >
                Upload Documents
              </a>
            </li>
            <li>
              <a href="/documents" className="hover:text-gray-300" >
                View documents
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
