import React from 'react'
import './App.css'
import Topbar from './components/Topbar'
import FileList from './components/FileList'
import Container from './components/Container'
import FilePreview from './components/FilePreview'

function App () {
  return (
    <div className="App">
      <Topbar />
      <Container>
        <div className="flex flex-wrap gap-1">
          <div className="flex-1"><FileList /></div>
          <div className="flex-1"><FilePreview /></div>
        </div>
      </Container>
    </div>
  )
}

export default App
