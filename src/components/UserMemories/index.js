import React from 'react'
import PropTypes from 'prop-types'
import { GET_USER_MEMORIES } from 'queries'
import { Query } from 'react-apollo'

import { MemoryList, Spinner } from 'components'

import './UserMemories.scss'

const UserMemories = ({ context, currentUser, user }) => (
  <Query
    query={GET_USER_MEMORIES}
    variables={{ userId: user._id }}
  >

    {({ data, loading, error, refetch }) => {
      
      if (loading) return <Spinner />
      if (error) return <div>Error: {error}</div>
      if (!data.getUserMemories) return null
      
      const userId = user._id === currentUser._id ? null : user._id

      return (
        <div className='user-memories'>
          <MemoryList
            currentUser={currentUser}
            memories={data.getUserMemories}
            refetch={refetch}
            context={context}
            userId={userId}
            unsigned
          />
        </div>
      )
    }}
  </Query>
)

UserMemories.propTypes = {
  context: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default UserMemories
