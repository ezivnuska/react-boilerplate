import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import withSession from 'hoc/withSession'
import UserStatus from './header/UserStatus'
import MainNav from './header/MainNav'
import { Icon } from 'components'

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
        
        {user && <div id='topbar'>
          <div className='content-container'>
            <UserStatus />
          </div>
        </div>}

        <div className='content-container'>
          {this.renderLogo()}
          {user && <MainNav />}
        </div>
        
      </header>
    )
  }
}

export default withSession(Header)
