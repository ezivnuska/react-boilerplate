import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { GET_ALL_SHARED_MEMORIES } from 'queries'
import { Query } from 'react-apollo'

import { MemoryList, Spinner } from 'components'

import './Memories.scss'

class Memories extends PureComponent {

  render() {
    const { context, currentUser } = this.props
    
    return (
      <Query
        notifyOnNetworkStatusChange={true}
        query={GET_ALL_SHARED_MEMORIES}
      >
    
        {({ data, error, networkStatus, refetch }) => {
          
          const loading = !(networkStatus === 7 || networkStatus === 8)

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
  }
}

export default Memories
