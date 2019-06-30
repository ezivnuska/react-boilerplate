import React, { PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_BONDS } from 'queries'
import { findIndex } from 'lodash'
import { Spinner } from 'components'
import UserItem from './userslist/UserItem'

class UsersList extends PureComponent {

    getBond = (user, bonds) => {
        const { currentUser } = this.props
        let index = findIndex(bonds, { sender: user._id, responder: currentUser._id })
        if (index < 0) index = findIndex(bonds, { responder: user._id, sender: currentUser._id })
        return (index > -1) ? bonds[index] : null
    }

    render() {
        const { currentUser, users } = this.props
        return (
            <Query query={GET_BONDS}>
                {({ data, loading, error }) => {
                    
                    if (loading) return <Spinner />
                    if (error) return <div className='error'>Error: {error}</div>

                    const bonds = data.getBonds
                    
                    return (
                        <ul className='users'>
                            {users && users.map((user, index) => {
                                const bond = this.getBond(user, bonds)
                                return (
                                    <li key={index}>
                                        <UserItem
                                            user={user}
                                            bond={bond}
                                            isCurrentUser={user._id === currentUser._id}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    )
                }}
            </Query>
        )
    }
}

export default UsersList