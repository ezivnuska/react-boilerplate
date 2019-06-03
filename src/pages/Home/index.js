import React, { Fragment, PureComponent } from 'react'
import { Helmet } from 'react-helmet'
import { AuthForm, Dashboard } from 'components'

import './Home.scss'

const initialState = {
  error: null,
}

class Home extends PureComponent {

  state = {
    ...initialState,
  }

  head() {
    return (
      <Helmet bodyAttributes={{ class: 'home-page' }}>
        <title>Home</title>
      </Helmet>
    )
  }

  componentWillMount() {
    const sessionExpired = this.props.history.action === 'REPLACE'
    if (sessionExpired) {
      this.setState({ error: 'Session terminated due to inactivity. Please sign in.'})
      this.props.refetch()
    }
  }

  render() {
    const { session } = this.props
    const user = (session && session.getCurrentUser) ? session.getCurrentUser : null
    
    return (
      <Fragment>
        {this.head()}
        {user
          ? <Dashboard user={user} />
          : <AuthForm {...this.props} error={this.state.error} />
        }
      </Fragment>
    )
  }
}

export default Home