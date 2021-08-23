import React from 'react'
import useSWR from 'swr'
import { Converter } from 'showdown'
import mime from 'mime-type/with-db'
import { useSelector } from 'react-redux'

import { selectHostURL } from '../redux/reducers/hostURL'
import { selectSelectedFile } from '../redux/reducers/selectedFile'
import Alert from './Alert'
import Container from './Container'

import 'github-markdown-css/github-markdown.css'

const fetcher = (url: string) => fetch(url).then((r) => r.text())
export default function FilePreview () {
  const hostURL = useSelector(selectHostURL)
  const selectedFile = useSelector(selectSelectedFile)
  const { data, error } = useSWR(`${hostURL}/${selectedFile}`, fetcher)

  const mimeType = mime.lookup(selectedFile)
  function Preview () {
    if (typeof mimeType !== 'string') return <></>
    if (mimeType.includes('image')) {
      return (
        <div>
          <p>{mimeType}</p>
          <img src={`${hostURL}/${selectedFile}`} className="w-full" />
        </div>
      )
    }

    if (mimeType === 'text/markdown') {
      const converter = new Converter()

      return (
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: converter.makeHtml(data!) }}/>
      )
    }

    return (
      <div>
        <p>{mimeType}</p>
        <div className="bg-gray-100 p-3 mt-3 break-all font-mono">
          {data || '<empty>'}
        </div>
      </div>
    )
  }

  if (error) return <Alert><div><h2 className="text-2xl">Error while trying to fetch file</h2><p>{String(error)}</p></div></Alert>
  if (typeof data === 'undefined') return <Alert><div><h2 className="text-2xl">Loading...</h2><p>please wait for fetching file</p></div></Alert>

  return (
    <section id="filepreview">
      <Container>
        <div className="bg-gray-50 block p-5 mt-4">
          <h2 className="text-2xl">{selectedFile}</h2>
          <Preview />
        </div>
      </Container>
    </section>
  )
}
