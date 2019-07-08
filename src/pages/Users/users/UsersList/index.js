import React, { Fragment, PureComponent } from 'react'
import { Query } from 'react-apollo'
import { GET_BONDS } from 'queries'
import { findIndex } from 'lodash'
import { Menu, Spinner } from 'components'
import UserItem from './userslist/UserItem'

import './UsersList.scss'

class UsersList extends PureComponent {

    state = {
        filter: null
    }

    setFilter = filter => {
        this.setState({ filter })
    }

    getBond = (user, bonds) => {
        const { currentUser } = this.props
        let index = findIndex(bonds, { sender: user._id, responder: currentUser._id })
        if (index < 0) index = findIndex(bonds, { responder: user._id, sender: currentUser._id })
        return (index > -1) ? bonds[index] : null
    }

    render() {
        const { currentUser, users } = this.props
        const menuOptions = [
            {
                label: 'All',
                onClick: () => this.setFilter(null),
                active: !this.state.filter
            },
            {
                label: 'Following',
                onClick: () => this.setFilter('bonded'),
                active: this.state.filter === 'bonded'
            }
        ]
        return (
            <Fragment>
                <Menu
                    itemHeight={40}
                    options={menuOptions}
                    inline
                />
                <Query query={GET_BONDS}>
                    {({ data, loading, error }) => {
                        
                        if (loading) return <Spinner />
                        if (error) return <div className='error'>Error: {error}</div>
                        
                        return (
                            <ul className='users-list'>
                                {users.map((user, index) => {
                                    const bond = this.getBond(user, data.getBonds)
                                    if (this.state.filter === 'bonded') {
                                        if (!bond || (bond && !bond.confirmed)) return null
                                    }
                                    return (
                                        <UserItem
                                            key={index}
                                            user={user}
                                            bond={bond}
                                            isCurrentUser={user._id === currentUser._id}
                                        />
                                    )
                                })}
                            </ul>
                        )
                    }}
                </Query>
            </Fragment>
        )
    }
}

export default UsersList