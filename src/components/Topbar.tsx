import React from 'react'
import path from 'path'
import { useDispatch, useSelector } from 'react-redux'
import { selectBrowsePath, setBrowsePath } from '../redux/reducers/browsePath'
import { selectHostURL, setHostURL } from '../redux/reducers/hostURL'
import Container from './Container'

export default function Topbar () {
  const hostURL = useSelector(selectHostURL)
  const browsePath = useSelector(selectBrowsePath)
  const dispatch = useDispatch()

  return (
    <nav id="topbar" className="bg-gopher py-2 flex justify-center">
      <Container>
        <ul className="px-2 flex gap-3 justify-between text-white">
          <li id="logo" className="font-bold">
            <a href="#" onClick={() => dispatch(setBrowsePath(''))}>{process.env.REACT_APP_TITLE}</a>
          </li>
          <li id="path" className="flex flex-wrap gap-1">
            {browsePath.split('/').map((bpath, i, arr) => {
              const processedPath = path.join(arr.slice(0, i).join('/'), bpath)

              return <a
                key={i}
                href={`#${processedPath}`}
                onClick={() => dispatch(setBrowsePath(processedPath))}
                className="px-2 pb-1 bg-dark-gopher text-white">/{bpath}</a>
            })}
          </li>
          <li>
            <input
              type="url"
              onChange={(event) => dispatch(setHostURL(event.target.value))}
              className="px-2 pb-1 border-0 text-black"
              placeholder="File Sorage Host Url"
              minLength={4}
              value={hostURL}/>
          </li>
        </ul>
      </Container>
    </nav>
  )
}
