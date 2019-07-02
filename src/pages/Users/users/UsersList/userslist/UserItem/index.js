import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import BondControls from './useritem/BondControls'
import { UserSignature } from 'components'

import './UserItem.scss'

class UserItem extends PureComponent {

  static propTypes = {
    user: PropTypes.object.isRequired,
    bond: PropTypes.object,
    isCurrentUser: PropTypes.bool,
  } 

  renderSignature = () => {
    const { bond, isCurrentUser, user } = this.props
    return !isCurrentUser
      ? (bond && bond.confirmed)
      ? <UserSignature user={user} size={50} to={`/user/${user.username}`} />
      : <UserSignature user={user} size={50} />
      : <UserSignature user={user} size={50} to={'/profile'} />
    }

  render() {
    const { bond, isCurrentUser, user } = this.props
    return (
      <li className='user-item'>
        {this.renderSignature()}
        {!isCurrentUser && (
          <BondControls
            bond={bond}
            user={user}
          />
        )}
      </li>
    )
  }
}

export default UserItem
