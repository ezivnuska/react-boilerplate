import React, { PureComponent } from 'react'
import webConfig from 'config'
import { NavLink } from 'react-router-dom'
import withSession from 'hoc/withSession'
import { Icon, MainNav, UserStatus } from 'components'

import './Header.scss'
// <img src={`${webConfig.siteURL}/assets/graphics/logo.png`} />
class Header extends PureComponent {

  renderLogo() {
    return (
      <div className='logo_wrapper'>
        <NavLink to='/'>
          <Icon iconClass='fas fa-map fa-5x' />
        </NavLink>
      </div>
    )
  }

  render() {
    const user = this.props.session.getCurrentUser
    return (
      <header>
        { user && <UserStatus />}
        <div className='container'>
          {this.renderLogo()}
          {user && <MainNav />}
        </div>
      </header>
    )
  }
}

export default withSession(Header)
