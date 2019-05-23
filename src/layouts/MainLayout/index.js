import React, { PureComponent } from 'react'

import {
  Header,
  Footer
} from 'components'

import './MainLayout.scss'

class MainLayout extends PureComponent {
  render() {
    return (
      <div id='main'>
        <Header />
        <div className='page-content'>
          <div className='content-container'>
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default MainLayout
