import React from 'react'

export default function Container ({ children }: { children: JSX.Element }) {
  return (
    <div className="flex justify-center">
      <div className="container">
        {children}
      </div>
    </div>
  )
}
