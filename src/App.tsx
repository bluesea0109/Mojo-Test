import React, { useState, SyntheticEvent } from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import CryptoTab from './components/CryptoTab'
import ForexTab from './components/ForexTab'

import { tabType } from './utils/constants'

const App = () => {
  const [selectedTab, setSelectedTab] = useState(tabType.CRYPTO)

  const handleChange = (event: SyntheticEvent, newValue: any) => {
    setSelectedTab(newValue)
  }

  return (
    <div className='app'>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='Tab'
        >
          <Tab value={tabType.CRYPTO} label={tabType.CRYPTO} />
          <Tab value={tabType.FOREX} label={tabType.FOREX} />
        </Tabs>
      </Box>
      {selectedTab === tabType.CRYPTO && <CryptoTab />}
      {selectedTab === tabType.FOREX && <ForexTab />}
    </div>
  )
}

export default App
