import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql, withApollo } from 'react-apollo'
import toastr from 'toastr'
import {
  ADD_BOND,
  CANCEL_BOND,
  CONFIRM_BOND,
  DECLINE_BOND,
  REMOVE_BOND,
  DELETE_BOND,
} from 'queries'

import BondControl from './bondcontrols/BondControl'

import './BondControls.scss'

class BondControls extends PureComponent {

  state = {
    bond: this.props.bond || null
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    bond: PropTypes.object,
    addBond: PropTypes.func.isRequired,
    confirmBond: PropTypes.func.isRequired,
    declineBond: PropTypes.func.isRequired,
    cancelBond: PropTypes.func.isRequired,
    removeBond: PropTypes.func.isRequired,
    deleteBond: PropTypes.func.isRequired,
  }

  componentDidMount() {
    toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': true,
      'progressBar': true,
      'positionClass': 'toast-bottom-right',
      'preventDuplicates': false,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }
  }

  componentWillReceiveProps = ({ getBond }) => {
    if (this.state.bond !== getBond) {
      this.setState({ bond: getBond })
    }
  }
  
  renderForget = ({ _id }) => {
    const { deleteBond, removeBond, user } = this.props
    return (
      <BondControl
        height={30}
        onClick={async () => {
          
          await removeBond({ variables: { id: _id } })
          await deleteBond({ variables: { id: _id } })

          this.setState({ bond: null })

          toastr.success(`Bond with ${user.username} has been severed!`, 'Forgotten!')
        }}
      >
        <i className='fas fa-user-times fa-lg'></i>
      </BondControl>
    )
  }

  renderConnect = ({ _id }) => {
    const { addBond, user } = this.props
    return (
      <BondControl
        height={30}
        onClick={async () => {
          
          const { data } = await addBond({ variables: { responder: _id } })

          this.setState({ bond: data.addBond })

          toastr.success(`An invitation has been sent to ${user.username}!`, 'Invitation Sent!')
        }}
      >
        <i className='fas fa-user-plus fa-lg'></i>
      </BondControl>
    )
  }

  renderCancel = ({ _id }) => {
    const { cancelBond, deleteBond, user } = this.props
    return (
      <BondControl
        height={30}
        onClick={async () => {
          
          await cancelBond({ variables: { id: _id } })
          await deleteBond({ variables: { id: _id } })
          
          this.setState({ bond: null })
          
          toastr.success(`Invitation with ${user.username} has been revoked!`, 'Invitation Revoked!')
        }}
      >
        <i className='fas fa-times-circle fa-lg'></i>
      </BondControl>
    )
  }

  renderOptions = () => {
    const { bond } = this.state
    const { confirmBond, declineBond, user } = this.props
    
    return (
      <Fragment>
        <li key={1}>
          <BondControl
            height={30}
            onClick={async () => {
              
              const { data } = await confirmBond({ variables: { id: bond._id } })

              this.setState({ bond: data.confirmBond })
              
              toastr.success(`Invitation from ${user.username} accepted!`, 'Invitation Accepted!')

            }}
          >
            <i className='fas fa-check-circle fa-lg'></i>
          </BondControl>
        </li>
        <li key={2}>
          <BondControl
            height={30}
            onClick={async () => {

              await declineBond({ variables: { id: bond._id } })
              await deleteBond({ variables: { id: bond._id } })

              this.setState({ bond: null })
              
              toastr.success(`You have declined the invitation from ${user.username}!`, 'Invitation Declined!')

            }}
          >
            <i className='fas fa-times-circle fa-lg'></i>
          </BondControl>
        </li>
      </Fragment>
    )
  }

  render() {
    const { bond } = this.state
    const { user } = this.props
    return (
      <ul className='bond-controls'>
        {bond
          ? bond.confirmed
          ? <li>{this.renderForget(bond)}</li>
          : (bond.sender === user._id)
          ? this.renderOptions()
          : <li>{this.renderCancel(bond)}</li>
          : <li>{this.renderConnect(user)}</li>
        }
      </ul>
    )
  }
}

const BondControlsWithActions = compose(
  withApollo,
  graphql(ADD_BOND, { name: 'addBond' }),
  graphql(CANCEL_BOND, { name: 'cancelBond' }),
  graphql(CONFIRM_BOND, { name: 'confirmBond' }),
  graphql(DECLINE_BOND, { name: 'declineBond' }),
  graphql(REMOVE_BOND, { name: 'removeBond' }),
  graphql(DELETE_BOND, { name: 'deleteBond' })
)(BondControls)

export default BondControlsWithActions
