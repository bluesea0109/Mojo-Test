import { useState, useEffect } from 'react'
import { websocketClient } from '@polygon.io/client-js'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import TableComponent from './TableComponent'

const ForexTab = () => {
  const [forexLists, setForexLists] = useState<any>([])
  const [realForexData, setRealForexData] = useState<any>(null)
  const [forexWS, setForexWS] = useState<any>(null)

  const APIKEY = process.env.REACT_APP_POLYGON_API_KEY as string

  const getForexData = () => {
    forexWS.onmessage = (data: any) => {
      forexWS.send('{"action":"subscribe","params":"C.C:EUR-USD,C.C:JPY-USD"}')
      const forexData = JSON.parse(data.data)[0]
      if (forexData && forexData.p) {
        setRealForexData({
          pair: forexData.p,
          price: forexData.a + '/' + forexData.b,
          timestamp: forexData.t,
        })
      }
    }
  }

  useEffect(() => {
    const _forexWS = websocketClient(APIKEY).forex()
    setForexWS(_forexWS)
  }, [APIKEY])

  useEffect(() => {
    if (forexWS) {
      getForexData()

      forexWS.onclose = (event: any) => {
        const _forexWS = websocketClient(APIKEY).forex()
        setForexWS(_forexWS)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forexWS])

  setTimeout(() => {
    if (forexWS) {
      getForexData()
    }
  }, 5 * 1000)

  useEffect(() => {
    const tempForexList = forexLists
    if (realForexData) {
      tempForexList.push(realForexData)
      tempForexList.sort((a: any, b: any) => b.timestamp - a.timestamp)
      setForexLists(tempForexList.slice(0, 20))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realForexData])

  return (
    <Box>
      {forexLists.length > 0 ? (
        <TableComponent data={forexLists} />
      ) : (
        <CircularProgress style={{ margin: '25px' }} />
      )}
    </Box>
  )
}

export default ForexTab
