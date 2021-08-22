import React from 'react'
import Container from './Container'

export default function Alert ({ children }: { children: JSX.Element }) {
  return (
    <section id="alert">
      <Container>
        <div className="bg-blue-100 border-2 border-blue-300 p-3 inline-block mt-5 rounded">
          {children}
        </div>
      </Container>
    </section>
  )
}
