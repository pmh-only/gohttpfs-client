import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectBrowsePath, setBrowsePath } from '../redux/reducers/browsePath'

export function Topbar () {
  const browsePath = useSelector(selectBrowsePath)
  const dispatch = useDispatch()

  return (
    <nav id="topbar" className="bg-gopher py-2 flex justify-center">
      <div className="container">
        <ul className="px-2 flex gap-3 justify-between text-white">
          <li id="logo" className="font-bold">
            <a href="#/" onClick={() => dispatch(setBrowsePath('/'))}>{process.env.REACT_APP_TITLE}</a>
          </li>
          <li id="path" className="flex flex-wrap gap-1">
            {browsePath.split('/').slice(1).map((path, i, arr) => path.length > 1
              ? <a onClick={() => dispatch(setBrowsePath(`${i > 0 ? '/' : ''}${arr.slice(0, i).join('/')}/${path}`))} key={i} href={`#${i > 0 ? '/' : ''}${arr.slice(0, i).join('/')}/${path}`} className="px-2 pb-1 bg-dark-gopher text-white">/{path}</a>
              : <></>)}
          </li>
          <li>
            <input type="url" className="px-2 pb-1 border-0 text-black" placeholder="File Sorage Host Url" minLength={4} value={`${window.location.protocol}//${window.location.host}`}/>
          </li>
        </ul>
      </div>
    </nav>
  )
}
