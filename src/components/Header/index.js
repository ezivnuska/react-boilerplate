import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import withSession from 'hoc/withSession'
import MainNav from './header/MainNav'
import { Icon } from 'components'

import './Header.scss'

class Header extends PureComponent {

  render() {
    const { getCurrentUser } = this.props.session
    return (
      <header>
        <div className='content-container'>
          
          <div className='logo_wrapper'>
            <NavLink to='/'>
              <Icon iconClass='fas fa-map fa-5x' />
            </NavLink>
          </div>

          {getCurrentUser && <MainNav />}
          
        </div>
      </header>
    )
  }
}

export default withSession(Header)
