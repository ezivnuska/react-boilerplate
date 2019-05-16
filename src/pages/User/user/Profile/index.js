import React, { PureComponent } from 'react'
import { PROFILE_PAGE } from 'queries'
import { Query } from 'react-apollo'
import { Heading } from 'components'

import './Profile.scss'

class Profile extends PureComponent {

  render() {
    const username = this.props.match.params.URL_Param
    return (
      <Query query={PROFILE_PAGE} variables={{ username }}>

        {({ data, loading, error }) => {

          if (loading) return <div></div>
          if (error) return <div>Error</div>

          return (
            <div className='column column_12_12'>
              <div className='fullwidth'>
                <Heading level={1}>
                  About me
                </Heading>
                <div dangerouslySetInnerHTML={{__html: data.profilePage.bio}}></div>
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Profile
