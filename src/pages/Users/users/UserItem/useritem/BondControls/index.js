import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  bondCreateRequest,
  bondCancelRequest,
  bondConfirmRequest,
  bondDeclineRequest,
  bondRemoveRequest,
} from 'store/actions'

import BondControl from './bondcontrols/BondControl'

import './BondControls.scss'

class BondControls extends PureComponent {

  static propTypes = {
    user: PropTypes.object.isRequired,
    bond: PropTypes.object,
    createBond: PropTypes.func.isRequired,
    confirmBond: PropTypes.func.isRequired,
    declineBond: PropTypes.func.isRequired,
    cancelBond: PropTypes.func.isRequired,
    removeBond: PropTypes.func.isRequired,
  }

  renderForget = ({ _id }) => {
    return (
      <BondControl
        height={30}
        onClick={() => this.props.removeBond(_id)}
      >
        Forget
      </BondControl>
    )
  }

  renderConnect = ({ _id }) => {
    return (
      <BondControl
        height={30}
        onClick={() => this.props.createBond(_id)}
      >
        Connect
      </BondControl>
    )
  }

  renderCancel = ({ _id }) => {
    return (
      <BondControl
        height={30}
        onClick={() => this.props.cancelBond(_id)}
      >
        Cancel
      </BondControl>
    )
  }

  render() {
    const { bond, user, confirmBond, declineBond } = this.props
    
    const responses = [
      { label: '+', onClick: () => confirmBond(bond) },
      { label: '-', onClick: () => declineBond(bond) },
    ]
    return (
      <ul className='bond-controls'>
        {bond
          ? bond.confirmed
          ? <li>{this.renderForget(bond)}</li>
          : (bond.sender === user._id)
          ? responses.map(({ label, onClick }, index) => (
            <li key={index}>
              <BondControl
                height={30}
                onClick={onClick}
              >
                {label}
              </BondControl>
            </li>
          ))
          : <li>{this.renderCancel(bond)}</li>
          : <li>{this.renderConnect(user)}</li>
        }
      </ul>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createBond: userId => dispatch(bondCreateRequest(userId)),
  confirmBond: bond => dispatch(bondConfirmRequest(bond._id)),
  declineBond: bond => dispatch(bondDeclineRequest(bond._id)),
  cancelBond: bondId => dispatch(bondCancelRequest(bondId)),
  removeBond: bondId => dispatch(bondRemoveRequest(bondId)),
})

export default connect(null, mapDispatchToProps)(BondControls)
