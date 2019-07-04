import React, { Fragment, PureComponent } from 'react'
import { GET_ALL_SHARED_MEMORIES } from 'queries'
import { Query } from 'react-apollo'
import { Helmet } from 'react-helmet'
import withAuth from 'hoc/withAuth'
import MemoryList from './memories/MemoryList'
import {
  Heading,
  Spinner
} from 'components'

// import './MemoryList.scss'

class Memories extends PureComponent {

  head() {
    return (
      <Helmet bodyAttributes={{ class: 'memoryPage' }}>
        <title>Memories</title>
      </Helmet>
    )
  }

  render() {
    return (
      <Fragment>
        {this.head()}
        <Heading level={1}>Memories</Heading>
        <Query query={GET_ALL_SHARED_MEMORIES}>

          {({ data, loading, error }) => {

            if (loading) return <Spinner />
            if (error) return <div>Error: {error}</div>
            if (!data.getAllSharedMemories) return null

            return (
              <div className='memories-page'>
                {!data.getAllSharedMemories.length
                    ? <h3>Empty... Check back soon!</h3>
                    : <MemoryList memories={data.getAllSharedMemories} />
                }
              </div>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}

export default withAuth(session => session && session.getCurrentUser)(Memories)
