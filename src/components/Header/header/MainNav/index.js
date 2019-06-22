import React, { PureComponent } from 'react'
import withSession from 'hoc/withSession'
import { MenuButton } from 'components'
import SignoutButton from './mainnav/SignoutButton'

import './MainNav.scss'

class MainNav extends PureComponent {
  state = {
    mobileNavState: false
  }

  componentWillMount() {
    this.setMobileNavState = this.setMobileNavState.bind(this)
  }

  componentDidMount() {
    window.addEventListener('resize', this.setMobileNavState)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setMobileNavState)
  }

  setMobileNavState() {
    if (window.outerWidth >= 1024) {
      this.setState({
        mobileNavState: false
      })
    }
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
    const { getCurrentUser } = this.props.session
    return getCurrentUser ? (
      <nav className='main-nav'>
        <ul>
          <li>
            <MenuButton
              to='/profile'
              iconClass='fas fa-user'
              onClick={() => this.mobile_nav_button()}
            >
              {getCurrentUser.username}
            </MenuButton>
          </li>
          <li>
            <MenuButton
              to='/users'
              iconClass='fas fa-users'
              onClick={() => this.mobile_nav_button()}
            >
              Users
            </MenuButton>
          </li>
          <li>
            <SignoutButton />
          </li>
        </ul>
      </nav>
    ) : null
  }
}

export default withSession(MainNav)
