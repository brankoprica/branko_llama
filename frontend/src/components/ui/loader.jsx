import React from 'react'

const loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-4 border-primary border-t-transparent h-12 w-12 md:h-16 md:w-16" />
    </div>
  )
}

export default loader
