import React from 'react'
import withSession from 'hoc/withSession'
import Page from './mainlayout/Page'
import Header from './mainlayout/Header'
import MainNav from './mainlayout/MainNav'
import Footer from './mainlayout/Footer'
import './MainLayout.scss'

const MainLayout = ({ children, session }) => (
  <div id='main'>
    
    <Header />
    
    <div className='container main'>
      <Page>

        {session.getCurrentUser && <MainNav />}
        
        {children}

      </Page>
    </div>

    <Footer />

  </div>
)

export default withSession(MainLayout)
