import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { DELETE_MEMORY } from 'queries'
import toastr from 'toastr'
import {
  Heading,
  IconLink,
} from 'components'

import './MemoryHeader.scss'

class MemoryHeader extends PureComponent {

  static propTypes = {
    memory: PropTypes.object.isRequired,
    mine: PropTypes.bool,
    showOptions: PropTypes.func,
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

  onDeleteClicked = e => {
    e.preventDefault()
    const { deleteMemory, memory, refetch } = this.props
    deleteMemory({ variables: { id: memory._id } })
    .then(() => {
      refetch()
      toastr.success('Memory deleted.', 'Success!')
    })
  }

  render() {
    const { memory, mine, bodyShown, optionsShown, showBody, showOptions } = this.props
    return (
      <div className='memory-header'>
        <Heading className='memory-heading' level={3}>{memory.title}</Heading>
        {mine && (
          <div className='controls'>
            <IconLink
              iconClass='fas fa-window-close fa-lg'
              height={30}
              onClick={e => this.onDeleteClicked(e)}
            />
          </div>
        )}
      </div>
    )
  }
}

const MemoryHeaderWithMutation = compose(
  graphql(DELETE_MEMORY, { name: 'deleteMemory' })
)(MemoryHeader)

export default MemoryHeaderWithMutation
