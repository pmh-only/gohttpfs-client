import React from 'react'
import useSWR from 'swr'
import mime from 'mime-type/with-db'
import { useSelector } from 'react-redux'

import { selectHostURL } from '../redux/reducers/hostURL'
import { selectSelectedFile } from '../redux/reducers/selectedFile'
import Alert from './Alert'
import Container from './Container'

const fetcher = (url: string) => fetch(url).then((r) => r.text())
export default function FilePreview () {
  const hostURL = useSelector(selectHostURL)
  const selectedFile = useSelector(selectSelectedFile)

  const mimeType = mime.lookup(selectedFile)
  if (typeof mimeType === 'string' && mimeType.includes('image')) {
    return <img src={`${hostURL}/${selectedFile}`} />
  }

  const { data, error } = useSWR(`${hostURL}/${selectedFile}`, fetcher)

  if (error) return <Alert><div><h2 className="text-2xl">Error while trying to fetch file</h2><p>{String(error)}</p></div></Alert>
  if (typeof data === 'undefined') return <Alert><div><h2 className="text-2xl">Loading...</h2><p>please wait for fetching file</p></div></Alert>

  return (
    <section id="filepreview">
      <Container>
        <div className="bg-gray-50 block p-5 mt-4">
          <h2 className="text-2xl">{selectedFile}</h2>
          <p>{mimeType}</p>
          <div className="bg-gray-100 p-3 mt-3 break-all font-mono">
            {data || '<empty>'}
          </div>
        </div>
      </Container>
    </section>
  )
}
