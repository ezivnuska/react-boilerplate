import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { GET_ALL_SHARED_MEMORIES } from 'queries'
import { Query } from 'react-apollo'

import MemoryModal from './memories/MemoryModal'
import { MemoryList } from 'components'

import { Spinner } from 'components'

import './Memories.scss'

class Memories extends PureComponent {

  onEditClicked = memory => {
    const { context } = this.props
    context.openMemoryModal(memory)
  }

  onComplete = refetch => {
    const { context } = this.props
    refetch()
    context.closeMemoryModal()
  }

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
      
              <MemoryModal
                onComplete={() => this.onComplete(refetch)}
                context={context}
              />
              
              <div
                className='remember-button'
                onClick={e => context.openModal('memory')}
              >
                Remember
              </div>
              
              {data.getAllSharedMemories.length
                ? (
                  <MemoryList
                    memories={data.getAllSharedMemories}
                    currentUser={currentUser}
                    refetch={refetch}
                    onEdit={memory => this.onEditClicked(memory)}
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
