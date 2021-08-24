import React from 'react'
import useSWR from 'swr'
import path from 'path'

import prettyBytes from 'pretty-bytes'
import { useDispatch, useSelector } from 'react-redux'

import Alert from './Alert'
import Container from './Container'
import { File } from '../interfaces/File'
import { parseEndpoint } from '../utils/parsers'
import { selectHostURL } from '../redux/reducers/hostURL'
import { selectSelectedFile, setSelectedFile } from '../redux/reducers/selectedFile'
import { openDirectoryPath, openParentPath, selectBrowsePath } from '../redux/reducers/browsePath'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFolder } from '@fortawesome/free-solid-svg-icons'

import style from '../styles/FileList.module.css'

const fetcher = (url: string) => fetch(url, { headers: { 'X-Client': 'v1' } }).then((r) => r.json())
export default function FileList () {
  const dispatch = useDispatch()
  const hostURL = useSelector(selectHostURL)
  const browsePath = useSelector(selectBrowsePath)
  const selectedFile = useSelector(selectSelectedFile)

  const { data, error } = useSWR(parseEndpoint(hostURL, browsePath), fetcher)

  if (error) return <Alert><div><h2 className="text-2xl">Error while trying to fetch file list</h2><p>{String(error)}</p></div></Alert>
  if (!data) return <Alert><div><h2 className="text-2xl">Loading...</h2><p>please wait for fetching file list</p></div></Alert>
  if (!data.success) return <Alert><div><h2 className="text-2xl">Error while trying to fetch file list</h2><p>{data.message}</p></div></Alert>

  function handleParentClick () {
    dispatch(openParentPath())
    dispatch(setSelectedFile(path.join(browsePath.substr(0, browsePath.lastIndexOf('/')), 'readme.md')))
  }

  function handleClick (file: File) {
    return function () {
      if (file.isDirectory) {
        dispatch(openDirectoryPath(file))
        return
      }

      if (selectedFile === path.join(browsePath, file.fileName)) {
        window.open(parseEndpoint(hostURL, path.join(browsePath, file.fileName)), '_blank')
        return
      }

      dispatch(setSelectedFile(path.join(browsePath, file.fileName)))
    }
  }

  function DownloadBtn ({ file }: { file: File }) {
    const href = new URL(path.join(browsePath, file.fileName), hostURL)
    if (file.isDirectory) href.searchParams.append('archive', 'true')

    return (
      <a target="_blank" download={file.fileName} href={href.toString()} rel="noreferrer">
        <FontAwesomeIcon icon={faDownload} color="#009BC2"/>
      </a>
    )
  }

  return (
    <section id="filelist">
      <Container>
        <table className={style.table}>
          <thead>
            <tr>
              <th>File Name</th>
              <th>File Size</th>
              <th className="hidden lg:table-cell">Last Modified</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!browsePath
              ? <></>
              : (
                  <tr onClick={handleParentClick}>
                    <td><FontAwesomeIcon icon={faFolder} color="#009BC2"/> ..</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                )}
            {(data.fileList || []).sort((a: File, b: File) => a.isDirectory === b.isDirectory ? 0 : a.isDirectory ? -1 : 1).map((file: File) => (
              <tr key={file.fileName} className={path.join(browsePath, file.fileName) === selectedFile ? style.activated : ''}>
                <td onClick={handleClick(file)}>{file.isDirectory ? <FontAwesomeIcon icon={faFolder} color="#00ADD8"/> : <></>} {file.fileName + (file.isDirectory ? '/' : '')}</td>
                <td onClick={handleClick(file)}>{prettyBytes(file.fileSize)}</td>
                <td className="hidden lg:block" onClick={handleClick(file)}>{(new Date(file.modifiedAt * 1000)).toDateString()}</td>
                <td className="text-center cursor-default"><DownloadBtn file={file}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </section>
  )
}
