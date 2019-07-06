import React from 'react'
import PropTypes from 'prop-types'
import { GET_ALL_SHARED_MEMORIES } from 'queries'
import { Query } from 'react-apollo'

import RememberButton from './memories/RememberButton'
import MemoryList from './memories/MemoryList'

import { Spinner } from 'components'

import './Memories.scss'

const Memories = ({ context, currentUser }) => (
  <Query query={GET_ALL_SHARED_MEMORIES}>

    {({ data, loading, error, refetch }) => {
      
      if (loading) return <Spinner />
      if (error) return <div>Error: {error}</div>
      if (!data.getAllSharedMemories) return null
      
      return (
        <div className='memories'>
          
          <RememberButton
            context={context}
            refetch={refetch}
          />
          
          {!data.getAllSharedMemories.length
            ? <h3>Empty... Check back soon!</h3>
            : (
              <MemoryList
                memories={data.getAllSharedMemories}
                currentUser={currentUser}
                refetch={refetch}
              />
            )
          }
        </div>
      )
    }}
  </Query>
)

export default Memories
