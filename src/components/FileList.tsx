import React from 'react'
import useSWR from 'swr'
import { useDispatch, useSelector } from 'react-redux'
import { selectHostURL } from '../redux/reducers/hostURL'
import { selectBrowsePath, setBrowsePath } from '../redux/reducers/browsePath'
import Container from './Container'
import Alert from './Alert'

import style from '../styles/FileList.module.css'
import prettyBytes from 'pretty-bytes'

interface File {
  isDirectory: boolean
  fileSize: number
  fileName: string
  modifiedAt: number
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function FileList () {
  const dispatch = useDispatch()
  const hostURL = useSelector(selectHostURL)
  const browsePath = useSelector(selectBrowsePath)

  const { data, error } = useSWR(`${hostURL}/${browsePath}`, fetcher)

  if (error) return <Alert><div><h2 className="text-2xl">Error while trying to fetch file list</h2><p>{String(error)}</p></div></Alert>
  if (!data) return <Alert><div><h2 className="text-2xl">Loading...</h2><p>please wait for fetching file list</p></div></Alert>
  if (!data.success) return <Alert><div><h2 className="text-2xl">Error while trying to fetch file list</h2><p>{data.message}</p></div></Alert>

  function setPath (path: string) {
    window.location.hash = path
    dispatch(setBrowsePath(path))
  }

  function handleClick (file: File) {
    return function () {
      if (file.isDirectory) return setPath(`${browsePath}/${file.fileName}`)
      window.open(`${hostURL}/${browsePath}/${file.fileName}`, '_blank')
    }
  }

  return (
    <section id="filelist">
      <Container>
        <div>
          <h2 className="text-2xl font-bold bg-gray-200 inline-block p-2 my-3">{browsePath || '/'}</h2>
          <table className={style.table}>
            <thead>
              <tr>
                <th>File Name</th>
                <th>File Type</th>
                <th>File Size</th>
                <th>Last Modified</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={() => setPath(browsePath)}>
                <td>.</td>
                <td>Directory</td>
                <td>-</td>
                <td>-</td>
              </tr>
              <tr onClick={() => setPath(browsePath.substr(0, browsePath.lastIndexOf('/')))}>
                <td>..</td>
                <td>Directory</td>
                <td>-</td>
                <td>-</td>
              </tr>
              {(data.fileList || []).sort((a: File, b: File) => a.isDirectory === b.isDirectory ? 0 : a.isDirectory ? -1 : 1).map((file: File) => (
                <tr key={file.fileName} onClick={handleClick(file)}>
                  <td>{file.fileName + (file.isDirectory ? '/' : '')}</td>
                  <td>{file.isDirectory ? 'Directory' : 'File'}</td>
                  <td>{prettyBytes(file.fileSize)}</td>
                  <td>{(new Date(file.modifiedAt * 1000)).toDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}
