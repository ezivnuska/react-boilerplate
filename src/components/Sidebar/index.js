import React, { Fragment, PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import webConfig from 'config'
import withSession from 'hoc/withSession'
import { MainNav } from 'components'

import './Sidebar.scss'

class Sidebar extends PureComponent {
  state = {
    mobileNavState: false
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      if(window.outerWidth >= 1024) {
        this.setState({
          mobileNavState: false
        })
      }
    })
  }

  mobile_nav_button() {
    const vWidth = window.outerWidth
    if(vWidth <= 1024) {
      this.setState({
        mobileNavState: !this.state.mobileNavState
      })
    }
  }

  render() {
    return (
      <Fragment>
        <div className="logo_wrapper">
          <NavLink to="/" onClick={() => this.mobile_nav_button()}>
            <img src={`${webConfig.siteURL}/assets/graphics/logo.png`} />
          </NavLink>
        </div>

        <MainNav />
    </Fragment>
    )
  }
}

export default withSession(Sidebar)
