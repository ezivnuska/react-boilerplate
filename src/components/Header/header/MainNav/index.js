import React, { Fragment, PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import webConfig from 'config'
import withSession from 'hoc/withSession'
import { MenuButton } from 'components'

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
    return (

      <nav className='main-nav'>
        {this.props.session.getCurrentUser === null &&
          <ul>
          <li>
            <MenuButton
              to='/users'
              iconClass='fas fa-users'
              onClick={() => this.mobile_nav_button()}
            >
              Users
            </MenuButton>
          </li>
        </ul>
      }

      {this.props.session.getCurrentUser != null &&
        <ul>
          <li>
            <MenuButton
              to='/users'
              iconClass='fas fa-users'
              onClick={() => this.mobile_nav_button()}
            >
              Users
            </MenuButton>
          </li>
        </ul>
      }
    </nav>
    )
  }
}

export default withSession(MainNav)
