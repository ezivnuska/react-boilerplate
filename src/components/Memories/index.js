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
      <Query query={GET_ALL_SHARED_MEMORIES}>
    
        {({ data, loading, error, refetch }) => {
          
          if (loading) return <Spinner />
          if (error) return <div>Error: {error}</div>
          if (!data.getAllSharedMemories) return null
          
          return (
            <div className='memories'>
              
              <div
                className='remember-button'
                onClick={e => context.openModal('memory')}
              >
                Remember
              </div>
              
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
