import React, { PureComponent } from 'react'

import {
  Header,
  Footer,
  Sidebar
} from 'components'

import './MainLayout.scss'

class MainLayout extends PureComponent {
  render() {
    return (
      <div className='main-layout'>
        <Header />
        <div className='page-content'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default MainLayout
