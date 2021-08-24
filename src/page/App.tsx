import React from 'react'
import Topbar from '../components/Topbar'
import FileList from '../components/FileList'
import Container from '../components/Container'
import FilePreview from '../components/FilePreview'

function App () {
  return (
    <div className="App">
      <Topbar />
      <Container>
        <div className="lg:flex flex-wrap gap-1 block">
          <div className="flex-1"><FileList /></div>
          <div className="hidden lg:block w-1 h-auto bg-gray-100"></div>
          <div className="flex-1"><FilePreview /></div>
        </div>
      </Container>
    </div>
  )
}

export default App
