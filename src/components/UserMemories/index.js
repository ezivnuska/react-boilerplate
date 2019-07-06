import React from 'react'
import PropTypes from 'prop-types'
import { GET_USER_MEMORIES } from 'queries'
import { Query } from 'react-apollo'

import { MemoryList } from 'components'

import { Spinner } from 'components'

import './UserMemories.scss'

const UserMemories = ({ user }) => (
  <Query
    query={GET_USER_MEMORIES}
    variables={{ userId: user._id }}
  >

    {({ data, loading, error, refetch }) => {
      
      if (loading) return <Spinner />
      if (error) return <div>Error: {error}</div>
      if (!data.getUserMemories) return null
      
      return (
        <div className='memories'>
          
          {!data.getUserMemories.length
            ? <h3>Empty... Check back soon!</h3>
            : (
              <MemoryList
                memories={data.getUserMemories}
                refetch={refetch}
              />
            )
          }
        </div>
      )
    }}
  </Query>
)

export default UserMemories
