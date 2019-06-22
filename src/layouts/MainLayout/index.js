import React from 'react'

import {
  Header,
  Footer
} from 'components'

import './MainLayout.scss'

const MainLayout = ({ children }) => (
  <div id='main'>
    <Header />
    <div className='page-content'>
      <div className='content-container'>
        {children}
      </div>
    </div>
    <Footer />
  </div>
)

export default MainLayout
