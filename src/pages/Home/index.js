import React, { Fragment, PureComponent } from 'react'
import { Mutation } from 'react-apollo'
import { SIGNIN_USER } from 'queries'
import { withRouter } from 'react-router-dom'
import * as Cookies from 'es-cookie'
import { Helmet } from 'react-helmet'
import { AuthForm, Dashboard } from 'components'

import './Home.scss'

class Home extends PureComponent {

  head() {
    return (
      <Helmet bodyAttributes={{ class: 'homePage' }}>
        <title>Home</title>
      </Helmet>
    )
  }

  render() {
    const { session } = this.props
    const user = (session && session.getCurrentUser) ? session.getCurrentUser : null
    
    return (
      <>
        {this.head()}
        <div className='flex-container'>
          <aside>
            {user
              ? <Dashboard />
              : <AuthForm {...this.props} />
            }
          </aside>
          {null && <section>Extra content here...</section>}
        </div>
      </>
    )
  }
}

export default withRouter(Home)
