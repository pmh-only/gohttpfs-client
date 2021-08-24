import React from 'react'

export default function Container ({ children }: { children: JSX.Element }) {
  return (
    <div className="flex justify-center w-full px-3 py-1">
      <div className="container">
        {children}
      </div>
    </div>
  )
}
