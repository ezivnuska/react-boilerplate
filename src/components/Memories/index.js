import React from 'react'
import PropTypes from 'prop-types'
import { GET_ALL_SHARED_MEMORIES } from 'queries'
import { Query } from 'react-apollo'

import { MemoryList, Spinner } from 'components'

import './Memories.scss'

const Memories  = ({ context, currentUser }) => (
  <Query query={GET_ALL_SHARED_MEMORIES}>

    {({ data, loading, error, refetch }) => {
      console.log('data', data)
      console.log('loading', loading)
      if (loading) return <Spinner />
      if (error) return <div>Error: {error}</div>
      if (!data.getAllSharedMemories) return null
      
      return (
        <div className='memories'>
          
          {data.getAllSharedMemories.length
            ? (
              <MemoryList
                context={context}
                currentUser={currentUser}
                memories={data.getAllSharedMemories}
                refetch={refetch}
              />
            ) : <h3>Empty... Check back soon!</h3>
          }
        </div>
      )
    }}
  </Query>
)

export default Memories
