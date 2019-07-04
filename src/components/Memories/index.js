import React from 'react'
import PropTypes from 'prop-types'

import {
  RememberButton,
  MemoryList,
} from 'components'

const Memories = ({ user }) => (
  <div className='memories'>
    <RememberButton />
    {user && <MemoryList userId={user._id} />}
  </div>
)

// const mapStateToProps = state => ({
//   user: fromUser.getUser(state),
// })

export default Memories
